'use client';

import PWAInstall from '@khmyznikov/pwa-install/react-legacy';
import { PWAInstallElement } from '@khmyznikov/pwa-install';
import { useEffect, useRef, useState } from 'react';

const appName = 'My App';

declare global {
  interface Window {
    promptEvent: any;
  }
}

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [promptEvent, setPromptEvent] = useState(null);
  const pwaInstallRef = useRef<PWAInstallElement>(null);

  // externalPromptEvent is only if your app is big and slow to start
  // check index.html for additional code.
  // https://github.com/khmyznikov/pwa-install?tab=readme-ov-file#async-mode
  useEffect(() => {
    let lastPromptEvent = window.promptEvent;

    const intervalId = setInterval(() => {
      if (window.promptEvent !== lastPromptEvent) {
        lastPromptEvent = window.promptEvent;
        setPromptEvent(window.promptEvent);
      }
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (pwaInstallRef.current) {
      pwaInstallRef.current.addEventListener('pwa-install-available', (event: any) => {
        console.log(event);
      });
      pwaInstallRef.current?.showDialog(true);
    }
  }, []);

  return (
    <div>
      {children}
      <PWAInstall
        ref={pwaInstallRef}
        name={appName}
        icon={'/next.svg'}
        externalPromptEvent={promptEvent}
        onPwaInstallAvailableEvent={(event) => console.log(event)}
      />
    </div>
  );
};

export default ClientLayout;