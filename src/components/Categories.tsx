import { categories } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Categories.css';

export default function Categories() {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="categories" id="katalog" ref={ref}>
            <div className="container">
                <div className={`section-header scroll-animate ${isVisible ? 'visible' : ''}`}>
                    <h2 className="section-title silver-text">Kolleksiyalar</h2>
                    <p className="section-subtitle">Har bir uslubga mos taqinchoq</p>
                </div>

                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <div
                            key={cat.id}
                            className={`category-card scroll-animate scroll-animate-delay-${index + 1} ${isVisible ? 'visible' : ''}`}
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="category-card-img"
                                loading="lazy"
                            />
                            <div className="category-card-overlay">
                                <h3 className="category-card-name">{cat.name}</h3>
                                <span className="category-card-count">{cat.count} mahsulot</span>
                            </div>
                            <div className="category-card-arrow">
                                <svg viewBox="0 0 24 24">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
