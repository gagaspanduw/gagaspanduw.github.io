import React from 'react'
import owntols from '../img/owntols.png';
import nubie from '../img/nubie.png';
import pengarsipan from '../img/pengarsipan.png';
import uiuxwebsite from '../img/uiuxwebsite.png';
import uiuxapp from '../img/uiuxapp.png';
import demoblazetesting from '../img/demoblazetesting.png';
import theinternettesting from '../img/theinternettesting.png';
import automationdownloadsendsftp from '../img/automation-download-send-sftp.png'
import automationfluttergherkin from '../img/automation-flutter-gherkin.png'

const Project = (props) => (
    <div className="bg-gray-900 min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="pb-10 text-3xl font-bold text-center text-red-400">PROJECTS</h2>

            {/* Software Testing Section */}
            <h3 className="pb-5 text-xl font-bold text-gray-200">Software Testing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/gagaspanduw/playwright-ai-parabank">
                        <div className="w-48 h-32 rounded mb-4 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
                            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                            </svg>
                        </div>
                    </a>
                    <h4 className="font-bold text-lg mb-2">Playwright AI Parabank</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">AI-assisted Playwright automation for Parabank end-to-end web testing.</p>
                    <a href="https://github.com/gagaspanduw/playwright-ai-parabank" className="text-red-400 hover:underline text-sm">View source code</a>
                </div>
                {/* Project Card Example */}
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/gagaspanduw/automation-flutter_gherkin">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={automationfluttergherkin} alt="Automation Flutter Gherkin" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Automation Flutter Gherkin</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">End-to-end automation for Flutter apps using Gherkin syntax.</p>
                    <a href="https://github.com/gagaspanduw/automation-flutter_gherkin" className="text-red-400 hover:underline text-sm">View source code</a>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/gagaspanduw/auto-download-send-sftp">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={automationdownloadsendsftp} alt="RPA SFTP" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Robotic Process Automation SFTP</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Automates file download and SFTP upload processes.</p>
                    <a href="https://github.com/gagaspanduw/auto-download-send-sftp" className="text-red-400 hover:underline text-sm">View source code</a>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/gagaspanduw/demoblaze.com_testing">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={demoblazetesting} alt="Demoblaze Testing" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Demoblaze.com Testing</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Automated UI testing for Demoblaze.com using Selenium.</p>
                    <a href="https://github.com/gagaspanduw/demoblaze.com_testing" className="text-red-400 hover:underline text-sm">View source code</a>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/gagaspanduw/seleniumjava_course">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={theinternettesting} alt="Selenium Java Course" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Selenium Java Course</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Selenium automation for The Internet testing site.</p>
                    <a href="https://github.com/gagaspanduw/seleniumjava_course" className="text-red-400 hover:underline text-sm">View source code</a>
                </div>
            </div>

            {/* Website Development Section */}
            <h3 className="pb-5 text-xl font-bold text-gray-200">Website Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.owntols.com">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={owntols} alt="Owntols" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Owntols</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Corporate website for Owntols.</p>
                    <a href="https://www.owntols.com" className="text-red-400 hover:underline text-sm">View website</a>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.nubie.id">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={nubie} alt="Nubie" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Nubie</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Corporate website for Nubie.</p>
                    <a href="https://www.nubie.id" className="text-red-400 hover:underline text-sm">View website</a>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <img className="w-48 h-32 object-contain rounded mb-4" src={pengarsipan} alt="Pengarsipan" />
                    <h4 className="font-bold text-lg mb-2">Pengarsipan</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Document archiving web application.</p>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/gagaspanduw/automation-flutter_gherkin">
                        <img className="w-48 h-32 object-contain rounded mb-4" src={automationfluttergherkin} alt="Flutter Gherkin Test" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">Flutter Gherkin Test</h4>
                    <p className="text-gray-400 text-sm mb-2 text-center">Flutter automation testing project using Gherkin for behavior-driven scenarios.</p>
                    <a href="https://github.com/gagaspanduw/automation-flutter_gherkin" className="text-red-400 hover:underline text-sm">View source code</a>
                </div>
            </div>

            {/* UI/UX Design Section */}
            <h3 className="pb-5 text-xl font-bold text-gray-200">UI/UX Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/gagaspanduw">
                        <img className="w-48 h-32 object-contain rounded mb-4 transition-transform duration-300 hover:scale-110" src={uiuxwebsite} alt="UI/UX Website" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">UI/UX Website Design</h4>
                    <a href="https://www.instagram.com/gagaspanduw" className="text-red-400 hover:underline text-sm">View details</a>
                </div>
                <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/gagaspanduw">
                        <img className="w-48 h-32 object-contain rounded mb-4 transition-transform duration-300 hover:scale-110" src={uiuxapp} alt="UI/UX App" />
                    </a>
                    <h4 className="font-bold text-lg mb-2">UI/UX Mobile App Design</h4>
                    <a href="https://www.instagram.com/gagaspanduw" className="text-red-400 hover:underline text-sm">View details</a>
                </div>
            </div>
        </div>
    </div>
)
export default Project