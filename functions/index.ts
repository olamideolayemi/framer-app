import { defineSecret } from 'firebase-functions/params';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

require('dotenv').config();

admin.initializeApp();

const gmailUser = defineSecret('GMAIL_USER');
const gmailPass = defineSecret('GMAIL_PASS');

// 🔐 Use Gmail or a custom SMTP
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: gmailUser,
		pass: gmailPass,
	},
});

export const sendOrderConfirmation = functions
  .runWith({ secrets: ['GMAIL_USER', 'GMAIL_PASS'] })
  .firestore.document('orders/{orderId}')
  .onCreate(async (snap: { data: () => any; }) => {
    const order = snap.data();

		const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser.value(),
        pass: gmailPass.value(),
      },
    });

		const mailOptions = {
			from: 'Frame Lane <your-email@gmail.com>',
			to: order.email, // This should be an email field from your form
			subject: '🖼️ Your Frame Order Confirmation',
			html: `
        <h3>Hi ${order.name},</h3>
        <p>Thank you for placing your order with Frame Lane!</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Frame: ${order.frame}</li>
          <li>Size: ${order.size}</li>
          <li>Room: ${order.room}</li>
        </ul>
        <p>We’ll update you once your order is being processed.</p>
        <p>Regards,<br/>Frame Lane Team</p>
      `,
		};

		try {
			await transporter.sendMail(mailOptions);
			console.log('Email sent to', order.email);
		} catch (error) {
			console.error('Failed to send email:', error);
		}
	});
