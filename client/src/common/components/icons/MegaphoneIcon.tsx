import React from 'react';

const MegaphoneIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 9.69379V15.0271" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 3.02713V21.6938" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 11.0271L22 4.36046" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 13.6938L22 20.3605" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.88965 14.9907V15.0271C5.92757 16.2501 6.34067 17.4317 7.07293 18.4119C7.80519 19.3921 8.82118 20.1234 9.98314 20.5066C11.1451 20.8898 12.3968 20.9064 13.5685 20.5542C14.7402 20.2019 15.7752 19.4978 16.5332 18.5374" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default MegaphoneIcon;
