import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const readFile = promisify(fs.readFile);

// POST method to upload the image
// export async function POST(req) {
//   const imagePath = path.resolve("./public/content/motivational.jpg");

//   try {
//     // Read the image file into a buffer
//     const file = await readFile(imagePath);
//     console.log("Image file successfully read!");

//     // Upload the image using Cloudinary's uploader
//     const uploadResult = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.v2.uploader.upload_stream(
//         { resource_type: "image" },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );

//       // Pipe the file buffer to Cloudinary upload stream
//       uploadStream.end(file);
//     });

//     console.log("Cloudinary upload completed successfully:", uploadResult);

//     // Log the successful upload and return the URL
//     return NextResponse.json(
//       { status: "Good", url: uploadResult.secure_url },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error during upload:", error);
//     return NextResponse.json(
//       { error: "Error uploading to Cloudinary", details: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req) {
  try {
    const { base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 }
      );
    }

    // Decode the base64 image to a buffer
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove data URL prefix
    const imageBuffer = Buffer.from(base64Data, "base64");

    console.log("Image data successfully decoded!");

    // Upload the image buffer to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Pipe the image buffer to the Cloudinary upload stream
      uploadStream.end(imageBuffer);
    });

    console.log("Cloudinary upload completed successfully:", uploadResult);

    // Return the URL of the uploaded image
    return NextResponse.json(
      { status: "Good", url: uploadResult.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during upload:", error);
    return NextResponse.json(
      { error: "Error uploading to Cloudinary", details: error.message },
      { status: 500 }
    );
  }
}
