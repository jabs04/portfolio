import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import { loadAdminSession, clearAdminSession } from '../utils/localStorage';
import HeroEditor from '../components/admin/HeroEditor';
import AboutEditor from '../components/admin/AboutEditor';
import SkillsEditor from '../components/admin/SkillsEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import ContactEditor from '../components/admin/ContactEditor';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('hero');
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadAdminSession()) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        clearAdminSession();
        navigate('/admin');
    };

    const tabs = [
        { id: 'hero', label: 'Hero Section' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-header glass">
                <div className="container">
                    <div className="admin-header-content">
                        <h1 className="gradient-text">Admin Dashboard</h1>
                        <div className="admin-actions">
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-secondary"
                            >
                                <Home size={18} /> View Site
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-content">
                <div className="container">
                    <div className="admin-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="admin-panel glass">
                        {activeTab === 'hero' && <HeroEditor />}
                        {activeTab === 'about' && <AboutEditor />}
                        {activeTab === 'skills' && <SkillsEditor />}
                        {activeTab === 'projects' && <ProjectsEditor />}
                        {activeTab === 'contact' && <ContactEditor />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
