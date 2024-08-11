import React, { useEffect, useState } from 'react';
import './GreenSquares.css';
import { useCurrentUser } from './Services/CurrentUserService.tsx';
import BigButton from './BigButton/BigButton';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { firestore } from './Auth/FirebaseConfig';
import { useFetchUserByEmail } from './Auth/UserData';
import Spinner from "react-bootstrap/Spinner"; // Ensure correct path

const GreenSquares = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser, setCurrentUser } = useCurrentUser();
    const { fetchUserByEmail } = useFetchUserByEmail();

    useEffect(() => {
        const loadUserData = async () => {
            if (currentUser?.email) {
                try {
                    const userData = await fetchUserByEmail(currentUser.email);
                    if (userData) {
                        setCurrentUser(userData);
                        console.log("User changed " +currentUser);
                    }
                } catch (err) {
                    setError('Failed to load user data.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // No email, just stop loading
            }
        };

        loadUserData();
    }, [currentUser?.email, fetchUserByEmail, setCurrentUser]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    const currentYear = new Date().getFullYear();
    const isLeapYear = currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0);
    const daysInYear = isLeapYear ? 366 : 365;
    const daysArray = Array.from({ length: daysInYear }, (_, i) => {
        const date = new Date(currentYear, 0, 1);
        date.setDate(date.getDate() + i);
        return date;
    });

    const handleClick = async () => {
        if (currentUser) {
            const today = Timestamp.fromDate(new Date());
            const updatedProgress = [...currentUser.progress, today];
            setCurrentUser({
                ...currentUser,
                progress: updatedProgress
            });

            const userStorage = {
                email: currentUser.email,
                name: currentUser.name,
                progress: updatedProgress.map(date => date.toDate()) // Convert Timestamp to Date
            };

            // Store user data in Firestore
            const userDoc = doc(collection(firestore, 'users'), currentUser.email);
            await setDoc(userDoc, userStorage);
        }
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
