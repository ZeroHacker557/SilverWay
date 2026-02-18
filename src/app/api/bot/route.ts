import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import { getSupabaseServiceRole } from '@/lib/supabase';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const adminId = process.env.TELEGRAM_ADMIN_ID!;
const internalSecret = process.env.INTERNAL_API_SECRET!;
const bot = new TelegramBot(token);

// Simple in-memory state for the bot flow (Vercel serverless might lose this across instances, 
// but for a single-admin flow it usually works or can be backed by Redis/DB if needed.
// Given the requirements and complexity, we will use a simple state object).
const adminStates: Record<string, any> = {};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!message || !message.text && !message.photo) {
            return NextResponse.json({ ok: true });
        }

        const chatId = message.chat.id.toString();
        const userId = message.from.id.toString();

        if (userId !== adminId) {
            await bot.sendMessage(chatId, "Siz admin emassiz.");
            return NextResponse.json({ ok: true });
        }

        const text = message.text;
        const state = adminStates[chatId] || { step: 'idle' };

        if (text === '/start' || text === '/cancel') {
            adminStates[chatId] = { step: 'idle' };
            await bot.sendMessage(chatId, "Salom Admin! Mahsulot qo'shish uchun kategoriya kiriting (masalan: uzuk, zirak, marjon, bilakuzuk).");
            adminStates[chatId].step = 'category';
            return NextResponse.json({ ok: true });
        }

        switch (state.step) {
            case 'category':
                state.category = text;
                await bot.sendMessage(chatId, "Mahsulot nomini kiriting:");
                state.step = 'title';
                break;
            case 'title':
                state.title = text;
                await bot.sendMessage(chatId, "Tavsifni kiriting:");
                state.step = 'description';
                break;
            case 'description':
                state.description = text;
                await bot.sendMessage(chatId, "Narxni kiriting (raqamda):");
                state.step = 'price';
                break;
            case 'price':
                state.price = parseFloat(text);
                await bot.sendMessage(chatId, "Mahsulot rasmini yuboring:");
                state.step = 'image';
                break;
            case 'image':
                if (message.photo) {
                    const photo = message.photo[message.photo.length - 1];
                    const fileId = photo.file_id;
                    const file = await bot.getFile(fileId);
                    const fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

                    state.tempImageId = fileId;
                    state.image_url = fileUrl; // We will download/upload in the API call

                    if (state.category.toLowerCase() === 'uzuk' || state.category.toLowerCase() === 'ring') {
                        await bot.sendMessage(chatId, "O'lchamlarni kiriting (vergul bilan ajratilgan, masalan: 16, 17, 18):");
                        state.step = 'sizes';
                    } else {
                        await bot.sendMessage(chatId, "Tasdiqlaysizmi? (ha/yo'q)");
                        state.step = 'confirm';
                    }
                } else {
                    await bot.sendMessage(chatId, "Iltimos rasm yuboring.");
                }
                break;
            case 'sizes':
                state.sizes = text.split(',').map((s: string) => s.trim());
                await bot.sendMessage(chatId, `Tasdiqlaysizmi? (ha/yo'q)\n\nNomi: ${state.title}\nNarxi: ${state.price}\nKategoriya: ${state.category}\nO'lchamlar: ${state.sizes.join(', ')}`);
                state.step = 'confirm';
                break;
            case 'confirm':
                if (text?.toLowerCase() === 'ha') {
                    await bot.sendMessage(chatId, "Mahsulot qo'shilmoqda...");

                    // Download from TG and upload to Supabase
                    const response = await fetch(state.image_url);
                    const blob = await response.blob();
                    const fileName = `${Date.now()}.jpg`;

                    const supabase = getSupabaseServiceRole();
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('products')
                        .upload(fileName, blob, { contentType: 'image/jpeg' });

                    if (uploadError) {
                        await bot.sendMessage(chatId, `Xato (Upload): ${uploadError.message}`);
                    } else {
                        const { data: { publicUrl } } = supabase.storage
                            .from('products')
                            .getPublicUrl(fileName);

                        // Call internal API
                        const apiRes = await fetch(`${new URL(req.url).origin}/api/products`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-secret': internalSecret
                            },
                            body: JSON.stringify({
                                ...state,
                                image_url: publicUrl
                            })
                        });

                        if (apiRes.ok) {
                            await bot.sendMessage(chatId, "Muvaffaqiyatli qo'shildi! ✅");
                        } else {
                            const err = await apiRes.json();
                            await bot.sendMessage(chatId, `Xato (API): ${err.error}`);
                        }
                    }
                } else {
                    await bot.sendMessage(chatId, "Bekor qilindi.");
                }
                adminStates[chatId] = { step: 'idle' };
                break;
        }

        adminStates[chatId] = state;
        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error('Bot Error:', error);
        return NextResponse.json({ ok: true }); // Always return 200 to TG
    }
}
