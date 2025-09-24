#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const envContent = `# Firebase Configuration
# Replace these with your actual Firebase credentials from the Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Firebase Admin SDK (for server-side operations)
# FIREBASE_ADMIN_PROJECT_ID=your_project_id
# FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email@your_project_id.iam.gserviceaccount.com
# FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
`;

const envPath = path.join(process.cwd(), ".env");

try {
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log("⚠️  .env already exists. Skipping creation.");
    console.log(
      "   If you want to update it, please delete the existing file first."
    );
  } else {
    // Create .env file
    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file created successfully!");
    console.log("   Firebase configuration has been set up.");
    console.log(
      "   You can now start your development server with: npm run dev"
    );
  }
} catch (error) {
  console.error("❌ Error creating .env file:", error.message);
  process.exit(1);
}
