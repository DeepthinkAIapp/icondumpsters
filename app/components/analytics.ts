'use client';

export type AnalyticsPayload = {
  type: string;
  name: string;
  meta?: Record<string, any>;
};

// Initialize session tracking
function initializeSession() {
  if (typeof window === 'undefined') return;
  
  // Generate or retrieve session ID
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
  }

  // Parse and store UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content')
  };

  // Only store if we have UTM parameters
  if (Object.values(utmParams).some(val => val)) {
    sessionStorage.setItem('utm', JSON.stringify(utmParams));
  }

  return { sessionId, utmParams };
}

export function track(type: string, name: string, meta?: Record<string, any>) {
  try {
    // Initialize session tracking
    const sessionData = initializeSession();
    
    // Prepare enhanced analytics data
    const analyticsData = {
      type,
      name,
      meta: {
        ...meta,
        sessionId: sessionData?.sessionId,
        utm: sessionData?.utmParams,
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
        timestamp: Date.now(),
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : ''
      }
    };

    // Google Analytics 4
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ 
      event: 'analytics', 
      ...analyticsData 
    });

    // Google Ads conversion tracking for quote submissions
    if (type === 'form' && name === 'quote_submit' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17497114208',
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': sessionData?.sessionId || 'unknown'
      });
    }

    // Google Ads conversion tracking for phone calls
    if (type === 'phone' && name === 'call_click' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17497114208',
        'value': 1.0,
        'currency': 'USD',
        'transaction_id': sessionData?.sessionId || 'unknown'
      });
    }

    // Custom analytics events
    (window as any).__analyticsEvents = (window as any).__analyticsEvents || [];
    (window as any).__analyticsEvents.push(analyticsData);
    window.dispatchEvent(new CustomEvent('analytics-event', { detail: analyticsData }));

    // Send to API
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyticsData),
      keepalive: true,
    });
  } catch (error) {
    console.debug('Analytics tracking failed:', error);
  }
}