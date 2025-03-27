import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./MyComposition";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
      id="MyComposition"
      durationInFrames={390}
      fps={30}
      width={1080}
      height={1080}
      component={MyComposition} 
      />
    </>
  );
};
