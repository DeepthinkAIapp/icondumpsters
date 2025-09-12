'use client';

import { useState } from 'react';
import ReCaptcha from './ReCaptcha';
import { track } from './analytics';
import Honeypot from './Honeypot';

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [spamDetected, setSpamDetected] = useState(false);
  const [showDirtConcreteOptions, setShowDirtConcreteOptions] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // Temporarily disabled spam detection for testing
    // if (spamDetected) {
    //   console.log('Spam detected - form submission blocked');
    //   return;
    // }

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Log all form data for debugging
    console.log('Form data:', {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      zipCode: formData.get('zipCode'),
      wasteType: formData.get('wasteType'),
      dumpsterSize: formData.get('dumpsterSize'),
      deliveryDate: formData.get('deliveryDate'),
      pickupDate: formData.get('pickupDate'),
      additionalInfo: formData.get('additionalInfo'),
      smsConsent: formData.get('smsConsent'),
    });
    
    // Basic validation
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    
    if (!email || !phone) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Form validation passed, starting submission');
    setIsSubmitting(true);
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
    }

    try {
      console.log('Preparing form data for submission');
      
      // Use FormData for faster submission
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.get('firstName') as string);
      formDataToSend.append('lastName', formData.get('lastName') as string);
      formDataToSend.append('email', email);
      formDataToSend.append('phone', phone);
      formDataToSend.append('zipCode', formData.get('zipCode') as string);
      formDataToSend.append('wasteType', formData.get('wasteType') as string);
      formDataToSend.append('dumpsterSize', formData.get('dumpsterSize') as string);
      formDataToSend.append('deliveryDate', formData.get('deliveryDate') as string);
      formDataToSend.append('pickupDate', formData.get('pickupDate') as string);
      formDataToSend.append('additionalInfo', formData.get('additionalInfo') as string);
      formDataToSend.append('smsConsent', formData.get('smsConsent') as string);

      // Submit to internal API (can forward to CRM/email provider)
      const leadResponse = await fetch('/api/lead', {
        method: 'POST',
        body: formDataToSend as any,
      });

      if (leadResponse.ok) {
        // Send text message if SMS consent was given
        const smsConsent = formData.get('smsConsent') as string;
        if (smsConsent) {
          const firstName = formData.get('firstName') as string;
          const dumpsterSize = formData.get('dumpsterSize') as string;
          const deliveryDate = formData.get('deliveryDate') as string;
          
          const message = `Hi ${firstName}! Thanks for your ${dumpsterSize} dumpster quote request for ${deliveryDate}. An Icon expert will text you within 30 minutes with your exact pricing and to schedule delivery. Reply STOP to opt out.`;
          
          try {
            await fetch('/api/sms', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                phone: phone.replace(/\D/g, ''),
                message,
                transcript: [
                  {
                    role: 'system',
                    content: `Quote form submission: ${firstName}, ${dumpsterSize} dumpster, ${deliveryDate}`
                  }
                ]
              })
            });
          } catch (smsError) {
            console.error('SMS sending failed:', smsError);
            // Don't fail the whole form if SMS fails
          }
        }
        
        alert('Thank you! Your quote request has been submitted successfully. Please check your email and phone for updates.');
        try { 
          track('form','quote_submit', {
            formType: 'quote',
            dumpsterSize: formData.get('dumpsterSize') as string,
            deliveryDate: formData.get('deliveryDate') as string,
            sessionId: sessionStorage.getItem('sessionId') || 'unknown',
            utm: JSON.parse(sessionStorage.getItem('utm') || '{}'),
            path: window.location.pathname,
            referrer: document.referrer
          }); 
        } catch {}
        form.reset();
        setRecaptchaToken('');
      } else {
        throw new Error('Lead submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Get Free Quote';
      }
    }
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    console.log('reCAPTCHA verified successfully');
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken('');
    console.log('reCAPTCHA expired');
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken('');
    console.log('reCAPTCHA error occurred');
  };

  const handleSpamDetected = () => {
    setSpamDetected(true);
    console.log('Spam detected in form');
  };

  return (
    <div id="quote-form" className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-[#4e37a8] to-purple-700 rounded-xl shadow-2xl p-4 md:p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Temporarily disabled honeypot for testing */}
        {/* <Honeypot onSpamDetected={handleSpamDetected} /> */}
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-semibold text-white mb-1 flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              Full Name
            </label>
            <input 
              type="text" 
              name="firstName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent transition-all duration-300 shadow-sm text-black text-sm placeholder-gray-500"
              placeholder="Your full name"
              required
            />
          </div>
        </div>
        
        {/* Contact Fields */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-semibold text-white mb-1 flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              Phone Number
            </label>
            <input 
              type="tel" 
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent transition-all duration-300 shadow-sm text-black text-sm placeholder-gray-500"
              placeholder="(801) 555-1234"
              required
            />
          </div>
        </div>
        
        {/* Location and Waste Type */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-semibold text-white mb-1 flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              Zip Code
            </label>
            <input 
              type="text" 
              name="zipCode"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent transition-all duration-300 shadow-sm text-black text-sm placeholder-gray-500"
              placeholder="84101"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-1 flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              Waste Type
            </label>
            <select name="wasteType" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent transition-all duration-300 shadow-sm text-black text-sm" required>
              <option value="">Select Waste Type</option>
              <option value="Household Waste">Household Waste</option>
              <option value="Construction Debris">Construction Debris</option>
              <option value="Yard Waste">Yard Waste</option>
              <option value="Recyclable Materials">Recyclable Materials</option>
              <option value="Concrete">Concrete</option>
              <option value="Other/Misc">Other/Misc</option>
            </select>
          </div>
        </div>
        
        {/* Dumpster Size Selection */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
            Dumpster Size
          </label>
          <div className="grid grid-cols-1 gap-2">
            <label className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:border-[#4e37a8] hover:bg-[#4e37a8]/5 transition-all duration-300">
              <input 
                type="radio" 
                name="dumpsterSize" 
                value="15" 
                className="text-[#4e37a8] focus:ring-[#4e37a8]" 
                required 
                onChange={() => setShowDirtConcreteOptions(false)}
              />
              <span className="text-xs font-medium text-gray-900">15 Yard Dumpster</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:border-[#4e37a8] hover:bg-[#4e37a8]/5 transition-all duration-300">
              <input 
                type="radio" 
                name="dumpsterSize" 
                value="20" 
                className="text-[#4e37a8] focus:ring-[#4e37a8]" 
                required 
                onChange={() => setShowDirtConcreteOptions(false)}
              />
              <span className="text-xs font-medium text-gray-900">20 Yard Dumpster</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:border-[#4e37a8] hover:bg-[#4e37a8]/5 transition-all duration-300">
              <input 
                type="radio" 
                name="dumpsterSize" 
                value="30" 
                className="text-[#4e37a8] focus:ring-[#4e37a8]" 
                required 
                onChange={() => setShowDirtConcreteOptions(false)}
              />
              <span className="text-xs font-medium text-gray-900">30 Yard Dumpster</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:border-[#4e37a8] hover:bg-[#4e37a8]/5 transition-all duration-300">
              <input 
                type="radio" 
                name="dumpsterSize" 
                value="dirt-concrete" 
                className="text-[#4e37a8] focus:ring-[#4e37a8]" 
                required 
                onChange={() => setShowDirtConcreteOptions(true)}
              />
              <span className="text-xs font-medium text-gray-900">Dirt/Concrete</span>
            </label>
          </div>
          
          {/* Dirt/Concrete Options Popup */}
          {showDirtConcreteOptions && (
            <div className="mt-3 p-3 bg-white rounded-lg border-2 border-[#4e37a8] shadow-lg">
              <p className="text-xs font-semibold text-gray-700 mb-2">Select your dirt/concrete option:</p>
              <div className="grid grid-cols-1 gap-2">
                <label className="flex items-center space-x-2 cursor-pointer p-2 bg-[#4e37a8] text-white rounded-lg border border-white transition-all duration-300">
                  <input 
                    type="radio" 
                    name="dumpsterSize" 
                    value="10-dirt" 
                    className="text-white focus:ring-white" 
                    required 
                  />
                  <span className="text-xs font-medium">10 Yard Clean Dirt</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-2 bg-[#4e37a8] text-white rounded-lg border border-white transition-all duration-300">
                  <input 
                    type="radio" 
                    name="dumpsterSize" 
                    value="10-mixed" 
                    className="text-white focus:ring-white" 
                    required 
                  />
                  <span className="text-xs font-medium">10 Yard Mixed Load</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer p-2 bg-[#4e37a8] text-white rounded-lg border border-white transition-all duration-300">
                  <input 
                    type="radio" 
                    name="dumpsterSize" 
                    value="12-concrete" 
                    className="text-white focus:ring-white" 
                    required 
                  />
                  <span className="text-xs font-medium">12 Yard Concrete</span>
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Date Selection */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-semibold text-white mb-1 flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              Delivery Date
            </label>
            <div className="relative">
              <input 
                type="date" 
                name="deliveryDate"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent transition-all duration-300 shadow-sm text-black text-sm cursor-pointer"
                required
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div>
          <label className="block text-sm font-semibold text-white mb-1 flex items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
            Additional Information
          </label>
          <textarea 
            name="additionalInfo"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent transition-all duration-300 shadow-sm text-black text-sm resize-none placeholder-gray-500"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>

        {/* SMS Consent Checkbox */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3">
          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              name="smsConsent"
              id="smsConsent"
              className="mt-0.5 text-white focus:ring-white rounded"
              required
            />
            <label htmlFor="smsConsent" className="text-xs text-white leading-relaxed">
              I agree to receive quote confirmations and updates via SMS. Message & data rates may apply. Reply STOP to opt out.
            </label>
          </div>
        </div>
        
        {/* reCAPTCHA */}
        <ReCaptcha 
          siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onVerify={handleRecaptchaVerify}
          onExpired={handleRecaptchaExpired}
          onError={handleRecaptchaError}
        />
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#4e37a8] to-purple-600 text-white py-2.5 rounded-lg hover:from-purple-600 hover:to-[#4e37a8] transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
        </button>
        </form>
      </div>
    </div>
  );
}
