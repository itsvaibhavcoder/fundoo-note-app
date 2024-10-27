import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
async function sendEmail(email: string, token: string): Promise<void> {
    const transporter: Transporter = createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailOptions: SendMailOptions = {
        to: email,
        from: 'vaibhavsukale9449@gmail.com',
        subject: 'Password Reset',
        text: `Reset your password using this token: ${token}`,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;
