import React from 'react';

const FirstLetterImage = ({ name, size = 100, color = 'blue' }) => {
    const firstLetter = name ? name[0].toUpperCase() : '';
    const sizeClass = `w-${size} h-${size}`;
    const fontSizeClass = `text-${size/2}`;

    return (
        <div className={`${sizeClass} rounded-full bg-${color}-500 flex justify-center items-center text-white ${fontSizeClass}`}>
            {firstLetter}
        </div>
    );
};

export default FirstLetterImage;
