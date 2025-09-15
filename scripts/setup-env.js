#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const envContent = `# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBHupN4OPYTnFxsYnlu-gDqc2uWBd542-Y
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=studio-3597294011-e2531.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=studio-3597294011-e2531
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=studio-3597294011-e2531.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=88247050202
NEXT_PUBLIC_FIREBASE_APP_ID=1:88247050202:web:56e1984b11e6ceda7aeae3

# Optional: Firebase Admin SDK (for server-side operations)
# FIREBASE_ADMIN_PROJECT_ID=studio-3597294011-e2531
# FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account-email@studio-3597294011-e2531.iam.gserviceaccount.com
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
