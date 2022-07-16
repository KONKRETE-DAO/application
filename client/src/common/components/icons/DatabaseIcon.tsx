import React from 'react';

const DatabaseIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0004 10.0004C17.5235 10.0004 22.0009 8.20941 22.0009 6.00018C22.0009 3.79094 17.5235 2 12.0004 2C6.47735 2 2 3.79094 2 6.00018C2 8.20941 6.47735 10.0004 12.0004 10.0004Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 6.00018V11.9996C2 14.2085 6.47753 15.9997 12.0004 15.9997C17.5234 15.9997 22.0009 14.2094 22.0009 11.9996V6.00018" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 11.9995V17.9998C2 20.2088 6.47753 22 12.0004 22C17.5234 22 22.0009 20.2088 22.0009 17.9998V11.9995" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default DatabaseIcon;
