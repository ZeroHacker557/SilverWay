import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            {/* Animated gradient fallback background */}
            <div className="hero-gradient-bg" />

            {/* Sparkle particles */}
            <div className="hero-particles">
                <div className="sparkle" />
                <div className="sparkle" />
                <div className="sparkle" />
                <div className="sparkle" />
                <div className="sparkle" />
                <div className="sparkle" />
                <div className="sparkle" />
                <div className="sparkle" />
            </div>

            {/* Vignette overlay */}
            <div className="hero-vignette" />

            {/* Content */}
            <div className="hero-content">
                <div className="hero-badge">✦ Premium Silver Jewelry ✦</div>
                <h1 className="hero-title">
                    SilverWay
                    <span className="silver-accent">Tungi jilongiz ramzi</span>
                </h1>
                <p className="hero-subtitle">
                    Har bir buyumda nafosatning ifodasi. Siz uchun yaratilgan hashamatli kumush taqinchoqlar.
                </p>
                <button className="hero-cta" onClick={() => document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })}>
                    Kolleksiyani ko'rish
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll-indicator">
                <span>Pastga</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
