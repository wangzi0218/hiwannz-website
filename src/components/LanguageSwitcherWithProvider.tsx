import React from 'react';
import { LanguageProvider, LanguageSwitcher } from './LanguageContext';

interface LanguageSwitcherWithProviderProps {
  className?: string;
}

export const LanguageSwitcherWithProvider: React.FC<LanguageSwitcherWithProviderProps> = ({ 
  className = 'flex items-center' 
}) => {
  return (
    <LanguageProvider>
      <LanguageSwitcher className={className} />
    </LanguageProvider>
  );
};

export default LanguageSwitcherWithProvider;
