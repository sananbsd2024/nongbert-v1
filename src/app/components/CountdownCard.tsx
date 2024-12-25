'use client'

// pages/index.tsx
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="card bg-white shadow-lg rounded-lg p-6 max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Countdown Timer</h1>
        <div className="text-4xl font-mono text-gray-800 mb-4">
          {formatTime(timeLeft)}
        </div>
        {timeLeft === 0 && <p className="text-red-500">Time's up!</p>}
      </div>
    </div>
  );
};

export default CountdownTimer;

