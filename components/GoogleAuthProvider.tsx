import React from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

interface GoogleAuthProviderProps {
  onSuccess: (credentialResponse: any) => void;
  onError?: () => void;
  children: React.ReactNode;
}

export function GoogleAuthProvider({ onSuccess, onError, children }: GoogleAuthProviderProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      setIsLoaded(true);
      initializeGoogleAuth();
    };
    script.onerror = () => {
      console.error('Failed to load Google Identity Services');
      onError?.();
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initializeGoogleAuth = () => {
    if (window.google) {
      // TODO: Replace with your actual Google OAuth Client ID from Google Cloud Console
      // Get it from: https://console.cloud.google.com/apis/credentials
      const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";
      
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: onSuccess,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  };

  return (
    <GoogleAuthContext.Provider value={{ isLoaded, initializeGoogleAuth }}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

const GoogleAuthContext = React.createContext<{
  isLoaded: boolean;
  initializeGoogleAuth: () => void;
}>({
  isLoaded: false,
  initializeGoogleAuth: () => {},
});

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);