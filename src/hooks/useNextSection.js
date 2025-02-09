import { useEffect, useState } from 'react';

export const useNextSection = (currentSectionId) => {
  const [adjacentSections, setAdjacentSections] = useState({
    next: null,
    previous: null
  });

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const currentIndex = Array.from(sections).findIndex(
      section => section.id === currentSectionId
    );
    
    setAdjacentSections({
      next: currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null,
      previous: currentIndex > 0 ? sections[currentIndex - 1] : null
    });
  }, [currentSectionId]);

  const scrollToNext = () => {
    if (adjacentSections.next) {
      adjacentSections.next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPrevious = () => {
    if (adjacentSections.previous) {
      adjacentSections.previous.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    hasNext: !!adjacentSections.next,
    hasPrevious: !!adjacentSections.previous,
    scrollToNext,
    scrollToPrevious
  };
}; 