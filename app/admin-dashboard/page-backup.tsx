"use client";

import { useEffect, useState } from 'react';
import InventoryManager from '../components/InventoryManager';
import SalesAnalyzer from '../components/SalesAnalyzer';

interface KPIData {
  revenue: number;
  rentals: number;
  utilization: number;
  websiteVisitors: number;
  quoteRequests: number;
  phoneCalls: number;
  conversionRate: number;
  customerSatisfaction: number;
}

interface KPITargets {
  monthlyRevenue: number;
  monthlyRentals: number;
  utilization: number;
  websiteVisitors: number;
  quoteRequests: number;
  phoneCalls: number;
  conversionRate: number;
  customerSatisfaction: number;
}

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [kpiData, setKpiData] = useState<KPIData>({
    revenue: 0,
    rentals: 0,
    utilization: 0,
    websiteVisitors: 0,
    quoteRequests: 0,
    phoneCalls: 0,
    conversionRate: 0,
    customerSatisfaction: 0
  });

  const [targets] = useState<KPITargets>({
    monthlyRevenue: 20000,
    monthlyRentals: 40,
    utilization: 75,
    websiteVisitors: 1500,
    quoteRequests: 75,
    phoneCalls: 150,
    conversionRate: 20,
    customerSatisfaction: 4.5
  });

  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualData, setManualData] = useState({
    totalRentals: 36,
    totalRevenue: 13875,
    activeRentals: 36,
    totalDumpsters: 44,
    customerSatisfaction: 4.5
  });

  const [inventoryData, setInventoryData] = useState({
    totalDumpsters: 44,
    availableDumpsters: 8,
    activeRentals: 36,
    utilizationRate: 81.8
  });

  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Set client-side flag and load data
  useEffect(() => {
    setIsClient(true);
    
    // Set correct values immediately
    setInventoryData({
      totalDumpsters: 44,
      availableDumpsters: 8,
      activeRentals: 36,
      utilizationRate: 81.8
    });

    setKpiData({
      revenue: 13875,
      rentals: 36,
      utilization: 81.8,
      websiteVisitors: 0,
      quoteRequests: 0,
      phoneCalls: 0,
      conversionRate: 0,
      customerSatisfaction: 4.5
    });

    // Try to load from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('iconDumpstersKPI');
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          // Handle both old and new data formats
          if (parsedData.metrics) {
            setKpiData(parsedData.metrics);
          } else {
            setKpiData(parsedData);
          }
        } catch (error) {
          console.error('Failed to load KPI data:', error);
        }
      }
    }
  }, []);


  // Auto-refresh KPI data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('iconDumpstersKPI');
        if (stored) {
          try {
            const parsedData = JSON.parse(stored);
            if (parsedData.metrics) {
              setKpiData(parsedData.metrics);
            } else {
              setKpiData(parsedData);
            }
            setLastRefresh(new Date());
          } catch (error) {
            console.error('Failed to refresh KPI data:', error);
          }
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setLastRefresh(new Date());
    
    // Reset to correct values
    setInventoryData({
      totalDumpsters: 44,
      availableDumpsters: 8,
      activeRentals: 36,
      utilizationRate: 81.8
    });

    setKpiData({
      revenue: 13875,
      rentals: 36,
      utilization: 81.8,
      websiteVisitors: 0,
      quoteRequests: 0,
      phoneCalls: 0,
      conversionRate: 0,
      customerSatisfaction: 4.5
    });

    // Store correct data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('iconDumpstersKPI', JSON.stringify({
        revenue: 13875,
        rentals: 36,
        utilization: 81.8,
        websiteVisitors: 0,
        quoteRequests: 0,
        phoneCalls: 0,
        conversionRate: 0,
        customerSatisfaction: 4.5
      }));
    }
  };

  const getStatus = (current: number, target: number) => {
    if (current >= target * 0.9) return '🟢';
    if (current >= target * 0.7) return '🟡';
    return '🔴';
  };

  const updateManualData = () => {
    if (typeof window !== 'undefined' && (window as any).updateKPI) {
      (window as any).updateKPI.rental(manualData.totalRentals, manualData.totalRevenue);
      (window as any).updateKPI.utilization(manualData.activeRentals, manualData.totalDumpsters);
      (window as any).updateKPI.satisfaction(manualData.customerSatisfaction);
      
      // Reload KPI data
      const stored = localStorage.getItem('iconDumpstersKPI');
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          // Handle both old and new data formats
          if (parsedData.metrics) {
            setKpiData(parsedData.metrics);
          } else {
            setKpiData(parsedData);
          }
        } catch (error) {
          console.error('Failed to reload KPI data:', error);
        }
      }
    }
  };

  const exportData = () => {
    if (typeof window !== 'undefined' && (window as any).updateKPI) {
      (window as any).updateKPI.export();
    }
  };

  const resetData = () => {
    if (confirm('Are you sure you want to reset all KPI data? This cannot be undone.')) {
      if (typeof window !== 'undefined' && (window as any).updateKPI) {
        (window as any).updateKPI.reset();
        setKpiData({
          revenue: 0,
          rentals: 0,
          utilization: 0,
          websiteVisitors: 0,
          quoteRequests: 0,
          phoneCalls: 0,
          conversionRate: 0,
          customerSatisfaction: 0
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Icon Dumpsters - Admin Dashboard</h1>
              <p className="text-gray-600">Administrative controls, data management, and system configuration</p>
              <p className="text-sm text-gray-500 mt-1">Last updated: {lastRefresh.toLocaleTimeString()}</p>
            </div>
            <button
              onClick={refreshData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              🔄 Refresh Data
            </button>
          </div>
          
          {/* Navigation Links */}
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="https://icondumpsters.com/scraper-dashboard"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              🕷️ Scraper Dashboard
            </a>
            <a
              href="https://icondumpsters.com/kpi-dashboard"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              📊 Analytics Dashboard
            </a>
            <a
              href="https://icondumpsters.com/inventory"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              📦 Inventory Management
            </a>
            <a
              href="https://icondumpsters.com/admin"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              🔐 Admin Login
            </a>
            <a
              href="https://icondumpsters.com/api-test"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              🧪 API Testing
            </a>
          </div>
        </div>

        {/* Admin Controls Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Administrative Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Data Management</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowManualEntry(!showManualEntry)}
                  className="w-full bg-[#4e37a8] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  {showManualEntry ? 'Hide' : 'Show'} Manual Entry
                </button>
                <button
                  onClick={exportData}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  📊 Export Data
                </button>
                <button
                  onClick={resetData}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  🗑️ Reset Data
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">System Testing</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).iconDumpstersKPI) {
                      (window as any).iconDumpstersKPI.trackQuoteRequest();
                      refreshData();
                    }
                  }}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  📝 Test Quote Request
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).iconDumpstersKPI) {
                      (window as any).iconDumpstersKPI.trackPhoneCall();
                      refreshData();
                    }
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  📞 Test Phone Call
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <a
                  href="https://icondumpsters.com/scraper-dashboard"
                  className="block w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm text-center"
                >
                  🕷️ Scraper Dashboard
                </a>
                <a
                  href="https://icondumpsters.com/inventory"
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm text-center"
                >
                  📦 Manage Inventory
                </a>
                <a
                  href="https://icondumpsters.com/kpi-dashboard"
                  className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm text-center"
                >
                  📊 View Analytics
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Manual Entry Form */}
        {showManualEntry && (
          <div className="bg-white rounded-xl shadow border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Manual Data Entry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Rentals (This Month)</label>
                <input
                  type="number"
                  value={manualData.totalRentals}
                  onChange={(e) => setManualData({...manualData, totalRentals: parseInt(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Revenue (This Month)</label>
                <input
                  type="number"
                  value={manualData.totalRevenue}
                  onChange={(e) => setManualData({...manualData, totalRevenue: parseInt(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Active Rentals (Currently Out)</label>
                <input
                  type="number"
                  value={manualData.activeRentals}
                  onChange={(e) => setManualData({...manualData, activeRentals: parseInt(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Dumpsters (Fleet Size)</label>
                <input
                  type="number"
                  value={manualData.totalDumpsters}
                  onChange={(e) => setManualData({...manualData, totalDumpsters: parseInt(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Satisfaction (Rating)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={manualData.customerSatisfaction}
                  onChange={(e) => setManualData({...manualData, customerSatisfaction: parseFloat(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={updateManualData}
                  className="w-full bg-[#4e37a8] text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Update Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key Performance Overview */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Key Performance Overview</h2>
            <a
              href="https://icondumpsters.com/kpi-dashboard"
              className="text-[#4e37a8] hover:text-purple-700 text-sm font-medium"
            >
              View Detailed Analytics →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-sm font-medium text-[#4e37a8] mb-1">Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">${kpiData.revenue.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Target: ${targets.monthlyRevenue.toLocaleString()}</p>
              <p className="text-lg mt-1">{getStatus(kpiData.revenue, targets.monthlyRevenue)}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-sm font-medium text-[#4e37a8] mb-1">Rentals</h3>
              <p className="text-2xl font-bold text-gray-900">{kpiData.rentals}</p>
              <p className="text-xs text-gray-600">Target: {targets.monthlyRentals}</p>
              <p className="text-lg mt-1">{getStatus(kpiData.rentals, targets.monthlyRentals)}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-sm font-medium text-[#4e37a8] mb-1">Utilization</h3>
              <p className="text-2xl font-bold text-gray-900">{kpiData.utilization.toFixed(1)}%</p>
              <p className="text-xs text-gray-600">Target: {targets.utilization}%</p>
              <p className="text-lg mt-1">{getStatus(kpiData.utilization, targets.utilization)}</p>
            </div>
            
            <div className="bg-white rounded-xl shadow border p-4">
              <h3 className="text-sm font-medium text-[#4e37a8] mb-1">Conversion</h3>
              <p className="text-2xl font-bold text-gray-900">{kpiData.conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-600">Target: {targets.conversionRate}%</p>
              <p className="text-lg mt-1">{getStatus(kpiData.conversionRate, targets.conversionRate)}</p>
            </div>
          </div>
        </div>

        {/* Sales Analysis */}
        <div className="mb-8">
          <SalesAnalyzer />
        </div>

        {/* Inventory Management */}
        <div className="mb-8">
          <InventoryManager />
        </div>

        {/* Status Legend */}
        <div className="mt-8 bg-white rounded-xl shadow border p-6">
          <h3 className="text-lg font-semibold mb-4">Status Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟢</span>
              <span className="text-sm text-gray-600">On track (90%+ of target)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟡</span>
              <span className="text-sm text-gray-600">Needs attention (70-89% of target)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔴</span>
              <span className="text-sm text-gray-600">Below target (&lt;70% of target)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
