// import React from "react";
// import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

// const RemotionVideo = ({ imageList }) => {
//   const imagelistDemo = [
//     "/content/fantasy.jpg",
//     "/content/historical.jpg",
//     "/content/motivational.jpg",
//   ];
//   return (
//     <AbsoluteFill>
//       {imageList.map((image, index) => (
//         <Sequence key={index} from={index * 120} durationInFrames={120}>
//           <img src={image} className="w-full h-full object-cover" />
//         </Sequence>
//       ))}
//     </AbsoluteFill>
//   );
// };

// export default RemotionVideo;

import React from "react";
import { AbsoluteFill, Sequence, Audio } from "remotion";

const RemotionVideo = ({ images }) => {
  if (!images) {
    return (
      <div>
        No images found. Terribly sorry, feel free to contact your mom about
        this bug and I will fix this as soon as possible.
      </div>
    ); // Handle case if images are undefined
  }

  return (
    <AbsoluteFill>
      {images.map((image, index) => (
        <Sequence key={index} from={index * 120} durationInFrames={120}>
          <img src={image} className="w-full h-full object-cover" />
        </Sequence>
      ))}
      <Audio src="/audio.mp3" />
    </AbsoluteFill>
  );
};

export default RemotionVideo;
