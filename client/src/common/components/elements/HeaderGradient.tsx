import React from 'react';

const HeaderGradient = ({ width = 500, height = 100, color = "#111029" }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 916 252" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden">
            <mask id="mask0_2736_11403" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="28" y="20" width="860" height="196">
                <path d="M28.5 20.5H887.5V214.883H28.5V20.5Z" fill="white" fillOpacity="0.5" stroke="white" />
            </mask>
            <g mask="url(#mask0_2736_11403)">
                <g filter="url(#filter0_bd_2736_11403)">
                    <path d="M28 20H888V215.383H28V20Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges" />
                    <path d="M28.5 20.5H887.5V214.883H28.5V20.5Z" stroke="white" shapeRendering="crispEdges" />
                </g>
                <g filter="url(#filter1_f_2736_11403)">
                    <path d="M-27.8118 72.5331C-158.91 35.2932 -200.53 158.391 -204.953 224.595C-189.242 254.594 -121.586 416.386 -48.393 441.212C18.452 463.886 131.243 286.937 334.839 268.575C409.907 261.805 520.273 353.676 604.669 333.612C917.958 259.133 562.5 -178.315 460.635 -113.146C358.77 -47.976 136.061 119.083 -27.8118 72.5331Z" fill="#51D5FF" />
                </g>
                <g filter="url(#filter2_f_2736_11403)">
                    <path d="M315.595 126.129C226.505 90.8338 176.629 169.12 162.827 212.675C169.417 233.843 192.577 346.625 241.671 369.007C286.507 389.448 396.602 281.194 547.155 285.468C602.665 287.044 667.981 356.899 732.381 350.411C971.445 326.327 783.735 7.44737 699.45 42.4419C615.165 77.4364 426.959 170.247 315.595 126.129Z" fill="#C39EFF" />
                </g>
                <g opacity="0.9" filter="url(#filter3_f_2736_11403)">
                    <path d="M458.065 259.264C361.589 231.859 359.306 334.379 356.051 383.099C367.612 405.175 404.201 453.896 458.065 472.166C525.394 495.003 721.306 518.135 951.857 463.325C1182.41 408.515 993.988 -23.4507 919.025 24.508C844.062 72.4668 578.66 293.521 458.065 259.264Z" fill="#CBAEFF" />
                </g>
            </g>
            <defs>
                <filter id="filter0_bd_2736_11403" x="-6" y="-14" width="928" height="265.384" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImage" stdDeviation="17" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2736_11403" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="8" />
                    <feGaussianBlur stdDeviation="14" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.078875 0 0 0 0 0.0770833 0 0 0 0 0.166667 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="effect1_backgroundBlur_2736_11403" result="effect2_dropShadow_2736_11403" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2736_11403" result="shape" />
                </filter>
                <filter id="filter1_f_2736_11403" x="-524.878" y="-439.666" width="1575.82" height="1202.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="159.962" result="effect1_foregroundBlur_2736_11403" />
                </filter>
                <filter id="filter2_f_2736_11403" x="6.32321" y="-116.741" width="999.559" height="644.822" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="78.2515" result="effect1_foregroundBlur_2736_11403" />
                </filter>
                <filter id="filter3_f_2736_11403" x="36.1263" y="-299.126" width="1346.61" height="1116.15" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="159.962" result="effect1_foregroundBlur_2736_11403" />
                </filter>
            </defs>
        </svg >

    )
}

export default HeaderGradient;

