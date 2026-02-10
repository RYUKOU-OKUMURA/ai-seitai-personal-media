import React from 'react';
import Hero from '../common/Hero';
import Stats from '../common/Stats';
import Checklist from '../common/Checklist';
import Philosophy from '../features/Philosophy';
import Services from '../features/Services';
import EventBoard from '../features/EventBoard';
import InternalBlog from '../features/InternalBlog';
import CaseStudies from '../features/CaseStudies';
import ContentHub from '../features/ContentHub';
import About from '../features/About';
import Contact from '../features/Contact';
import type { BlogPostListItem, EventListItem } from '../../types/core';

interface HomeProps {
  onNavigate: (page: string, id?: number) => void;
  events: EventListItem[];
  posts: BlogPostListItem[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, events, posts }) => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Stats />
      <Checklist />
      <Philosophy />
      <Services onNavigate={onNavigate} />
      <EventBoard events={events} />
      <InternalBlog posts={posts} />
      <ContentHub />
      <CaseStudies onNavigate={onNavigate} />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
