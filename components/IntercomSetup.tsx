'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Define the type for the Intercom function on the window object
type WindowWithIntercom = Window & typeof globalThis & {
  Intercom: (...args: any[]) => void;
  intercomSettings?: Record<string, any>;
};

export function IntercomSetup() {
  const appId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

  useEffect(() => {
    // Basic initialization function, can be expanded later (e.g., with user data)
    if (appId && typeof window !== 'undefined') {
      (window as WindowWithIntercom).intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: appId,
        // Add other settings like name, email for logged-in users if needed later
      };

      // Function to ensure Intercom object exists before calling methods
      const intercom = (...args: any[]) => {
        (window as WindowWithIntercom).Intercom.apply(null, args);
      };

      if (!(window as WindowWithIntercom).Intercom) {
        (window as WindowWithIntercom).Intercom = intercom;
      }

      // You can call Intercom methods here if needed on initial load, e.g.:
      // (window as WindowWithIntercom).Intercom('update');
    }
  }, [appId]);

  if (!appId) {
    console.warn('Intercom App ID (NEXT_PUBLIC_INTERCOM_APP_ID) is not set. Intercom will not load.');
    return null; // Don't load the script if the App ID is missing
  }

  // Construct the Intercom script source URL
  const intercomScriptSrc = `https://widget.intercom.io/widget/${appId}`;

  return (
    <Script 
      id="intercom-script" 
      src={intercomScriptSrc} 
      strategy="lazyOnload" // Load after page is interactive
      onLoad={() => {
        console.log('Intercom script loaded successfully.');
        // Trigger an update in case settings were set before script loaded
        if (typeof window !== 'undefined' && (window as WindowWithIntercom).Intercom) {
          (window as WindowWithIntercom).Intercom('boot', (window as WindowWithIntercom).intercomSettings);
        }
      }}
      onError={(e) => {
        console.error('Failed to load Intercom script:', e);
      }}
    />
  );
} 