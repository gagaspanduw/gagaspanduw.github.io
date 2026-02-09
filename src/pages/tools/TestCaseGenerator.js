import React, { useState, useEffect } from 'react';

const TestCaseGenerator = () => {
    const [testCases, setTestCases] = useState([createEmptyTestCase()]);
    const [savedSuites, setSavedSuites] = useState([]);
    const [suiteName, setSuiteName] = useState('');
    const [generatedOutput, setGeneratedOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [outputFormat, setOutputFormat] = useState('markdown');

    function createEmptyTestCase() {
        return {
            id: Date.now() + Math.random(),
            title: '',
            preconditions: '',
            steps: [{ step: '', expected: '' }],
            priority: 'Medium',
            type: 'Functional'
        };
    }

    useEffect(() => {
        const saved = localStorage.getItem('testCaseSuites');
        if (saved) {
            setSavedSuites(JSON.parse(saved));
        }
    }, []);

    const addTestCase = () => {
        setTestCases([...testCases, createEmptyTestCase()]);
    };

    const removeTestCase = (id) => {
        if (testCases.length > 1) {
            setTestCases(testCases.filter(tc => tc.id !== id));
        }
    };

    const updateTestCase = (id, field, value) => {
        setTestCases(testCases.map(tc => 
            tc.id === id ? { ...tc, [field]: value } : tc
        ));
    };

    const addStep = (testCaseId) => {
        setTestCases(testCases.map(tc => 
            tc.id === testCaseId 
                ? { ...tc, steps: [...tc.steps, { step: '', expected: '' }] }
                : tc
        ));
    };

    const removeStep = (testCaseId, stepIndex) => {
        setTestCases(testCases.map(tc => {
            if (tc.id === testCaseId && tc.steps.length > 1) {
                return { ...tc, steps: tc.steps.filter((_, i) => i !== stepIndex) };
            }
            return tc;
        }));
    };

    const updateStep = (testCaseId, stepIndex, field, value) => {
        setTestCases(testCases.map(tc => {
            if (tc.id === testCaseId) {
                const newSteps = [...tc.steps];
                newSteps[stepIndex] = { ...newSteps[stepIndex], [field]: value };
                return { ...tc, steps: newSteps };
            }
            return tc;
        }));
    };

    const generateOutput = () => {
        let output = '';
        
        if (outputFormat === 'markdown') {
            output = `# Test Cases${suiteName ? ` - ${suiteName}` : ''}\n\n`;
            testCases.forEach((tc, index) => {
                output += `## TC-${String(index + 1).padStart(3, '0')}: ${tc.title}\n\n`;
                output += `**Priority:** ${tc.priority}\n`;
                output += `**Type:** ${tc.type}\n\n`;
                if (tc.preconditions) {
                    output += `### Preconditions\n${tc.preconditions}\n\n`;
                }
                output += `### Test Steps\n\n`;
                output += `| Step | Action | Expected Result |\n`;
                output += `|------|--------|----------------|\n`;
                tc.steps.forEach((step, i) => {
                    output += `| ${i + 1} | ${step.step} | ${step.expected} |\n`;
                });
                output += `\n---\n\n`;
            });
        } else if (outputFormat === 'gherkin') {
            testCases.forEach((tc) => {
                output += `Feature: ${tc.title}\n\n`;
                output += `  Scenario: ${tc.title}\n`;
                if (tc.preconditions) {
                    output += `    Given ${tc.preconditions}\n`;
                }
                tc.steps.forEach((step, i) => {
                    if (i === 0 && !tc.preconditions) {
                        output += `    Given ${step.step}\n`;
                    } else if (i === tc.steps.length - 1) {
                        output += `    Then ${step.expected}\n`;
                    } else {
                        output += `    When ${step.step}\n`;
                    }
                });
                output += `\n`;
            });
        } else if (outputFormat === 'csv') {
            output = 'Test Case ID,Title,Priority,Type,Preconditions,Step Number,Step Action,Expected Result\n';
            testCases.forEach((tc, index) => {
                tc.steps.forEach((step, stepIndex) => {
                    output += `"TC-${String(index + 1).padStart(3, '0')}","${tc.title}","${tc.priority}","${tc.type}","${tc.preconditions}","${stepIndex + 1}","${step.step}","${step.expected}"\n`;
                });
            });
        }

        setGeneratedOutput(output);
    };

    const saveSuite = () => {
        if (!suiteName) {
            alert('Please enter a suite name');
            return;
        }
        const newSuite = {
            id: Date.now(),
            name: suiteName,
            testCases: testCases,
            createdAt: new Date().toISOString()
        };
        const updated = [newSuite, ...savedSuites];
        setSavedSuites(updated);
        localStorage.setItem('testCaseSuites', JSON.stringify(updated));
    };

    const loadSuite = (suite) => {
        setSuiteName(suite.name);
        setTestCases(suite.testCases);
    };

    const deleteSuite = (id) => {
        const updated = savedSuites.filter(s => s.id !== id);
        setSavedSuites(updated);
        localStorage.setItem('testCaseSuites', JSON.stringify(updated));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setTestCases([createEmptyTestCase()]);
        setSuiteName('');
        setGeneratedOutput('');
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-red-400 mb-4">Test Case Generator</h1>
                    <p className="text-gray-400 text-lg">Create and manage test cases with ease</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Form Section */}
                    <div className="lg:col-span-3">
                        {/* Suite Name */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-6">
                            <div className="flex flex-wrap gap-4 items-end">
                                <div className="flex-grow">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Test Suite Name</label>
                                    <input
                                        type="text"
                                        value={suiteName}
                                        onChange={(e) => setSuiteName(e.target.value)}
                                        placeholder="e.g., Login Module Test Suite"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Output Format</label>
                                    <select
                                        value={outputFormat}
                                        onChange={(e) => setOutputFormat(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                    >
                                        <option value="markdown">Markdown</option>
                                        <option value="gherkin">Gherkin (BDD)</option>
                                        <option value="csv">CSV</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Test Cases */}
                        {testCases.map((testCase, tcIndex) => (
                            <div key={testCase.id} className="bg-gray-800 rounded-lg p-6 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Test Case #{tcIndex + 1}</h2>
                                    {testCases.length > 1 && (
                                        <button
                                            onClick={() => removeTestCase(testCase.id)}
                                            className="text-red-400 hover:text-red-300 transition"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Test Case Title *</label>
                                        <input
                                            type="text"
                                            value={testCase.title}
                                            onChange={(e) => updateTestCase(testCase.id, 'title', e.target.value)}
                                            placeholder="e.g., Verify successful login with valid credentials"
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                                            <select
                                                value={testCase.priority}
                                                onChange={(e) => updateTestCase(testCase.id, 'priority', e.target.value)}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                            >
                                                <option value="Critical">Critical</option>
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                                            <select
                                                value={testCase.type}
                                                onChange={(e) => updateTestCase(testCase.id, 'type', e.target.value)}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                            >
                                                <option value="Functional">Functional</option>
                                                <option value="Regression">Regression</option>
                                                <option value="Smoke">Smoke</option>
                                                <option value="Integration">Integration</option>
                                                <option value="E2E">End-to-End</option>
                                                <option value="Security">Security</option>
                                                <option value="Performance">Performance</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Preconditions</label>
                                        <textarea
                                            value={testCase.preconditions}
                                            onChange={(e) => updateTestCase(testCase.id, 'preconditions', e.target.value)}
                                            rows={2}
                                            placeholder="e.g., User must be registered and on the login page"
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400"
                                        />
                                    </div>

                                    {/* Steps */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Test Steps</label>
                                        <div className="space-y-3">
                                            {testCase.steps.map((step, stepIndex) => (
                                                <div key={stepIndex} className="bg-gray-700 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="bg-red-400 text-gray-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                                            {stepIndex + 1}
                                                        </span>
                                                        {testCase.steps.length > 1 && (
                                                            <button
                                                                onClick={() => removeStep(testCase.id, stepIndex)}
                                                                className="ml-auto text-red-400 hover:text-red-300 text-sm"
                                                            >
                                                                Remove Step
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={step.step}
                                                                onChange={(e) => updateStep(testCase.id, stepIndex, 'step', e.target.value)}
                                                                placeholder="Action/Step"
                                                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-400"
                                                            />
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                value={step.expected}
                                                                onChange={(e) => updateStep(testCase.id, stepIndex, 'expected', e.target.value)}
                                                                placeholder="Expected Result"
                                                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-400"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => addStep(testCase.id)}
                                            className="mt-3 text-sm text-red-400 hover:text-red-300 transition flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Step
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <button
                                onClick={addTestCase}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Test Case
                            </button>
                            <button
                                onClick={generateOutput}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
                            >
                                Generate Output
                            </button>
                            <button
                                onClick={saveSuite}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                            >
                                Save Suite
                            </button>
                            <button
                                onClick={clearAll}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Generated Output */}
                        {generatedOutput && (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Generated Output ({outputFormat.toUpperCase()})</h2>
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
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap max-h-96">
                                    {generatedOutput}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Saved Test Suites</h2>
                            {savedSuites.length === 0 ? (
                                <p className="text-gray-400 text-sm">No saved suites yet.</p>
                            ) : (
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {savedSuites.map(suite => (
                                        <div key={suite.id} className="bg-gray-700 rounded-lg p-3">
                                            <h3 className="font-medium text-sm truncate">{suite.name}</h3>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {suite.testCases.length} test case(s) • {new Date(suite.createdAt).toLocaleDateString()}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => loadSuite(suite)}
                                                    className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition"
                                                >
                                                    Load
                                                </button>
                                                <button
                                                    onClick={() => deleteSuite(suite.id)}
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

                        <div className="bg-gray-800 rounded-lg p-6 mt-6">
                            <h2 className="text-xl font-semibold mb-4">Output Formats</h2>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li>
                                    <strong className="text-red-400">Markdown:</strong> Clean, readable format for documentation
                                </li>
                                <li>
                                    <strong className="text-red-400">Gherkin:</strong> BDD-style format for Cucumber/SpecFlow
                                </li>
                                <li>
                                    <strong className="text-red-400">CSV:</strong> Import into Excel or test management tools
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCaseGenerator;
