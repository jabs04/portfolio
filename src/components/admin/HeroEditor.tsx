import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';
import './AdminEditor.css';

const HeroEditor: React.FC = () => {
    const { data, updateHero } = usePortfolio();
    const [formData, setFormData] = useState(data.hero);
    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateHero(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <h2>Edit Hero Section</h2>
            <form onSubmit={handleSubmit} className="editor-form">
                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle</label>
                    <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="Hi, I'm..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Main Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Your title or tagline"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Brief description about yourself"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="ctaPrimary">Primary Button Text</label>
                        <input
                            type="text"
                            id="ctaPrimary"
                            name="ctaPrimary"
                            value={formData.ctaPrimary}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ctaSecondary">Secondary Button Text</label>
                        <input
                            type="text"
                            id="ctaSecondary"
                            name="ctaSecondary"
                            value={formData.ctaSecondary}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default HeroEditor;
