import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from "@sentry/nextjs";

type Response = {
	status: number;
	message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    try {
        const { url } = <{ url: string }>req.query;

        if (!url) {
            res.status(400).write('BAD REQUEST');
            res.end();
            return;
        }

        res.redirect(url);
        return;
    } catch (err) {
		res.status(500).json({
			status: 500,
			message: 'INTERNAL_SERVER_ERROR',
		});

		return;
	}
}

export default withSentry(handler);