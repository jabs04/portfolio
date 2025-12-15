import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PortfolioData, HeroData, AboutData, Skill, Project, ContactData } from '../types/types';
import { savePortfolioData, loadPortfolioData } from '../utils/localStorage';

interface PortfolioContextType {
    data: PortfolioData;
    updateHero: (hero: HeroData) => void;
    updateAbout: (about: AboutData) => void;
    updateSkills: (skills: Skill[]) => void;
    addSkill: (skill: Skill) => void;
    updateSkill: (id: string, skill: Skill) => void;
    deleteSkill: (id: string) => void;
    updateProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, project: Project) => void;
    deleteProject: (id: string) => void;
    updateContact: (contact: ContactData) => void;
}

const defaultData: PortfolioData = {
    hero: {
        title: 'Creative Developer & Designer',
        subtitle: 'Hi, I\'m Jabu',
        description: 'I craft beautiful digital experiences that make a difference. Specializing in modern web development and user-centric design.',
        ctaPrimary: 'View My Work',
        ctaSecondary: 'Get In Touch'
    },
    about: {
        title: 'About Me',
        content: 'I\'m a passionate developer with over 5 years of experience creating innovative web solutions. My expertise spans across modern JavaScript frameworks, responsive design, and creating seamless user experiences. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
    },
    skills: [
        {
            id: '1',
            title: 'Web Development',
            description: 'Building responsive and performant web applications using React, TypeScript, and modern frameworks.',
            icon: 'Code'
        },
        {
            id: '2',
            title: 'UI/UX Design',
            description: 'Creating intuitive and beautiful user interfaces with a focus on user experience and accessibility.',
            icon: 'Palette'
        },
        {
            id: '3',
            title: 'Mobile Development',
            description: 'Developing cross-platform mobile applications with React Native and Flutter.',
            icon: 'Smartphone'
        },
        {
            id: '4',
            title: 'Backend Development',
            description: 'Building scalable APIs and server-side applications with Node.js and databases.',
            icon: 'Database'
        }
    ],
    projects: [
        {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
            imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
            link: '#',
            tags: ['React', 'Node.js', 'MongoDB']
        },
        {
            id: '2',
            title: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates and team features.',
            imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
            link: '#',
            tags: ['React', 'Firebase', 'TypeScript']
        },
        {
            id: '3',
            title: 'Portfolio Website',
            description: 'Modern portfolio website with animations and content management system.',
            imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
            link: '#',
            tags: ['React', 'Framer Motion', 'CSS']
        }
    ],
    contact: {
        email: 'hello@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        socialLinks: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com'
        }
    }
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PortfolioData>(() => {
        const savedData = loadPortfolioData();
        return savedData || defaultData;
    });

    useEffect(() => {
        savePortfolioData(data);
    }, [data]);

    const updateHero = (hero: HeroData) => {
        setData(prev => ({ ...prev, hero }));
    };

    const updateAbout = (about: AboutData) => {
        setData(prev => ({ ...prev, about }));
    };

    const updateSkills = (skills: Skill[]) => {
        setData(prev => ({ ...prev, skills }));
    };

    const addSkill = (skill: Skill) => {
        setData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    };

    const updateSkill = (id: string, skill: Skill) => {
        setData(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.id === id ? skill : s)
        }));
    };

    const deleteSkill = (id: string) => {
        setData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s.id !== id)
        }));
    };

    const updateProjects = (projects: Project[]) => {
        setData(prev => ({ ...prev, projects }));
    };

    const addProject = (project: Project) => {
        setData(prev => ({ ...prev, projects: [...prev.projects, project] }));
    };

    const updateProject = (id: string, project: Project) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === id ? project : p)
        }));
    };

    const deleteProject = (id: string) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id)
        }));
    };

    const updateContact = (contact: ContactData) => {
        setData(prev => ({ ...prev, contact }));
    };

    return (
        <PortfolioContext.Provider
            value={{
                data,
                updateHero,
                updateAbout,
                updateSkills,
                addSkill,
                updateSkill,
                deleteSkill,
                updateProjects,
                addProject,
                updateProject,
                deleteProject,
                updateContact
            }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within PortfolioProvider');
    }
    return context;
};
