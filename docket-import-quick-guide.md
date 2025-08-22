# Docket Import Quick Guide - Icon Dumpsters KPI System

## 🚀 Quick Start (5 Minutes)

### Step 1: Export from Docket
1. Log into your Docket system
2. Navigate to Reports section
3. Export the report you want to import
4. Save as CSV file with descriptive name (e.g., `monthly-revenue-2024-01.csv`)

### Step 2: Import to KPI Dashboard
1. Go to `https://icondumpsters.com/admin`
2. Enter password: `IconDumpsters2024!`
3. Click "Show Docket Import" button
4. Select the report type from dropdown
5. Upload your CSV file
6. Click "Import Data"

### Step 3: Verify Results
- Check the status message for confirmation
- View updated KPIs in the dashboard
- Export data if needed for further analysis

## 📊 Supported Report Types

### 1. **Monthly Revenue** (Most Important)
- **When to use**: Monthly financial reporting
- **KPI Impact**: Revenue, Rentals, ARPC
- **Required Columns**: Date, CustomerName, DumpsterSize, RentalDuration, TotalAmount, PaymentStatus, ServiceType

### 2. **Active Rentals** (Daily/Weekly)
- **When to use**: Track current utilization
- **KPI Impact**: Utilization Rate
- **Required Columns**: DumpsterID, DumpsterSize, CustomerName, StartDate, ExpectedEndDate, CurrentStatus, Location

### 3. **Customer Transactions** (Monthly)
- **When to use**: Customer analysis and retention
- **KPI Impact**: CLV, Retention Rate
- **Required Columns**: CustomerID, CustomerName, TransactionDate, TransactionAmount, ServiceType, RentalDuration, DumpsterSize

### 4. **New Customers** (Weekly)
- **When to use**: Track growth and acquisition
- **KPI Impact**: Growth Rate, Acquisition Cost
- **Required Columns**: CustomerName, FirstRentalDate, InitialRentalAmount, DumpsterSize, Source, PhoneNumber, Email

### 5. **Repeat Customers** (Monthly)
- **When to use**: Customer retention analysis
- **KPI Impact**: Retention Rate, CLV
- **Required Columns**: CustomerName, TotalRentals, FirstRentalDate, LastRentalDate, TotalRevenue, AverageRentalValue

### 6. **Dumpster Performance** (Monthly)
- **When to use**: Product mix optimization
- **KPI Impact**: Utilization by size, Revenue optimization
- **Required Columns**: DumpsterSize, NumberOfRentals, TotalRevenue, AverageRentalDuration, UtilizationRate

### 7. **Geographic Performance** (Monthly)
- **When to use**: Market expansion decisions
- **KPI Impact**: Market penetration, Growth opportunities
- **Required Columns**: ZipCode, City, NumberOfRentals, TotalRevenue, AverageRentalValue, CustomerCount

## 📅 Recommended Import Schedule

### Daily Imports
- **Active Rentals**: Every morning to track current utilization

### Weekly Imports
- **New Customers**: Every Monday to track growth
- **Monthly Revenue**: Every Friday for weekly revenue tracking

### Monthly Imports
- **All Reports**: 1st of each month for comprehensive analysis

## 🔧 CSV Format Requirements

### Date Format
- Use: `YYYY-MM-DD` (e.g., 2024-01-15)
- Avoid: `MM/DD/YYYY` or `DD-MM-YYYY`

### Currency Format
- Use: `450.00` (no dollar signs or commas)
- Avoid: `$450.00` or `450,00`

### Percentage Format
- Use: `75.5` (decimal format)
- Avoid: `75.5%` or `75,5`

### Text Fields
- No special characters in column headers
- Use underscores for spaces: `Customer_Name` instead of `Customer Name`

## 🚨 Common Issues & Solutions

### Issue: "Error: Invalid CSV format"
**Solution**: 
- Check that first row contains column headers
- Ensure no empty rows at the beginning
- Verify all required columns are present

### Issue: "Successfully imported 0 records"
**Solution**:
- Check that CSV has data rows (not just headers)
- Verify date format is correct
- Ensure currency amounts are numeric

### Issue: "Unsupported report type"
**Solution**:
- Select the correct report type from dropdown
- Verify CSV columns match the selected report type

### Issue: KPI dashboard not updating
**Solution**:
- Refresh the page after import
- Check browser console for errors
- Verify CSV data is valid

## 📈 Data Quality Checklist

Before importing, verify your CSV has:
- [ ] Correct column headers (exact match required)
- [ ] No empty rows at top or bottom
- [ ] Consistent date format (YYYY-MM-DD)
- [ ] Numeric values for amounts (no $ or commas)
- [ ] No special characters in headers
- [ ] At least one data row (not just headers)

## 🎯 Best Practices

### 1. **Start with Monthly Revenue**
- This is the most important report
- Updates your main revenue and rental KPIs
- Use this first to get comfortable with the process

### 2. **Use Consistent File Naming**
- Format: `report-type-YYYY-MM.csv`
- Examples:
  - `monthly-revenue-2024-01.csv`
  - `active-rentals-2024-01-15.csv`
  - `new-customers-2024-01.csv`

### 3. **Import in Order of Priority**
1. Monthly Revenue (updates main KPIs)
2. Active Rentals (updates utilization)
3. Customer Transactions (updates retention)
4. Other reports as needed

### 4. **Verify Data After Import**
- Check KPI dashboard for updates
- Export data to verify calculations
- Compare with Docket totals

### 5. **Keep Backups**
- Save original CSV files
- Export KPI data regularly
- Document any data discrepancies

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Verify CSV format matches requirements
3. Try importing a small test file
4. Contact support with error message and CSV sample

## 🎉 Success Metrics

After successful implementation, you should see:
- ✅ Automated KPI updates from Docket data
- ✅ Reduced manual data entry time
- ✅ More accurate and timely reporting
- ✅ Better data-driven decision making
- ✅ Improved operational efficiency

---

**Remember**: Start simple with Monthly Revenue reports, then gradually add other report types as you become comfortable with the process.
