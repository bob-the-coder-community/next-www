import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { withSentry } from '@sentry/nextjs';

const API_KEY = process.env.OPEN_AI_KEY;
const ORGANIZATION_KEY = process.env.OPEN_AI_ORGANIZATION_KEY;

type Response = {
    status: number;
    message: string | object;
    data?: {
        index: 0;
        text: string;
        finish_reason: string;
    }[];
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({
                status: 405,
                message: 'Method not allowed',
            });
            return;
        }

        const { question } = req.body;
        const { data } = <any>await axios('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${API_KEY}`,
                'content-type': 'application/json',
                // @ts-ignore
                'openai-organization': ORGANIZATION_KEY,
            },
            data: {
                "prompt": `<|endoftext|>/* I start with a blank HTML page, and incrementally modify it via <script> injection. Written for Chrome. */\n/* Command: Add \"Hello World\", by adding an HTML DOM node */\nvar helloWorld = document.createElement('div');\nhelloWorld.innerHTML = 'Hello World';\ndocument.body.appendChild(helloWorld);\n/* Command: Clear the page. */\nwhile (document.body.firstChild) {\n  document.body.removeChild(document.body.firstChild);\n}\n\n/* Command: ${question} */\n`,
                "stream": false,
                "max_tokens": 50,
                "temperature": 0,
                "stop": "/* Command:"
            },
            redirect: 'follow',
        });

        res.status(200).json({
            status: 200,
            message: data.choices,
        });

        res.end();
        return Promise.resolve();
    } catch (err: any) {
        res.status(500).json({
            status: 500,
            message: 'INTERNAL_SERVER_ERROR',
        });
    }
}

export default withSentry(handler);