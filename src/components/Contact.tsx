import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { fadeInUp, fadeInLeft, fadeInRight } from '../utils/animations';
import './Contact.css';

const Contact: React.FC = () => {
    const { data } = usePortfolio();
    const { contact } = data;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (you can add email service integration here)
        alert('Thank you for your message! This is a demo form.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <ScrollAnimationWrapper variants={fadeInUp}>
                    <h2 className="section-title">Get In Touch</h2>
                </ScrollAnimationWrapper>

                <div className="contact-content">
                    <ScrollAnimationWrapper variants={fadeInLeft} className="contact-info">
                        <div className="contact-info-item">
                            <div className="contact-icon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{contact.email}</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-icon">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4>Phone</h4>
                                <p>{contact.phone}</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-icon">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4>Location</h4>
                                <p>{contact.location}</p>
                            </div>
                        </div>

                        <div className="social-links">
                            {contact.socialLinks.github && (
                                <a href={contact.socialLinks.github} target="_blank" rel="noopener noreferrer">
                                    <Github size={24} />
                                </a>
                            )}
                            {contact.socialLinks.linkedin && (
                                <a href={contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin size={24} />
                                </a>
                            )}
                            {contact.socialLinks.twitter && (
                                <a href={contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                    <Twitter size={24} />
                                </a>
                            )}
                            {contact.socialLinks.instagram && (
                                <a href={contact.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                    <Instagram size={24} />
                                </a>
                            )}
                        </div>
                    </ScrollAnimationWrapper>

                    <ScrollAnimationWrapper variants={fadeInRight} className="contact-form-wrapper">
                        <form className="contact-form glass" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </section>
    );
};

export default Contact;
