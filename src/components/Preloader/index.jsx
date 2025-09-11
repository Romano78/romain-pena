'use client';
import { motion } from 'framer-motion';


const Preloader = ({ progress }) => {
    return (
        <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
        >
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
        </motion.div>
    );
};

export default Preloader;
