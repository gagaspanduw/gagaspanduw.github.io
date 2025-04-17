import React from 'react';

const Logo = () => {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Custom logo with initials GPW */}
      <rect width="40" height="40" rx="20" fill="#F87171" />
      <path 
        d="M10 12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V28C30 29.1046 29.1046 30 28 30H12C10.8954 30 10 29.1046 10 28V12Z" 
        fill="#1F2937" 
      />
      <path 
        d="M15.5 16.5C15.5 14.5 16.75 13 18.5 13C20 13 21 13.75 21.5 15M15.5 16.5C15.5 18.5 16.75 20 18.5 20C20 20 21 19.25 21.5 18M15.5 16.5H20.5M14 22L18 28M18 22L22 28M24 13L28 20M24 27L28 20" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;