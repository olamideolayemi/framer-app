"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImageUrl = exports.sendOrderConfirmation = void 0;
// import { setGlobalOptions } from 'firebase-functions';
const functions = __importStar(require("firebase-functions/v1"));
const admin = __importStar(require("firebase-admin"));
const nodemailer = __importStar(require("nodemailer"));
const params_1 = require("firebase-functions/params");
// import {onRequest} from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });
// require('dotenv').config();
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();
const gmailUser = (0, params_1.defineSecret)('GMAIL_USER');
const gmailPass = (0, params_1.defineSecret)('GMAIL_PASS');
exports.sendOrderConfirmation = functions
    .runWith({ secrets: [gmailUser, gmailPass] }) // ✅ Attach secrets here
    .region('us-central1') // optional, but good practice
    .firestore.document('orders/{orderId}')
    .onCreate(async (snap) => {
    const order = snap.data();
    if (!order)
        return;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser.value(),
            pass: gmailPass.value(),
        },
    });
    const mailOptions = {
        from: 'Frame Lane <info@frame_lane.com>',
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
			<li>Image: <a href="${order.image}" target="_blank">View Image</a></li>
			<li>Price: $${order.price}</li>
			<li>Phone: ${order.phone}</li>
		</ul>
		<p>We’ll update you once your order is being processed.</p>
		<p>Regards,<br/>Frame Lane Team</p>
	  `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to', order.email);
    }
    catch (error) {
        console.error('Failed to send email:', error);
    }
});
exports.generateImageUrl = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
    const orderData = snap.data();
    const filePath = orderData.image;
    if (!filePath)
        return;
    try {
        const bucket = storage.bucket();
        const file = bucket.file(filePath);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        await db
            .collection('orders')
            .doc(context.params.orderId)
            .update({ image: url });
        console.log('✅ Image URL generated and saved');
    }
    catch (err) {
        console.error('❌ Error generating download URL:', err);
    }
});
//# sourceMappingURL=index.js.map