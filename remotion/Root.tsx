import React from "react";
import RemotionVideo from "@/components/RemotionVideo";
import { Composition } from "remotion";

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={() => <RemotionVideo images={[]} />}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

export default RemotionRoot;
