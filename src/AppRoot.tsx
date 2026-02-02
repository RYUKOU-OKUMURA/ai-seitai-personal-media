import React from 'react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const AppRoot: React.FC = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

export default AppRoot;
