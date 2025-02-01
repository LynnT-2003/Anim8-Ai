// "use client";
// import React from "react";
// import { useState } from "react";
// import { Player } from "@remotion/player";
// import RemotionVideo from "@/components/RemotionVideo";

// const PlayerDialog = ({ images }) => {
//   const [downloadUrl, setDownloadUrl] = (useState < string) | (null > null);

//   const handleRenderComplete = async () => {
//     // Render the video on the server and get the URL of the rendered video
//     try {
//       const videoUrl = await renderMedia({
//         composition: "YourCompositionName", // Name of your composition
//         inputProps: { images },
//         codec: "h264", // Set your desired codec, e.g., h264, vp9, etc.
//       });
//       setDownloadUrl(videoUrl); // Set the URL after rendering is complete
//     } catch (error) {
//       console.error("Error rendering video:", error);
//     }
//   };
//   return (
//     <div>
//       <h1>Your Video</h1>
//       <div className="bg-green-900">
//         <Player
//           component={RemotionVideo}
//           durationInFrames={720}
//           compositionWidth={300}
//           compositionHeight={450}
//           fps={30}
//           controls={true}
//           acknowledgeRemotionLicense={true}
//           inputProps={{ images }}
//           onRenderComplete={handleRenderComplete} // Capture rendered video
//         />
//       </div>
//       <h1>Download URL</h1>
//       {downloadUrl ? (
//         <a href={downloadUrl} download>
//           Click here to download the video
//         </a>
//       ) : (
//         <p>Rendering in progress...</p>
//       )}
//     </div>
//   );
// };

// export default PlayerDialog;

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
      <h1>Your Video</h1>
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
      <h1>Download URL</h1>
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
