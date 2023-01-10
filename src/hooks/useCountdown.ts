import { useEffect, useState } from 'react';

const useCountdown = (targetTimestamp: number, checkInterval = 1000) => {
  const [countdown, setCountdown] = useState(targetTimestamp - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = targetTimestamp - new Date().getTime();
      setCountdown(newCountdown);

      if (newCountdown < 0) clearInterval(interval);
    }, checkInterval);

    return () => clearInterval(interval);
  }, [targetTimestamp, checkInterval]);

  return countdown;
};

export default useCountdown;
