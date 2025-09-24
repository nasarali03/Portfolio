#!/usr/bin/env node

/**
 * Script to help identify and optionally clear projects with placeholder images
 * Run this to see which projects are using placeholder images
 */

// Load environment variables from .env file
require("dotenv").config();

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} = require("firebase/firestore");

// Firebase configuration - requires .env file with your credentials
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that required environment variables are present
if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId
) {
  console.error("❌ Error: Missing Firebase configuration!");
  console.error(
    "   Please ensure your .env file contains all required Firebase credentials."
  );
  console.error("   Run 'npm run setup:env' to create a template .env file.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkPlaceholderImages() {
  try {
    console.log("🔍 Checking for projects with placeholder images...\n");

    const projectsRef = collection(db, "projects");
    const snapshot = await getDocs(projectsRef);

    let placeholderCount = 0;
    let uploadedImageCount = 0;

    console.log("📋 Project Image Status:");
    console.log("=".repeat(50));

    snapshot.forEach((doc) => {
      const data = doc.data();
      const hasPlaceholder =
        data.imageUrl && data.imageUrl.includes("picsum.photos");
      const hasUploadedImage =
        data.imageUrl && data.imageUrl.startsWith("data:image");

      console.log(`\n📁 Project: ${data.title}`);
      console.log(`   ID: ${doc.id}`);
      console.log(
        `   Image Type: ${
          hasUploadedImage
            ? "✅ Uploaded Image"
            : hasPlaceholder
            ? "🖼️ Placeholder"
            : "❌ No Image"
        }`
      );

      if (hasPlaceholder) {
        placeholderCount++;
        console.log(`   Placeholder URL: ${data.imageUrl}`);
      } else if (hasUploadedImage) {
        uploadedImageCount++;
        console.log(`   ✅ Has uploaded image (base64)`);
      }
    });

    console.log("\n" + "=".repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   Total Projects: ${snapshot.size}`);
    console.log(`   With Placeholder Images: ${placeholderCount}`);
    console.log(`   With Uploaded Images: ${uploadedImageCount}`);
    console.log(
      `   Without Images: ${
        snapshot.size - placeholderCount - uploadedImageCount
      }`
    );

    if (placeholderCount > 0) {
      console.log("\n💡 To fix placeholder images:");
      console.log("   1. Go to /admin/projects");
      console.log("   2. Edit each project with placeholder images");
      console.log("   3. Upload a real image for each project");
      console.log("   4. Save the changes");
    }
  } catch (error) {
    console.error("❌ Error checking projects:", error);
  }
}

// Run the check
checkPlaceholderImages()
  .then(() => {
    console.log("\n✅ Check complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
