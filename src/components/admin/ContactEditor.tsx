import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';
import './AdminEditor.css';

const ContactEditor: React.FC = () => {
    const { data, updateContact } = usePortfolio();
    const [formData, setFormData] = useState(data.contact);
    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSocialChange = (platform: string, value: string) => {
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [platform]: value
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateContact(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <h2>Edit Contact Information</h2>
            <form onSubmit={handleSubmit} className="editor-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <h3>Social Media Links</h3>

                <div className="form-group">
                    <label htmlFor="github">GitHub URL</label>
                    <input
                        type="url"
                        id="github"
                        value={formData.socialLinks.github || ''}
                        onChange={(e) => handleSocialChange('github', e.target.value)}
                        placeholder="https://github.com/username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn URL</label>
                    <input
                        type="url"
                        id="linkedin"
                        value={formData.socialLinks.linkedin || ''}
                        onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="twitter">Twitter URL</label>
                    <input
                        type="url"
                        id="twitter"
                        value={formData.socialLinks.twitter || ''}
                        onChange={(e) => handleSocialChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instagram">Instagram URL</label>
                    <input
                        type="url"
                        id="instagram"
                        value={formData.socialLinks.instagram || ''}
                        onChange={(e) => handleSocialChange('instagram', e.target.value)}
                        placeholder="https://instagram.com/username"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    <Save size={18} /> {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default ContactEditor;
