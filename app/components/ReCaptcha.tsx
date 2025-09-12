'use client';

import { useEffect, useRef } from 'react';

interface ReCaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpired: () => void;
  onError: () => void;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: string | HTMLElement, options: any) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
    };
  }
}

export default function ReCaptcha({ siteKey, onVerify, onExpired, onError }: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const renderedRef = useRef<boolean>(false);

  useEffect(() => {
    // Prevent multiple renders
    if (renderedRef.current) {
      return;
    }

    // Wait for grecaptcha to be available
    const checkGrecaptcha = () => {
      if (window.grecaptcha && containerRef.current && !renderedRef.current) {
        window.grecaptcha.ready(() => {
          if (containerRef.current && !renderedRef.current) {
            try {
              widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
                sitekey: siteKey,
                callback: onVerify,
                'expired-callback': onExpired,
                'error-callback': onError,
                theme: 'light',
                size: 'normal',
              });
              renderedRef.current = true;
              console.log('reCAPTCHA rendered successfully');
            } catch (error) {
              console.log('reCAPTCHA already rendered, skipping');
            }
          }
        });
      } else if (!renderedRef.current) {
        // Retry after a short delay
        setTimeout(checkGrecaptcha, 100);
      }
    };

    // Start checking for grecaptcha
    setTimeout(checkGrecaptcha, 1000);
  }, [siteKey, onVerify, onExpired, onError]);

  return (
    <div className="mt-4">
      <div ref={containerRef} className="flex justify-center" />
      <p className="text-xs text-gray-500 mt-2 text-center">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </div>
  );
}