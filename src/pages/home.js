import React from 'react';
import { Link } from 'react-router-dom';
import Skills from '../components/skills';
import Logo from '../components/Logo';

// Import project images directly
import flutterGherkinImg from '../img/automation-flutter-gherkin.png';
import sftpAutomationImg from '../img/automation-download-send-sftp.png';

const Home = (props) => (
    <div className="bg-gray-900 min-h-screen text-white">
        {/* Hero Section - Enhanced with animation and better layout */}
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                            <span className="block">Hello, I'm</span>
                            <span className="text-red-400 block">Gagas Pandu Wibowo</span>
                        </h1>
                        <h2 className="text-xl md:text-2xl text-gray-300 font-semibold mt-2 mb-6">QA Engineer & Automation Specialist</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-xl">
                            I help development teams deliver high-quality software through effective testing strategies, 
                            automation frameworks, and quality assurance best practices.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a 
                                href="mailto:gagaspanduw@gmail.com" 
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition"
                            >
                                Get In Touch
                            </a>
                            <Link 
                                to="/project" 
                                className="bg-transparent hover:bg-gray-800 text-white font-semibold py-3 px-8 border border-white hover:border-transparent rounded-lg transition"
                            >
                                View Projects
                            </Link>
                        </div>
                        <div className="flex gap-6 mt-8">
                            <a href="https://www.linkedin.com/in/gagaspanduw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                </svg>
                            </a>
                            <a href="https://github.com/gagaspanduw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="mailto:gagaspanduw@gmail.com" className="text-gray-400 hover:text-red-400 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative">
                            <div className="w-60 h-60 md:w-80 md:h-80 rounded-full bg-red-400 bg-opacity-10 p-4 animate-pulse">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-400">
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                        <Logo />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-gray-800 rounded-full p-3 shadow-lg">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#F87171"/>
                                </svg>
                            </div>
                            <div className="absolute -bottom-2 -left-2 bg-gray-800 rounded-full p-3 shadow-lg">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" fill="#F87171"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* About Me Section - Enhanced with better layout */}
        <section className="py-16 bg-gray-800">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8 text-red-400 text-center">About Me</h2>
                <div className="md:flex md:items-start md:space-x-8">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
                            <p className="text-gray-300">
                                I am a dedicated QA Engineer from Indonesia with a passion for ensuring software quality.
                                With experience in both manual and automated testing, I help teams deliver reliable products.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">What I Do</h3>
                            <p className="text-gray-300">
                                I specialize in creating comprehensive test strategies, building robust automation frameworks,
                                and implementing CI/CD pipelines for efficient testing.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-4">My Approach</h3>
                            <p className="text-gray-300">
                                I believe quality is a team effort. I work collaboratively with developers and stakeholders
                                to ensure testing is integrated throughout the development lifecycle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section - New addition */}
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-2 text-red-400 text-center">Services</h2>
                <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
                    I offer comprehensive quality assurance solutions to ensure your software
                    meets the highest standards of reliability and performance.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-red-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Test Strategy Development</h3>
                        <p className="text-gray-300">
                            Creating comprehensive test plans and strategies tailored to your project needs,
                            ensuring all aspects of your application are thoroughly tested.
                        </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-red-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Test Automation</h3>
                        <p className="text-gray-300">
                            Building robust automation frameworks using industry-standard tools to
                            increase test coverage, reduce regression testing time, and improve ROI.
                        </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-red-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Performance Testing</h3>
                        <p className="text-gray-300">
                            Identifying bottlenecks and performance issues before they impact your users,
                            ensuring your application performs optimally under various conditions.
                        </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-red-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 01-1 1z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mobile App Testing</h3>
                        <p className="text-gray-300">
                            Comprehensive testing of mobile applications across different devices and OS versions
                            to ensure consistency and reliability for all users.
                        </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-red-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Security Testing</h3>
                        <p className="text-gray-300">
                            Identifying security vulnerabilities in your application through methodical testing
                            to protect your data and your users from potential threats.
                        </p>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                        <div className="text-red-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">CI/CD Integration</h3>
                        <p className="text-gray-300">
                            Integrating test automation into your CI/CD pipeline to enable continuous testing
                            and faster feedback on code changes.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Why Me Section - Improved design */}
        <section className="py-16 bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-red-400 mb-12">Why Choose Me?</h2>
                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    <div className="bg-gray-700 rounded-xl shadow-lg p-8 flex-1 mx-2 mb-6 lg:mb-0 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-400 bg-opacity-20 p-4 rounded-full">
                                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h18M3 12h18M3 19h10" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="flex justify-center font-bold text-xl mb-4 text-red-400">Communicative</h3>
                        <p className="text-gray-300 text-center">
                            I communicate effectively with all stakeholders, ensuring everyone understands testing goals, processes, and results. Clear communication is key to successful quality assurance.
                        </p>
                    </div>
                    <div className="bg-gray-700 rounded-xl shadow-lg p-8 flex-1 mx-2 mb-6 lg:mb-0 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-400 bg-opacity-20 p-4 rounded-full">
                                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3 3-3-3z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="flex justify-center font-bold text-xl mb-4 text-red-400">Collaborative</h3>
                        <p className="text-gray-300 text-center">
                            I work seamlessly with development teams, bringing a technical background that enables me to understand code and communicate effectively with developers to resolve issues quickly.
                        </p>
                    </div>
                    <div className="bg-gray-700 rounded-xl shadow-lg p-8 flex-1 mx-2 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-400 bg-opacity-20 p-4 rounded-full">
                                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="flex justify-center font-bold text-xl mb-4 text-red-400">Solution-Oriented</h3>
                        <p className="text-gray-300 text-center">
                            I don't just identify problems—I find solutions. My approach focuses on practical problem-solving and implementing efficient testing processes that improve overall quality.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Skills Section */}
        <div id="skills">
            <Skills />
        </div>

        {/* Featured Projects - New mini showcase */}
        <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-red-400">Featured Projects</h2>
                    <Link to="/project" className="text-red-400 hover:text-red-300 flex items-center transition">
                        View All
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                        <div className="h-48 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
                            <svg className="w-20 h-20 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                            </svg>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">Playwright AI Parabank</h3>
                            <p className="text-gray-300 mb-4">
                                AI-assisted end-to-end web test automation using Playwright for the Parabank application.
                            </p>
                            <div className="flex justify-end">
                                <a href="https://github.com/gagaspanduw/playwright-ai-parabank" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 inline-flex items-center">
                                    View source code
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                        <div className="h-48 overflow-hidden">
                            <img className="w-full h-full object-cover transform hover:scale-110 transition duration-500" src={sftpAutomationImg} alt="SFTP Automation" />
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">SFTP Automation</h3>
                            <p className="text-gray-300 mb-4">
                                Automated file transfer system with secure SFTP protocol for reliable data transmission.
                            </p>
                            <div className="flex justify-end">
                                <Link to="/project" className="text-red-400 hover:text-red-300 inline-flex items-center">
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                        <div className="h-48 overflow-hidden">
                            <img className="w-full h-full object-cover transform hover:scale-110 transition duration-500" src={flutterGherkinImg} alt="Flutter Gherkin Test" />
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2">Flutter Gherkin Test</h3>
                            <p className="text-gray-300 mb-4">
                                End-to-end Flutter mobile automation using Gherkin scenarios for clear and scalable BDD testing.
                            </p>
                            <div className="flex justify-end">
                                <a href="https://github.com/gagaspanduw/automation-flutter_gherkin" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 inline-flex items-center">
                                    View source code
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Core QA Automation Stack</h3>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm">Playwright</span>
                        <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm">Selenium</span>
                        <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm">Cypress</span>
                        <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm">Gherkin BDD</span>
                        <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm">API Testing</span>
                        <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-200 text-sm">CI/CD Testing</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section - New section */}
        <section className="py-16 bg-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-red-400 mb-12">What People Say</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-gray-300 italic flex-grow">
                                "Gagas consistently delivered high-quality work on our project. His attention to detail in testing helped us identify critical issues before release."
                            </blockquote>
                            <div className="mt-6 pt-6 border-t border-gray-600">
                                <p className="font-semibold">John Doe</p>
                                <p className="text-sm text-gray-400">CTO, Tech Solutions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-gray-300 italic flex-grow">
                                "The automation framework Gagas built has saved us countless hours of manual testing. His technical knowledge and problem-solving abilities are impressive."
                            </blockquote>
                            <div className="mt-6 pt-6 border-t border-gray-600">
                                <p className="font-semibold">Jane Smith</p>
                                <p className="text-sm text-gray-400">Product Manager, InnovateTech</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-xl p-6 shadow-lg">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-gray-300 italic flex-grow">
                                "Working with Gagas was a great experience. He integrated seamlessly with our team and brought valuable insights to our testing process."
                            </blockquote>
                            <div className="mt-6 pt-6 border-t border-gray-600">
                                <p className="font-semibold">Michael Johnson</p>
                                <p className="text-sm text-gray-400">Lead Developer, WebSolutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Contact Call to Action - Improved design */}
        <section className="text-center py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-red-900 opacity-50"></div>
            <div className="relative z-10 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Ready to Ensure Quality in Your Project?</h2>
                <p className="text-gray-300 mb-8 text-lg">
                    I'm available for freelance, remote, and full-time QA opportunities. Let's discuss how I can help improve the quality of your software.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                        href="mailto:gagaspanduw@gmail.com" 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Email Me
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/gagaspanduw" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                        Connect on LinkedIn
                    </a>
                </div>
            </div>
        </section>
    </div>
)

export default Home;