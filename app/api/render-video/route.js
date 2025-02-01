// import { renderMedia } from "@remotion/renderer";
// import { AbsoluteFill, Sequence, Audio } from "remotion";
// import { NextApiRequest, NextApiResponse } from "next";

// // Define the Remotion component (same as your client-side component)
// const RemotionVideo = ({ images }) => {
//   return (
//     <AbsoluteFill>
//       {images.map((image, index) => (
//         <Sequence key={index} from={index * 120} durationInFrames={120}>
//           <img
//             src={image}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//         </Sequence>
//       ))}
//       <Audio src="/audio.mp3" />
//     </AbsoluteFill>
//   );
// };

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { images } = req.body;

//   if (!images || !Array.isArray(images)) {
//     return res.status(400).json({ message: "Invalid images data" });
//   }

//   try {
//     const { url } = await renderMedia({
//       composition: {
//         id: "RemotionVideo",
//         component: RemotionVideo,
//         durationInFrames: 720,
//         fps: 30,
//         width: 300,
//         height: 450,
//       },
//       inputProps: { images },
//       codec: "h264",
//       outputLocation: `out/video.mp4`,
//     });

//     res.status(200).json({ downloadUrl: url });
//   } catch (error) {
//     console.error("Error rendering video:", error);
//     res.status(500).json({ message: "Failed to render video" });
//   }
// }

import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";

import RemotionVideo from "@/components/RemotionVideo"; // Ensure correct path

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { images } = req.body;
    const outputPath = path.join(process.cwd(), "public", "video.mp4");

    await renderMedia({
      composition: {
        component: RemotionVideo,
        durationInFrames: 720,
        fps: 30,
        width: 300,
        height: 450,
        props: { images },
      },
      codec: "h264",
      outputLocation: outputPath,
    });

    res.status(200).json({ url: "/video.mp4" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
