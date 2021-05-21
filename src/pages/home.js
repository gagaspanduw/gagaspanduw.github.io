import React, { Component } from 'react'
import photoshoplogo from '../img/photoshoplogo.png';
import css3logo from '../img/css3logo.png';
import html5logo from '../img/html5logo.png';
import javascriptlogo from '../img/javascriptlogo.jpg';
import phplogo from '../img/phplogo.png';
import illustratorlogo from '../img/illustratorlogo.png';
import figmalogo from '../img/figmalogo.png';
import bootstraplogo from '../img/bootstraplogo.png';
import tailwindcsslogo from '../img/tailwindcsslogo.svg';
import wordpresslogo from '../img/wordpresslogo.svg';
import owntols from '../img/owntols.png';
import nubie from '../img/nubie.png';
import { Link } from 'react-router-dom';

const Home = (props) => (
    <div>
        <div className="lg:pl-32 lg:pr-32 p-10 text-left">
            <div className="flex flex-1 items-center">
                <div>
                    <h3 className="text-red-600 text-3xl font-bold">Hello, I'm Gagas Pandu W</h3>
                    <h2 className="font-bold text-5xl pt-1 pb-1">Software Developer And Also A Designer</h2>
                    <p className="text-sm pt-6 pb-6">I’m from Indonesia and I have programming experience. 
                    I’ve worked making program since i was studying on college for other student thesis, 
                    I build my own business since 2017, and start making the website with wordpress on 2020. 
                    Apart from developing website i also can design UI UX website or app with Figma.   
                    right now I am looking forward to collaborate with you!
                    </p>
                    <div className="flex flex-row">
                        <a className="pt-4 pr-4" target="_blank" href="https://www.linkedin.com/in/gagaspanduw">
                        <svg className="fill-current text-white hover:text-gray-400" width="26" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg></a>
                        <a className="p-4" target="_blank" href="https://www.instagram.com/gagaspanduw">
                        <svg className="fill-current text-white hover:text-gray-400" width="26" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram icon</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                        </svg></a>
                    </div>
                    <div className="flex flex-row items-center pt-5">
                        <div className="pr-5">
                            <a href="mailto:gagaspanduw@gmail.com" className="hover:bg-red-800 bg-red-600 p-2 text-sm rounded flex flex-row"><svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg> &nbsp; Mail me </a>
                        </div>
                        <a className="hover:text-gray-400 text-sm ml-2 flex flex-row" href="https://drive.google.com/file/d/1RtY6uwJqfKPCqgrTSfSM2R85N4zsdIZP/view?usp=sharing"><svg className="animate-bounce" width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                        </svg> &nbsp;Download CV</a>
                    </div>
                </div>

                <div className="lg:flex lg:flex-1 items-center lg:p-60">
                    <a></a>
                </div>
            </div>
            
            <div className="">
            <h2 className="pt-20 lg:pt-0 pb-10 font-bold text-3xl">PROJECTS</h2>
                <div className="flex flex-col justify-center">
                    <a target="_blank" href="https://www.owntols.com"><img src={owntols}></img></a>
                    <div className="pt-5 pb-20 flex flex-row">
                        <a target="_blank" href="https://www.owntols.com" className="text-sm flex flex-row">
                        <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>&nbsp;View website</a>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <a target="_blank" href="https://www.nubie.id"><img src={nubie}></img></a>
                    <div className="pt-5 pb-20 flex flex-row">
                        <a target="_blank" href="https://www.nubie.id" className="text-sm flex flex-row">
                        <svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>&nbsp;View website</a>
                    </div>
                </div>
            </div>

            <div className="lg:pr-32 lg:pl-32">
                <div className=" flex flex-col lg:flex-row justify-between p-10 bg-gray-600">
                    <div className="">
                        <h2 className="font-bold pb-3 lg:pb-0">Interesting working with me ?</h2>
                    </div>
                    <div className="flex flex-row">
                        <Link to="/project" className="hover:text-gray-400 hover:border-gray-400 mr-5 p-2 border rounded border-white text-xs lg:text-sm"> See More Project </Link>
                        <div className="lg:pr-5">
                            <a href="mailto:gagaspanduw@gmail.com" className="hover:bg-red-800 bg-red-600 p-2 text-xs text-center sm:text-left lg:text-sm rounded flex flex-row"><svg width="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg> &nbsp; Mail me </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="p-10 lg:pb-20">
                <h3 className="flex justify-center p-10 text-1xl sm:text-3xl font-bold">Why Me ?</h3>
                <div className="flex flex-col lg:flex-row justify-center">
                    <div>
                        <div className="flex justify-center">
                        <svg id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m453.669 7.5h-395.341c-18.649 0-33.768 15.118-33.768 33.768v61.195c0 18.649 15.118 33.768 33.768 33.768h26.953c4.361 0 7.659 3.946 6.886 8.237l-7.616 42.288c-.672 3.733 3.815 6.155 6.567 3.543l54.933-52.146c1.3-1.234 3.025-1.922 4.817-1.922h210.261c1.793 0 3.517.688 4.817 1.922l54.933 52.146c2.751 2.612 7.239.19 6.567-3.543l-7.616-42.288c-.773-4.292 2.526-8.237 6.886-8.237h26.953c18.649 0 33.767-15.118 33.767-33.768v-61.195c.001-18.65-15.117-33.768-33.767-33.768z" fill="#95d6a4"/><g fill="#78c2a4"><path d="m86.461 136.34c3.754.636 6.407 4.234 5.706 8.128l-7.616 42.288c-.672 3.733 3.815 6.155 6.567 3.543l54.933-52.146c1.3-1.234 3.025-1.922 4.817-1.922h-63.199c-.408-.001-.811.04-1.208.109z"/><path d="m453.669 7.5h-63.199c18.649 0 33.768 15.118 33.768 33.768v61.195c0 18.649-15.118 33.768-33.767 33.768h-29.341c1.793 0 3.517.688 4.817 1.922l54.933 52.146c2.751 2.612 7.239.19 6.566-3.543l-7.616-42.288c-.773-4.292 2.525-8.237 6.886-8.237h26.953c18.649 0 33.767-15.118 33.767-33.768v-61.195c.001-18.65-15.117-33.768-33.767-33.768z"/></g><g><g><g><g><path d="m200.286 335.071c-.765-1.606-1.172-3.358-1.194-5.136l-.245-19.792c0-24.873-8.617-47.869-23.037-66.005h-86.453c-34.385 0-62.259 27.874-62.259 62.259v187.926h93.644l-4.504-28.47c-1.525-9.639 5.928-18.357 15.686-18.35l36.758.025c11.51.017 20.85-9.308 20.851-20.818l.003-34.458c.001-6.85 5.497-12.644 12.346-12.54 9.13.138 15.212-9.356 11.292-17.585z" fill="#d5985c"/><g><path d="m213.174 362.125-12.888-27.055c-.765-1.605-1.172-3.358-1.194-5.136l-.245-19.792c0-24.873-8.617-47.869-23.037-66.005h-47.99c.23 1.752.633 3.497 1.227 5.211 3.775 10.889 5.829 22.57 5.829 34.699l.185 113.603c.035 21.192-16.555 38.688-37.719 39.78-23.919 1.234-41.329 23.176-37.092 46.749l1.823 10.142h58.669l-4.504-28.47c-1.525-9.638 5.928-18.357 15.686-18.35l36.758.025c11.51.017 20.85-9.308 20.851-20.818l.003-34.458c.001-6.85 5.497-12.644 12.346-12.54 9.131.138 15.212-9.356 11.292-17.585z" fill="#c38959"/></g><g><path d="m199.882 225.449h-105.555c-54.911 0-95.939 50.481-84.713 104.232l17.484 83.72h24.633c12.879 0 23.32-10.441 23.32-23.32v-15.22c0-8.11 3.753-15.763 10.166-20.728l26.136-20.238c9.754-7.552 15.463-19.194 15.463-31.53 0-22.023 17.854-39.877 39.877-39.877h5.025c18.005 0 32.601-14.596 32.601-32.601 0-2.451-1.986-4.438-4.437-4.438z" fill="#6b61b1"/></g><path d="m199.882 225.449h-67.58c-4.73 7.039-6.058 15.812-3.254 23.899 3.2 9.229 5.147 19.03 5.671 29.187 7.271-9.74 18.886-16.047 31.975-16.047h5.025c18.005 0 32.601-14.596 32.601-32.601-.001-2.451-1.987-4.438-4.438-4.438z" fill="#5e54ac"/></g><path d="m126.83 504.5h-106.201c-6.296 0-11.4-5.104-11.4-11.4v-13.472c0-6.728 5.796-11.993 12.493-11.348l106.201 10.223c5.846.563 10.308 5.475 10.308 11.348v3.249c0 6.296-5.104 11.4-11.401 11.4z" fill="#e28086"/><g><path d="m127.923 478.502-69.129-6.654c9.216 1.352 16.238 9.276 16.238 18.803v13.849h51.799c6.296 0 11.4-5.104 11.4-11.4v-3.249c0-5.874-4.462-10.786-10.308-11.349z" fill="#dd636e"/></g></g></g><g><g><g><path d="m311.711 335.071c.765-1.606 1.172-3.358 1.194-5.136l.245-19.792c0-24.873 8.617-47.869 23.037-66.005h86.453c34.385 0 62.259 27.874 62.259 62.259v187.926h-93.644l4.504-28.47c1.525-9.639-5.928-18.357-15.686-18.35l-36.758.025c-11.51.017-20.85-9.308-20.851-20.818l-.003-34.458c-.001-6.85-5.496-12.644-12.346-12.54-9.13.138-15.212-9.356-11.292-17.585z" fill="#ffddce"/><g><path d="m312.115 225.449h105.555c54.911 0 95.939 50.481 84.713 104.232l-17.484 83.72h-24.633c-12.879 0-23.32-10.441-23.32-23.32v-15.22c0-8.11-3.753-15.763-10.166-20.728l-26.136-20.238c-9.754-7.552-15.463-19.194-15.463-31.53 0-22.023-17.854-39.877-39.877-39.877h-5.025c-18.005 0-32.601-14.596-32.601-32.601 0-2.451 1.987-4.438 4.437-4.438z" fill="#e49542"/></g></g><g><path d="m422.64 244.137h-14.428c24.535 19.501 38.002 51.88 30.972 85.544l-17.484 83.72v80.921h63.199v-187.926c0-34.384-27.874-62.259-62.259-62.259z" fill="#ffcbbe"/><path d="m417.67 225.449h-63.2c54.911 0 95.939 50.481 84.713 104.232l-6.458 30.923c2.719 4.196 4.22 9.134 4.22 14.257v15.22c0 12.879 10.441 23.32 23.32 23.32h24.633l17.484-83.72c11.226-53.751-29.801-104.232-84.712-104.232z" fill="#e27d47"/></g><path d="m385.167 504.5h106.201c6.296 0 11.4-5.104 11.4-11.4v-13.472c0-6.728-5.796-11.993-12.493-11.348l-106.201 10.223c-5.846.563-10.308 5.475-10.308 11.348v3.249c0 6.296 5.105 11.4 11.401 11.4z" fill="#b1e4f9"/><path d="m490.276 468.28-68.92 6.634c9.818-.655 18.213 7.116 18.213 17.027v12.559h51.799c6.296 0 11.4-5.104 11.4-11.4v-13.472c0-6.728-5.795-11.993-12.492-11.348z" fill="#90d8f9"/></g></g></g></g><g><path d="m437.652 50.969c0-4.143-3.357-7.5-7.5-7.5h-348.307c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h348.307c4.143 0 7.5-3.358 7.5-7.5z"/><path d="m81.845 81.195c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h174.153c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z"/><path d="m58.328 143.73h26.352l-7.509 41.696c-.878 4.874 1.461 9.729 5.819 12.08 4.358 2.353 9.699 1.642 13.292-1.769l54.788-52.008h209.859l54.788 52.008c3.603 3.42 8.947 4.114 13.293 1.769 4.358-2.353 6.696-7.207 5.817-12.08l-7.509-41.696h26.352c22.755 0 41.268-18.513 41.268-41.268v-14.663c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v14.664c0 14.484-11.783 26.268-26.268 26.268h-26.953c-9.039 0-15.868 8.181-14.268 17.066l5.683 31.552-47.021-44.636c-2.707-2.568-6.251-3.982-9.98-3.982h-210.263c-3.73 0-7.275 1.415-9.981 3.983l-47.021 44.635 5.682-31.552c1.603-8.901-5.242-17.066-14.268-17.066h-26.952c-14.484 0-26.268-11.783-26.268-26.268v-61.195c0-14.485 11.784-26.268 26.268-26.268h395.342c14.484 0 26.268 11.783 26.268 26.268v11.479c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-11.479c-.001-22.755-18.514-41.268-41.268-41.268h-395.342c-22.755 0-41.268 18.513-41.268 41.268v61.195c0 22.755 18.513 41.267 41.268 41.267z"/><path d="m492.399 460.781v-46.604l17.326-82.963c12.21-58.471-32.449-113.265-92.056-113.265h-105.553c-6.582 0-11.938 5.355-11.938 11.938 0 13.148 6.361 24.838 16.166 32.155-7.013 15.005-10.694 31.482-10.693 48.008l-.245 19.794c-.009.687-.17 1.379-.467 2.001l-12.888 27.055c-6.269 13.165 3.352 28.312 17.867 28.312 3.211 0 5.042 2.495 5.042 5.039l.003 34.458c.002 15.622 12.643 28.317 28.312 28.317h.044l36.759-.025h.007c2.486 0 4.745 1.041 6.361 2.932 1.617 1.892 2.294 4.288 1.904 6.747l-.944 5.968-4.05.39c-9.743.938-17.091 9.025-17.091 18.813v3.249c0 10.422 8.479 18.9 18.9 18.9h106.201c10.422 0 18.9-8.479 18.9-18.9v-13.472c.002-9.887-7.66-18.282-17.867-18.847zm-74.729-227.832c50.204 0 87.614 46.156 77.372 95.198l-16.238 77.754h-18.537c-8.724 0-15.82-7.097-15.82-15.82v-15.221c0-10.354-4.888-20.319-13.073-26.657l-26.137-20.237c-7.861-6.088-12.555-15.658-12.555-25.601 0-26.124-21.254-47.377-47.378-47.377h-5.024c-12.804 0-23.399-9.637-24.915-22.039zm-19.821 215.237c-4.447-5.202-10.921-8.185-17.764-8.185-.006 0-.012 0-.017 0l-36.766.025c-.007 0-.014 0-.021 0-7.29 0-13.319-5.892-13.319-13.319l-.003-34.457c0-10.488-8.184-20.038-20.043-20.038-3.502 0-5.847-3.664-4.323-6.861l12.888-27.056c1.224-2.568 1.888-5.428 1.922-8.268l.246-19.885c0-14.34 3.165-28.574 9.189-41.541 7.113 1.92 11.978 1.247 15.464 1.387 17.854 0 32.378 14.524 32.378 32.377 0 14.549 6.868 28.553 18.371 37.461l26.137 20.236c4.544 3.519 7.257 9.051 7.257 14.798v15.221c0 16.994 13.826 30.82 30.82 30.82h17.133v41.083l-74.57 7.179.338-2.139c1.072-6.765-.867-13.631-5.317-18.838zm97.419 44.914c0 2.15-1.75 3.9-3.9 3.9h-106.201c-2.15 0-3.9-1.75-3.9-3.9v-3.249c0-2.02 1.517-3.688 3.527-3.882 20.202-1.945 84.56-8.14 106.201-10.224 2.242-.227 4.273 1.541 4.273 3.883z"/><path d="m207.057 331.846c-.3-.632-.457-1.306-.466-2.004l-.245-19.699c0-16.609-3.681-33.096-10.694-48.101 9.805-7.318 16.166-19.007 16.166-32.155 0-6.582-5.355-11.938-11.938-11.938h-105.552c-59.731 0-104.241 54.915-92.055 113.265l4.699 22.502c.847 4.055 4.816 6.656 8.875 5.809 4.055-.847 6.655-4.82 5.809-8.875l-4.699-22.502c-10.263-49.145 27.271-95.198 77.372-95.198h102.306c-1.515 12.402-12.111 22.039-24.916 22.039h-5.024c-26.124 0-47.377 21.253-47.377 47.377 0 9.942-4.693 19.513-12.555 25.601l-26.136 20.237c-8.187 6.338-13.074 16.304-13.074 26.657v15.221c0 8.724-7.097 15.82-15.82 15.82h-18.54l-4.343-20.797c-.847-4.055-4.82-6.65-8.875-5.809-4.055.847-6.655 4.82-5.809 8.875l5.431 26.006v46.606c-10.28.576-17.869 9.024-17.869 18.845v13.472c0 10.422 8.479 18.9 18.9 18.9h106.202c10.422 0 18.9-8.479 18.9-18.9v-3.249c0-9.788-7.347-17.876-17.089-18.813l-4.052-.39-.944-5.967c-.8-5.06 3.084-9.679 8.267-9.679h.006l36.752.025h.044c15.499 0 28.317-12.524 28.318-28.317l.002-34.458c0-2.619 2.029-5.073 4.732-5.042 14.591.253 24.524-14.986 18.177-28.31zm-76.326 158.005v3.249c0 2.15-1.75 3.9-3.9 3.9h-106.202c-2.151 0-3.9-1.75-3.9-3.9v-13.472c0-2.199 1.798-3.902 3.882-3.902.292 0 106.481 10.232 106.593 10.243 2.01.193 3.527 1.862 3.527 3.882zm71.347-117.639c-.027 0-.055-.001-.083-.001-11.008-.204-19.958 9.01-19.959 20.038l-.002 34.458c-.001 7.36-5.953 13.319-13.325 13.319-.007 0-.014 0-.021 0l-36.758-.025c-.006 0-.011 0-.017 0-14.337 0-25.331 12.815-23.083 27.022l.338 2.139-74.57-7.179v-41.083h17.133c16.994 0 30.82-13.826 30.82-30.82v-15.22c0-5.747 2.713-11.279 7.257-14.798l26.136-20.237c11.504-8.907 18.372-22.911 18.372-37.46 0-17.853 14.524-32.377 32.377-32.377 3.461-.139 8.361.531 15.465-1.387 6.025 12.968 9.189 27.212 9.189 41.634l.245 19.792c.035 2.842.7 5.701 1.923 8.269l12.888 27.055c1.519 3.188-.811 6.861-4.325 6.861z"/></g></g></svg>
                        </div>
                        <h6 className="flex justify-center font-bold">Communicative</h6>
                        <p className="text-sm text-center pb-10 lg:pb-0 sm:pr-20 sm:pl-20">
                        I communicate what I struggle to make all crystal clear. 
                        I can communicate my ideas well.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center">
                        <svg  id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m386.228 494.183 107.941-107.81c9.153-9.142 9.153-24.115 0-33.257l-17.797-17.747c-9.153-9.143-24.116-9.143-33.269 0l-.481.452-107.006 106.877-.454.481c-9.153 9.142-9.153 24.087 0 33.229l17.797 17.775c1.814 1.812 3.882 3.284 6.092 4.387h21.084c2.211-1.103 4.251-2.575 6.093-4.387z" fill="#dad0d3"/><path d="m335.616 442.698 107.006-106.876-46.815-46.759c-70.109-39.71-126.87 51.316-111.256 102.631z" fill="#ffdcd5"/><path d="m130.079 498.57h21.084c2.211-1.103 4.251-2.575 6.093-4.387l17.797-17.775c9.153-9.142 9.153-24.087 0-33.229l-.482-.481-107.006-106.876-.454-.452c-9.153-9.143-24.144-9.143-33.297 0l-17.768 17.747c-9.154 9.142-9.154 24.115 0 33.257l107.912 107.81c1.842 1.811 3.91 3.283 6.121 4.386z" fill="#9d9ae8"/><path d="m301.894 382.835 66.084-65.977 27.829-27.795 8.757-8.745c9.662-9.681 9.662-25.474 0-35.126-9.663-9.68-25.505-9.68-35.168 0l8.813-8.831c9.691-9.651 9.691-25.473 0-35.125-9.664-9.68-25.505-9.68-35.168 0l8.813-8.831c9.692-9.651 9.692-25.473 0-35.125-9.663-9.652-25.504-9.652-35.168 0l8.842-8.802c9.663-9.68 9.663-25.474 0-35.154-5.866-5.831-13.97-8.151-21.594-6.906-4.988.793-9.777 3.085-13.603 6.906l-35.224 35.21 1.133 1.132.198.199c9.664 9.651 9.664 25.473 0 35.125-9.663 9.68-25.504 9.68-35.168 0 9.664 9.68 9.664 25.473 0 35.153-9.691 9.652-25.504 9.652-35.196 0 9.692 9.652 9.692 25.474 0 35.126-9.663 9.651-25.476 9.651-35.168 0 9.692 9.651 9.692 25.474 0 35.125-9.663 9.68-25.504 9.68-35.168 0l-1.332-1.331-46.843 46.759 107.005 106.876 44.718-44.664c12.667-13.104 42.337-1.641 65.263-6.34 6.52-1.33 12.47-3.991 17.345-8.859z" fill="#ffd0c7"/><path d="m221.271 184.99c9.664 9.68 25.505 9.68 35.168 0 9.664-9.652 9.664-25.474 0-35.125l-.198-.199c-14.934-1.075-43.499-26.973-45.199-45.145-9.693-9.68-25.505-9.68-35.196 0-9.664 9.652-9.664 25.474 0 35.125l8.841 8.831z" fill="#ffdcd5"/><path d="m186.075 220.143c9.692 9.652 25.505 9.652 35.196 0 9.664-9.68 9.664-25.473 0-35.153l-36.584-36.512c-9.692-9.68-25.505-9.68-35.168 0-9.692 9.651-9.692 25.445 0 35.125l8.813 8.803z" fill="#ffdcd5"/><path d="m150.907 255.269c9.692 9.651 25.505 9.651 35.168 0 9.692-9.652 9.692-25.474 0-35.126l-27.743-27.738c-9.663-9.651-25.504-9.651-35.168 0-9.691 9.68-9.691 25.474 0 35.154l17.655 17.633z" fill="#ffdcd5"/><path d="m115.739 290.394c9.664 9.68 25.505 9.68 35.168 0 9.692-9.651 9.692-25.474 0-35.125l-10.088-10.077c-9.692-9.68-25.505-9.68-35.196 0-9.664 9.652-9.664 25.445 0 35.126l8.785 8.745z" fill="#ffdcd5"/><path d="m255.107 148.534 35.224-35.21c3.826-3.821 8.615-6.113 13.603-6.906l-68.041-12.878c-13.432-2.548-26.156-2.632-24.852 10.982 1.7 18.171 30.265 44.069 45.199 45.145z" fill="#ffdcd5"/></g><path d="m255.107 65.06c5.562 0 10.071-4.509 10.071-10.071v-44.918c0-5.562-4.509-10.071-10.071-10.071s-10.071 4.509-10.071 10.071v44.918c.001 5.562 4.51 10.071 10.071 10.071z"/><path d="m501.28 345.985-17.791-17.741c-6.329-6.321-14.764-9.803-23.752-9.803-5.747 0-11.264 1.43-16.153 4.109l-33.526-33.486 1.633-1.631c13.601-13.628 13.596-35.773-.001-49.355-4.859-4.868-10.922-8.114-17.531-9.48.91-3.141 1.389-6.431 1.389-9.798 0-9.355-3.634-18.127-10.212-24.678-4.86-4.868-10.922-8.114-17.531-9.48.91-3.141 1.389-6.43 1.389-9.798 0-9.356-3.634-18.127-10.223-24.688-4.976-4.97-11.093-8.116-17.516-9.455 3.436-11.847.5-25.176-8.82-34.512-7.757-7.725-18.285-11.045-28.43-9.969l-66.435-12.575c-10.132-1.922-22.785-3.193-30.771 4.092-.504.46-1.018.989-1.525 1.578-12.384-4.514-26.827-1.826-36.745 8.08-6.579 6.571-10.203 15.339-10.203 24.689 0 3.368.477 6.657 1.386 9.799-6.602 1.365-12.657 4.607-17.5 9.459-6.592 6.565-10.227 15.323-10.234 24.662-.003 3.376.476 6.676 1.39 9.826-6.605 1.362-12.664 4.598-17.522 9.45-6.592 6.585-10.222 15.358-10.222 24.703 0 7.159 2.137 13.977 6.097 19.737-5 1.695-9.58 4.516-13.415 8.347-13.61 13.593-13.615 35.739.009 49.387l1.627 1.62-33.53 33.469c-12.461-5.867-27.814-3.669-38.097 6.601l-17.802 17.752c-6.332 6.324-9.818 14.76-9.819 23.753 0 8.994 3.487 17.431 9.819 23.756l22.217 22.19c3.935 3.931 10.312 3.927 14.242-.008 3.931-3.935 3.927-10.312-.008-14.242l-22.217-22.19c-2.522-2.519-3.911-5.895-3.911-9.505 0-3.609 1.389-6.984 3.905-9.497l17.803-17.753c4.448-4.444 11.256-5.105 16.426-2.014.364.547.785 1.068 1.267 1.55.862.865 1.847 1.528 2.894 2.013l102.093 101.943c.485 1.057 1.151 2.052 2.02 2.922.846.848 1.811 1.502 2.835 1.984 2.159 2.441 3.352 5.559 3.352 8.885 0 3.61-1.389 6.985-3.911 9.504l-17.785 17.764c-5.255 5.232-13.803 5.231-19.042.016l-22.218-22.219c-3.933-3.933-10.309-3.933-14.242-.001-3.933 3.933-3.934 10.309-.001 14.242l22.233 22.235c6.545 6.516 15.139 9.774 23.736 9.774 8.6 0 17.204-3.262 23.756-9.785l17.796-17.775c6.332-6.325 9.819-14.761 9.819-23.756 0-6.419-1.785-12.549-5.105-17.835l37.736-37.69c.04-.041.081-.082.121-.122 4.321-4.467 16.354-3.631 27.991-2.823 8.268.574 17.486 1.214 26.492.176l41.324 41.275c-2.677 4.881-4.106 10.391-4.106 16.129 0 8.985 3.487 17.416 9.819 23.741l17.797 17.775c6.328 6.321 14.763 9.803 23.751 9.803 8.987 0 17.422-3.482 23.751-9.803l107.941-107.81c6.332-6.324 9.819-14.76 9.819-23.754.002-8.993-3.485-17.429-9.823-23.759zm-267.26-242.55 43.687 8.269-26.149 26.139c-4.045-1.944-9.589-5.57-15.671-11.388-8.325-7.964-14.281-17.159-14.822-22.894-.001-.003-.001-.006-.001-.009 0-.001 0-.002 0-.003-.039-.412-.049-.741-.044-.992 1.315-.32 4.815-.675 13 .878zm-51.058 8.211c5.102-5.097 13.028-5.685 18.793-1.781 3.267 13.698 14.952 26.113 20.209 31.143 3.896 3.728 16.397 14.905 29.015 17.977 1.707 2.447 2.636 5.364 2.636 8.442 0 3.965-1.525 7.672-4.304 10.448-2.771 2.776-6.484 4.304-10.456 4.304-3.973 0-7.686-1.528-10.47-4.317l-.001-.001-.005-.005-45.418-45.336c-2.769-2.765-4.294-6.472-4.294-10.436.001-3.965 1.526-7.672 4.295-10.438zm-26.316 43.947c2.771-2.775 6.48-4.304 10.446-4.304 3.971 0 7.692 1.532 10.481 4.318l36.572 36.499c5.759 5.768 5.759 15.154.02 20.902-2.786 2.775-6.512 4.303-10.491 4.303s-7.705-1.528-10.479-4.291l-.001-.001-27.745-27.739c-.043-.043-.09-.083-.134-.127l-8.68-8.676c-2.785-2.782-4.318-6.496-4.315-10.458.004-3.949 1.532-7.644 4.326-10.426zm-26.366 43.938c2.773-2.769 6.49-4.294 10.468-4.294 3.945 0 7.63 1.503 10.391 4.224l27.83 27.817c2.775 2.764 4.304 6.467 4.304 10.427 0 3.959-1.529 7.662-4.315 10.437-2.772 2.768-6.485 4.293-10.456 4.293-3.977 0-7.702-1.529-10.478-4.293l-10.089-10.077c-.002-.003-.005-.005-.007-.007l-17.647-17.626c-2.782-2.779-4.314-6.491-4.314-10.451 0-3.959 1.532-7.672 4.313-10.45zm-17.54 52.787c2.785-2.782 6.507-4.314 10.48-4.314 3.971 0 7.692 1.531 10.477 4.311l10.103 10.091c2.775 2.764 4.304 6.467 4.304 10.427s-1.529 7.662-4.325 10.448c-2.771 2.775-6.484 4.304-10.456 4.304-3.973 0-7.686-1.528-10.477-4.324l-1.265-1.26c-.017-.017-.03-.035-.046-.051-.019-.018-.039-.034-.058-.052l-8.727-8.693c-5.759-5.772-5.764-15.141-.01-20.887zm205.234 114.457c-3.931-3.936-10.308-3.939-14.242-.009l-8.96 8.948c-8.514 8.514-23.941 7.442-38.861 6.407-16.201-1.126-32.954-2.288-43.795 8.842l-37.095 37.05-92.763-92.627 32.828-32.769c5.426 3.326 11.687 5.109 18.238 5.109 9.358 0 18.135-3.628 24.69-10.195 6.599-6.572 10.234-15.343 10.234-24.699 0-.087-.006-.173-.006-.26.087.001.174.006.261.006 9.346 0 18.115-3.617 24.679-10.173 6.599-6.572 10.234-15.344 10.234-24.699 0-.087-.006-.173-.006-.26.088 0 .176.006.265.006 9.343 0 18.117-3.613 24.725-10.194 6.86-6.871 10.253-15.917 10.188-24.944.09 0 .18.006.27.006 9.359 0 18.134-3.628 24.699-10.205 6.579-6.571 10.203-15.339 10.203-24.689 0-6.538-1.778-12.789-5.093-18.205l28.773-28.761c2.144-2.135 4.788-3.475 7.559-4.028.3-.032.596-.08.889-.138 4.446-.613 9.115.758 12.515 4.145 5.759 5.769 5.759 15.155.021 20.903l-8.763 8.727c-.029.029-.06.055-.089.085l-10.092 10.076c-3.936 3.93-3.94 10.307-.009 14.242 3.932 3.936 10.308 3.939 14.242.009l8.798-8.786c.002-.002.004-.004.006-.006l1.33-1.325c5.775-5.722 15.131-5.71 20.9.051 2.776 2.764 4.305 6.467 4.305 10.427 0 3.959-1.529 7.662-4.327 10.448l-8.813 8.831c-.001.001-.002.002-.003.004l-10.092 10.051c-3.941 3.925-3.954 10.302-.029 14.242 3.925 3.941 10.301 3.953 14.242.029l10.138-10.097c2.771-2.776 6.484-4.304 10.456-4.304 3.973 0 7.687 1.528 10.478 4.324 2.776 2.765 4.304 6.468 4.304 10.427s-1.528 7.662-4.32 10.442l-17.57 17.577c-3.932 3.934-3.931 10.31.002 14.242 1.967 1.966 4.543 2.948 7.12 2.948 2.578 0 5.156-.984 7.122-2.951l8.611-8.614c.049-.047.102-.088.151-.137 2.771-2.776 6.484-4.304 10.456-4.304s7.686 1.528 10.467 4.314c5.753 5.747 5.748 15.117.001 20.875l-8.755 8.745c-.003.003-.007.006-.01.009s-.006.007-.009.01l-13.896 13.879c-3.935 3.931-3.939 10.307-.009 14.243 1.967 1.969 4.547 2.954 7.126 2.954 2.576 0 5.151-.982 7.117-2.945l6.797-6.789 32.577 32.539-92.755 92.642-33.234-33.194c2.317-1.49 4.534-3.242 6.615-5.323l8.955-8.944c3.936-3.928 3.94-10.305.009-14.24zm169.078 12.472-107.941 107.81c-2.525 2.522-5.905 3.911-9.517 3.911s-6.992-1.389-9.518-3.912l-17.797-17.775c-2.522-2.518-3.911-5.888-3.911-9.489 0-3.6 1.389-6.97 3.911-9.489l107.941-107.81c2.526-2.523 5.906-3.912 9.518-3.912s6.992 1.389 9.523 3.918l17.791 17.741c2.522 2.519 3.911 5.893 3.911 9.503 0 3.611-1.389 6.986-3.911 9.504z"/><path d="m121.378 56.57c1.966 1.962 4.54 2.942 7.114 2.942 2.58 0 5.161-.986 7.128-2.957 3.929-3.937 3.923-10.313-.014-14.242l-36.698-36.625c-3.936-3.93-10.313-3.924-14.242.014-3.929 3.937-3.923 10.313.014 14.242z"/><path d="m381.722 59.513c2.575 0 5.151-.982 7.117-2.945l36.67-36.626c3.935-3.93 3.939-10.307.008-14.242-3.93-3.936-10.306-3.939-14.242-.008l-36.67 36.626c-3.935 3.93-3.939 10.307-.008 14.242 1.967 1.968 4.546 2.953 7.125 2.953z"/><path d="m62.82 433.204c-3.899 3.966-3.845 10.343.122 14.242l.029.028c1.957 1.924 4.498 2.882 7.038 2.882 2.607 0 5.214-1.009 7.189-3.018 3.899-3.966 3.83-10.357-.136-14.256s-10.342-3.844-14.242.122z"/><path d="m342.606 352.267c1.532 0 3.086-.349 4.545-1.084 4.966-2.505 6.961-8.561 4.457-13.527-2.505-4.966-8.562-6.962-13.527-4.457l-.056.028c-4.966 2.505-6.933 8.547-4.429 13.513 1.768 3.508 5.324 5.527 9.01 5.527z"/></svg>
                        </div>
                        <h6 className="flex justify-center font-bold">Collaborative</h6>
                        <p className="text-sm text-center pb-10 lg:pb-0 sm:pr-20 sm:pl-20">
                        I can work within a team, collaborate well with developers because 
                        I’m frontend-end myself, and I love feedbacks.
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-center">
                        <svg id="Flat" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><g><g><circle cx="256" cy="256" fill="#25b1fa" r="184"/><circle cx="256" cy="256" fill="#b3e9ff" r="152"/><path d="m264 233.371v-97.371h-16v97.371a24.12 24.12 0 0 0 -14.629 14.629h-65.371v16h65.371a24 24 0 1 0 30.629-30.629zm-8 30.629a8 8 0 1 1 8-8 8.009 8.009 0 0 1 -8 8z" fill="#25b1fa"/></g><g><path d="m198 24h-164a10 10 0 0 0 -10 10v124a10 10 0 0 0 10 10h131.333l42.667 32v-166a10 10 0 0 0 -10-10z" fill="#fbd373"/><g fill="#fffdfa"><path d="m64 128h104v-57.052l-47.562 31.708a8 8 0 0 1 -8.876 0l-47.562-31.708z"/><path d="m149.578 64h-67.156l33.578 22.385z"/></g></g><g><path d="m314 488h164a10 10 0 0 0 10-10v-124a10 10 0 0 0 -10-10h-131.333l-42.667-32v166a10 10 0 0 0 10 10z" fill="#fbd373"/><path d="m416 376v16h-80v64h120v-80z" fill="#fffdfa"/><path d="m384 416h24v16h-24z" fill="#fbd373"/></g><g><path d="m338 48h140a10 10 0 0 1 10 10v100a10 10 0 0 1 -10 10h-110l-40 32v-142a10 10 0 0 1 10-10z" fill="#fbd373"/><path d="m405.656 136a8 8 0 0 1 -5.656-2.343l-24-24 11.313-11.314 17.806 17.8 34.392-41.269 12.289 10.247-40 48a8 8 0 0 1 -5.784 2.871c-.116.008-.239.008-.36.008z" fill="#fffdfa"/></g><g><path d="m174 463h-140a10 10 0 0 1 -10-10v-108a10 10 0 0 1 10-10h110l40-32v150a10 10 0 0 1 -10 10z" fill="#fbd373"/><path d="m144 375-24 8v2a10 10 0 0 0 -10-10h-44a10 10 0 0 0 -10 10v28a10 10 0 0 0 10 10h44a10 10 0 0 0 10-10v2l24 8h8v-48z" fill="#fffdfa"/></g></g></svg>
                        </div>
                        <h6 className="flex justify-center font-bold">Good Management</h6>
                        <p className="text-sm text-center pb-1 lg:pb-0 sm:pr-20 sm:pl-20">
                        I manage the whole process from acquiring clients, project timeline, until product delivery.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="bg-gray-600 lg:pl-20 lg:pr-20">
            <h3 className="flex justify-center p-10 text-3xl font-bold">Skills</h3>
            <div className="flex flex-col justify-center pb-10">
                <div className="flex flex-row justify-center">
                <a className="p-5"><img width="100" height="100" src={photoshoplogo}></img></a>
                <a className="p-5"><img width="100" height="100" src={illustratorlogo}></img></a>
                <a className="p-5"><img width="100" height="100" src={figmalogo}></img></a>
                <a className="p-5"><img width="100" height="100" src={css3logo}></img></a>
                <a className="p-5"><img width="100" height="100" src={html5logo}></img></a>
                </div>
                <div className="flex flex-row justify-center">
                <a className="p-5"><img width="100" height="100" src={javascriptlogo}></img></a>
                <a className="p-5"><img className="bg-gray-200 rounded" width="100" height="100" src={phplogo}></img></a>
                <a className="p-5"><img width="100" height="100" src={bootstraplogo}></img></a>
                <a className="p-5"><img className="bg-gray-200 rounded" width="100" height="100" src={tailwindcsslogo}></img></a>
                <a className="p-5"><img className="bg-gray-200 rounded" width="100" height="100" src={wordpresslogo}></img></a>
                </div>
             </div>
        </div>

    </div>

)
export default Home