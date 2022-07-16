import React from 'react';

const WritingPencilIcon = ({ size = 24, color = "#111029" }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5958 14.2595L9.29639 14.7315L9.76748 11.4312L18.2524 2.94624C18.6275 2.57118 19.1362 2.36047 19.6666 2.36047C20.197 2.36047 20.7057 2.57118 21.0807 2.94624C21.4558 3.3213 21.6665 3.82998 21.6665 4.3604C21.6665 4.89081 21.4558 5.3995 21.0807 5.77455L12.5958 14.2595Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.3333 14.3608V21.0272C18.3333 21.3808 18.1928 21.7199 17.9428 21.97C17.6927 22.22 17.3536 22.3605 17 22.3605H3.66726C3.31365 22.3605 2.97453 22.22 2.72449 21.97C2.47445 21.7199 2.33398 21.3808 2.33398 21.0272V7.69446C2.33398 7.34086 2.47445 7.00173 2.72449 6.7517C2.97453 6.50166 3.31365 6.36119 3.66726 6.36119H10.3336" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default WritingPencilIcon;

