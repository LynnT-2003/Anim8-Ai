import connectMongoDB from "../../../configs/Mongodb";
import generatedImageModel from "../../../models/generatedImageModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongoDB();
  try {
    const { image, prompt } = await req.json();
    const newGeneratedImage = new generatedImageModel({ image, prompt });
    await newGeneratedImage.save();
    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error during upload:", error);
    return NextResponse.json(
      { error: "Error uploading to MongoDB", details: error.message },
      { status: 500 }
    );
  }
}
