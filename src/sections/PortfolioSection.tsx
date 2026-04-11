'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, MapPin, Calendar } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  category: 'residential' | 'commercial' | 'industrial';
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Modern Villa Complex',
    location: 'Namakkal, TN',
    year: '2023',
    category: 'residential',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'A premium residential complex featuring modern architecture and sustainable design.',
  },
  {
    id: 2,
    title: 'Commercial Plaza',
    location: 'Salem, TN',
    year: '2023',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    description: 'Multi-story commercial building with retail spaces and office suites.',
  },
  {
    id: 3,
    title: 'Industrial Warehouse',
    location: 'Erode, TN',
    year: '2022',
    category: 'industrial',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
    description: 'Large-scale industrial facility with advanced logistics infrastructure.',
  },
  {
    id: 4,
    title: 'Luxury Apartments',
    location: 'Karur, TN',
    year: '2022',
    category: 'residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    description: 'High-end apartment complex with premium amenities and finishes.',
  },
  {
    id: 5,
    title: 'Office Complex',
    location: 'Trichy, TN',
    year: '2021',
    category: 'commercial',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    description: 'Modern office spaces designed for productivity and collaboration.',
  },
  {
    id: 6,
    title: 'Manufacturing Unit',
    location: 'Coimbatore, TN',
    year: '2021',
    category: 'industrial',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    description: 'State-of-the-art manufacturing facility with optimized workflow.',
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'industrial', label: 'Industrial' },
];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      layout
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <span className="inline-block px-2 py-1 text-xs font-bold text-brand-primary bg-brand-accent rounded mb-2 font-inter">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          <h3 className="text-lg md:text-xl font-sgrotesk font-bold text-white mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-brand-text/80 font-inter">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {project.year}
            </span>
          </div>
        </div>
      </div>

      {/* Neutral Border on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-accent/30 rounded-lg transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

function Lightbox({ project, onClose }: LightboxProps) {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-primary/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full bg-brand-primary border border-brand-card shadow-2xl rounded-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-brand-card text-brand-text border border-brand-card shadow-sm hover:bg-brand-accent hover:text-brand-primary transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8 bg-brand-secondary border-t border-brand-card">
          <span className="inline-block px-3 py-1 text-sm font-bold text-brand-primary bg-brand-accent border border-brand-accent shadow-sm rounded mb-3 font-inter">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          <h2 className="text-2xl md:text-3xl font-sgrotesk font-bold text-brand-text mb-4">
            {project.title}
          </h2>
          <p className="text-brand-text/70 mb-6 font-inter">{project.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-text/50 font-inter">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-brand-accent" />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-brand-accent" />
              {project.year}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-brand-primary">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block border border-brand-accent/30 text-brand-accent text-sm font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-brand-accent/5 shadow-sm font-inter">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sgrotesk font-bold text-brand-text mb-6">
            Projects That Define <span className="text-brand-accent font-extrabold">Excellence</span>
          </h2>
          <p className="text-brand-text/80 text-base md:text-lg font-inter">
            Explore our diverse portfolio of completed projects across residential,
            commercial, and industrial sectors.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 md:px-6 py-2 text-sm font-bold rounded-full border transition-all font-inter ${
                activeFilter === category.id
                  ? 'bg-brand-accent text-brand-primary border-brand-accent shadow-lg shadow-brand-accent/20'
                  : 'bg-brand-primary text-brand-text border-brand-card hover:border-brand-accent/50 hover:text-brand-accent shadow-sm'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
