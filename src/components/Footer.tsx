import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p>
                        © {currentYear} Portfolio. Made with <Heart size={16} className="heart-icon" /> by You
                    </p>
                    <p className="footer-subtitle">Powered by React & Framer Motion</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
