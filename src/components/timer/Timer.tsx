import { Progress } from "antd"
import { useEffect, useState } from "react";

interface TimerProps {
    timeRemaining: number;
    totalTime: number;
    paused?: boolean; 
}

const Timer = ({timeRemaining, totalTime, paused}: TimerProps) => {
    const [time, setTime] = useState(timeRemaining);

  useEffect(() => {
    setTime(timeRemaining);
  }, [timeRemaining]);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
        setTime((prev) => Math.max(prev - 1000, 0))
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, timeRemaining])

  const getRemainingPercentage = (remaining: number, total: number) => {
    if (total === 0) return 0;
    return Math.max((remaining / total) * 100, 0);
  };

  const formatCountdown = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, "0");

    if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    if (minutes > 0) return `${pad(minutes)}:${pad(seconds)}`;

    return `${pad(seconds)}`;
  };

  const displayTime = formatCountdown(time);
  const percent = getRemainingPercentage(time, totalTime);

  return (
    <Progress type="circle" percent={percent} format={() => displayTime} />
  );
}

export default Timer;