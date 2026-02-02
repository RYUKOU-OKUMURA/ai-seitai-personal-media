import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AiTrainingPage from './components/AiTrainingPage';
import AiToolsPage from './components/AiToolsPage';
import DxConsultingPage from './components/DxConsultingPage';
import BlogDetailPage from './components/BlogDetailPage';
import CaseStudyDetail from './components/CaseStudyDetail';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

// Data Types
import { EventItem, BlogPost } from './types';
import { INITIAL_EVENTS, INITIAL_BLOG_POSTS, INITIAL_CASE_STUDIES } from './initialData';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(undefined);
  const [selectedCaseId, setSelectedCaseId] = useState<number | undefined>(undefined);

  // Manage Data State Here (Simulating a Database)
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  const navigate = (page: string, id?: number) => {
    if (page === 'blog-detail' && id) {
      setSelectedBlogId(id);
    }
    if (page === 'case-detail' && id) {
      setSelectedCaseId(id);
    }
    setCurrentRoute(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Hide Navbar on Admin Page */}
      {currentRoute !== 'admin' && <Navbar onNavigate={navigate} currentRoute={currentRoute} />}
      
      <main>
        {currentRoute === 'home' && (
          <Home onNavigate={navigate} events={events} posts={blogPosts} />
        )}
        {currentRoute === 'ai-training' && <AiTrainingPage onNavigate={navigate} />}
        {currentRoute === 'ai-tools' && <AiToolsPage onNavigate={navigate} />}
        {currentRoute === 'dx-consulting' && <DxConsultingPage onNavigate={navigate} />}
        
        {currentRoute === 'blog-detail' && selectedBlogId && (
          <BlogDetailPage id={selectedBlogId} posts={blogPosts} onNavigate={navigate} />
        )}

        {currentRoute === 'case-detail' && selectedCaseId && (
          <CaseStudyDetail id={selectedCaseId} cases={INITIAL_CASE_STUDIES} onNavigate={navigate} />
        )}

        {currentRoute === 'admin' && (
          <AdminDashboard 
            events={events} 
            posts={blogPosts} 
            onUpdateEvents={setEvents}
            onUpdatePosts={setBlogPosts}
            onNavigate={navigate} 
          />
        )}
      </main>
      
      {/* Hide Footer on Admin Page */}
      {currentRoute !== 'admin' && <Footer onNavigate={navigate} />}
      
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;