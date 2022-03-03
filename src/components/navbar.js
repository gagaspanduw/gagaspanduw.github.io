import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    constructor(){
        super()
        this.state = {
            menus: [
                {label: 'Home', path: '/' }, 
                {label: 'Project', path: '/project' },
                {label: 'Certificate', path: '/certificate'}
            ]
        }
    }
    render(){
        return(
                <navbar className="sticky top-0 z-50 bg-gray-800 flex justify-center lg:justify-end">
                    <div className="flex flex-row justify-between items-center pt-3">
                    <a className="pl-5 lg:pl-20"></a>
                    <ul className="pr-5 lg:pr-20 text-sm lg:text-2xl font-bold">
                        {
                            this.state.menus.map( menu => (
                                <li className="hover:text-gray-300" style={styles.menuLi}>
                                <Link to={menu.path}>{menu.label}</Link> </li>))
                        }
                        <li className="hover:text-gray-300" style={styles.menuLi}><a href="mailto:gagaspanduw@gmail.com">Contact</a></li>
                    </ul>
                    </div>
                </navbar>
        )
    }
}

const styles = {
    menuLi: {
        display: 'inline-block',
        padding: '10px'
    }
}
export default Navbar