import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer" id="kontakt">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">SILVERWAY</div>
                        <p>Premium kumush taqinchoqlar brendi. Har bir buyumda nafosatning ifodasi.</p>
                        <div className="footer-socials">
                            <a href="#" className="footer-social-icon" aria-label="Instagram">
                                <svg viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="17.5" cy="6.5" r="1.5" />
                                </svg>
                            </a>
                            <a href="#" className="footer-social-icon" aria-label="Telegram">
                                <svg viewBox="0 0 24 24">
                                    <path d="M21.2 4.4L2.4 11.2c-.7.3-.7 1.3.1 1.5l4.8 1.5 1.8 5.8c.2.6 1 .8 1.4.3l2.6-2.6 5.1 3.8c.6.4 1.4.1 1.5-.6l3.2-14c.2-.8-.6-1.5-1.4-1.2zM9.6 14.1l-.5 3.5-1.2-4.1 10.2-6.5-8.5 7.1z" />
                                </svg>
                            </a>
                            <a href="#" className="footer-social-icon" aria-label="Facebook">
                                <svg viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Katalog</h4>
                        <ul>
                            <li><a href="#katalog">Ziraklar</a></li>
                            <li><a href="#katalog">Uzuklar</a></li>
                            <li><a href="#katalog">To'plamlar</a></li>
                            <li><a href="#katalog">Erkaklar uchun</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Ma'lumot</h4>
                        <ul>
                            <li><a href="#about">Biz haqimizda</a></li>
                            <li><a href="#">Yetkazib berish</a></li>
                            <li><a href="#">Qaytarish siyosati</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Aloqa</h4>
                        <ul>
                            <li><a href="tel:+998901234567">+998 90 123-45-67</a></li>
                            <li><a href="mailto:info@silverway.uz">info@silverway.uz</a></li>
                            <li><a href="#">Toshkent, O'zbekiston</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 SilverWay. Barcha huquqlar himoyalangan.</p>
                    <span className="footer-bottom-tagline">Premium Silver Jewelry</span>
                </div>
            </div>
        </footer>
    );
}
