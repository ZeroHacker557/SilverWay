import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

export const dynamic = 'force-dynamic';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const adminId = process.env.TELEGRAM_ADMIN_ID!;
const bot = new TelegramBot(token);

export async function POST(req: Request) {
    try {
        const { items, totalPrice } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Savat bo\'sh' }, { status: 400 });
        }

        let message = `🛍 **Yangi Buyurtma!**\n\n`;
        items.forEach((item: any, index: number) => {
            message += `${index + 1}. ${item.product.title}\n`;
            message += `   - Miqdor: ${item.quantity}\n`;
            if (item.selectedSize) message += `   - O'lcham: ${item.selectedSize}\n`;
            if (item.giftWrap) message += `   - 🎁 Sovg'a qadog'i\n`;
            message += `   - Narx: ${item.product.price * item.quantity} so'm\n\n`;
        });

        message += `💰 **Umumiy summa: ${totalPrice} so'm**`;

        await bot.sendMessage(adminId, message, { parse_mode: 'Markdown' });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Order API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
