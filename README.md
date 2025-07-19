# Frame Lane Prototype App

## Project Overview
Frame Lane is a company specializing in picture framing. This prototype app enables users to upload images, select frame styles, room settings, and sizes, and place orders without needing direct communication with the admin. The app streamlines the ordering process by sending order details directly to an admin dashboard. Future plans include integrating a payment channel for immediate transactions.

## Features
- **Image Upload:** Users can upload photos via drag-and-drop or file selection. Supported formats include JPG, PNG, and HEIC up to 10MB.
- **Frame Style Selection:** Choose from multiple frame styles with visual previews.
- **Room Selection:** Select a room setting to preview how the framed picture will look in context.
- **Size & Pricing:** Select from various sizes with clear pricing and free shipping.
- **Order Form:** Submit contact and delivery details with validation. Orders are saved to Firebase Firestore and images uploaded to Firebase Storage.
- **Order Confirmation:** Users receive a confirmation with order status and contact information.
- **Admin Dashboard:** Admins can view and manage orders through a dedicated dashboard.

## Technology Stack
- **Next.js:** React framework for server-side rendering and static site generation.
- **React:** UI library for building interactive components.
- **Firebase:**
  - Firestore: NoSQL database for storing order data.
  - Storage: Secure storage for uploaded images.
  - Authentication: Anonymous sign-in for order submission.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Lucide-react:** Icon library used throughout the UI.
- **TypeScript:** Static typing for safer and more maintainable code.
- **Vercel:** Recommended platform for deployment.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- A Firebase project set up with Firestore and Storage enabled.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase credentials in the project.

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production
```bash
npm run build
npm start
```

### Deployment
The app can be deployed easily on platforms like Vercel. Refer to [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## Project Structure
- `app/`: Main application pages and layout components.
- `components/`: Reusable React components such as ImageUploader, FrameSelector, OrderForm, etc.
- `lib/`: Firebase configuration and utility functions.
- `constants/`: Static data including frame options, sizes, and pricing.
- `public/`: Static assets like images and fonts.
- `styles/`: Global CSS and Tailwind configuration.
- `types/`: TypeScript type definitions.

## Usage Guide
1. Upload your photo using drag-and-drop or file selection.
2. Select your preferred frame style.
3. Choose a room setting to preview your framed picture.
4. Select the size and view pricing details.
5. Fill out the order form with your contact and delivery information.
6. Submit your order and receive confirmation with status updates.

## Admin Dashboard
Admins can log in to the dashboard to view and manage incoming orders. The dashboard provides order details and status tracking.

## Future Enhancements
- Integration of a payment channel for immediate transactions.
- Addition of more frame styles, sizes, and room options.
- Enhanced order tracking and notification features.
- Improved admin dashboard functionalities.

## Contact and Support
For further inquiries or support, contact:
- Phone: +2349031585326
- Email: theframelane@gmail.com

---

This documentation provides an overview and guide to the Frame Lane prototype app. For any questions or contributions, please reach out via the contact information above.
