import React from 'react';
import './GreenSquares.css';
import { useCurrentUser } from './Services/CurrentUserService.tsx';
import BigButton from './BigButton/BigButton';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { firestore } from './Auth/FirebaseConfig';

const GreenSquares = () => {
    const currentYear = new Date().getFullYear();
    const isLeapYear = currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    const daysArray = Array.from({ length: daysInYear }, (_, i) => {
        const date = new Date(currentYear, 0, 1);
        date.setDate(date.getDate() + i);
        return date;
    });
    const { currentUser, setCurrentUser } = useCurrentUser();

    const handleClick = async () => {
        const today = Timestamp.fromDate(new Date());
        if(currentUser.progress.find())
        currentUser.progress.push(today);
        setCurrentUser(currentUser);
        const userStorage = {
            email: currentUser.email,
            name: currentUser.name,
            progress: currentUser.progress.map(date => date.toDate()) // Convert Timestamp to Date
        };

        // Store user data in Firestore
        const userDoc = doc(collection(firestore, 'users'), currentUser.email);
        await setDoc(userDoc, userStorage);
    };

    // Helper function to convert Firestore Timestamps to JavaScript Date objects
    const convertDatesInProgress = () => {
        return currentUser.progress.map(date => date.toDate ? date.toDate() : new Date(date));
    };

    // Helper function to check if a date is in the user's progress
    const isDateInProgress = (date) => {
        const progressDates = convertDatesInProgress();
        return progressDates.some(progressDate => progressDate.toDateString() === date.toDateString());
    };

    return (
        <div className="flex-container">
            <BigButton label="Click Me!" onClick={handleClick} />
            <div className="squares">
                {daysArray.map((date, index) => (
                    <div
                        key={index}
                        className={`square ${isDateInProgress(date) ? 'green' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default GreenSquares;
