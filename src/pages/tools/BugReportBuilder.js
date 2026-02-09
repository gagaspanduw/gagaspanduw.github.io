import React, { useState, useEffect } from 'react';

const BugReportBuilder = () => {
    const [formData, setFormData] = useState({
        title: '',
        environment: '',
        severity: 'Medium',
        priority: 'Medium',
        stepsToReproduce: '',
        expectedResult: '',
        actualResult: '',
        additionalInfo: ''
    });

    const [savedReports, setSavedReports] = useState([]);
    const [generatedReport, setGeneratedReport] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('bugReports');
        if (saved) {
            setSavedReports(JSON.parse(saved));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateReport = () => {
        const report = `# Bug Report

## Title
${formData.title}

## Environment
${formData.environment}

## Severity
${formData.severity}

## Priority
${formData.priority}

## Steps to Reproduce
${formData.stepsToReproduce}

## Expected Result
${formData.expectedResult}

## Actual Result
${formData.actualResult}

## Additional Information
${formData.additionalInfo || 'N/A'}

---
*Generated on ${new Date().toLocaleString()}*`;

        setGeneratedReport(report);
    };

    const saveReport = () => {
        const newReport = {
            id: Date.now(),
            title: formData.title,
            data: formData,
            createdAt: new Date().toISOString()
        };
        const updated = [newReport, ...savedReports];
        setSavedReports(updated);
        localStorage.setItem('bugReports', JSON.stringify(updated));
    };

    const loadReport = (report) => {
        setFormData(report.data);
    };

    const deleteReport = (id) => {
        const updated = savedReports.filter(r => r.id !== id);
        setSavedReports(updated);
        localStorage.setItem('bugReports', JSON.stringify(updated));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedReport);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearForm = () => {
        setFormData({
            title: '',
            environment: '',
            severity: 'Medium',
            priority: 'Medium',
            stepsToReproduce: '',
            expectedResult: '',
            actualResult: '',
            additionalInfo: ''
        });
        setGeneratedReport('');
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-red-400 mb-4">Bug Report Builder</h1>
                    <p className="text-gray-400 text-lg">Create professional bug reports quickly and easily</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-6">Report Details</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Bug Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., Login button not responding on mobile"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Environment *</label>
                                    <input
                                        type="text"
                                        name="environment"
                                        value={formData.environment}
                                        onChange={handleChange}
                                        placeholder="e.g., Chrome 120, Windows 11, Production"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Severity</label>
                                        <select
                                            name="severity"
                                            value={formData.severity}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                        >
                                            <option value="Critical">Critical</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                        >
                                            <option value="Urgent">Urgent</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Steps to Reproduce *</label>
                                    <textarea
                                        name="stepsToReproduce"
                                        value={formData.stepsToReproduce}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="1. Navigate to login page&#10;2. Enter valid credentials&#10;3. Click login button&#10;4. Observe the issue"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Expected Result *</label>
                                    <textarea
                                        name="expectedResult"
                                        value={formData.expectedResult}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="User should be redirected to the dashboard"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Actual Result *</label>
                                    <textarea
                                        name="actualResult"
                                        value={formData.actualResult}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Nothing happens when clicking the login button"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                                    <textarea
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Console errors, screenshots description, workarounds, etc."
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button
                                        onClick={generateReport}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
                                    >
                                        Generate Report
                                    </button>
                                    <button
                                        onClick={saveReport}
                                        disabled={!formData.title}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition"
                                    >
                                        Save Report
                                    </button>
                                    <button
                                        onClick={clearForm}
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Generated Report */}
                        {generatedReport && (
                            <div className="bg-gray-800 rounded-lg p-6 mt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Generated Report</h2>
                                    <button
                                        onClick={copyToClipboard}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy to Clipboard
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap">
                                    {generatedReport}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Saved Reports Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Saved Reports</h2>
                            {savedReports.length === 0 ? (
                                <p className="text-gray-400 text-sm">No saved reports yet. Create and save your first bug report!</p>
                            ) : (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {savedReports.map(report => (
                                        <div key={report.id} className="bg-gray-700 rounded-lg p-3">
                                            <h3 className="font-medium text-sm truncate">{report.title}</h3>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => loadReport(report)}
                                                    className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition"
                                                >
                                                    Load
                                                </button>
                                                <button
                                                    onClick={() => deleteReport(report.id)}
                                                    className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tips Section */}
                        <div className="bg-gray-800 rounded-lg p-6 mt-6">
                            <h2 className="text-xl font-semibold mb-4">Tips for Good Bug Reports</h2>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    Be specific and descriptive in your title
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    Include exact steps to reproduce
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    Mention browser/OS/device details
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    Include console errors if available
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    Attach screenshots when possible
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BugReportBuilder;
