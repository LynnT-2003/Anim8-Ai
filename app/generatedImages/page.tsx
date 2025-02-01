// if (cloudinaryData.url) {
//   // Save the URL to MongoDB
//   const saveResponse = await fetch("/api/generatedImages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       image: cloudinaryData.url,
//       prompt: imagePrompts[0], // include prompt for context if needed
//     }),
//   });

//   const saveResult = await saveResponse.json();
//   console.log("Saved image data:", saveResult);
// }
//   }

"use client";
import React, { useState, useEffect } from "react";

const GeneratedImagesPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<string[]>([]);
  const [contextTexts, setContextTexts] = useState<string[]>([]);

  const handleSubmitClick = async () => {
    const prompt =
      "Write a script to generate a 30-second video on the topic: interesting historical story along with AI image prompt in realistic format for each scene. Give me result in JSON format ONLY with imagePrompt and contextText as fields.";
    console.log(prompt);

    try {
      const imagePromptsToGenerate = JSON.parse(
        localStorage.getItem("imagePrompts") || "[]"
      );
      const contextTexts = JSON.parse(
        localStorage.getItem("contextTexts") || "[]"
      );
      setContextTexts(contextTexts as string[]);

      console.log("Image prompts to generate:", imagePromptsToGenerate);
      console.log("Creating an image for prompt:", imagePromptsToGenerate[0]);

      const results = await Promise.all(
        imagePromptsToGenerate.map(async (prompt: string, index: number) => {
          const newBody = {
            input: {
              workflow: {
                5: {
                  inputs: {
                    width: 1024,
                    height: 1024,
                    batch_size: 1,
                  },
                  class_type: "EmptyLatentImage",
                },
                6: {
                  inputs: {
                    text: prompt,
                    clip: ["11", 0],
                  },
                  class_type: "CLIPTextEncode",
                },
                8: {
                  inputs: {
                    samples: ["13", 0],
                    vae: ["10", 0],
                  },
                  class_type: "VAEDecode",
                },
                9: {
                  inputs: {
                    filename_prefix: "ComfyUI",
                    images: ["8", 0],
                  },
                  class_type: "SaveImage",
                },
                10: {
                  inputs: {
                    vae_name: "ae.safetensors",
                  },
                  class_type: "VAELoader",
                },
                11: {
                  inputs: {
                    clip_name1: "t5xxl_fp8_e4m3fn.safetensors",
                    clip_name2: "clip_l.safetensors",
                    type: "flux",
                  },
                  class_type: "DualCLIPLoader",
                },
                12: {
                  inputs: {
                    unet_name: "flux1-dev.safetensors",
                    weight_dtype: "fp8_e4m3fn",
                  },
                  class_type: "UNETLoader",
                },
                13: {
                  inputs: {
                    noise: ["25", 0],
                    guider: ["22", 0],
                    sampler: ["16", 0],
                    sigmas: ["17", 0],
                    latent_image: ["5", 0],
                  },
                  class_type: "SamplerCustomAdvanced",
                },
                16: {
                  inputs: {
                    sampler_name: "euler",
                  },
                  class_type: "KSamplerSelect",
                },
                17: {
                  inputs: {
                    scheduler: "beta",
                    steps: 20,
                    denoise: 1,
                    model: ["12", 0],
                  },
                  class_type: "BasicScheduler",
                },
                22: {
                  inputs: {
                    model: ["12", 0],
                    conditioning: ["6", 0],
                  },
                  class_type: "BasicGuider",
                },
                25: {
                  inputs: {
                    noise_seed: 43054,
                  },
                  class_type: "RandomNoise",
                },
              },
            },
          };

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_RUNPOD_SERVERLESS_ENDPOINT}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_RUNPOD_API_KEY}`, // Include Bearer token
              },
              body: JSON.stringify(newBody),
            }
          );

          const data = await response.json();
          console.log("Parsed JSON data:", data);
          if (data.output.message) {
            const base64Image = data.output.message;

            // Call Cloudinary upload function
            const cloudinaryResponse = await fetch("/api/upload-image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ base64Image }),
            });
            const cloudinaryData = await cloudinaryResponse.json();
            console.log("Cloudinary URL:", cloudinaryData.url);
            localStorage.setItem("image1", JSON.stringify(cloudinaryData.url));
            return cloudinaryData.url;
          }
          return null;
        })
      );
      console.log("All image generation results:", results);
      setImages(results.filter((url) => url !== null) as string[]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmitClick();
  }, []);

  return (
    <div className="my-12">
      {loading && <div>Loading...</div>}
      {!loading && images.length > 0 && (
        <div className="flex flex-wrap gap-[1%] items-center justify-center">
          {images.map((image, index) => (
            <div key={index} className="w-[30%] 2xl:w-[22%] mb-[1%]">
              <img
                src={image}
                alt={`Generated image ${index + 1}`}
                className="w-full h-auto"
              />
              <div className="flex flex-col justify-between min-h-[80px] mt-2">
                <p className="text-white text-center px-4">
                  {contextTexts[index]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && images.length === 0 && <div>No images generated yet.</div>}
    </div>
  );
};

export default GeneratedImagesPage;
