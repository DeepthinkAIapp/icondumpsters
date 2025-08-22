/**
 * Icon Dumpsters - KPI Tracking System
 * Automated tracking for key business metrics
 */

class IconDumpstersKPI {
    constructor() {
        this.metrics = {
            revenue: 0,
            rentals: 0,
            utilization: 0,
            websiteVisitors: 0,
            quoteRequests: 0,
            phoneCalls: 0,
            conversionRate: 0,
            customerSatisfaction: 0
        };
        
        this.targets = {
            monthlyRevenue: 20000,
            monthlyRentals: 40,
            utilization: 75,
            websiteVisitors: 1500,
            quoteRequests: 75,
            phoneCalls: 150,
            conversionRate: 20,
            customerSatisfaction: 4.5
        };
        
        this.init();
    }

    init() {
        this.loadStoredData();
        this.setupEventListeners();
        this.startTracking();
        this.updateDashboard();
    }

    // Load data from localStorage
    loadStoredData() {
        const stored = localStorage.getItem('iconDumpstersKPI');
        if (stored) {
            this.metrics = { ...this.metrics, ...JSON.parse(stored) };
        }
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('iconDumpstersKPI', JSON.stringify(this.metrics));
    }

    // Setup event listeners for tracking
    setupEventListeners() {
        // Track quote form submissions
        const quoteForm = document.querySelector('form[action*="formspree"]');
        if (quoteForm) {
            quoteForm.addEventListener('submit', () => {
                this.trackQuoteRequest();
            });
        }

        // Track phone number clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackPhoneCall();
            });
        });

        // Track page views
        this.trackPageView();
    }

    // Track quote form submissions
    trackQuoteRequest() {
        this.metrics.quoteRequests++;
        this.calculateConversionRate();
        this.saveData();
        this.updateDashboard();
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_request', {
                'event_category': 'engagement',
                'event_label': 'dumpster_rental_quote'
            });
        }
    }

    // Track phone calls
    trackPhoneCall() {
        this.metrics.phoneCalls++;
        this.saveData();
        this.updateDashboard();
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_call', {
                'event_category': 'engagement',
                'event_label': 'dumpster_rental_call'
            });
        }
    }

    // Track page views
    trackPageView() {
        this.metrics.websiteVisitors++;
        this.saveData();
        this.updateDashboard();
    }

    // Calculate conversion rate
    calculateConversionRate() {
        if (this.metrics.quoteRequests > 0) {
            this.metrics.conversionRate = (this.metrics.rentals / this.metrics.quoteRequests) * 100;
        }
    }

    // Update rental data (manual entry)
    updateRentalData(rentals, revenue) {
        this.metrics.rentals = rentals;
        this.metrics.revenue = revenue;
        this.calculateConversionRate();
        this.saveData();
        this.updateDashboard();
    }

    // Update utilization rate
    updateUtilization(activeRentals, totalDumpsters = 20) {
        this.metrics.utilization = (activeRentals / totalDumpsters) * 100;
        this.saveData();
        this.updateDashboard();
    }

    // Update customer satisfaction
    updateCustomerSatisfaction(rating) {
        this.metrics.customerSatisfaction = rating;
        this.saveData();
        this.updateDashboard();
    }

    // Get status indicator
    getStatus(current, target) {
        if (current >= target * 0.9) return '🟢';
        if (current >= target * 0.7) return '🟡';
        return '🔴';
    }

    // Update dashboard display
    updateDashboard() {
        const dashboard = document.getElementById('kpi-dashboard');
        if (!dashboard) return;

        dashboard.innerHTML = `
            <div class="kpi-grid">
                <div class="kpi-card">
                    <h3>Revenue</h3>
                    <p class="kpi-value">$${this.metrics.revenue.toLocaleString()}</p>
                    <p class="kpi-target">Target: $${this.targets.monthlyRevenue.toLocaleString()}</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.revenue, this.targets.monthlyRevenue)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Rentals</h3>
                    <p class="kpi-value">${this.metrics.rentals}</p>
                    <p class="kpi-target">Target: ${this.targets.monthlyRentals}</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.rentals, this.targets.monthlyRentals)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Utilization</h3>
                    <p class="kpi-value">${this.metrics.utilization.toFixed(1)}%</p>
                    <p class="kpi-target">Target: ${this.targets.utilization}%</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.utilization, this.targets.utilization)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Website Visitors</h3>
                    <p class="kpi-value">${this.metrics.websiteVisitors}</p>
                    <p class="kpi-target">Target: ${this.targets.websiteVisitors}</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.websiteVisitors, this.targets.websiteVisitors)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Quote Requests</h3>
                    <p class="kpi-value">${this.metrics.quoteRequests}</p>
                    <p class="kpi-target">Target: ${this.targets.quoteRequests}</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.quoteRequests, this.targets.quoteRequests)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Phone Calls</h3>
                    <p class="kpi-value">${this.metrics.phoneCalls}</p>
                    <p class="kpi-target">Target: ${this.targets.phoneCalls}</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.phoneCalls, this.targets.phoneCalls)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Conversion Rate</h3>
                    <p class="kpi-value">${this.metrics.conversionRate.toFixed(1)}%</p>
                    <p class="kpi-target">Target: ${this.targets.conversionRate}%</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.conversionRate, this.targets.conversionRate)}</p>
                </div>
                
                <div class="kpi-card">
                    <h3>Customer Satisfaction</h3>
                    <p class="kpi-value">${this.metrics.customerSatisfaction.toFixed(1)}</p>
                    <p class="kpi-target">Target: ${this.targets.customerSatisfaction}+</p>
                    <p class="kpi-status">${this.getStatus(this.metrics.customerSatisfaction, this.targets.customerSatisfaction)}</p>
                </div>
            </div>
        `;
    }

    // Generate KPI report
    generateReport() {
        const report = {
            date: new Date().toISOString(),
            metrics: this.metrics,
            targets: this.targets,
            performance: {}
        };

        // Calculate performance percentages
        Object.keys(this.metrics).forEach(key => {
            if (this.targets[key]) {
                report.performance[key] = (this.metrics[key] / this.targets[key]) * 100;
            }
        });

        return report;
    }

    // Export data
    exportData() {
        const report = this.generateReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `icon-dumpsters-kpi-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Reset monthly data
    resetMonthlyData() {
        this.metrics = {
            revenue: 0,
            rentals: 0,
            utilization: 0,
            websiteVisitors: 0,
            quoteRequests: 0,
            phoneCalls: 0,
            conversionRate: 0,
            customerSatisfaction: 0
        };
        this.saveData();
        this.updateDashboard();
    }

    // Start automatic tracking
    startTracking() {
        // Track time on site
        let startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeOnSite = (Date.now() - startTime) / 1000;
            if (timeOnSite > 30) { // Only count if user spent more than 30 seconds
                this.metrics.websiteVisitors++;
                this.saveData();
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
        });
    }
}

// Initialize KPI tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.iconDumpstersKPI = new IconDumpstersKPI();
});

// Admin functions for manual data entry
window.updateKPI = {
    rental: (rentals, revenue) => {
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.updateRentalData(rentals, revenue);
        }
    },
    
    utilization: (activeRentals, totalDumpsters) => {
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.updateUtilization(activeRentals, totalDumpsters);
        }
    },
    
    satisfaction: (rating) => {
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.updateCustomerSatisfaction(rating);
        }
    },
    
    export: () => {
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.exportData();
        }
    },
    
    reset: () => {
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.resetMonthlyData();
        }
    }
};

// CSS for KPI dashboard
const kpiStyles = `
<style>
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 2rem 0;
}

.kpi-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.kpi-card h3 {
    color: #4e37a8;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.kpi-value {
    font-size: 2rem;
    font-weight: bold;
    color: #1f2937;
    margin: 0.5rem 0;
}

.kpi-target {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0.25rem 0;
}

.kpi-status {
    font-size: 1.5rem;
    margin: 0.5rem 0 0 0;
}

@media (max-width: 768px) {
    .kpi-grid {
        grid-template-columns: 1fr;
    }
    
    .kpi-card {
        padding: 1rem;
    }
    
    .kpi-value {
        font-size: 1.5rem;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', kpiStyles);
