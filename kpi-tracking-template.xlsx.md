# Icon Dumpsters - KPI Tracking Template (Excel Structure)

## 📊 Sheet 1: Monthly Dashboard

### Revenue Tracking
| Metric | January | February | March | Target | Status |
|--------|---------|----------|-------|--------|--------|
| Total Revenue | $0 | $0 | $0 | $20,000 | 🔴 |
| Number of Rentals | 0 | 0 | 0 | 40 | 🔴 |
| Average Rental Price | $0 | $0 | $0 | $400 | 🔴 |
| Revenue Growth Rate | 0% | 0% | 0% | 15% | 🔴 |

### Operational Metrics
| Metric | January | February | March | Target | Status |
|--------|---------|----------|-------|--------|--------|
| Dumpster Utilization | 0% | 0% | 0% | 75% | 🔴 |
| Average Rental Duration | 0 days | 0 days | 0 days | 10 days | 🔴 |
| Turnaround Time | 0 hours | 0 hours | 0 hours | 24 hours | 🔴 |
| Customer Satisfaction | 0.0 | 0.0 | 0.0 | 4.5+ | 🔴 |

### Marketing Metrics
| Metric | January | February | March | Target | Status |
|--------|---------|----------|-------|--------|--------|
| Website Visitors | 0 | 0 | 0 | 1,500 | 🔴 |
| Quote Requests | 0 | 0 | 0 | 75 | 🔴 |
| Phone Calls | 0 | 0 | 0 | 150 | 🔴 |
| Lead Conversion Rate | 0% | 0% | 0% | 20% | 🔴 |

## 📈 Sheet 2: Weekly Tracking

### Week 1-4 Tracking
| Week | Revenue | Rentals | Utilization | Calls | Quotes | Conversion |
|------|---------|---------|-------------|-------|--------|------------|
| Week 1 | $0 | 0 | 0% | 0 | 0 | 0% |
| Week 2 | $0 | 0 | 0% | 0 | 0 | 0% |
| Week 3 | $0 | 0 | 0% | 0 | 0 | 0% |
| Week 4 | $0 | 0 | 0% | 0 | 0 | 0% |

### Weekly Targets
| Metric | Weekly Target | Monthly Target |
|--------|---------------|----------------|
| Revenue | $5,000 | $20,000 |
| Rentals | 10 | 40 |
| Phone Calls | 35 | 150 |
| Quote Requests | 18 | 75 |

## 🎯 Sheet 3: Customer Tracking

### Customer Database
| Customer ID | Name | Phone | Email | First Rental | Total Rentals | Total Spent | Last Rental | Status |
|-------------|------|-------|-------|-------------|---------------|-------------|-------------|--------|
| C001 | | | | | 0 | $0 | | New |
| C002 | | | | | 0 | $0 | | New |

### Customer Metrics
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Total Customers | 0 | 100 | 🔴 |
| Repeat Customers | 0 | 20 | 🔴 |
| Customer Retention Rate | 0% | 20% | 🔴 |
| Average Customer Value | $0 | $2,400 | 🔴 |

## 📱 Sheet 4: Digital Marketing

### SEO Rankings
| Keyword | Current Rank | Target Rank | Status |
|---------|--------------|-------------|--------|
| dumpster rental | 0 | Top 10 | 🔴 |
| roll-off dumpster | 0 | Top 10 | 🔴 |
| dumpster rental near me | 0 | Top 5 | 🔴 |
| utah dumpster rental | 0 | Top 3 | 🔴 |
| dumpster rental utah | 0 | Top 3 | 🔴 |

### Website Performance
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Page Load Speed | 0s | <3s | 🔴 |
| Bounce Rate | 0% | <50% | 🔴 |
| Time on Site | 0s | >2min | 🔴 |
| Mobile Score | 0% | 100% | 🔴 |

## 💰 Sheet 5: Financial Tracking

### Revenue Breakdown
| Dumpster Size | Price | Rentals | Revenue | % of Total |
|---------------|-------|---------|---------|------------|
| 15-yard | $300 | 0 | $0 | 0% |
| 20-yard | $400 | 0 | $0 | 0% |
| 30-yard | $500 | 0 | $0 | 0% |
| **Total** | | **0** | **$0** | **100%** |

### Expense Tracking
| Category | Monthly Budget | Actual | Variance |
|----------|----------------|--------|----------|
| Marketing | $1,000 | $0 | $1,000 |
| Operations | $2,000 | $0 | $2,000 |
| Equipment | $1,500 | $0 | $1,500 |
| **Total** | **$4,500** | **$0** | **$4,500** |

## 📊 Excel Formulas for Automation

### Revenue Calculations
```excel
// Monthly Revenue Growth Rate
=IF(B2=0,0,(B2-A2)/A2)

// Average Rental Price
=IF(B3=0,0,B2/B3)

// Lead Conversion Rate
=IF(B8=0,0,B7/B8*100)
```

### Operational Calculations
```excel
// Dumpster Utilization
=IF(TotalDumpsters=0,0,ActiveRentals/TotalDumpsters*100)

// Customer Retention Rate
=IF(TotalCustomers=0,0,RepeatCustomers/TotalCustomers*100)

// Average Customer Value
=IF(TotalCustomers=0,0,TotalRevenue/TotalCustomers)
```

### Status Indicators
```excel
// Status Formula (Green/Yellow/Red)
=IF(B2>=Target*0.9,"🟢",IF(B2>=Target*0.7,"🟡","🔴"))
```

## 📅 Sheet 6: Action Items

### Weekly Action Items
| Week | Priority | Action Item | Assigned To | Due Date | Status |
|------|----------|-------------|-------------|----------|--------|
| Week 1 | High | Set up Google Analytics | | | 🔴 |
| Week 1 | High | Implement call tracking | | | 🔴 |
| Week 2 | Medium | Create customer feedback system | | | 🔴 |
| Week 2 | Medium | Set up SEO monitoring | | | 🔴 |

### Monthly Goals
| Month | Revenue Goal | Customer Goal | Marketing Goal |
|-------|--------------|---------------|----------------|
| Month 1 | $15,000 | 25 customers | 1,000 visitors |
| Month 2 | $18,000 | 35 customers | 1,200 visitors |
| Month 3 | $22,000 | 50 customers | 1,500 visitors |

## 🚀 Implementation Checklist

### Week 1 Setup
- [ ] Download and customize this template
- [ ] Set up Google Analytics on website
- [ ] Implement call tracking system
- [ ] Create customer database
- [ ] Set up weekly review calendar

### Week 2 Implementation
- [ ] Begin daily data entry
- [ ] Set up automated reporting
- [ ] Create customer feedback system
- [ ] Implement SEO monitoring
- [ ] Schedule first weekly review

### Week 3 Optimization
- [ ] Review first week of data
- [ ] Adjust targets based on baseline
- [ ] Implement improvement strategies
- [ ] Set up monthly reporting
- [ ] Plan marketing initiatives

---

**Instructions for Use:**
1. Copy this structure into Excel or Google Sheets
2. Customize targets based on your specific goals
3. Enter data daily/weekly as indicated
4. Use formulas to automate calculations
5. Review weekly and adjust strategies accordingly
