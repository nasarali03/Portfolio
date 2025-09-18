#!/usr/bin/env node

/**
 * Script to clean up all placeholder images across all sections
 * This will help identify and optionally clear placeholder images from all collections
 */

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

// Firebase configuration
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyBHupN4OPYTnFxsYnlu-gDqc2uWBd542-Y",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "studio-3597294011-e2531.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-3597294011-e2531",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "studio-3597294011-e2531.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "88247050202",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:88247050202:web:56e1984b11e6ceda7aeae3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkAllPlaceholderImages() {
  try {
    console.log("🔍 Checking for placeholder images across all sections...\n");

    const collections = [
      { name: "projects", imageField: "imageUrl" },
      { name: "experience", imageField: "logoUrl" },
      { name: "singletons", imageField: "profileUrl" },
    ];

    let totalPlaceholders = 0;
    let totalUploadedImages = 0;
    let totalItems = 0;

    for (const collectionInfo of collections) {
      console.log(`📋 ${collectionInfo.name.toUpperCase()} Collection:`);
      console.log("=".repeat(50));

      try {
        const collectionRef = collection(db, collectionInfo.name);
        const snapshot = await getDocs(collectionRef);

        let collectionPlaceholders = 0;
        let collectionUploadedImages = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const imageField = collectionInfo.imageField;
          const imageUrl = data[imageField];

          if (imageUrl) {
            const hasPlaceholder = imageUrl.includes("picsum.photos");
            const hasUploadedImage = imageUrl.startsWith("data:image");
            const hasLocalImage = imageUrl.startsWith("/");

            console.log(
              `\n📁 ${
                collectionInfo.name === "singletons"
                  ? doc.id
                  : data.title || data.company || "Item"
              }`
            );
            console.log(`   ID: ${doc.id}`);
            console.log(
              `   Image Type: ${
                hasUploadedImage
                  ? "✅ Uploaded Image (base64)"
                  : hasLocalImage
                  ? "📁 Local Image"
                  : hasPlaceholder
                  ? "🖼️ Placeholder"
                  : "❌ No Image"
              }`
            );

            if (hasPlaceholder) {
              collectionPlaceholders++;
              console.log(`   Placeholder URL: ${imageUrl}`);
            } else if (hasUploadedImage) {
              collectionUploadedImages++;
              console.log(`   ✅ Has uploaded image (base64)`);
            } else if (hasLocalImage) {
              console.log(`   📁 Local image: ${imageUrl}`);
            }
          } else {
            console.log(
              `\n📁 ${
                collectionInfo.name === "singletons"
                  ? doc.id
                  : data.title || data.company || "Item"
              }`
            );
            console.log(`   ID: ${doc.id}`);
            console.log(`   Image Type: ❌ No Image`);
          }
        });

        console.log(`\n📊 ${collectionInfo.name} Summary:`);
        console.log(`   Total Items: ${snapshot.size}`);
        console.log(`   With Placeholder Images: ${collectionPlaceholders}`);
        console.log(`   With Uploaded Images: ${collectionUploadedImages}`);
        console.log(
          `   Without Images: ${
            snapshot.size - collectionPlaceholders - collectionUploadedImages
          }`
        );

        totalPlaceholders += collectionPlaceholders;
        totalUploadedImages += collectionUploadedImages;
        totalItems += snapshot.size;
      } catch (error) {
        console.error(
          `❌ Error checking ${collectionInfo.name}:`,
          error.message
        );
      }

      console.log("\n" + "=".repeat(50) + "\n");
    }

    console.log("🎯 OVERALL SUMMARY:");
    console.log("=".repeat(50));
    console.log(`   Total Items Across All Collections: ${totalItems}`);
    console.log(`   Total Placeholder Images: ${totalPlaceholders}`);
    console.log(`   Total Uploaded Images: ${totalUploadedImages}`);
    console.log(
      `   Items Without Images: ${
        totalItems - totalPlaceholders - totalUploadedImages
      }`
    );

    if (totalPlaceholders > 0) {
      console.log("\n💡 To fix placeholder images:");
      console.log("   1. Go to the admin dashboard");
      console.log(
        "   2. Navigate to each section (Projects, Experience, Settings)"
      );
      console.log("   3. Edit each item with placeholder images");
      console.log("   4. Upload real images for each item");
      console.log("   5. Save the changes");
      console.log("\n🔧 The system will now:");
      console.log("   - Preserve uploaded images when editing");
      console.log("   - Only use placeholders as fallbacks");
      console.log("   - Convert uploaded images to base64 for storage");
    } else {
      console.log(
        "\n✅ No placeholder images found! All images are either uploaded or local."
      );
    }
  } catch (error) {
    console.error("❌ Error checking collections:", error);
  }
}

// Run the check
checkAllPlaceholderImages()
  .then(() => {
    console.log("\n✅ Cleanup check complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
