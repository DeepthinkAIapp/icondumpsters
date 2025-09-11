'use client';

import { useState, useEffect } from 'react';

interface ClientStats {
  totalClients: number;
  clientsWithEmail: number;
  residentialClients: number;
  commercialClients: number;
  counties: string[];
  tags: string[];
}

interface BulkEmailForm {
  emailType: 'newsletter' | 'promotion' | 'follow_up' | 'seasonal' | 'review-request' | 'custom';
  subject: string;
  content: string;
  recipientMode: 'clients' | 'manual';
  manualEmails: string;
  filters: {
    clientType: 'all' | 'residential' | 'commercial';
    county: string;
    tags: string[];
    createdAfter: string;
    createdBefore: string;
  };
  schedule: {
    sendImmediately: boolean;
    scheduledTime: string;
  };
  customTemplate: boolean;
}

interface EmailResult {
  totalClients: number;
  emailsSent: number;
  emailsFailed: number;
  failedEmails: Array<{
    email: string;
    name: string;
    error: string;
  }>;
  batchResults: Array<{
    batchNumber: number;
    emailsSent: number;
    emailsFailed: number;
    failedEmails: any[];
  }>;
}

export default function BulkEmailOutreach() {
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<EmailResult | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('newsletter');
  const [debugInfo, setDebugInfo] = useState<string>('Component loaded');

  console.log('BulkEmailOutreach: Component rendering');
  
  const [form, setForm] = useState<BulkEmailForm>({
    emailType: 'newsletter',
    subject: '',
    content: '',
    recipientMode: 'clients',
    manualEmails: '',
    filters: {
      clientType: 'all',
      county: 'all',
      tags: [],
      createdAfter: '',
      createdBefore: ''
    },
    schedule: {
      sendImmediately: true,
      scheduledTime: ''
    },
    customTemplate: false
  });

  // Email templates
  const emailTemplates = {
    newsletter: {
      subject: "Icon Dumpsters Monthly Newsletter - {month} {year}",
      content: "newsletter_template"
    },
    promotion: {
      subject: "Limited Time Offer - Special Discount for You!",
      content: "promotion_template"
    },
    follow_up: {
      subject: "We'd love to serve you again - Icon Dumpsters",
      content: "follow_up_template"
    },
    seasonal: {
      subject: "Spring Cleaning? We've Got You Covered - Icon Dumpsters",
      content: "seasonal_template"
    },
    'review-request': {
      subject: "Thank you for choosing Icon Dumpsters!",
      content: "review_request_template"
    },
    custom: {
      subject: "",
      content: ""
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      console.log('BulkEmailOutreach: Loading stats...');
      setDebugInfo('Loading stats...');
      const response = await fetch('/api/bulk-email');
      const data = await response.json();
      console.log('BulkEmailOutreach: Stats response:', data);
      if (data.success) {
        setStats(data.stats);
        setDebugInfo(`Loaded ${data.stats.totalClients} clients`);
      } else {
        setDebugInfo('Failed to load stats');
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      setDebugInfo(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleTemplateChange = (templateType: string) => {
    setSelectedTemplate(templateType);
    const template = emailTemplates[templateType as keyof typeof emailTemplates];
    setForm(prev => ({
      ...prev,
      emailType: templateType as any,
      subject: template.subject,
      content: template.content,
      customTemplate: templateType === 'custom'
    }));
  };

  const sendBulkEmail = async () => {
    setSending(true);
    setResult(null);
    
    try {
      // Choose API endpoint based on recipient mode
      const apiEndpoint = form.recipientMode === 'manual' ? '/api/manual-email' : '/api/bulk-email';
      
      // Prepare request body based on mode
      const requestBody = form.recipientMode === 'manual' 
        ? {
            emailType: form.emailType,
            subject: form.subject,
            content: form.content,
            manualEmails: form.manualEmails,
            customTemplate: form.customTemplate
          }
        : form;
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data.results);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const parseManualEmails = (emailString: string): string[] => {
    if (!emailString.trim()) return [];
    
    // Split by comma, semicolon, or newline and clean up
    return emailString
      .split(/[,;\n]/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));
  };

  const getRecipientCount = () => {
    if (form.recipientMode === 'manual') {
      return parseManualEmails(form.manualEmails).length;
    }
    
    if (!stats) return 0;
    
    let count = stats.clientsWithEmail;
    
    if (form.filters.clientType !== 'all') {
      if (form.filters.clientType === 'residential') {
        count = Math.min(count, stats.residentialClients);
      } else if (form.filters.clientType === 'commercial') {
        count = Math.min(count, stats.commercialClients);
      }
    }
    
    if (form.filters.county !== 'all') {
      // This is an approximation - in a real implementation, you'd filter by county
      count = Math.floor(count * 0.3); // Assume 30% of clients are in selected county
    }
    
    return count;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4e37a8]"></div>
        <span className="ml-2">Loading email outreach tools...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bulk Email Outreach</h2>
        <p className="text-gray-600">Send targeted emails to your client base</p>
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
          <strong>Debug:</strong> {debugInfo}
        </div>
      </div>

      {/* Client Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Total Clients</h3>
            <p className="text-2xl font-bold text-blue-900">{stats.totalClients}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">With Email</h3>
            <p className="text-2xl font-bold text-green-900">{stats.clientsWithEmail}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Residential</h3>
            <p className="text-2xl font-bold text-purple-900">{stats.residentialClients}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-orange-800">Commercial</h3>
            <p className="text-2xl font-bold text-orange-900">{stats.commercialClients}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email Configuration */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Email Configuration</h3>
            
            {/* Template Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Template
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(emailTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => handleTemplateChange(key)}
                    className={`p-3 text-sm rounded-lg border ${
                      selectedTemplate === key
                        ? 'border-[#4e37a8] bg-[#4e37a8] text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Line */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Line
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => handleFormChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                placeholder="Enter email subject..."
              />
            </div>

            {/* Custom Content */}
            {form.customTemplate && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom HTML Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => handleFormChange('content', e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                  placeholder="Enter your custom HTML email content..."
                />
              </div>
            )}

            {/* Template Preview */}
            {!form.customTemplate && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Preview
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-600">
                    <strong>Subject:</strong> {form.subject}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Template:</strong> {form.emailType.charAt(0).toUpperCase() + form.emailType.slice(1).replace('_', ' ')} template will be used with personalization for each client.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Recipient Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recipients</h3>
            
            <div className="space-y-4">
              {/* Recipient Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send to
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recipientMode"
                      value="clients"
                      checked={form.recipientMode === 'clients'}
                      onChange={(e) => handleFormChange('recipientMode', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Client Database</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="recipientMode"
                      value="manual"
                      checked={form.recipientMode === 'manual'}
                      onChange={(e) => handleFormChange('recipientMode', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Manual Email List</span>
                  </label>
                </div>
              </div>

              {/* Manual Email Input */}
              {form.recipientMode === 'manual' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Addresses
                  </label>
                  <textarea
                    value={form.manualEmails}
                    onChange={(e) => handleFormChange('manualEmails', e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                    placeholder="Enter email addresses separated by commas, semicolons, or new lines:&#10;john@example.com&#10;jane@example.com&#10;bob@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple emails with commas, semicolons, or new lines. Valid emails will be automatically detected.
                  </p>
                  {form.manualEmails && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                      <strong>Preview:</strong> {parseManualEmails(form.manualEmails).length} valid email(s) detected
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Client Filters - Only show when using client database */}
          {form.recipientMode === 'clients' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Target Audience</h3>
            
            <div className="space-y-4">
              {/* Client Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Type
                </label>
                <select
                  value={form.filters.clientType}
                  onChange={(e) => handleFormChange('filters.clientType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                >
                  <option value="all">All Clients</option>
                  <option value="residential">Residential Only</option>
                  <option value="commercial">Commercial Only</option>
                </select>
              </div>

              {/* County Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  County
                </label>
                <select
                  value={form.filters.county}
                  onChange={(e) => handleFormChange('filters.county', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                >
                  <option value="all">All Counties</option>
                  {stats?.counties.map(county => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>

              {/* Date Range Filters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created After
                  </label>
                  <input
                    type="date"
                    value={form.filters.createdAfter}
                    onChange={(e) => handleFormChange('filters.createdAfter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created Before
                  </label>
                  <input
                    type="date"
                    value={form.filters.createdBefore}
                    onChange={(e) => handleFormChange('filters.createdBefore', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            </div>
          )}
        </div>

        {/* Send Configuration & Results */}
        <div className="space-y-6">
          {/* Send Configuration */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Send Configuration</h3>
            
            <div className="space-y-4">
              {/* Schedule Options */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={form.schedule.sendImmediately}
                    onChange={(e) => handleFormChange('schedule.sendImmediately', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Send immediately</span>
                </label>
              </div>

              {!form.schedule.sendImmediately && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Time
                  </label>
                  <input
                    type="datetime-local"
                    value={form.schedule.scheduledTime}
                    onChange={(e) => handleFormChange('schedule.scheduledTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4e37a8] focus:border-transparent"
                  />
                </div>
              )}

              {/* Estimated Recipients */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  {form.recipientMode === 'manual' ? 'Email Recipients' : 'Estimated Recipients'}
                </h4>
                <p className="text-2xl font-bold text-blue-900">{getRecipientCount()}</p>
                <p className="text-sm text-blue-600">
                  {form.recipientMode === 'manual' ? 'email(s) will receive this message' : 'clients will receive this email'}
                </p>
              </div>

              {/* Send Button */}
              <button
                onClick={sendBulkEmail}
                disabled={sending || !form.subject || getRecipientCount() === 0}
                className="w-full px-6 py-3 bg-[#4e37a8] text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Emails...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send to {getRecipientCount()} {form.recipientMode === 'manual' ? 'Emails' : 'Clients'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Send Results</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800">Emails Sent</h4>
                    <p className="text-2xl font-bold text-green-900">{result.emailsSent}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="text-sm font-medium text-red-800">Failed</h4>
                    <p className="text-2xl font-bold text-red-900">{result.emailsFailed}</p>
                  </div>
                </div>

                {result.failedEmails.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Failed Emails</h4>
                    <div className="max-h-32 overflow-y-auto">
                      {result.failedEmails.map((failed, index) => (
                        <div key={index} className="text-sm text-red-600 p-2 bg-red-50 rounded mb-1">
                          {failed.name} ({failed.email}): {failed.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Success Rate:</strong> {((result.emailsSent / result.totalClients) * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Total Recipients:</strong> {result.totalClients}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for Effective Email Outreach</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use personalization tokens like {'{firstName}'}, {'{city}'}, {'{county}'} in your content</li>
          <li>• Test with a small group first before sending to all clients</li>
          <li>• Keep subject lines under 50 characters for better open rates</li>
          <li>• Include a clear call-to-action in your emails</li>
          <li>• Respect unsubscribe requests and email preferences</li>
        </ul>
      </div>
    </div>
  );
}
