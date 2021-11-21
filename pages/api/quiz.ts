import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from "@sentry/nextjs";
import { iQuiz } from '../../types/Quiz';

async function handler(req: NextApiRequest, res: NextApiResponse<object>) {
	try {
		const response: AxiosResponse<iQuiz> = await axios.get(`https://content.bobthecoder.org/mc-qs?Date=${dayjs('2021-11-06').format('YYYY-MM-DD')}`);
    if (response.status !== 200) {
        res.status(response.status).write(response)
        res.end();

        return;
    }
    res.status(200).json({
        status: 200,
        message: response.data,
    });
    return res.end();
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: 'INTERNAL_SERVER_ERROR',
		});

		return;
	}
}

export default withSentry(handler);
