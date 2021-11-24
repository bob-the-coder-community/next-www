import axios, { AxiosResponse } from 'axios';
import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { ENV } from '../../const';
import { decode } from '../../services/markdown';
// import chromium from 'chrome-aws-lambda';
import dayjs from 'dayjs';
import ejs from 'ejs';
import { send } from '../../services/api/sendgrid';

const template: string = `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Assessment Complete</title> <style> @import url('https://fonts.googleapis.com/css2?family=Epilogue&family=Space+Grotesk:wght@400;500;700&display=swap'); html, body { padding: 0; margin: 0; font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; zoom: .8; } .header { background-color: #000; text-align: center; color: #fff; padding: 16px; font-size: 18px; } .main-information { margin: 16px; background-color: #FADF75; border-radius: 5px; padding: 16px; } .key { font-weight: bold; padding: 10px 0; } .value { font-family: 'Epilogue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; } .info-row { margin-bottom: 25px; } .questions { margin: 16px; margin-top: 50px; } .question-item { margin-bottom: 50px; } .question { padding: 10px; background-color: #F0CA86; margin-bottom: 10px; border-radius: 5px; } .question p { margin: 0; } .option { margin-bottom: 10px; padding-left: 10px; border-left: 5px solid transparent; } .selected { border-left: 5px solid #24D460; } </style> </head> <body> <div class="header"> bobForCompany - Assessment Report </div> <div class="main-information"> <table> <thead> <tr> <td width="150px"></td> <td></td> </tr> </thead> <tbody> <tr class="info-row"> <td class="key">Full name:</td> <td class="value"> <%= full_name %> </td> </tr> <tr class="info-row"> <td class="key">Email address:</td> <td class="value"> <%= email %> </td> </tr> <tr class="info-row"> <td class="key">Phone Number:</td> <td class="value"> +91 <%= phone %> </td> </tr> <tr class="info-row"> <td class="key">Company:</td> <td class="value"> <%= company %> </td> </tr> <tr class="info-row"> <td class="key">Job:</td> <td class="value"> <a href="<%= jobLink %>" target="_blank"> <%= jobTitle %> </a> </td> </tr> <tr class="info-row"> <td class="key">Submitted:</td> <td class="value"> <%= submitted %> </td> </tr> </tbody> </table> </div> <div class="questions"> <h4>Report</h4> <% questions.forEach(function(question, index) { %> <div class="question-item"> <div class="question"> <%- question.question %> </div> <div class="options"> <% question.options.forEach(function(option, index) { %> <div class="option <%= option.label %>"> <%- option.value %> </div> <% }); %> </div> </div> <% }); %> </div> </body> </html>`;

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

        // const fileName = `/tmp/report-${ Math.random() }.pdf`;
        const html = await ejs.render(`${template}`, formData);
        const pdf = await axios.post(ENV.APIs.htmlToPdf, {
            html,
        });

        // const browser = await chromium.puppeteer.launch({ 
        //     headless: chromium.headless,
        //     args: chromium.args,
        //     executablePath: await chromium.executablePath,
        //     ignoreHTTPSErrors: true,
        //     defaultViewport: chromium.defaultViewport,
        // });
        // const page = await browser.newPage();
        // await page.setContent(html);

        // await page.pdf({
        //     path: fileName,
        //     format: 'a4',
        //     printBackground: true,
        // });

        await send({
            from: `${ full_name } <${ slug }>@e.bobthecoder.org`,
            to: (process.env.ADMIN_EMAILS || '').split(','),
            subject: `APPLICATION: ${ full_name } - ${ data[0].Title }`,
            text: `<p>${ full_name } has applied for the job: ${ data[0].Title }</p>`,
            html: `<p>${ full_name } has applied for the job: ${ data[0].Title }</p>`,
            attachments: [
                {
                    // @ts-ignore
                    content: pdf.data.string,
                    filename: 'report.pdf',
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