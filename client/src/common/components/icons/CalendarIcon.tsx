import React from 'react';

const CalendarIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.6667 5.02715H3.33333C2.59695 5.02715 2 5.6241 2 6.36048V21.0271C2 21.7635 2.59695 22.3605 3.33333 22.3605H20.6667C21.403 22.3605 22 21.7635 22 21.0271V6.36048C22 5.6241 21.403 5.02715 20.6667 5.02715Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 10.3605H22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.3335 7.02714V2.36047" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.6665 7.02714V2.36047" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default CalendarIcon;
