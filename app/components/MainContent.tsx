import React from 'react';
import ModernButtons from './ModernButtons';
import DrinkMenu from './DrinkMenu';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <h1>Welcome to Our Café</h1>
      <p>Discover our amazing drinks and cozy atmosphere.</p>
      <ModernButtons />
      <DrinkMenu />
    </main>
  );
};

export default MainContent;