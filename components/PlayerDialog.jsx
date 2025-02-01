"use client";
import React, { useState } from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "@/components/RemotionVideo";

const PlayerDialog = ({ images }) => {
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleRenderComplete = (videoBlob) => {
    // Create a URL for the rendered video
    const url = URL.createObjectURL(videoBlob);
    setDownloadUrl(url);
  };

  return (
    <div>
      <div className="bg-green-900">
        <Player
          component={RemotionVideo}
          durationInFrames={720}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          controls={true}
          acknowledgeRemotionLicense={true}
          inputProps={{ images }}
          onRenderComplete={handleRenderComplete} // Capture the rendered video
        />
      </div>

      {/* {downloadUrl ? (
        <a href={downloadUrl} download="video.mp4">
          Click here to download the video
        </a>
      ) : (
        <p>Rendering in progress...</p>
      )} */}
    </div>
  );
};

export default PlayerDialog;

// "use client";
// import React, { useState } from "react";
// import { Studio, renderMedia } from "@remotion/studio";
// import RemotionVideo from "@/components/RemotionVideo";

// const PlayerDialog = ({ images }) => {
//   const [isRendering, setIsRendering] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);

//   const handleDownload = async () => {
//     setIsRendering(true);

//     const blob = await renderMedia({
//       composition: {
//         component: { RemotionVideo },
//         durationInFrames: 720,
//         fps: 30,
//         width: 300,
//         height: 450,
//         props: { images },
//       },
//       codec: "h264",
//     });

//     setIsRendering(false);
//     const url = URL.createObjectURL(blob);
//     setVideoUrl(url);
//   };

//   return (
//     <div className="w-full h-full">
//       <Studio
//         compositions={[{ component: RemotionVideo, props: { images } }]}
//       />

//       <button
//         onClick={handleDownload}
//         disabled={isRendering}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {isRendering ? "Rendering..." : "Download Video"}
//       </button>

//       {videoUrl && (
//         <a
//           href={videoUrl}
//           download="video.mp4"
//           className="block mt-2 text-blue-600"
//         >
//           Click here to download
//         </a>
//       )}
//     </div>
//   );
// };

// export default PlayerDialog;
