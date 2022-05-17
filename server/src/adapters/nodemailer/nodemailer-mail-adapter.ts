import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d70dd1cfdb877c",
        pass: "276d4a7a6a702f"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Diego Barbosa <diegobarbosamorim@gmail.com>',
            subject,
            html: body
        })
    }
}
