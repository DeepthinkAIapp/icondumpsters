'use client';

import { useEffect } from 'react';

interface CustomerRental {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  rentalDate: string;
  dumpsterSize: string;
  pickupDate?: string;
  ratingRequested: boolean;
  ratingReceived: boolean;
  reviewRequested: boolean;
  reviewPosted: boolean;
  followUpEmailsSent: {
    ratingRequest: boolean;
    reviewRequest: boolean;
    reminder: boolean;
  };
}

export default function EmailFollowUpSystem() {
  useEffect(() => {
    initializeEmailSystem();
  }, []);

  const initializeEmailSystem = () => {
    // Check for new rentals that need follow-up
    checkForFollowUps();
    
    // Set up daily check for follow-ups
    const interval = setInterval(checkForFollowUps, 24 * 60 * 60 * 1000); // Daily
    
    return () => clearInterval(interval);
  };

  const checkForFollowUps = () => {
    const rentals = getCustomerRentals();
    const now = new Date();
    
    rentals.forEach(rental => {
      const rentalDate = new Date(rental.rentalDate);
      const daysSinceRental = (now.getTime() - rentalDate.getTime()) / (1000 * 3600 * 24);
      
      // Send rating request after 3 days
      if (daysSinceRental >= 3 && !rental.followUpEmailsSent.ratingRequest) {
        sendRatingRequestEmail(rental);
      }
      
      // Send review request after 7 days (if rating was good)
      if (daysSinceRental >= 7 && rental.ratingReceived && !rental.followUpEmailsSent.reviewRequest) {
        const rating = getCustomerRating(rental.id);
        if (rating && rating >= 4) {
          sendReviewRequestEmail(rental);
        }
      }
      
      // Send reminder after 14 days (if no response)
      if (daysSinceRental >= 14 && !rental.ratingReceived && !rental.followUpEmailsSent.reminder) {
        sendReminderEmail(rental);
      }
    });
  };

  const getCustomerRentals = (): CustomerRental[] => {
    const rentals = localStorage.getItem('customerRentals');
    return rentals ? JSON.parse(rentals) : [];
  };

  const getCustomerRating = (rentalId: string): number | null => {
    const ratings = localStorage.getItem('customerRatings');
    if (!ratings) return null;
    
    const ratingData = JSON.parse(ratings).find((r: any) => r.rentalId === rentalId);
    return ratingData ? ratingData.rating : null;
  };

  const sendRatingRequestEmail = (rental: CustomerRental) => {
    const emailContent = generateRatingRequestEmail(rental);
    
    // In production, this would integrate with your email service
    // For now, we'll simulate sending the email
    console.log('Sending rating request email:', emailContent);
    
    // Update rental record
    updateRentalFollowUp(rental.id, 'ratingRequest');
  };

  const sendReviewRequestEmail = (rental: CustomerRental) => {
    const emailContent = generateReviewRequestEmail(rental);
    
    console.log('Sending review request email:', emailContent);
    
    updateRentalFollowUp(rental.id, 'reviewRequest');
  };

  const sendReminderEmail = (rental: CustomerRental) => {
    const emailContent = generateReminderEmail(rental);
    
    console.log('Sending reminder email:', emailContent);
    
    updateRentalFollowUp(rental.id, 'reminder');
  };

  const generateRatingRequestEmail = (rental: CustomerRental) => {
    const ratingUrl = `${window.location.origin}/rating?rental=${rental.id}`;
    
    return `
      Subject: How was your Icon Dumpsters experience?

      Dear ${rental.customerName},

      Thank you for choosing Icon Dumpsters for your recent ${rental.dumpsterSize} dumpster rental!

      We hope everything went smoothly with your waste disposal project. Your feedback is incredibly valuable to us and helps us continue providing excellent service to our customers.

      Could you take a moment to rate your experience with us?

      [Rate Your Experience](${ratingUrl})

      Your feedback helps us:
      • Improve our services
      • Train our team better
      • Provide better customer experiences

      If you have any questions or concerns, please don't hesitate to contact us at (801) 918-6000 or icondumpsters@gmail.com.

      Thank you for your business!

      Best regards,
      The Icon Dumpsters Team

      ---
      Icon Dumpsters
      (801) 918-6000
      icondumpsters@gmail.com
      https://icondumpsters.com
      
      To opt out at any time, consumers can text STOP or CANCEL or QUIT to stop receiving messages.
    `;
  };

  const generateReviewRequestEmail = (rental: CustomerRental) => {
    const googleReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuQIYRoj6G_6U7LMA';
    const yelpReviewUrl = 'https://www.yelp.com/writeareview/biz/icon-dumpsters-salt-lake-city';
    const facebookReviewUrl = 'https://www.facebook.com/p/Icon-Dumpsters-61557014799828/';
    
    return `
      Subject: Share your Icon Dumpsters experience with others!

      Dear ${rental.customerName},

      Thank you for your positive feedback about your recent dumpster rental experience!

      We're thrilled that you had a great experience with Icon Dumpsters. Your review can help other customers in Utah make informed decisions about their waste management needs.

      Would you mind sharing your experience on one of these platforms?

      [Leave Google Review](${googleReviewUrl})
      [Leave Yelp Review](${yelpReviewUrl})
      [Leave Facebook Review](${facebookReviewUrl})

      💡 Bonus: Leave a review and get 10% off your next rental!

      Your review helps us:
      • Reach more customers in Utah
      • Build trust with potential clients
      • Continue providing excellent service

      Thank you for your support!

      Best regards,
      The Icon Dumpsters Team

      ---
      Icon Dumpsters
      (801) 918-6000
      icondumpsters@gmail.com
      https://icondumpsters.com
      
      To opt out at any time, consumers can text STOP or CANCEL or QUIT to stop receiving messages.
    `;
  };

  const generateReminderEmail = (rental: CustomerRental) => {
    const ratingUrl = `${window.location.origin}/rating?rental=${rental.id}`;
    
    return `
      Subject: Quick feedback request - Icon Dumpsters

      Dear ${rental.customerName},

      We hope you're enjoying the results of your recent dumpster rental project!

      We noticed you haven't had a chance to rate your experience with Icon Dumpsters yet. Your feedback is important to us and only takes a minute.

      [Rate Your Experience](${ratingUrl})

      If you have any concerns or questions about your rental, please contact us directly at (801) 918-6000.

      Thank you for choosing Icon Dumpsters!

      Best regards,
      The Icon Dumpsters Team

      ---
      Icon Dumpsters
      (801) 918-6000
      icondumpsters@gmail.com
      https://icondumpsters.com
      
      To opt out at any time, consumers can text STOP or CANCEL or QUIT to stop receiving messages.
    `;
  };

  const updateRentalFollowUp = (rentalId: string, emailType: 'ratingRequest' | 'reviewRequest' | 'reminder') => {
    const rentals = getCustomerRentals();
    const updatedRentals = rentals.map(rental => {
      if (rental.id === rentalId) {
        return {
          ...rental,
          followUpEmailsSent: {
            ...rental.followUpEmailsSent,
            [emailType]: true
          }
        };
      }
      return rental;
    });
    
    localStorage.setItem('customerRentals', JSON.stringify(updatedRentals));
  };

  const addNewRental = (rentalData: Omit<CustomerRental, 'id' | 'ratingRequested' | 'ratingReceived' | 'reviewRequested' | 'reviewPosted' | 'followUpEmailsSent'>) => {
    const newRental: CustomerRental = {
      ...rentalData,
      id: generateRentalId(),
      ratingRequested: false,
      ratingReceived: false,
      reviewRequested: false,
      reviewPosted: false,
      followUpEmailsSent: {
        ratingRequest: false,
        reviewRequest: false,
        reminder: false
      }
    };

    const rentals = getCustomerRentals();
    rentals.push(newRental);
    localStorage.setItem('customerRentals', JSON.stringify(rentals));
  };

  const generateRentalId = (): string => {
    return 'rental_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const getEmailStats = () => {
    const rentals = getCustomerRentals();
    
    return {
      totalRentals: rentals.length,
      ratingRequestsSent: rentals.filter(r => r.followUpEmailsSent.ratingRequest).length,
      ratingsReceived: rentals.filter(r => r.ratingReceived).length,
      reviewRequestsSent: rentals.filter(r => r.followUpEmailsSent.reviewRequest).length,
      reviewsPosted: rentals.filter(r => r.reviewPosted).length,
      remindersSent: rentals.filter(r => r.followUpEmailsSent.reminder).length
    };
  };

  // Add functions to window for external access
  if (typeof window !== 'undefined') {
    (window as any).addCustomerRental = addNewRental;
    (window as any).getEmailFollowUpStats = getEmailStats;
  }

  return null; // This component doesn't render anything visible
}
