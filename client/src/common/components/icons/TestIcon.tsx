import React from 'react';

const TestIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3333 20.6667C20.3333 21.0203 20.1929 21.3594 19.9428 21.6095C19.6928 21.8595 19.3536 22 19 22H4.33333C3.97971 22 3.64057 21.8595 3.39052 21.6095C3.14048 21.3594 3 21.0203 3 20.6667V3.33333C3 2.97971 3.14048 2.64057 3.39052 2.39052C3.64057 2.14048 3.97971 2 4.33333 2H13.7813C14.1347 2.00008 14.4736 2.14043 14.7236 2.39022L19.9431 7.60978C20.1929 7.85973 20.3333 8.19862 20.3333 8.552V20.6667Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.2615 8.24684L8.36639 10.7731C8.30905 10.8494 8.23599 10.9125 8.15214 10.9582C8.0683 11.0039 7.97562 11.031 7.88038 11.0377C7.78515 11.0445 7.68957 11.0307 7.60013 10.9973C7.51069 10.9639 7.42946 10.9117 7.36194 10.8442L6.3335 9.81662" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.2615 14.2468L8.36639 16.7731C8.30905 16.8494 8.23599 16.9125 8.15214 16.9582C8.0683 17.0039 7.97562 17.031 7.88038 17.0377C7.78515 17.0445 7.68957 17.0307 7.60013 16.9973C7.51069 16.9639 7.42946 16.9117 7.36194 16.8442L6.3335 15.8157" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 11.0397H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 16.3731H17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default TestIcon;


