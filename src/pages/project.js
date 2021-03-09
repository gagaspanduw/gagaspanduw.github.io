import React, { Component } from 'react'
import owntols from '../img/owntols.png';
import nubie from '../img/nubie.png';
import uiuxwebsite from '../img/uiuxwebsite.png';
import uiuxapp from '../img/uiuxapp.png';

const Project = (props) => (
    <div>
        <div className="pr-32 pl-32 text-left">
            <h2 className="pb-10 text-3xl font-bold">PROJECTS</h2>

            <h2 className="pb-5 text-1xl font-bold">Website Developing</h2>
            <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                    <img className="w-3/4" src={owntols}></img>
                    <a href="" className="text-sm pt-5 pb-20 flex flex-row">
                    <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>&nbsp;View website</a>
                </div>
                <div className="flex flex-col justify-center">
                    <img className="w-3/4" src={nubie}></img>
                    <a href="" className="text-sm pt-5 pb-20 flex flex-row">
                    <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>&nbsp;View website</a>
                </div>
            </div>

            <h2 className="pb-5 text-1xl font-bold">UI/UX Design</h2>
            <div className="flex flex-row">
                <div className="flex flex-col justify-center">
                    <img className="w-3/4 transition ease-in-out duration-700 transform hover:scale-150" src={uiuxwebsite}></img>
                    <a href="" className="text-sm pt-5 pb-20 flex flex-row">
                    <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>&nbsp;View details</a>
                </div>
                <div className="flex flex-col justify-center">
                    <img className="w-3/4 transition ease-in-out duration-700 transform hover:scale-150" src={uiuxapp}></img>
                    <a href="" className="text-sm pt-5 pb-20 flex flex-row">
                    <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>&nbsp;View details</a>
                </div>
            </div>

        </div>
    </div>
)
export default Project