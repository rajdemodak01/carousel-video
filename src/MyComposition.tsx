import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Img,
  useVideoConfig,
  interpolateColors,
  Sequence,
  delayRender,
  continueRender,
  Audio,
  staticFile
} from "remotion";

interface Slides {
  intro: { heading: string; location: string };
  image1: string;
  image2: string;
  image3: string;
  outro: { brand: string; desc: string };
}
import { preloadFont } from "@remotion/preload";
import { useState, useEffect } from "react";

preloadFont(
  "https://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l5OeyxNv-s.woff2",
);
preloadFont(
  "https://fonts.gstatic.com/s/inter/v12/UcC9H7FiET9VPVYxPqR5kw.woff2",
);

// const startingSlides = {
//   intro: { heading: "NEW ON SALE", location: "NEW YORK, NY" },
//   image1: "https://picsum.photos/id/237/200",
//   image2: "https://picsum.photos/id/238/200",
//   image3: "https://picsum.photos/id/239/200",
//   outro: { brand: "My Brand", desc: "See full listing in description" },
// };

export const MyComposition = () => {
  const [slides, setSlides] = useState<Slides|null>(null);
  const [loading, setLoading]=useState(true);
  const [handle] = useState(() => delayRender());
  useEffect(()=>{
    fetch("https://6d9846de-bfef-43b5-98fa-3d12af4eeada.mock.pstmn.io/slides")
    .then((res)=>res.json())
    .then((data)=>{
      setSlides(data);
      continueRender(handle);
      setLoading(false)
    })
    // .then((data)=>{console.log("obj",data)})
    .catch((err)=>console.log(err))
  },[])
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // to Convert time (seconds) to frames
  const timeToFrame = (time: number) => time * fps;

  const introPositionX = interpolate(
    frame,
    [timeToFrame(1), timeToFrame(2.5), timeToFrame(3.5), timeToFrame(5)],
    [65, -80, -80, -200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const outroPositionX = interpolate(
    frame,
    [
      timeToFrame(0) + 180,
      timeToFrame(1.5) + 180,
      timeToFrame(2.5) + 180,
      timeToFrame(4) + 180,
    ],
    [250, 188, 188, 50],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const translateImage1 = interpolate(
    frame,
    [
      timeToFrame(1),
      timeToFrame(2.5),
      timeToFrame(3.5),
      timeToFrame(5),
      timeToFrame(6),
      timeToFrame(7.5),
    ],
    [115, 25, 25, -75, -75, -175],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scaleImage1 = interpolate(
    frame,
    [timeToFrame(1), timeToFrame(2.5), timeToFrame(3.5), timeToFrame(5)],
    [0.8, 1, 1, 0.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const translateImage2 = interpolate(
    frame,
    [
      timeToFrame(1),
      timeToFrame(2.5),
      timeToFrame(3.5),
      timeToFrame(5),
      timeToFrame(6),
      timeToFrame(7.5),
      timeToFrame(8.5),
      timeToFrame(10),
    ],
    [100, 25, 25, -75, -75, -175, -175, -275],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const scaleImage2 = interpolate(
    frame,
    [timeToFrame(3.5), timeToFrame(5), timeToFrame(6), timeToFrame(7.5)],
    [0.8, 1, 1, 0.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateImage3 = interpolate(
    frame,
    [
      timeToFrame(3.5),
      timeToFrame(5),
      timeToFrame(6),
      timeToFrame(7.5),
      timeToFrame(8.5),
      timeToFrame(10),
    ],
    [25, -75, -75, -175, -175, -275],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const scaleImage3 = interpolate(
    frame,
    [timeToFrame(6), timeToFrame(7.5), timeToFrame(8.5), timeToFrame(10)],
    [0.8, 1, 1, 0.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const opacityImage3 = interpolate(
    frame,
    [timeToFrame(8.5), timeToFrame(10)],
    [1, 0],
  );
  const opacityBottom = interpolate(
    frame,
    [timeToFrame(8.5), timeToFrame(10)],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const bottomColor1 = interpolateColors(
    frame,
    [timeToFrame(1), timeToFrame(2.5), timeToFrame(3.5), timeToFrame(5)],
    [
      "rgba(219,219,219,1)",
      "rgba(72,72,72,1)",
      "rgba(72,72,72,1)",
      "rgba(219,219,219,1)",
    ],
  );
  const bottomColor2 = interpolateColors(
    frame,
    [timeToFrame(3.5), timeToFrame(5), timeToFrame(6), timeToFrame(7.5)],
    [
      "rgba(219,219,219,1)",
      "rgba(72,72,72,1)",
      "rgba(72,72,72,1)",
      "rgba(219,219,219,1)",
    ],
  );

  const bottomColor3 = interpolateColors(
    frame,
    [timeToFrame(6), timeToFrame(7.5)],
    ["rgba(219,219,219,1)", "rgba(72,72,72,1)"],
  );
  if(loading){
    return <AbsoluteFill className="text-red-500 flex items-center justify-center text-8xl">Loading data...</AbsoluteFill>; 
  }
  return (
    <AbsoluteFill className="bg-[rgba(255,255,255,1)]  flex flex-col items-center justify-center">
      {/* <Audio loop src={staticFile('relaxing-guitar-loop-v5-245859.mp3')}></Audio> */}
      <div className="text-black w-full h-full flex gap-5 items-center ">
        <AbsoluteFill
          className="top-[7%] flex flex-col w-[43%] h-[80.28%] items-start justify-center text-start"
          style={{
            transform: `translateX(${introPositionX}%)`,
          }}
        >
          <div
            className="text-[150px] leading-[104%] uppercase   "
            style={{
              color: "rgba(0,0,0,1)",
              fontFamily: "Merriweather, serif",
            }}
          >
            {slides?.intro?.heading}
          </div>
          <div
            className=" uppercase text-[60px] text-start"
            style={{
              color: "rgba(0,0,0,1)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {slides?.intro?.location}
          </div>
        </AbsoluteFill>

        <Img
          src={slides?.image1 || "image1"}
          className="w-[65.19%] h-[80.28%] rounded-lg "
          style={{
            transform: `translateX(${translateImage1}%) scale(${scaleImage1})`,
          }}
        ></Img>
        <Img
          src={slides?.image2 || "image2"}
          className="w-[65.19%] h-[80.28%] rounded-lg"
          style={{
            transform: `translateX(${translateImage2}%) scale(${scaleImage2})`,
          }}
        ></Img>
        <Img
          src={slides?.image3 || "image3"}
          className="w-[65.19%] h-[80.28%] rounded-lg"
          style={{
            transform: `translateX(${translateImage3}%) scale(${scaleImage3})`,
            opacity: `${opacityImage3}`,
          }}
        ></Img>
        <Sequence
          from={timeToFrame(6)}
          className="top-[7%] flex flex-col w-[50%] h-[80.28%] items-start justify-center text-start gap-4 "
          style={{
            transform: `translateX(${outroPositionX}%) `,
          }}
        >
          <div className="flex items-center gap-2 ">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              color="rgba(231,76,60,1)"
            >
              <path d="M 58.1602 0 L 0 0 L 0 100 L 58.1602 100 L 58.1602 0 Z M 58.1602 85.9694 C 35.0682 85.9694 16.3204 69.8521 16.3204 50 C 16.3204 30.1479 35.0682 14.0306 58.1602 14.0306 L 58.1602 85.9694 Z M 58.1602 13.8937 C 81.2522 13.8938 100 30.0118 100 49.8639 C 100 69.716 81.2522 85.8333 58.1602 85.8333 L 58.1602 13.8937 Z" />
            </svg>
            <h1
              className="text-[rgba(231,76,60,1)] text-[80px]"
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            >
              {slides?.outro?.brand}
            </h1>
          </div>
          <p
            className="italic text-lg text-start text-black md:text-[90px] leading-[100%]"
            style={{
              fontFamily: "Merriweather, serif",
            }}
          >
            {slides?.outro?.desc}
          </p>
        </Sequence>
      </div>

      <div
        className="flex items-center justify-between  top-[93.8973%] w-[18.0887%] h-[1.3458%] mb-12"
        style={{
          opacity: opacityBottom,
        }}
      >
        <div
          className="left-[87.6423%] w-[24.7154%] h-[100%] rounded-[4.8vmin]"
          style={{
            backgroundColor: bottomColor1,
          }}
        ></div>
        <div
          className="left-[87.6423%] w-[24.7154%] h-[100%] rounded-[4.8vmin]"
          style={{
            backgroundColor: bottomColor2,
          }}
        ></div>
        <div
          className="left-[87.6423%] w-[24.7154%] h-[100%] rounded-[4.8vmin]"
          style={{
            backgroundColor: bottomColor3,
          }}
        ></div>
      </div>
    </AbsoluteFill>
  );
};
