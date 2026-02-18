import { instagramPosts } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './TrustSection.css';

export default function TrustSection() {
    const { ref: instaRef, isVisible: instaVisible } = useScrollAnimation();
    const { ref: unboxRef, isVisible: unboxVisible } = useScrollAnimation();

    // Duplicate array for infinite scroll
    const doubledPosts = [...instagramPosts, ...instagramPosts];

    return (
        <section className="trust-section" id="about">
            {/* Instagram Carousel */}
            <div className={`instagram-carousel scroll-animate ${instaVisible ? 'visible' : ''}`} ref={instaRef}>
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title silver-text">Bizning mijozlarimiz</h2>
                        <p className="section-subtitle">@silverway_uz — Instagramda bizni kuzating</p>
                    </div>
                </div>

                <div className="instagram-track-wrapper">
                    <div className="instagram-track">
                        {doubledPosts.map((post, index) => (
                            <div key={index} className="instagram-item">
                                <img src={post} alt={`Instagram post ${index + 1}`} loading="lazy" />
                                <div className="instagram-overlay">
                                    <svg viewBox="0 0 24 24">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <circle cx="12" cy="12" r="5" />
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Unboxing Section */}
            <div className="container">
                <div className={`unboxing scroll-animate ${unboxVisible ? 'visible' : ''}`} ref={unboxRef}>
                    <div className="unboxing-image">
                        <img
                            src="https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=800&h=600&fit=crop&q=80"
                            alt="SilverWay premium qadoqlash"
                            loading="lazy"
                        />
                    </div>
                    <div className="unboxing-content">
                        <h3>
                            Sovg'a uchun tayyor holda
                            <span className="silver-text"> yetkazamiz</span>
                        </h3>
                        <p>
                            Har bir buyum hashamatli qora baxmal qutiga joylashtiriladi, kumush logotipli
                            maxsus paketga o'raladi va ichiga shaxsiy tabrik xati qo'yiladi.
                        </p>
                        <div className="unboxing-features">
                            <div className="unboxing-feature">
                                <div className="unboxing-feature-icon">🎁</div>
                                <span>Premium baxmal quti</span>
                            </div>
                            <div className="unboxing-feature">
                                <div className="unboxing-feature-icon">✨</div>
                                <span>Kumush logotipli paket</span>
                            </div>
                            <div className="unboxing-feature">
                                <div className="unboxing-feature-icon">💌</div>
                                <span>Shaxsiy tabrik xati</span>
                            </div>
                            <div className="unboxing-feature">
                                <div className="unboxing-feature-icon">🚚</div>
                                <span>Butun O'zbekiston bo'ylab yetkazib berish</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
