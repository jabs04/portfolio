import React from 'react';
import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects: React.FC = () => {
    const { data } = usePortfolio();
    const { projects } = data;

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <ScrollAnimationWrapper variants={fadeInUp}>
                    <h2 className="section-title">Featured Projects</h2>
                </ScrollAnimationWrapper>

                <motion.div
                    className="projects-grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="project-image">
                                <img src={project.imageUrl} alt={project.title} />
                                <div className="project-overlay">
                                    <a
                                        href={project.link}
                                        className="project-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="project-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
