import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Philosophy from './Philosophy';
import Services from './Services';
import EventBoard from './EventBoard';
import InternalBlog from './InternalBlog';
import CaseStudies from './CaseStudies';
import ContentHub from './ContentHub';
import About from './About';
import Contact from './Contact';
import type { EventItem, BlogPost } from '../types';

interface HomeProps {
  onNavigate: (page: string, id?: number) => void;
  events: EventItem[];
  posts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, events, posts }) => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Stats />
      <Philosophy />
      <Services onNavigate={onNavigate} />
      <EventBoard events={events} />
      <InternalBlog posts={posts} onNavigate={onNavigate} />
      <ContentHub />
      <CaseStudies onNavigate={onNavigate} />
      <About />
      <Contact />
    </div>
  );
};

export default Home;