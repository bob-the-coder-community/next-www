// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ENV } from '../../const';

type Response = {
	status: number;
	message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	try {
		if (req.method !== 'POST') {
			res.status(405).json({
				status: 405,
				message: 'METHOD_NOT_FOUND',
			});
	
			return;
		}
	
		const { email } = req.body;
		const { data }: AxiosResponse<{
			is_reachable: string;
			disposable: string;
			format_valid: boolean;
			domain: string;
			smtp_connect: string;
			is_deliverable: boolean;
			status: string;
		}> = await axios.get(`https://v1.nocodeapi.com/bobtehcoder/email-verify/erYMqNFtODbngFqW?email=${email}&api_key=${ ENV.NoCodeAPI.API_KEY }`);
		await axios.post(`https://v1.nocodeapi.com/bobtehcoder/google_sheets/yHcXGbJVflxgYwCu?tabId=List&api_key=${ ENV.NoCodeAPI.API_KEY }`, [
			[
				dayjs().format('HH:mm DD MMM YYYY'),
				email,
				data.disposable,
				data.format_valid ? 'VALID' : 'INVALID',
				data.domain,
				data.smtp_connect,
				data.is_deliverable ? 'YES' : 'NO',
				data.status.toUpperCase(),
			]
		], {
			headers: {
				'content-type': 'application/json',
			}
		});
	
		res.status(200).json({
			status: 200,
			message: 'SUCCESS',
		});
	
		return;
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: 'INTERNAL_SERVER_ERROR',
		});

		return;
	}
}
