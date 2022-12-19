import { useEffect, useState } from 'react';
import useCountdown from '../../hooks/useCountdown';
import { getFormattedTime } from '../../utils/date';
import { Span, SpanProps } from '../Common/Span';

interface Props extends SpanProps {
  targetTimestamp: number;
  onCountdownEnded?: () => void;
}

function Countdown({ targetTimestamp, onCountdownEnded, ...rest }: Props) {
  const displayTime = useCountdown(targetTimestamp, 1000);
  const [needEndCallback, setNeedEndCallback] = useState(!!onCountdownEnded);

  useEffect(() => {
    if (!needEndCallback || !onCountdownEnded) return;

    if (displayTime < 0) {
      setNeedEndCallback(false);
      onCountdownEnded();
    }
  }, [displayTime, needEndCallback, onCountdownEnded]);

  return <Span {...rest}>{getFormattedTime(displayTime)}</Span>;
}

export default Countdown;
