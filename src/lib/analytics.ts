// Google Analytics event tracking utility for Kitchaa's Enterprise

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Send a custom event to Google Analytics (GA4)
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        timestamp: new Date().toISOString(),
        ...params,
      });
      // In development mode, log to console for debugging
      if (import.meta.env.DEV) {
        console.log(`[GA4 Event] ${eventName}:`, params);
      }
    }
  } catch (err) {
    console.error('Error tracking GA4 event:', err);
  }
}

/**
 * Initialize automatic listeners for:
 * 1. Scrolling to the bottom (Footer/Consultation)
 * 2. Copying contact info (phone number / email)
 * 3. Clicking WhatsApp, Call, or Consultation buttons
 */
export function initAnalyticsListeners() {
  if (typeof window === 'undefined') return () => {};

  let bottomScrollTracked = false;

  // 1. Scroll tracking - Triggers when user reaches bottom 10% of the site
  const handleScroll = () => {
    if (bottomScrollTracked) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 200) {
      bottomScrollTracked = true;
      trackEvent('scroll_to_bottom', {
        scroll_percentage: Math.round(((scrollTop + windowHeight) / docHeight) * 100),
        page_location: window.location.href,
      });
    }
  };

  // 2. Copy detection - Triggers when someone copies phone number or email
  const handleCopy = () => {
    try {
      const selectedText = window.getSelection()?.toString().trim() || '';
      
      // Clean selected text to match phone number digits
      const digitsOnly = selectedText.replace(/\D/g, '');

      if (digitsOnly.includes('8344051846') || digitsOnly.includes('83440') || digitsOnly.includes('51846')) {
        trackEvent('copy_phone_number', {
          copied_text: selectedText,
          target: 'Er. Nirmal Phone Number',
          page_location: window.location.href,
        });
      } else if (selectedText.toLowerCase().includes('kitchaasenterprise@gmail.com') || selectedText.toLowerCase().includes('kitchaas')) {
        trackEvent('copy_email', {
          copied_text: selectedText,
          target: 'Email Address',
          page_location: window.location.href,
        });
      }
    } catch (e) {
      // Ignore clipboard read errors
    }
  };

  // 3. Click delegation for all contact buttons (WhatsApp, Phone Call, Consultation)
  const handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href') || '';
    const text = (target.textContent || '').trim().toLowerCase();

    // WhatsApp Clicks
    if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      trackEvent('click_contact', {
        channel: 'whatsapp',
        link_url: href,
        button_text: text.slice(0, 50),
      });
      return;
    }

    // Phone Call Clicks
    if (href.startsWith('tel:')) {
      trackEvent('click_contact', {
        channel: 'phone_call',
        phone_number: href.replace('tel:', ''),
        button_text: text.slice(0, 50),
      });
      return;
    }

    // Email Clicks
    if (href.startsWith('mailto:')) {
      trackEvent('click_contact', {
        channel: 'email',
        email: href.replace('mailto:', ''),
      });
      return;
    }

    // Consultation / Quote Request buttons
    if (
      text.includes('consultation') ||
      text.includes('quote') ||
      text.includes('book') ||
      text.includes('contact us')
    ) {
      trackEvent('click_consultation_button', {
        button_text: text.slice(0, 50),
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('copy', handleCopy);
  document.addEventListener('click', handleClick, { capture: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('copy', handleCopy);
    document.removeEventListener('click', handleClick, { capture: true });
  };
}

