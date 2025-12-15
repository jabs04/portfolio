export interface HeroData {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
}

export interface AboutData {
    title: string;
    content: string;
    imageUrl: string;
}

export interface Skill {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    tags: string[];
}

export interface ContactData {
    email: string;
    phone: string;
    location: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
}

export interface PortfolioData {
    hero: HeroData;
    about: AboutData;
    skills: Skill[];
    projects: Project[];
    contact: ContactData;
}
