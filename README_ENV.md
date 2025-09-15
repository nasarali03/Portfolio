# Environment Setup

## Quick Setup

Run this command to automatically create your `.env` file with Firebase credentials:

```bash
npm run setup:env
```

## Manual Setup

If you prefer to set up manually, create a `.env` file in your project root with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on the web app icon or "Add app" if none exists
6. Copy the configuration object values

## Security Note

- The `.env` file is automatically ignored by Git
- Never commit your `.env` file to version control
- Keep your Firebase credentials secure

## After Setup

1. Start your development server: `npm run dev`
2. Access the admin dashboard at: `http://localhost:9002/admin`
3. Test the functionality to ensure everything works
