import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AiTrainingPage from './components/AiTrainingPage';
import AiToolsPage from './components/AiToolsPage';
import DxConsultingPage from './components/DxConsultingPage';
import CaseStudyDetail from './components/CaseStudyDetail';
import Footer from './components/Footer';

// Data Types
import type { BlogPostListItem, EventListItem } from './types';
import { INITIAL_CASE_STUDIES } from './initialData';

interface AppProps {
  events: EventListItem[];
  posts: BlogPostListItem[];
}

const App: React.FC<AppProps> = ({ events, posts }) => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState<number | undefined>(undefined);

  const navigate = (page: string, id?: number) => {
    if (page === 'case-detail' && id) {
      setSelectedCaseId(id);
    }
    setCurrentRoute(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-light">
      <Navbar onNavigate={navigate} currentRoute={currentRoute} />
      
      <main>
        {currentRoute === 'home' && (
          <Home onNavigate={navigate} events={events} posts={posts} />
        )}
        {(currentRoute === 'hasshin' || currentRoute === 'ai-training') && <AiTrainingPage onNavigate={navigate} />}
        {(currentRoute === 'kyouyuu' || currentRoute === 'ai-tools') && <AiToolsPage onNavigate={navigate} />}
        {(currentRoute === 'jimu' || currentRoute === 'dx-consulting') && <DxConsultingPage onNavigate={navigate} />}

        {currentRoute === 'case-detail' && selectedCaseId && (
          <CaseStudyDetail id={selectedCaseId} cases={INITIAL_CASE_STUDIES} onNavigate={navigate} />
        )}
      </main>
      
      <Footer onNavigate={navigate} />
      
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
