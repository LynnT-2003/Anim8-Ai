"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import PlayerDialog from "../PlayerDialog";

const MainSection = () => {
  const imagelistDemo = [
    "/content/fantasy.jpg",
    "/content/historical.jpg",
    "/content/motivational.jpg",
    "/content/fantasy.jpg",
    "/content/historical.jpg",
    "/content/motivational.jpg",
  ];

  const router = useRouter();
  const [openDuration, setOpenDuration] = useState(false);
  const [showimages, setShowimages] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("");
  const [duration, setDuration] = useState(0);
  const [script, setScript] = useState();
  const [imagePrompts, setImagePrompts] = useState();
  const [loading, setLoading] = useState(false);
  const [contextTexts, setContextTexts] = useState();
  const [images, setImages] = useState([]);

  // test
  const [generatedImageResults, setGeneratedImageResults] = useState([]);

  const onCreateClickHandler = () => {
    getVideoScript();
  };

  const onGenerateImagesClickHandler = async () => {
    getVideoScript();
  };

  const handleGenerateClick = async () => {
    getVideoScript();
    router.push("/generatedImages");
  };

  const getVideoScript = async () => {
    const prompt =
      "Write a script to generate a 30-second video on the topic: interesting historical story along with AI image prompt in realistic format for each scene. Give me result in JSON format ONLY with imagePrompt and contextText as fields.";
    console.log(prompt);

    try {
      const res = await axios.post("/api/get-video-script", {
        prompt,
      });

      const imagePromptsData = res.data.result.map((item) => item.imagePrompt);
      const contextTextsData = res.data.result.map((item) => item.contextText);

      setScript(res.data);
      setImagePrompts(imagePromptsData);
      setContextTexts(contextTextsData);

      localStorage.setItem("script", JSON.stringify(res.data));
      localStorage.setItem("imagePrompts", JSON.stringify(imagePromptsData));
      localStorage.setItem("contextTexts", JSON.stringify(contextTextsData));
      return imagePrompts;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Configuration has been updated to:", {
      content,
      style,
      duration,
    });
  }, [content, style, duration]);

  useEffect(() => {
    console.log("Script", script);
  }, [script]);

  useEffect(() => {
    if (imagePrompts?.length) {
      console.log("Image Prompts:", imagePrompts);
    }
  }, [imagePrompts]);

  const handleSubmitClick = async () => {
    console.log("Generating video script...");
    setLoading(true);
    const prompt =
      "Write a script to generate a 30-second video on the topic: interesting historical story along with AI image prompt in realistic format for each scene. Give me result in JSON format ONLY with imagePrompt and contextText as fields.";

    try {
      const res = await axios.post("/api/get-video-script", {
        prompt,
      });

      const imagePromptsData = res.data.result.map((item) => item.imagePrompt);
      const contextTextsData = res.data.result.map((item) => item.contextText);

      setScript(res.data);
      setImagePrompts(imagePromptsData);
      setContextTexts(contextTextsData);

      localStorage.setItem("script", JSON.stringify(res.data));
      localStorage.setItem("imagePrompts", JSON.stringify(imagePromptsData));
      localStorage.setItem("contextTexts", JSON.stringify(contextTextsData));

      try {
        console.log("Image prompts to generate:", imagePromptsData);

        // const results = [];
        const generatedImageResults = await Promise.all(
          imagePromptsData.map(async (prompt, index) => {
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
            // if (data.output.message) {
            //   const base64Image = data.output.message;

            //   // Call Cloudinary upload function
            //   const cloudinaryResponse = await fetch("/api/upload-image", {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ base64Image }),
            //   });
            //   const cloudinaryData = await cloudinaryResponse.json();
            //   console.log("Cloudinary URL:", cloudinaryData.url);
            //   return cloudinaryData.url;
            // }
            // return null;
            if (data.output.message) {
              return data.output.message;
            }
          })
        );
        // console.log("All image generation results:", results);
        // setImages(results.filter((url) => url !== null));
        // setLoading(false);

        console.log("All image generation results:", generatedImageResults);

        // Upload each image to Cloudinary sequentially
        const uploadedImages = [];
        for (const base64Image of generatedImageResults) {
          const cloudinaryResponse = await fetch("/api/upload-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ base64Image }),
          });

          const cloudinaryData = await cloudinaryResponse.json();
          console.log("Uploaded to Cloudinary:", cloudinaryData.url);
          uploadedImages.push(cloudinaryData.url);
        }

        console.log("All images uploaded to Cloudinary:", uploadedImages);
        setImages(uploadedImages);
        setLoading(false);
        return uploadedImages;
      } catch (error) {
        console.error("Error in image generation or upload:", error);
        setLoading(false);
        return [];
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="mt-4 mx-4 flex flex-col items-center justify-center">
      {loading && <h1>Loading...</h1>}

      {!loading && images.length > 0 && (
        <div className="flex mt-12 flex-col gap-[1%] items-center justify-center">
          {showimages && !showVideo && (
            <div className="w-full flex flex-wrap items-center justify-center gap-5">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[30%] 2xl:w-[22%] mb-[1%] group"
                >
                  <img
                    src={image}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-auto"
                  />
                  <div className="hidden md:flex absolute inset-0 items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                    <p className="text-white text-center px-10">
                      {contextTexts[index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showimages && !showVideo && (
            <Carousel className="w-[500px]">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          {showVideo && <PlayerDialog images={images} className="" />}

          <div className="flex items-center justify-center space-x-4">
            {!showVideo && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setShowimages((prev) => !prev); // Toggles between true and false
                }}
              >
                {showimages ? "Hide Generated Images" : "View Generated Images"}
                {/* Changes text based on state */}
              </Button>
            )}

            <Button
              className="mt-4"
              onClick={() => {
                setShowVideo((prev) => !prev); // Toggles between true and false
              }}
            >
              {showVideo ? "Hide Video" : "Show Video"}
            </Button>
          </div>
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="flex mt-0 mx-4 flex-col items-center justify-center">
          {/* <h1 className="text-3xl text-center">Create New</h1> */}

          <div className="hidden items-center justify-center h-screen">
            <Carousel className="flex items-center justify-center w-[300px] h-[450px] bg-blue-500">
              <CarouselContent>
                {imagelistDemo.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="mx-24">
            <h1 className="text-3xl font-bold">Content</h1>
            <h1 className="mt-2">What is the topic of your video?</h1>
            {/* <div className="mt-4 rounded-2xl w-full py-32 border border-white"></div> */}
            <div className="flex space-x-4 mt-4">
              <div
                className={`${
                  content === "historical" ? "grayscale-0" : "grayscale"
                } grayscale hover:grayscale-0 w-[300px] h-[400px] bg-gray-600 rounded-xl overflow-hidden transition duration-300 ease-in-out`}
                onClick={() => {
                  setContent("historical");
                }}
              >
                <img
                  src="/content/historical.jpg"
                  alt="historical"
                  className="w-full h-[350px] object-cover"
                />
                <h1 className="flex items-center justify-center h-[50px] text-xl font-bold">
                  Historical
                </h1>
              </div>
              <div
                className={`${
                  content === "motivational" ? "grayscale-0" : "grayscale"
                } grayscale hover:grayscale-0 w-[300px] h-[400px] bg-gray-600 rounded-xl overflow-hidden transition duration-300 ease-in-out`}
                onClick={() => {
                  setContent("motivational");
                }}
              >
                <img
                  src="/content/motivational.jpg"
                  alt="motivational"
                  className="w-full h-[350px] object-cover"
                />
                <h1 className="flex items-center justify-center h-[50px] text-xl font-bold">
                  Motivational
                </h1>
              </div>
              <div
                className={`${
                  content === "fantasy" ? "grayscale-0" : "grayscale"
                } grayscale hover:grayscale-0 w-[300px] h-[400px] bg-gray-600 rounded-xl overflow-hidden transition duration-300 ease-in-out`}
                onClick={() => {
                  setContent("fantasy");
                }}
              >
                <img
                  src="/content/fantasy.jpg"
                  alt="fantasy"
                  className="w-full h-[350px] object-cover"
                />
                <h1 className="flex items-center justify-center h-[50px] text-xl font-bold">
                  Fictional Fantasy
                </h1>
              </div>
            </div>
          </div>
          <div className="mx-24 mt-16">
            <h1 className="text-3xl font-bold">Art Style</h1>
            <h1 className="mt-2">
              What is the style of the art in your video?
            </h1>
            <div className="flex space-x-4 mt-4">
              <div
                className={`${
                  style === "realistic" ? "grayscale-0" : "grayscale"
                } grayscale hover:grayscale-0 w-[300px] h-[400px] bg-gray-600 rounded-xl overflow-hidden transition duration-300 ease-in-out`}
                onClick={() => {
                  setStyle("realistic");
                }}
              >
                <img
                  src="/styles/realistic.png"
                  alt="comic"
                  className="w-full h-[350px] object-cover"
                />
                <h1 className="flex items-center justify-center h-[50px] text-xl font-bold">
                  Realistic
                </h1>
              </div>
              <div
                className={`${
                  style === "comic" ? "grayscale-0" : "grayscale"
                } grayscale hover:grayscale-0 w-[300px] h-[400px] bg-gray-600 rounded-xl overflow-hidden transition duration-300 ease-in-out`}
                onClick={() => {
                  setStyle("comic");
                }}
              >
                <img
                  src="/styles/comic.jpg"
                  alt="comic"
                  className="w-full h-[350px] object-cover"
                />
                <h1 className="flex items-center justify-center h-[50px] text-xl font-bold">
                  Comic
                </h1>
              </div>
              <div
                className={`${
                  style === "cartoon" ? "grayscale-0" : "grayscale"
                } grayscale hover:grayscale-0 w-[300px] h-[400px] bg-gray-600 rounded-xl overflow-hidden transition duration-300 ease-in-out`}
                onClick={() => {
                  setStyle("cartoon");
                }}
              >
                <img
                  src="/styles/cartoon.jpg"
                  alt="comic"
                  className="w-full h-[350px] object-cover"
                />
                <h1 className="flex items-center justify-center h-[50px] text-xl font-bold">
                  Cartoon
                </h1>
              </div>
            </div>
          </div>

          <div className="mx-24 mt-16">
            <h1 className="text-3xl font-bold">Duration</h1>
            <h1 className="mt-2">What is the duration of your video?</h1>
            <div
              className="mt-4 rounded-2xl w-[400px] py-3 border border-gray-600 flex items-center justify-between px-4 hover:cursor-pointer"
              onClick={() => {
                setOpenDuration((prev) => !prev);
              }}
            >
              {duration == 0 && <h1 className="text-lg">Select a Duration</h1>}
              {duration != 0 && <h1 className="text-lg">{duration} seconds</h1>}

              <ChevronDown className="" />
            </div>
            {openDuration && (
              <div className="mt-4 rounded-2xl w-[400px] py-3 border border-gray-600 flex flex-col justify-center py-5">
                <h1
                  className="text-lg px-4 rounded-lg py-2 hover:bg-slate-800"
                  onClick={() => {
                    setDuration(10);
                    setOpenDuration((prev) => !prev);
                  }}
                >
                  10 seconds
                </h1>
                <h1
                  className="text-lg px-4 rounded-lg py-2 hover:bg-slate-800"
                  onClick={() => {
                    setDuration(20);
                    setOpenDuration((prev) => !prev);
                  }}
                >
                  20 seconds
                </h1>
                <h1
                  className="text-lg px-4 rounded-lg py-2 hover:bg-slate-800"
                  onClick={() => {
                    setDuration(30);
                    setOpenDuration((prev) => !prev);
                  }}
                >
                  30 seconds
                </h1>
                <h1
                  className="text-lg px-4 rounded-lg py-2 hover:bg-slate-800"
                  onClick={() => {
                    setDuration(60);
                    setOpenDuration((prev) => !prev);
                  }}
                >
                  60 seconds
                </h1>
              </div>
            )}
          </div>

          <div className="flex space-x-4 mx-24 mt-16 mb-16">
            <Button
              variant="secondary"
              className="text-xl px-8 py-8 w-full"
              onClick={() => {
                handleSubmitClick();
              }}
            >
              Generate Content
            </Button>
            {/* <Button
              variant="secondary"
              className="text-xl py-8 w-full"
              onClick={onCreateClickHandler}
            >
              Create Short Video
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;
