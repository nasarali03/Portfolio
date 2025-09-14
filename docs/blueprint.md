# **App Name**: Firebase FolioFlow

## Core Features:

- Dynamic Portfolio Display: Dynamically renders portfolio sections (About, Projects, Experience, Education, Certifications) from Firestore data.
- Project Card Generation Tool: AI-powered tool that suggests a project card summary based on the project title and description added to the dashboard, incorporating only the salient details from that data.
- Admin Dashboard with CRUD Operations: Admin interface for creating, reading, updating, and deleting portfolio data in Firestore.
- Firebase Authentication: Secure user authentication with Firebase Auth, supporting email/password and Google login. Role-based access control for the admin dashboard.
- Contact Form with Email Notification: Contact form that stores submissions in Firestore and sends email notifications via Firebase Functions.
- Realtime Preview: Show preview of how changes will look before saving in the admin dashboard.
- Settings and Data Export: Settings page in the dashboard to upload a resume (PDF stored in Firebase Storage) and export all data as a JSON backup.

## Style Guidelines:

- Primary color: Deep purple (#6750A4) for sophistication and modernity.
- Background color: Light purple (#F2F0F9) for a clean, professional look.
- Accent color: Teal (#00A3AD) for highlighting key elements and calls to action.
- Body font: 'PT Sans', a humanist sans-serif that is suitable for longer texts and headlines.
- Code font: 'Source Code Pro' for displaying code snippets.
- Fully responsive layout with a modern, minimal design using Tailwind CSS and shadcn/ui components, featuring soft shadows and rounded corners (2xl).
- Smooth animations and transitions using Framer Motion for enhanced user experience.