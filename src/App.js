import React, { Suspense, lazy } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Logo from './components/Logo';
import {
  Route,
  Switch,
  HashRouter,
  Redirect,
  useLocation
} from 'react-router-dom';

import Home from './pages/home';
import Project from './pages/project';
import Certificate from './pages/certificate';
import ValentineIntro from './pages/mimi/valentineIntro';
import Valentine from './pages/mimi/valentine';
import ValentineSuccess from './pages/mimi/valentineSuccess';
import ForMimi from './pages/mimi/forMimi';
import IfYoureReady from './pages/mimi/ifYoureReady';
import ThirdMonthversary from './pages/mimi/monthversary/months/1-3rdMonthversary';

// Tools
import BugReportBuilder from './pages/tools/BugReportBuilder';
import TestCaseGenerator from './pages/tools/TestCaseGenerator';
import ApiPlayground from './pages/tools/ApiPlayground';
import ToolsIndex from './pages/tools/index';

const ThreeJSTree = lazy(() => import('./pages/mimi/monthversary/ThreeJSTree'));

const immersiveRoutes = ['/mimi/if-youre-ready', '/mimi/monthversary', '/mimi/monthversary/3'];

function AppLayout() {
  const location = useLocation();
  const isImmersive = immersiveRoutes.includes(location.pathname);

  return (
    <div className={`${isImmersive ? 'min-h-screen flex flex-col' : 'bg-gray-900 min-h-screen flex flex-col'}`}>
      {!isImmersive && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/project" exact component={Project}/>
            <Route path="/certificate" exact component={Certificate}/>
            <Route path="/valentine" exact component={ValentineIntro}/>
            <Route path="/valentine/question" exact component={Valentine}/>
            <Route path="/valentine/success" exact component={ValentineSuccess}/>
            <Route path="/for-mimi" exact component={ForMimi}/>
            <Route path="/mimi/if-youre-ready" exact component={IfYoureReady}/>
            <Route path="/mimi/monthversary" exact component={ThreeJSTree}/>
            <Route path="/mimi/monthversary/3" exact component={ThirdMonthversary}/>
            <Route path="/mimi/monthversary/4" exact render={() => <Redirect to="/mimi/monthversary/3" />}/>
            <Route path="/tools/bug-report" exact component={BugReportBuilder}/>
            <Route path="/tools/test-case" exact component={TestCaseGenerator}/>
            <Route path="/tools/api-playground" exact component={ApiPlayground}/>
            <Route path="/tools" exact component={ToolsIndex}/>
          </Switch>
        </Suspense>
      </main>
      {!isImmersive && <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Logo />
                <span className="text-white font-bold text-xl ml-3">Gagas Pandu Wibowo</span>
              </div>
              <p className="text-gray-400 mb-4 md:pr-12">
                QA Engineer specializing in test automation and quality assurance best practices. 
                Helping teams deliver reliable, high-quality software.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/gagaspanduw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/gagaspanduw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a href="mailto:gagaspanduw@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/#/" className="text-gray-400 hover:text-red-400 transition-colors duration-300">Home</a></li>
                <li><a href="/#/project" className="text-gray-400 hover:text-red-400 transition-colors duration-300">Projects</a></li>
                <li><a href="/#/certificate" className="text-gray-400 hover:text-red-400 transition-colors duration-300">Certificates</a></li>
                <li><a href="mailto:gagaspanduw@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Test Automation</li>
                <li className="text-gray-400">QA Consulting</li>
                <li className="text-gray-400">Performance Testing</li>
                <li className="text-gray-400">Mobile App Testing</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">QA Tools</h3>
              <ul className="space-y-2">
                <li><a href="/#/tools/bug-report" className="text-gray-400 hover:text-red-400 transition-colors duration-300">Bug Report Builder</a></li>
                <li><a href="/#/tools/test-case" className="text-gray-400 hover:text-red-400 transition-colors duration-300">Test Case Generator</a></li>
                <li><a href="/#/tools/api-playground" className="text-gray-400 hover:text-red-400 transition-colors duration-300">API Playground</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Gagas Pandu Wibowo. All rights reserved.
            </div>
            <div className="text-gray-500 text-sm">
              Made with <span className="text-red-400">♥</span> using React & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>}
    </div>
  );
}

function App() {
  return (
  <HashRouter>
    <AppLayout />
  </HashRouter>
  );
}

export default App;
