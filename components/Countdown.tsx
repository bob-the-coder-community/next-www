import React from 'react';
import dayjs from 'dayjs';

type Props = {
    time: number;
    finished: () => void;
};

function Countdown(props: Props) {
    const { time } = props;
    const [timeLeft, setTimeLeft] = React.useState((time * 60) * 1000);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(timeLeft - 1000);

            if (timeLeft <= 0) {
                clearInterval(interval);
                props.finished();
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <span>{dayjs().startOf('day').add(timeLeft / 1000, 'seconds').format('mm:ss')}</span>
    )
}

export default Countdown;