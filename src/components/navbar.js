import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            menus: [
                {label: 'Home', path: '/' }, 
                {label: 'Projects', path: '/project' },
                {label: 'Certificates', path: '/certificate'}
            ],
            tools: [
                {label: 'Bug Report Builder', path: '/tools/bug-report' },
                {label: 'Test Case Generator', path: '/tools/test-case' },
                {label: 'API Playground', path: '/tools/api-playground' }
            ],
            isMenuOpen: false,
            isToolsOpen: false
        }
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    toggleTools = () => {
        this.setState(prevState => ({
            isToolsOpen: !prevState.isToolsOpen
        }));
    }

    closeTools = () => {
        this.setState({ isToolsOpen: false });
    }

    render(){
        const { isMenuOpen, isToolsOpen } = this.state;
        
        return(
            <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg backdrop-blur-md bg-opacity-90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Logo />
                            <Link to="/" className="text-white font-bold text-xl tracking-tight hover:text-red-400 transition ml-3">
                                Gagas Pandu Wibowo
                            </Link>
                        </div>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:flex">
                            <ul className="flex space-x-6 text-base font-semibold items-center">
                                {this.state.menus.map(menu => (
                                    <li key={menu.path}>
                                        <Link to={menu.path} className="text-gray-200 hover:text-red-400 transition px-3 py-2 rounded-md hover:bg-gray-800">{menu.label}</Link>
                                    </li>
                                ))}
                                {/* Tools Dropdown */}
                                <li className="relative">
                                    <button 
                                        onClick={this.toggleTools}
                                        onBlur={() => setTimeout(this.closeTools, 150)}
                                        className="text-gray-200 hover:text-red-400 transition px-3 py-2 rounded-md hover:bg-gray-800 flex items-center gap-1"
                                    >
                                        Tools
                                        <svg className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isToolsOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-700">
                                            {this.state.tools.map(tool => (
                                                <Link 
                                                    key={tool.path}
                                                    to={tool.path} 
                                                    className="block px-4 py-2 text-gray-200 hover:text-red-400 hover:bg-gray-700 transition"
                                                    onClick={this.closeTools}
                                                >
                                                    {tool.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <a href="mailto:gagaspanduw@gmail.com" className="text-gray-200 hover:text-red-400 transition px-3 py-2 rounded-md hover:bg-gray-800">Contact</a>
                                </li>
                            </ul>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button 
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                onClick={this.toggleMenu}
                            >
                                <svg 
                                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg 
                                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {this.state.menus.map(menu => (
                            <Link 
                                key={menu.path} 
                                to={menu.path} 
                                className="text-gray-200 hover:text-red-400 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                                onClick={this.toggleMenu}
                            >
                                {menu.label}
                            </Link>
                        ))}
                        {/* Tools Section */}
                        <div className="border-t border-gray-700 mt-2 pt-2">
                            <span className="block px-3 py-2 text-gray-400 text-sm font-semibold">QA Tools</span>
                            {this.state.tools.map(tool => (
                                <Link 
                                    key={tool.path}
                                    to={tool.path} 
                                    className="text-gray-200 hover:text-red-400 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium pl-6"
                                    onClick={this.toggleMenu}
                                >
                                    {tool.label}
                                </Link>
                            ))}
                        </div>
                        <a 
                            href="mailto:gagaspanduw@gmail.com" 
                            className="text-gray-200 hover:text-red-400 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                            onClick={this.toggleMenu}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar