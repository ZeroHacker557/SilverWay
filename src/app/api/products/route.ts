import { NextResponse } from 'next/server';
import { getSupabaseServiceRole } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const secret = req.headers.get('x-api-secret');
        if (secret !== process.env.INTERNAL_API_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, price, category, image_url, sizes } = body;

        const supabase = getSupabaseServiceRole();

        // 1. Insert product
        const { data: product, error: pError } = await supabase
            .from('products')
            .insert([{ title, description, price, category, image_url }])
            .select()
            .single();

        if (pError) throw pError;

        // 2. Insert sizes if any
        if (sizes && Array.isArray(sizes) && sizes.length > 0) {
            const sizeEntries = sizes.map(size => ({
                product_id: product.id,
                size: size.trim()
            }));
            const { error: sError } = await supabase
                .from('product_sizes')
                .insert(sizeEntries);

            if (sError) throw sError;
        }

        return NextResponse.json({ success: true, productId: product.id });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
