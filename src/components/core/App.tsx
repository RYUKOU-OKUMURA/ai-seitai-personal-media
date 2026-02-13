import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Home from '../pages/Home';
import AiTrainingPage from '../pages/AiTrainingPage';
import AiToolsPage from '../pages/AiToolsPage';
import DxConsultingPage from '../pages/DxConsultingPage';
import CaseStudyDetail from '../features/CaseStudyDetail';
import Footer from '../common/Footer';

// Data Types
import type { BlogPostListItem, EventListItem } from '../../types/core';
import { INITIAL_CASE_STUDIES } from '../../data/initialData';

interface AppProps {
  events: EventListItem[];
  posts: BlogPostListItem[];
}

const App: React.FC<AppProps> = ({ events, posts }) => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState<number | undefined>(undefined);

  const navigate = (page: string, id?: number) => {
    if (page === 'contact') {
      setCurrentRoute('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
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
    </div>
  );
};

export default App;
