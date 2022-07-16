import React from 'react';

const ClockIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.05859 12.6134C2.05859 15.326 3.13615 17.9274 5.05421 19.8455C6.97227 21.7635 9.57372 22.8411 12.2863 22.8411C14.9988 22.8411 17.6003 21.7635 19.5183 19.8455C21.4364 17.9274 22.5139 15.326 22.5139 12.6134C22.5139 9.90087 21.4364 7.29942 19.5183 5.38136C17.6003 3.4633 14.9988 2.38574 12.2863 2.38574C9.57372 2.38574 6.97227 3.4633 5.05421 5.38136C3.13615 7.29942 2.05859 9.90087 2.05859 12.6134V12.6134Z" stroke={color} strokeWidth="1.84098" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.2871 12.6137V8.96094" stroke={color} strokeWidth="1.84098" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.2871 12.6133L16.8525 17.1797" stroke={color} strokeWidth="1.84098" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ClockIcon;
