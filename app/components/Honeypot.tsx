'use client';

import { useEffect, useRef } from 'react';

interface HoneypotProps {
  onSpamDetected: () => void;
}

export default function Honeypot({ onSpamDetected }: HoneypotProps) {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const emailConfirmRef = useRef<HTMLInputElement>(null);
  const phoneConfirmRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if multiple honeypot fields are filled (more likely to be a bot)
    const checkHoneypot = () => {
      const websiteFilled = honeypotRef.current && honeypotRef.current.value;
      const emailFilled = emailConfirmRef.current && emailConfirmRef.current.value;
      const phoneFilled = phoneConfirmRef.current && phoneConfirmRef.current.value;
      
      // Only trigger if multiple honeypot fields are filled (typical bot behavior)
      const filledCount = [websiteFilled, emailFilled, phoneFilled].filter(Boolean).length;
      
      if (filledCount >= 2) {
        console.log('Multiple honeypot fields filled - likely spam');
        onSpamDetected();
        return false;
      }
      return true;
    };

    // Add event listener to form submission
    const form = honeypotRef.current?.closest('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        if (!checkHoneypot()) {
          e.preventDefault();
          return false;
        }
      });
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', checkHoneypot);
      }
    };
  }, [onSpamDetected]);

  return (
    <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none">
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        id="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <input
        ref={emailConfirmRef}
        type="email"
        name="email_confirm"
        id="email_confirm"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <input
        ref={phoneConfirmRef}
        type="tel"
        name="phone_confirm"
        id="phone_confirm"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}