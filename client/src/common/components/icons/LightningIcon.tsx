import React from 'react';

const LightningIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.222 2.36047L5.46641 12.556C5.39764 12.6369 5.35346 12.7357 5.3391 12.8408C5.32473 12.946 5.34079 13.053 5.38536 13.1494C5.42993 13.2457 5.50115 13.3272 5.5906 13.3843C5.68005 13.4414 5.78399 13.4717 5.89011 13.4716H9.77752V22.3605L18.5331 12.1649C18.6018 12.0842 18.6459 11.9855 18.6603 11.8805C18.6748 11.7755 18.6588 11.6685 18.6144 11.5723C18.57 11.476 18.499 11.3945 18.4098 11.3372C18.3206 11.28 18.2168 11.2495 18.1109 11.2494H14.222V2.36047Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default LightningIcon;
