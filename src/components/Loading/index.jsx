'use client';
import { useEffect, useState } from 'react';
import style from './style.css';

const Loading = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prevProgress + (100 - prevProgress) * 0.2; // Ease-out effect
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className={style}>
            <div className="mx-auto px-4 h-full flex flex-col items-center justify-center min-h-screen bg-foreground">
                <div className={`w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden mb-4`}>
                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-white text-lg font-medium">
                    Loading... {Math.round(progress)}%
                </p>
            </div>
        </div>
    );
};

export default Loading;
