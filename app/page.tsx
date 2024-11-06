import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl text-center">Create New</h1>
      <div className="mx-24">
        <h1 className="text-2xl">Content</h1>
        <h1 className="mt-8">What is the topic of your video?</h1>
        <div className="mt-4 rounded-2xl w-full py-32 border border-white"></div>
      </div>
      <div className="mx-24 mt-16">
        <h1 className="text-2xl">Style</h1>
        <h1 className="mt-8">What is the style of your video?</h1>
        <div className="mt-4 rounded-2xl w-full py-32 border border-white"></div>
      </div>
      <div className="mx-24 mt-16">
        <h1 className="text-2xl">Duration</h1>
        <h1 className="mt-8">What is the duration of your video?</h1>
        <div className="mt-4 rounded-2xl w-full py-8 border border-white"></div>
      </div>
      <div className="mx-24 mt-32 mb-16">
        <Button variant="secondary" className="text-xl py-8 w-full">
          Create short video
        </Button>
      </div>
    </div>
  );
}
