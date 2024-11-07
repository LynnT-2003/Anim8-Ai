"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function Home() {
  const [openDuration, setOpenDuration] = useState(false);

  const [content, setContent] = useState("");
  const [style, setStyle] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    console.log("Configuration has been updated to:", {
      content,
      style,
      duration,
    });
  }, [content, style, duration]);

  return (
    <div className="mt-12 mx-4">
      {/* <h1 className="text-3xl text-center">Create New</h1> */}
      <div className="mx-24">
        <h1 className="text-2xl">Content</h1>
        <h1 className="mt-8">What is the topic of your video?</h1>
        <div className="mt-4 rounded-2xl w-full py-32 border border-white"></div>
      </div>
      <div className="mx-24 mt-16">
        <h1 className="text-2xl">Style</h1>
        <h1 className="mt-8 text-lg">What is the style of your video?</h1>
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
        <h1 className="text-2xl">Duration</h1>
        <h1 className="mt-8">What is the duration of your video?</h1>
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

      <div className="mx-24 mt-32 mb-16">
        <Button variant="secondary" className="text-xl py-8 w-full">
          Create short video
        </Button>
      </div>
    </div>
  );
}
