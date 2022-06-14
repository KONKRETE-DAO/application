import React from 'react';

const GraphAscendIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9999 13.0938V6.4938H16.3999" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 6.4938L15.2374 14.2564C15.1012 14.3927 14.9395 14.5008 14.7615 14.5746C14.5835 14.6483 14.3927 14.6863 14.2 14.6863C14.0073 14.6863 13.8165 14.6483 13.6385 14.5746C13.4605 14.5008 13.2988 14.3927 13.1626 14.2564L10.1041 11.1979C9.96788 11.0616 9.80616 10.9535 9.62815 10.8797C9.45015 10.806 9.25935 10.768 9.06667 10.768C8.87398 10.768 8.68319 10.806 8.50518 10.8797C8.32717 10.9535 8.16545 11.0616 8.02924 11.1979L1 18.2271" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default GraphAscendIcon;
