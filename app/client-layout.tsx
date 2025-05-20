'use client'

import { useEffect } from 'react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error))
    }
    
    // PWA installation prompt handler
    let deferredPrompt: any;
    const installButton = document.createElement('button');
    installButton.style.display = 'none';
    installButton.textContent = 'Install App';
    
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      installButton.style.display = 'block';

      installButton.addEventListener('click', () => {
        // Hide the install button
        installButton.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult: {outcome: string}) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null;
        });
      });
    });

    // Check if the app is already installed
    window.addEventListener('appinstalled', (evt) => {
      // Log app installed
      console.log('App was installed', evt);
    });
  }, [])

  return (
    <>
      {children}
    </>
  )
}