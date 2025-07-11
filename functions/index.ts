const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

require('dotenv').config();

admin.initializeApp();

// 🔐 Use Gmail or a custom SMTP
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
	},
});

exports.sendOrderConfirmation = functions.firestore
	.document('orders/{orderId}')
	.onCreate(async (snap: { data: () => any }, context: any) => {
		const order = snap.data();

		const mailOptions = {
			from: 'Frame Lane <your-email@gmail.com>',
			to: order.contact, // This should be an email field from your form
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
			console.log('Email sent to', order.contact);
		} catch (error) {
			console.error('Failed to send email:', error);
		}
	});
