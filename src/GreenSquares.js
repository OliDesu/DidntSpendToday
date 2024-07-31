import React from 'react';
import './GreenSquares.css';

const GreenSquares = () => {
    const currentYear = new Date().getFullYear();
    const isLeapYear = currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;

    const daysArray = Array.from({ length: daysInYear });

    return (
        <div className="flex-container">
            {daysArray.map((_, index) => (
                <div key={index} className="square" />
            ))}
        </div>
    );
};

export default GreenSquares;