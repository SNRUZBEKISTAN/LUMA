import React, { useState, useEffect } from 'react';
import { Sparkles, Edit, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  {
    id: 1,
    text: "Опиши стиль или событие",
    icon: <Edit className="w-4 h-4" />,
    input: "",
    showInput: false
  },
  {
    id: 2,
    text: "Образ на летний вечер",
    icon: <Edit className="w-4 h-4" />,
    input: "Образ на летний вечер",
    showInput: true
  },
  {
    id: 3,
    text: "AI подбирает образы",
    icon: <Zap className="w-4 h-4" />,
    input: "",
    showInput: false
  },
  {
    id: 4,
    text: "Готовые образы для тебя",
    icon: <Sparkles className="w-4 h-4" />,
    input: "",
    showInput: false
  }
];

const mockResults = [
  { name: "На свидание", color: "bg-gradient-to-r from-pink-400 to-rose-400" },
  { name: "Для офиса", color: "bg-gradient-to-r from-blue-400 to-cyan-400" },
  { name: "Для прогулки", color: "bg-gradient-to-r from-green-400 to-emerald-400" }
];

export function AIGuideAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % (steps.length + 1);
        if (nextStep === 0) {
          setShowResults(false);
          setTypingText("");
        }
        return nextStep;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentStep === 1) {
      // Typing animation for step 2
      const text = "Образ на летний вечер";
      let index = 0;
      setTypingText("");
      
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypingText(prev => prev + text[index]);
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    } else if (currentStep === 3) {
      // Show results
      setTimeout(() => setShowResults(true), 500);
    }
  }, [currentStep]);

  return (
    <div className="w-full h-24 bg-gradient-to-r from-[#A260EF]/10 to-[#FF6D9D]/10 rounded-2xl p-2 overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <AnimatePresence mode="wait">
          {currentStep < steps.length && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-2"
            >
              {/* Icon */}
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] text-white flex items-center justify-center mb-1"
                animate={currentStep === 2 ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                } : {}}
                transition={{ 
                  duration: 1, 
                  repeat: currentStep === 2 ? Infinity : 0,
                  repeatType: "loop"
                }}
              >
                <div className="w-3 h-3">
                  {steps[currentStep]?.icon}
                </div>
              </motion.div>

              {/* Text */}
              <div className="text-center">
                {currentStep === 1 ? (
                  <div className="text-xs font-medium text-gray-700">
                    <span className="text-gray-400 text-xs">{steps[0].text}</span>
                    <div className="mt-1 p-1.5 bg-white rounded-lg border border-gray-200 min-w-[140px]">
                      <span className="text-gray-900 text-xs">{typingText}</span>
                      <span className="animate-pulse">|</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-medium text-gray-700">
                    {steps[currentStep]?.text}
                  </p>
                )}
              </div>

              {/* AI Wave Animation */}
              {currentStep === 2 && (
                <motion.div
                  className="flex space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Results Animation */}
          {currentStep === 3 && showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-3"
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] text-white flex items-center justify-center mb-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3" />
              </motion.div>

              <p className="text-xs font-medium text-gray-700 mb-1">
                Готовые образы для тебя
              </p>

              <div className="flex space-x-1">
                {mockResults.map((result, index) => (
                  <motion.div
                    key={result.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3
                    }}
                    className={`px-2 py-0.5 ${result.color} text-white text-xs font-medium rounded-full shadow-sm`}
                  >
                    {result.name}
                  </motion.div>
                ))}
              </div>

              {/* Arrow pointing to action */}
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex items-center text-xs text-gray-500 mt-1"
              >
                <span className="text-xs">Выбери образ</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="ml-1 text-xs"
                >
                  →
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AIGuideAnimation;