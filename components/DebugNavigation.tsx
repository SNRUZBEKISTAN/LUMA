import React from 'react';

interface DebugNavigationProps {
  currentScreen: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DebugNavigation({ currentScreen, activeTab, onTabChange }: DebugNavigationProps) {
  const testTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'orders', label: 'Orders' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'profile', label: 'Profile' },
  ];

  const [showDebug, setShowDebug] = React.useState(true);

  return (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 z-50">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">Debug Navigation</h3>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
          >
            {showDebug ? 'Hide' : 'Show'}
          </button>
        </div>

        {showDebug && (
          <>
            <p className="mb-2">
              Current Screen: <span className="text-yellow-300">{currentScreen}</span>
            </p>
            <p className="mb-4">
              Active Tab: <span className="text-green-300">{activeTab}</span>
            </p>
            
            <div className="flex gap-2 flex-wrap mb-4">
              {testTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-600 pt-3 mt-3">
              <p className="text-sm font-semibold mb-2">Quick Links:</p>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="/#backendDemo"
                  className="px-3 py-1 rounded text-sm bg-purple-600 text-white hover:bg-purple-500"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = 'backendDemo';
                    window.location.reload();
                  }}
                >
                  🔧 Backend Demo
                </a>
              </div>
            </div>
            
            <p className="text-xs mt-3 text-gray-300">
              Click any tab above to test navigation. This debug overlay will be removed in production.
            </p>
          </>
        )}
      </div>
    </div>
  );
}