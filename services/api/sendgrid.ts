import { AttachmentData } from '@sendgrid/helpers/classes/attachment';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
sgMail.setApiKey(process.env.SENDGRID || '');

type SendgridOptions = {
    from: string;
    to: string | string[];
    subject: string;
    text: string;
    html: string;
    attachments: AttachmentData[];
}
async function send({ from, to, subject, text, html, attachments }: SendgridOptions): Promise<string> {
    try {
        await sgMail.send({
            from,
            to,
            subject,
            text,
            html,
            attachments: <AttachmentData[]>(attachments || []),
        });

        console.log('Email sent successfully');
        return Promise.resolve('Email sent successfully');
    } catch (err) {
        return Promise.reject(err);
    }
}

export {
    send,
}