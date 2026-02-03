import React from 'react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import type { BlogPostListItem, EventListItem } from './types';

interface AppRootProps {
  events: EventListItem[];
  posts: BlogPostListItem[];
}

const AppRoot: React.FC<AppRootProps> = ({ events, posts }) => {
  return (
    <ErrorBoundary>
      <App events={events} posts={posts} />
    </ErrorBoundary>
  );
};

export default AppRoot;
