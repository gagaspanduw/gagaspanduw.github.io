import React, { useState, useEffect } from 'react';

const ApiPlayground = () => {
    const [request, setRequest] = useState({
        url: '',
        method: 'GET',
        headers: [{ key: 'Content-Type', value: 'application/json' }],
        body: ''
    });

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('body');

    useEffect(() => {
        const saved = localStorage.getItem('apiHistory');
        if (saved) {
            setHistory(JSON.parse(saved));
        }
    }, []);

    const updateHeader = (index, field, value) => {
        const newHeaders = [...request.headers];
        newHeaders[index] = { ...newHeaders[index], [field]: value };
        setRequest({ ...request, headers: newHeaders });
    };

    const addHeader = () => {
        setRequest({ ...request, headers: [...request.headers, { key: '', value: '' }] });
    };

    const removeHeader = (index) => {
        const newHeaders = request.headers.filter((_, i) => i !== index);
        setRequest({ ...request, headers: newHeaders });
    };

    const sendRequest = async () => {
        if (!request.url) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(null);

        const startTime = performance.now();

        try {
            const headers = {};
            request.headers.forEach(h => {
                if (h.key) headers[h.key] = h.value;
            });

            const options = {
                method: request.method,
                headers: headers
            };

            if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
                options.body = request.body;
            }

            const res = await fetch(request.url, options);
            const endTime = performance.now();

            const contentType = res.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            const responseHeaders = {};
            res.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });

            const responseData = {
                status: res.status,
                statusText: res.statusText,
                headers: responseHeaders,
                body: data,
                time: Math.round(endTime - startTime)
            };

            setResponse(responseData);

            // Save to history
            const historyItem = {
                id: Date.now(),
                request: { ...request },
                response: {
                    status: res.status,
                    statusText: res.statusText,
                    time: responseData.time
                },
                timestamp: new Date().toISOString()
            };
            const updatedHistory = [historyItem, ...history.slice(0, 19)];
            setHistory(updatedHistory);
            localStorage.setItem('apiHistory', JSON.stringify(updatedHistory));

        } catch (err) {
            setError(err.message || 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    const loadFromHistory = (item) => {
        setRequest(item.request);
        setResponse(null);
        setError(null);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('apiHistory');
    };

    const formatJson = (data) => {
        try {
            if (typeof data === 'string') {
                return data;
            }
            return JSON.stringify(data, null, 2);
        } catch {
            return String(data);
        }
    };

    const getStatusColor = (status) => {
        if (status >= 200 && status < 300) return 'text-green-400';
        if (status >= 300 && status < 400) return 'text-yellow-400';
        if (status >= 400 && status < 500) return 'text-orange-400';
        if (status >= 500) return 'text-red-400';
        return 'text-gray-400';
    };

    const getMethodColor = (method) => {
        const colors = {
            GET: 'bg-green-600',
            POST: 'bg-blue-600',
            PUT: 'bg-yellow-600',
            PATCH: 'bg-purple-600',
            DELETE: 'bg-red-600',
            HEAD: 'bg-gray-600',
            OPTIONS: 'bg-pink-600'
        };
        return colors[method] || 'bg-gray-600';
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-red-400 mb-4">API Test Playground</h1>
                    <p className="text-gray-400 text-lg">Test your APIs directly from the browser</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Section */}
                    <div className="lg:col-span-3">
                        {/* URL Bar */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-6">
                            <div className="flex flex-wrap gap-3">
                                <select
                                    value={request.method}
                                    onChange={(e) => setRequest({ ...request, method: e.target.value })}
                                    className={`${getMethodColor(request.method)} text-white font-bold py-2 px-4 rounded-lg focus:outline-none`}
                                >
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="PATCH">PATCH</option>
                                    <option value="DELETE">DELETE</option>
                                    <option value="HEAD">HEAD</option>
                                    <option value="OPTIONS">OPTIONS</option>
                                </select>
                                <input
                                    type="text"
                                    value={request.url}
                                    onChange={(e) => setRequest({ ...request, url: e.target.value })}
                                    placeholder="https://api.example.com/endpoint"
                                    className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-400 min-w-0"
                                />
                                <button
                                    onClick={sendRequest}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-2 px-8 rounded-lg transition flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Send
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Request Configuration */}
                        <div className="bg-gray-800 rounded-lg mb-6">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-700">
                                <button
                                    onClick={() => setActiveTab('headers')}
                                    className={`px-6 py-3 font-medium transition ${activeTab === 'headers' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Headers ({request.headers.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('body')}
                                    className={`px-6 py-3 font-medium transition ${activeTab === 'body' ? 'text-red-400 border-b-2 border-red-400' : 'text-gray-400 hover:text-white'}`}
                                >
                                    Body
                                </button>
                            </div>

                            <div className="p-6">
                                {/* Headers Tab */}
                                {activeTab === 'headers' && (
                                    <div>
                                        <div className="space-y-3">
                                            {request.headers.map((header, index) => (
                                                <div key={index} className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        value={header.key}
                                                        onChange={(e) => updateHeader(index, 'key', e.target.value)}
                                                        placeholder="Header Name"
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-red-400"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={header.value}
                                                        onChange={(e) => updateHeader(index, 'value', e.target.value)}
                                                        placeholder="Value"
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-red-400"
                                                    />
                                                    <button
                                                        onClick={() => removeHeader(index)}
                                                        className="text-red-400 hover:text-red-300 p-2"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={addHeader}
                                            className="mt-4 text-sm text-red-400 hover:text-red-300 transition flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Header
                                        </button>
                                    </div>
                                )}

                                {/* Body Tab */}
                                {activeTab === 'body' && (
                                    <div>
                                        <textarea
                                            value={request.body}
                                            onChange={(e) => setRequest({ ...request, body: e.target.value })}
                                            rows={8}
                                            placeholder='{"key": "value"}'
                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-red-400"
                                        />
                                        <p className="text-xs text-gray-400 mt-2">
                                            Body is only sent for POST, PUT, PATCH requests
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Response Section */}
                        {(response || error) && (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Response</h2>
                                    {response && (
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className={`font-bold ${getStatusColor(response.status)}`}>
                                                {response.status} {response.statusText}
                                            </span>
                                            <span className="text-gray-400">
                                                {response.time}ms
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {error ? (
                                    <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 text-red-300">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <strong>Error</strong>
                                        </div>
                                        <p>{error}</p>
                                        <p className="mt-2 text-sm text-gray-400">
                                            Note: Some APIs may block requests from browsers due to CORS policy. 
                                            Try using a CORS proxy or test APIs that allow cross-origin requests.
                                        </p>
                                    </div>
                                ) : response && (
                                    <div>
                                        {/* Response Headers */}
                                        <div className="mb-4">
                                            <h3 className="text-sm font-medium text-gray-400 mb-2">Response Headers</h3>
                                            <div className="bg-gray-900 rounded-lg p-3 text-sm max-h-32 overflow-y-auto">
                                                {Object.entries(response.headers).map(([key, value]) => (
                                                    <div key={key} className="flex gap-2">
                                                        <span className="text-red-400">{key}:</span>
                                                        <span className="text-gray-300">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Response Body */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400 mb-2">Response Body</h3>
                                            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 max-h-96 overflow-y-auto">
                                                {formatJson(response.body)}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar - History */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">History</h2>
                                {history.length > 0 && (
                                    <button
                                        onClick={clearHistory}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {history.length === 0 ? (
                                <p className="text-gray-400 text-sm">No request history yet.</p>
                            ) : (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {history.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => loadFromHistory(item)}
                                            className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 text-left transition"
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${getMethodColor(item.request.method)}`}>
                                                    {item.request.method}
                                                </span>
                                                <span className={`text-xs ${getStatusColor(item.response.status)}`}>
                                                    {item.response.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-300 truncate">
                                                {item.request.url}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(item.timestamp).toLocaleString()} • {item.response.time}ms
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sample APIs */}
                        <div className="bg-gray-800 rounded-lg p-6 mt-6">
                            <h2 className="text-xl font-semibold mb-4">Sample APIs</h2>
                            <div className="space-y-2 text-sm">
                                <button
                                    onClick={() => setRequest({ ...request, url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' })}
                                    className="w-full text-left text-gray-300 hover:text-red-400 transition"
                                >
                                    JSONPlaceholder - Get Post
                                </button>
                                <button
                                    onClick={() => setRequest({ ...request, url: 'https://api.github.com/users/octocat', method: 'GET' })}
                                    className="w-full text-left text-gray-300 hover:text-red-400 transition"
                                >
                                    GitHub - Get User
                                </button>
                                <button
                                    onClick={() => setRequest({ ...request, url: 'https://catfact.ninja/fact', method: 'GET' })}
                                    className="w-full text-left text-gray-300 hover:text-red-400 transition"
                                >
                                    Cat Facts - Random Fact
                                </button>
                                <button
                                    onClick={() => setRequest({ ...request, url: 'https://httpbin.org/get', method: 'GET' })}
                                    className="w-full text-left text-gray-300 hover:text-red-400 transition"
                                >
                                    HTTPBin - Test GET
                                </button>
                                <button
                                    onClick={() => setRequest({ 
                                        ...request, 
                                        url: 'https://jsonplaceholder.typicode.com/posts', 
                                        method: 'POST',
                                        body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }, null, 2)
                                    })}
                                    className="w-full text-left text-gray-300 hover:text-red-400 transition"
                                >
                                    JSONPlaceholder - Create Post
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="bg-gray-800 rounded-lg p-6 mt-6">
                            <h2 className="text-xl font-semibold mb-4">Important Note</h2>
                            <p className="text-sm text-gray-400">
                                This tool runs entirely in your browser. Some APIs may not work due to CORS restrictions. 
                                For full API testing, consider using tools like Postman or curl.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiPlayground;
