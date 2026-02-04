import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Checklist from './Checklist';
import Philosophy from './Philosophy';
import Services from './Services';
import EventBoard from './EventBoard';
import InternalBlog from './InternalBlog';
import CaseStudies from './CaseStudies';
import ContentHub from './ContentHub';
import About from './About';
import Contact from './Contact';
import type { BlogPostListItem, EventListItem } from '../types';

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
