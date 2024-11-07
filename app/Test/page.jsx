"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Your custom button component

const Page = () => {
  const handleUpload = async () => {
    console.log("Uploading image...");
    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
      });

      const data = await response.json();

      // Check if the URL exists in the response
      if (data.url) {
        console.log("Image uploaded successfully!", data.url); // Log the URL
        alert(`Image uploaded successfully! URL: ${data.url}`);
      } else {
        console.log("Upload failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
  };

  return (
    <div>
      <Button onClick={handleUpload}>Test Upload</Button>
    </div>
  );
};

export default Page;
