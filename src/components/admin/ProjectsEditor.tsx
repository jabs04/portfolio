import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';
import type { Project } from '../../types/types';
import './AdminEditor.css';

const ProjectsEditor: React.FC = () => {
    const { data, updateProjects } = usePortfolio();
    const [projects, setProjects] = useState(data.projects);
    const [saved, setSaved] = useState(false);

    const handleChange = (id: string, field: keyof Project, value: string | string[]) => {
        setProjects(projects.map(project =>
            project.id === id ? { ...project, [field]: value } : project
        ));
    };

    const handleTagsChange = (id: string, tagsString: string) => {
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
        handleChange(id, 'tags', tags);
    };

    const handleAddProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: 'New Project',
            description: 'Project description',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
            link: '#',
            tags: []
        };
        setProjects([...projects, newProject]);
    };

    const handleDeleteProject = (id: string) => {
        setProjects(projects.filter(project => project.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProjects(projects);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h2>Edit Projects</h2>
                <button type="button" onClick={handleAddProject} className="btn btn-secondary">
                    <Plus size={18} /> Add Project
                </button>
            </div>

            <form onSubmit={handleSubmit} className="editor-form">
                <div className="projects-list">
                    {projects.map((project) => (
                        <div key={project.id} className="project-item card">
                            <div className="skill-item-header">
                                <h4>Project #{projects.indexOf(project) + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteProject(project.id)}
                                    className="btn-icon-delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => handleChange(project.id, 'title', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="url"
                                    value={project.imageUrl}
                                    onChange={(e) => handleChange(project.id, 'imageUrl', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="form-group">
                                <label>Project Link</label>
                                <input
                                    type="url"
                                    value={project.link}
                                    onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={project.tags.join(', ')}
                                    onChange={(e) => handleTagsChange(project.id, e.target.value)}
                                    placeholder="React, TypeScript, Node.js"
                                />
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

export default ProjectsEditor;
