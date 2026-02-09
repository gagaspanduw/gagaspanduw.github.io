import React from 'react';
import { Link } from 'react-router-dom';

const ToolsIndex = () => {
    const tools = [
        {
            title: 'Bug Report Builder',
            description: 'Create professional, well-structured bug reports in seconds. Generate markdown-formatted reports ready to paste into your issue tracker.',
            icon: '🐛',
            path: '/tools/bug-report',
            features: ['Customizable templates', 'Severity & priority levels', 'Save drafts locally', 'Copy to clipboard']
        },
        {
            title: 'Test Case Generator',
            description: 'Build comprehensive test cases with steps and expected results. Export to Markdown, Gherkin (BDD), or CSV format.',
            icon: '📋',
            path: '/tools/test-case',
            features: ['Multiple output formats', 'Test suite management', 'Step-by-step builder', 'Local storage']
        },
        {
            title: 'API Test Playground',
            description: 'Test REST APIs directly from your browser. Send requests, view responses, and save your request history.',
            icon: '🔌',
            path: '/tools/api-playground',
            features: ['All HTTP methods', 'Custom headers', 'Request history', 'Sample APIs included']
        }
    ];

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-red-400">QA Tools</span> for Testers
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Free, browser-based tools to help QA engineers and testers work more efficiently. 
                        All data is stored locally in your browser.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tools.map((tool) => (
                        <Link 
                            key={tool.path}
                            to={tool.path}
                            className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-red-400"
                        >
                            <div className="text-5xl mb-4">{tool.icon}</div>
                            <h2 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                                {tool.title}
                            </h2>
                            <p className="text-gray-400 mb-6">
                                {tool.description}
                            </p>
                            <ul className="space-y-2">
                                {tool.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-300">
                                        <svg className="w-4 h-4 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 text-red-400 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                                Open Tool
                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-16 bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <div className="md:flex md:items-center md:justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">100% Free & Private</h3>
                            <p className="text-gray-400 max-w-xl">
                                All tools run entirely in your browser. No data is sent to any server. 
                                Your work is saved locally using browser storage.
                            </p>
                        </div>
                        <div className="mt-6 md:mt-0 flex gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-400">0</div>
                                <div className="text-sm text-gray-400">Server Calls</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-400">∞</div>
                                <div className="text-sm text-gray-400">Usage Limit</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-red-400">🔒</div>
                                <div className="text-sm text-gray-400">Private Data</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolsIndex;
