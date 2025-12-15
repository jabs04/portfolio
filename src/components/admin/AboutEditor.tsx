import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';
import './AdminEditor.css';

const AboutEditor: React.FC = () => {
    const { data, updateAbout } = usePortfolio();
    const [formData, setFormData] = useState(data.about);
    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAbout(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <h2>Edit About Section</h2>
            <form onSubmit={handleSubmit} className="editor-form">
                <div className="form-group">
                    <label htmlFor="title">Section Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">About Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={8}
                        placeholder="Tell your story..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                    <small>Recommended: Square image (500x500px or larger)</small>
                </div>

                <button type="submit" className="btn btn-primary">
                    <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default AboutEditor;
