import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Cinzel_Decorative } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const cinzel = Cinzel_Decorative({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-cinzel',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'SilverWay | Premium Kumush Taqinchoqlar',
    description: 'SilverWay - eng sara premium kumush taqinchoqlar va zargarlik buyumlari katalogi.',
    keywords: 'SilverWay, kumush, taqinchoqlar, uzuklar, ziraklar, zargarlik',
};

export const viewport: Viewport = {
    themeColor: '#0A0A0A',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
            <body>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
