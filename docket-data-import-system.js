/**
 * Icon Dumpsters - Docket Data Import System
 * Processes CSV exports from Docket system and updates KPI tracking
 */

class DocketDataImporter {
    constructor() {
        this.supportedReports = {
            'monthly-revenue': this.processMonthlyRevenue,
            'active-rentals': this.processActiveRentals,
            'customer-transactions': this.processCustomerTransactions,
            'new-customers': this.processNewCustomers,
            'repeat-customers': this.processRepeatCustomers,
            'dumpster-performance': this.processDumpsterPerformance,
            'geographic-performance': this.processGeographicPerformance
        };
        
        this.dataCache = {
            revenue: [],
            rentals: [],
            customers: [],
            utilization: {}
        };
        
        this.init();
    }

    init() {
        this.setupFileUpload();
        this.loadCachedData();
    }

    // Setup file upload interface
    setupFileUpload() {
        const uploadContainer = document.getElementById('docket-upload-container');
        if (!uploadContainer) return;

        uploadContainer.innerHTML = `
            <div class="upload-section">
                <h3>Import Docket Data</h3>
                <div class="upload-form">
                    <label for="report-type">Report Type:</label>
                    <select id="report-type">
                        <option value="monthly-revenue">Monthly Revenue</option>
                        <option value="active-rentals">Active Rentals</option>
                        <option value="customer-transactions">Customer Transactions</option>
                        <option value="new-customers">New Customers</option>
                        <option value="repeat-customers">Repeat Customers</option>
                        <option value="dumpster-performance">Dumpster Performance</option>
                        <option value="geographic-performance">Geographic Performance</option>
                    </select>
                    
                    <label for="csv-file">CSV File:</label>
                    <input type="file" id="csv-file" accept=".csv" />
                    
                    <button onclick="docketImporter.importFile()">Import Data</button>
                </div>
                
                <div class="import-status" id="import-status"></div>
            </div>
        `;
    }

    // Import CSV file
    async importFile() {
        const fileInput = document.getElementById('csv-file');
        const reportType = document.getElementById('report-type').value;
        const statusDiv = document.getElementById('import-status');

        if (!fileInput.files[0]) {
            this.showStatus('Please select a CSV file', 'error');
            return;
        }

        const file = fileInput.files[0];
        this.showStatus('Processing file...', 'info');

        try {
            const csvText = await this.readFile(file);
            const data = this.parseCSV(csvText);
            
            if (this.supportedReports[reportType]) {
                const result = await this.supportedReports[reportType](data);
                this.showStatus(`Successfully imported ${result.count} records`, 'success');
                this.updateKPIs();
            } else {
                this.showStatus('Unsupported report type', 'error');
            }
        } catch (error) {
            this.showStatus(`Error: ${error.message}`, 'error');
        }
    }

    // Read file content
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    // Parse CSV content
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(v => v.trim());
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }

        return data;
    }

    // Process Monthly Revenue data
    async processMonthlyRevenue(data) {
        let totalRevenue = 0;
        let totalRentals = 0;
        const monthlyData = {};

        data.forEach(row => {
            const amount = parseFloat(row.TotalAmount) || 0;
            const date = new Date(row.Date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            totalRevenue += amount;
            totalRentals++;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { revenue: 0, rentals: 0 };
            }
            monthlyData[monthKey].revenue += amount;
            monthlyData[monthKey].rentals++;
        });

        // Update KPI system
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.updateRentalData(totalRentals, totalRevenue);
        }

        // Cache data
        this.dataCache.revenue.push({
            date: new Date().toISOString(),
            totalRevenue,
            totalRentals,
            monthlyData
        });

        this.saveCachedData();

        return { count: data.length, revenue: totalRevenue, rentals: totalRentals };
    }

    // Process Active Rentals data
    async processActiveRentals(data) {
        let activeRentals = 0;
        const dumpsterCounts = {};

        data.forEach(row => {
            if (row.CurrentStatus === 'Active') {
                activeRentals++;
                const size = row.DumpsterSize;
                dumpsterCounts[size] = (dumpsterCounts[size] || 0) + 1;
            }
        });

        // Update KPI system
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.updateUtilization(activeRentals, 20); // Assuming 20 total dumpsters
        }

        // Cache data
        this.dataCache.utilization = {
            date: new Date().toISOString(),
            activeRentals,
            totalDumpsters: 20,
            utilizationRate: (activeRentals / 20) * 100,
            dumpsterCounts
        };

        this.saveCachedData();

        return { count: data.length, activeRentals, utilizationRate: (activeRentals / 20) * 100 };
    }

    // Process Customer Transactions data
    async processCustomerTransactions(data) {
        const customerData = {};
        let totalRevenue = 0;

        data.forEach(row => {
            const customerId = row.CustomerID;
            const amount = parseFloat(row.TransactionAmount) || 0;

            if (!customerData[customerId]) {
                customerData[customerId] = {
                    name: row.CustomerName,
                    transactions: [],
                    totalRevenue: 0,
                    rentalCount: 0
                };
            }

            customerData[customerId].transactions.push({
                date: row.TransactionDate,
                amount: amount,
                duration: row.RentalDuration,
                size: row.DumpsterSize
            });

            customerData[customerId].totalRevenue += amount;
            customerData[customerId].rentalCount++;
            totalRevenue += amount;
        });

        // Calculate CLV and retention metrics
        const customers = Object.values(customerData);
        const repeatCustomers = customers.filter(c => c.rentalCount > 1).length;
        const retentionRate = (repeatCustomers / customers.length) * 100;
        const averageCLV = customers.reduce((sum, c) => sum + c.totalRevenue, 0) / customers.length;

        // Cache data
        this.dataCache.customers.push({
            date: new Date().toISOString(),
            customerData,
            totalRevenue,
            retentionRate,
            averageCLV
        });

        this.saveCachedData();

        return { 
            count: data.length, 
            totalCustomers: customers.length,
            repeatCustomers,
            retentionRate,
            averageCLV
        };
    }

    // Process New Customers data
    async processNewCustomers(data) {
        const newCustomers = data.length;
        const totalRevenue = data.reduce((sum, row) => sum + (parseFloat(row.InitialRentalAmount) || 0), 0);

        // Cache data
        this.dataCache.customers.push({
            date: new Date().toISOString(),
            type: 'new',
            count: newCustomers,
            totalRevenue
        });

        this.saveCachedData();

        return { count: newCustomers, totalRevenue };
    }

    // Process Repeat Customers data
    async processRepeatCustomers(data) {
        const repeatCustomers = data.length;
        const totalRevenue = data.reduce((sum, row) => sum + (parseFloat(row.TotalRevenue) || 0), 0);

        // Cache data
        this.dataCache.customers.push({
            date: new Date().toISOString(),
            type: 'repeat',
            count: repeatCustomers,
            totalRevenue
        });

        this.saveCachedData();

        return { count: repeatCustomers, totalRevenue };
    }

    // Process Dumpster Performance data
    async processDumpsterPerformance(data) {
        const performanceData = {};

        data.forEach(row => {
            const size = row.DumpsterSize;
            performanceData[size] = {
                rentals: parseInt(row.NumberOfRentals) || 0,
                revenue: parseFloat(row.TotalRevenue) || 0,
                avgDuration: parseFloat(row.AverageRentalDuration) || 0,
                utilization: parseFloat(row.UtilizationRate) || 0
            };
        });

        // Cache data
        this.dataCache.dumpsterPerformance = {
            date: new Date().toISOString(),
            performanceData
        };

        this.saveCachedData();

        return { count: data.length, performanceData };
    }

    // Process Geographic Performance data
    async processGeographicPerformance(data) {
        const geographicData = {};

        data.forEach(row => {
            const zipCode = row.ZipCode;
            geographicData[zipCode] = {
                city: row.City,
                rentals: parseInt(row.NumberOfRentals) || 0,
                revenue: parseFloat(row.TotalRevenue) || 0,
                avgRentalValue: parseFloat(row.AverageRentalValue) || 0,
                customerCount: parseInt(row.CustomerCount) || 0
            };
        });

        // Cache data
        this.dataCache.geographicPerformance = {
            date: new Date().toISOString(),
            geographicData
        };

        this.saveCachedData();

        return { count: data.length, geographicData };
    }

    // Update KPIs after data import
    updateKPIs() {
        if (window.iconDumpstersKPI) {
            window.iconDumpstersKPI.updateDashboard();
        }
    }

    // Show import status
    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('import-status');
        if (statusDiv) {
            statusDiv.innerHTML = `<div class="status-${type}">${message}</div>`;
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }
    }

    // Save cached data
    saveCachedData() {
        localStorage.setItem('docketDataCache', JSON.stringify(this.dataCache));
    }

    // Load cached data
    loadCachedData() {
        const cached = localStorage.getItem('docketDataCache');
        if (cached) {
            this.dataCache = { ...this.dataCache, ...JSON.parse(cached) };
        }
    }

    // Generate summary report
    generateSummaryReport() {
        const report = {
            date: new Date().toISOString(),
            revenue: this.dataCache.revenue,
            utilization: this.dataCache.utilization,
            customers: this.dataCache.customers,
            dumpsterPerformance: this.dataCache.dumpsterPerformance,
            geographicPerformance: this.dataCache.geographicPerformance
        };

        return report;
    }

    // Export all cached data
    exportAllData() {
        const report = this.generateSummaryReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `docket-data-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Clear all cached data
    clearAllData() {
        this.dataCache = {
            revenue: [],
            rentals: [],
            customers: [],
            utilization: {}
        };
        localStorage.removeItem('docketDataCache');
        this.showStatus('All cached data cleared', 'info');
    }
}

// Initialize Docket Data Importer
document.addEventListener('DOMContentLoaded', () => {
    window.docketImporter = new DocketDataImporter();
});

// CSS for upload interface
const uploadStyles = `
<style>
.upload-section {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.upload-section h3 {
    color: #4e37a8;
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.upload-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}

.upload-form label {
    font-weight: 600;
    color: #374151;
}

.upload-form select,
.upload-form input[type="file"] {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 1rem;
}

.upload-form button {
    background: #4e37a8;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.upload-form button:hover {
    background: #3d2d7a;
}

.import-status {
    margin-top: 1rem;
}

.status-success {
    color: #059669;
    background: #d1fae5;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #a7f3d0;
}

.status-error {
    color: #dc2626;
    background: #fee2e2;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #fecaca;
}

.status-info {
    color: #2563eb;
    background: #dbeafe;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #bfdbfe;
}

@media (max-width: 768px) {
    .upload-section {
        padding: 1rem;
    }
    
    .upload-form {
        gap: 0.75rem;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', uploadStyles);
