import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import { Blog } from '../../types/Blogs';
import { withSentry } from "@sentry/nextjs";

const API_KEY = process.env.NoCodeAPIKey;

type Response = {
	status: number;
	message: string | object;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    try {
        const response: AxiosResponse<{
            data: Blog[];
        }> = await axios.get(`https://v1.nocodeapi.com/bobtehcoder/google_sheets/bcOgqTOxmWjdKXsV?tabId=Blogs&api_key=${ API_KEY }`);
        if (response.status !== 200) {
            res.status(response.status).write(response)
            res.end();

            return;
        }

        res.status(200).json({
            status: 200,
            message: response.data.data,
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