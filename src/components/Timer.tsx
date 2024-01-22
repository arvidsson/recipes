import React, { useEffect, useState } from "react";

type TimerProps = {
  defaultTime: number;
  onTimerComplete: () => void;
};

const Timer = ({ defaultTime, onTimerComplete }: TimerProps) => {
  const [time, setTime] = useState(defaultTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isResettable, setIsResettable] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      onTimerComplete();
    }

    return () => clearInterval(timer);
  }, [isRunning, time, onTimerComplete]);

  const startTimer = () => {
    setIsRunning(true);
    setIsResettable(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(defaultTime * 60);
    setIsRunning(false);
    setIsResettable(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex justify-end mt-2">
      <div className="flex border px-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="inline mr-2"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div>{formatTime(time)}</div>
      </div>
      {isRunning ? (
        <button
          className="border-y border-r px-2"
          onClick={stopTimer}
          disabled={!isRunning}
        >
          Stopp
        </button>
      ) : (
        <>
          <button
            className="border-y border-r px-2"
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          {isResettable ? (
            <button
              className="border-y border-r px-2"
              onClick={resetTimer}
              disabled={isRunning}
            >
              Återställ
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Timer;
