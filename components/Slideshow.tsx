import { Composition, Img, staticFile } from "remotion";

interface SlideshowProps {
  images: string[];
}

const durationPerImage = 30; // 30 frames per image
const totalDuration = durationPerImage * 6;

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images.map((src, index) => (
        <Img
          key={src}
          src={src}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: `calc(${index} * ${durationPerImage} <= frame && frame < ${
              (index + 1) * durationPerImage
            } ? 1 : 0)`,
          }}
        />
      ))}
    </div>
  );
};

export const RemotionRoot: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <Composition
      id="Slideshow"
      component={() => <Slideshow images={images} />}
      durationInFrames={totalDuration}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
