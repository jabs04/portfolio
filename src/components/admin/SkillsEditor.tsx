import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import type { Skill } from '../../types/types';
import './AdminEditor.css';

const SkillsEditor: React.FC = () => {
    const { data, updateSkills } = usePortfolio();
    const [skills, setSkills] = useState(data.skills);
    const [saved, setSaved] = useState(false);

    const iconOptions = ['Code', 'Palette', 'Smartphone', 'Database', 'Zap', 'Globe'];

    const handleChange = (id: string, field: keyof Skill, value: string) => {
        setSkills(skills.map(skill =>
            skill.id === id ? { ...skill, [field]: value } : skill
        ));
    };

    const handleAddSkill = () => {
        const newSkill: Skill = {
            id: Date.now().toString(),
            title: 'New Skill',
            description: 'Description of the skill',
            icon: 'Code'
        };
        setSkills([...skills, newSkill]);
    };

    const handleDeleteSkill = (id: string) => {
        setSkills(skills.filter(skill => skill.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSkills(skills);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Edit Skills</h2>
                <button type="button" onClick={handleAddSkill} className="btn btn-secondary">
                    <Plus size={18} /> Add Skill
                </button>
            </div>

            <form onSubmit={handleSubmit} className="editor-form">
                <div className="skills-list">
                    {skills.map((skill) => (
                        <div key={skill.id} className="skill-item card">
                            <div className="skill-item-header">
                                <h4>Skill #{skills.indexOf(skill) + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSkill(skill.id)}
                                    className="btn-icon-delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={skill.title}
                                    onChange={(e) => handleChange(skill.id, 'title', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={skill.description}
                                    onChange={(e) => handleChange(skill.id, 'description', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>Icon</label>
                                <select
                                    value={skill.icon}
                                    onChange={(e) => handleChange(skill.id, 'icon', e.target.value)}
                                >
                                    {iconOptions.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary">
                    <Save size={18} /> {saved ? 'Saved!' : 'Save All Changes'}
                </button>
            </form>
        </div>
    );
};

export default SkillsEditor;
