import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface Story {
  id: string;
  title: string;
  subtitle?: string;
  backgroundColor: string;
  textColor: string;
  emoji: string;
  ctaText?: string;
}

interface StoriesSectionProps {
  stories: Story[];
  onStoryClick: (storyId: string) => void;
}

export function StoriesSection({ stories, onStoryClick }: StoriesSectionProps) {
  const [activeStory, setActiveStory] = React.useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleStoryOpen = (storyId: string) => {
    const index = stories.findIndex(story => story.id === storyId);
    setCurrentIndex(index);
    setActiveStory(storyId);
  };

  const handleClose = () => {
    setActiveStory(null);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % stories.length;
    setCurrentIndex(nextIndex);
    setActiveStory(stories[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? stories.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setActiveStory(stories[prevIndex].id);
  };

  const currentStory = stories[currentIndex];

  return (
    <>
      {/* Stories Row */}
      <div className="flex gap-3 px-6 py-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => handleStoryOpen(story.id)}
            className="flex-shrink-0 w-16 h-16 rounded-full relative overflow-hidden hover-scale"
            style={{ backgroundColor: story.backgroundColor }}
          >
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {story.emoji}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </button>
        ))}
      </div>

      {/* Full Screen Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black animate-fade-in">
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {stories.map((_, index) => (
              <div 
                key={index}
                className={`flex-1 h-0.5 rounded-full ${
                  index === currentIndex ? 'bg-white' : 
                  index < currentIndex ? 'bg-white/60' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Story Content */}
          <div 
            className="w-full h-full flex items-center justify-center relative"
            style={{ backgroundColor: currentStory.backgroundColor }}
          >
            <div className="text-center px-8">
              <div className="text-6xl mb-6">
                {currentStory.emoji}
              </div>
              <h1 
                className="text-3xl font-bold mb-3"
                style={{ color: currentStory.textColor }}
              >
                {currentStory.title}
              </h1>
              {currentStory.subtitle && (
                <p 
                  className="text-lg opacity-90 mb-8"
                  style={{ color: currentStory.textColor }}
                >
                  {currentStory.subtitle}
                </p>
              )}
              {currentStory.ctaText && (
                <Button 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                  style={{ color: currentStory.textColor }}
                >
                  {currentStory.ctaText}
                </Button>
              )}
            </div>

            {/* Navigation areas */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-0 w-1/3 h-full flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-0 top-0 w-1/3 h-full flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Tap areas for mobile */}
            <div 
              className="absolute left-0 top-12 w-1/2 h-full cursor-pointer"
              onClick={handlePrev}
            />
            <div 
              className="absolute right-0 top-12 w-1/2 h-full cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>
      )}
    </>
  );
}