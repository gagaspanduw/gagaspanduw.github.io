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
            isMenuOpen: false
        }
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render(){
        const { isMenuOpen } = this.state;
        
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
                            <ul className="flex space-x-6 text-base font-semibold">
                                {this.state.menus.map(menu => (
                                    <li key={menu.path}>
                                        <Link to={menu.path} className="text-gray-200 hover:text-red-400 transition px-3 py-2 rounded-md hover:bg-gray-800">{menu.label}</Link>
                                    </li>
                                ))}
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