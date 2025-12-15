import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { to: 'hero', label: 'Home' },
        { to: 'about', label: 'About' },
        { to: 'skills', label: 'Skills' },
        { to: 'projects', label: 'Projects' },
        { to: 'contact', label: 'Contact' }
    ];

    const activeSection = useActiveSection(navLinks.map(link => link.to));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        const element = document.getElementById(to);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    };

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container navbar-content">
                <div className="navbar-logo gradient-text">Portfolio</div>

                {/* Desktop Menu */}
                <ul className="navbar-links desktop-menu">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <a
                                href={`#${link.to}`}
                                className={activeSection === link.to ? 'active' : ''}
                                onClick={(e) => handleLinkClick(e, link.to)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="mobile-menu"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul className="navbar-links">
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <a
                                            href={`#${link.to}`}
                                            className={activeSection === link.to ? 'active' : ''}
                                            onClick={(e) => handleLinkClick(e, link.to)}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
