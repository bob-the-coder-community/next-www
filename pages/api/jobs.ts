import axios, { AxiosResponse } from 'axios';
import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { ENV } from '../../const';
import { decode } from '../../services/markdown';
import puppeteer from 'puppeteer';
import dayjs from 'dayjs';
import ejs from 'ejs';
import fs from 'fs';
import { send } from '../../services/api/sendgrid';

type Response = {
	status: number;
	message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
	try {
		if (req.method !== 'POST') {
			res.status(405).json({
				status: 405,
				message: 'METHOD_NOT_FOUND',
			});
	
			return;
		}
        
        const { full_name, email, phone, resume, slug, questions } = req.body;
        const response: AxiosResponse<any> = await axios.get(`${ ENV.baseUrl }/jobs/?Slug=${ slug }`);
        const { data } = response;

        const formData = {
            full_name,
            email,
            phone,
            resume,
            company: data[0].Company.Name,
            questions: questions.map((question: any) => {
                return {
                    question: decode(question.question),
                    options: question.options.map((option: any) => {
                        return {
                            value: decode(option.value),
                            label: option.selected ? 'selected' : '',
                        }
                    })
                }
            }),
            jobTitle: data[0].Title,
            jobLink: `https://bobthecoder.org/jobs/company/${data[0].Slug}`,
            submitted: dayjs().format('MMMM DD YYYY, h:mm:ss a'),
        }

        const html = await ejs.renderFile(`${process.env.PWD}/others/email_templates/job-application.ejs`, formData);
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        const fileName = `/tmp/report-${ Math.random() }.pdf`;
        await page.setContent(html);

        await page.pdf({
            path: fileName,
            format: 'a4',
            printBackground: true,
        });

        await send({
            from: `${ full_name } <${ slug }>@e.bobthecoder.org`,
            to: (process.env.ADMIN_EMAILS || '').split(','),
            subject: `APPLICATION: ${ full_name } - ${ data[0].Title }`,
            text: `<p>${ full_name } has applied for the job: ${ data[0].Title }</p>`,
            html: `<p>${ full_name } has applied for the job: ${ data[0].Title }</p>`,
            attachments: [
                {
                    content: fs.readFileSync(fileName).toString('base64'),
                    filename: (fileName).split('/').pop() || 'report',
                    type: 'application/pdf',
                    disposition: 'attachment',
                },
                {
                    content: `${ resume.replace(/"/gi, '').replace('data:application/pdf;base64,', '') }`,
                    filename: `${ full_name }-${ dayjs().format('DD MMM YYYY') }-CV.pdf`,
                    type: 'application/pdf',
                    disposition: 'attachment',
                }
            ],
        });

        res.status(200).json({
            status: 200,
            message: 'SUCCESS',
        });

        return;
    } catch (err) {
        console.error(err);
		res.status(500).json({
			status: 500,
			message: 'INTERNAL_SERVER_ERROR',
		});

		return;
	}
}

export default withSentry(handler);

// SAMPLE REQUEST
// 
// 
// curl --location --request POST 'http://localhost:3000/api/jobs' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "full_name": "Sanjay Achar",
//     "email": "sanjay@bobthecoder.org",
//     "phone": "9999999999",
//     "questions": [
//         {
//             "question": "The main purpose of a “Live Wire” in NetScape is to ________",
//             "options": [
//                 { "value": "Create linkage between client side and server side", "selected": true },
//                 { "value": "Create linkage between client side and server side", "selected": false },
//                 { "value": "Create linkage between client side and server side", "selected": false },
//                 { "value": "Create linkage between client side and server side", "selected": false }
//             ]
//         },
//         {
//             "question": "The main purpose of a “Live Wire” in NetScape is to ________",
//             "options": [
//                 { "value": "Create linkage between client side and server side", "selected": false },
//                 { "value": "Create linkage between client side and server side", "selected": true },
//                 { "value": "Create linkage between client side and server side", "selected": false },
//                 { "value": "Create linkage between client side and server side", "selected": false }
//             ]
//         }        
//     ],
//     "slug": "data-entry-internship-in-bangalore-at-knowhere-studio",
//     "resume": ""
// }'