# Docket Data Extraction Templates for KPI Tracking

## 📊 Standardized CSV Templates for Manual Data Export

### Template 1: Monthly Revenue Report
**Filename**: `monthly-revenue-YYYY-MM.csv`
**Export Frequency**: Monthly
**KPI Impact**: Monthly Revenue, ARPC, Revenue Growth

```csv
Date,CustomerName,DumpsterSize,RentalDuration,TotalAmount,PaymentStatus,ServiceType
2024-01-15,John Smith,20 Yard,7 days,450.00,Paid,Residential
2024-01-16,ABC Construction,30 Yard,14 days,650.00,Paid,Commercial
2024-01-17,Jane Doe,10 Yard,3 days,250.00,Pending,Residential
```

### Template 2: Active Rental Report
**Filename**: `active-rentals-YYYY-MM-DD.csv`
**Export Frequency**: Daily/Weekly
**KPI Impact**: Dumpster Utilization Rate

```csv
DumpsterID,DumpsterSize,CustomerName,StartDate,ExpectedEndDate,CurrentStatus,Location
D001,20 Yard,John Smith,2024-01-15,2024-01-22,Active,123 Main St
D002,30 Yard,ABC Construction,2024-01-10,2024-01-24,Active,456 Oak Ave
D003,10 Yard,Available,2024-01-01,2024-01-01,Available,Warehouse
```

### Template 3: Customer Transaction History
**Filename**: `customer-transactions-YYYY-MM.csv`
**Export Frequency**: Monthly
**KPI Impact**: Customer Lifetime Value, Retention Rate

```csv
CustomerID,CustomerName,TransactionDate,TransactionAmount,ServiceType,RentalDuration,DumpsterSize
C001,John Smith,2024-01-15,450.00,Residential,7 days,20 Yard
C001,John Smith,2024-02-01,380.00,Residential,5 days,15 Yard
C002,ABC Construction,2024-01-16,650.00,Commercial,14 days,30 Yard
```

### Template 4: New Customer Report
**Filename**: `new-customers-YYYY-MM.csv`
**Export Frequency**: Weekly
**KPI Impact**: Customer Acquisition Cost, Growth Rate

```csv
CustomerName,FirstRentalDate,InitialRentalAmount,DumpsterSize,Source,PhoneNumber,Email
John Smith,2024-01-15,450.00,20 Yard,Website,801-555-0123,john@email.com
Jane Doe,2024-01-17,250.00,10 Yard,Phone Call,801-555-0456,jane@email.com
```

### Template 5: Repeat Customer Report
**Filename**: `repeat-customers-YYYY-MM.csv`
**Export Frequency**: Monthly
**KPI Impact**: Customer Retention Rate

```csv
CustomerName,TotalRentals,FirstRentalDate,LastRentalDate,TotalRevenue,AverageRentalValue
John Smith,5,2023-06-15,2024-01-15,2100.00,420.00
ABC Construction,12,2023-01-10,2024-01-16,7800.00,650.00
```

### Template 6: Dumpster Size Performance
**Filename**: `dumpster-performance-YYYY-MM.csv`
**Export Frequency**: Monthly
**KPI Impact**: Product Mix Optimization

```csv
DumpsterSize,NumberOfRentals,TotalRevenue,AverageRentalDuration,UtilizationRate
10 Yard,25,6250.00,5.2 days,85%
15 Yard,30,11400.00,6.8 days,90%
20 Yard,40,18000.00,8.5 days,95%
30 Yard,15,9750.00,12.3 days,75%
```

### Template 7: Geographic Performance
**Filename**: `geographic-performance-YYYY-MM.csv`
**Export Frequency**: Monthly
**KPI Impact**: Market Expansion Decisions

```csv
ZipCode,City,NumberOfRentals,TotalRevenue,AverageRentalValue,CustomerCount
84000,Salt Lake City,45,20250.00,450.00,38
84001,Salt Lake City,32,14400.00,450.00,28
84002,Salt Lake City,28,12600.00,450.00,25
```

## 🔄 Data Import Process

### Step 1: Export from Docket
1. Log into Docket system
2. Navigate to Reports section
3. Export data in CSV format using templates above
4. Save with standardized filename

### Step 2: Data Validation
1. Check for missing data
2. Verify date formats (YYYY-MM-DD)
3. Ensure currency format ($XXX.XX)
4. Remove any duplicate entries

### Step 3: Import to KPI System
1. Upload CSV to KPI tracking system
2. Verify data accuracy
3. Update dashboard metrics
4. Generate performance reports

## 📅 Recommended Export Schedule

### Daily Exports
- **Active Rental Report**: Every morning to track utilization
- **Delivery/Pickup Schedule**: Daily for operational planning

### Weekly Exports
- **New Customer Report**: Every Monday
- **Revenue Summary**: Every Friday

### Monthly Exports
- **Complete Revenue Report**: 1st of each month
- **Customer Transaction History**: 1st of each month
- **Dumpster Performance**: 1st of each month
- **Geographic Performance**: 1st of each month
- **Repeat Customer Analysis**: 1st of each month

## 🛠️ Automation Options

### Option 1: Manual Export (Recommended to start)
- Export CSV files manually from Docket
- Upload to KPI system weekly
- Takes 15-30 minutes per week

### Option 2: Semi-Automated
- Set up scheduled reminders for exports
- Use Excel macros for data formatting
- Automated upload to KPI system

### Option 3: Full Automation (Future)
- Web scraping of Docket reports (if accessible)
- Automated data processing
- Real-time KPI updates

## 📊 Data Quality Checklist

Before importing data, verify:
- [ ] All required fields are present
- [ ] Date formats are consistent
- [ ] Currency amounts are properly formatted
- [ ] No duplicate entries
- [ ] Customer names are consistent
- [ ] Dumpster sizes are standardized
- [ ] All amounts are positive numbers

## 🎯 KPI Mapping

| Docket Report | Primary KPI | Secondary KPIs |
|---------------|-------------|----------------|
| Monthly Revenue | Monthly Revenue | ARPC, Growth Rate |
| Active Rentals | Utilization Rate | Fleet Efficiency |
| Customer Transactions | CLV, Retention | ARPC, Growth |
| New Customers | Acquisition Rate | Growth Rate |
| Repeat Customers | Retention Rate | CLV |
| Dumpster Performance | Product Mix | Utilization |
| Geographic Performance | Market Penetration | Growth Opportunities |

---

**Next Steps**: Start with Monthly Revenue and Active Rental reports, then gradually add other reports as you become comfortable with the process.
