import React from 'react';
import App from './App';
import ErrorBoundary from '../common/ErrorBoundary';
import type { BlogPostListItem, EventListItem } from '../../types/core';

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
