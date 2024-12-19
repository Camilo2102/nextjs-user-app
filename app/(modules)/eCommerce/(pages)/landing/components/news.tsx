import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/custom-animations/fall-animation.css";
import "react-awesome-slider/dist/custom-animations/fold-out-animation.css";
import "react-awesome-slider/dist/custom-animations/open-animation.css";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";

// @ts-ignore
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { useEffect, useState } from "react";
import { useUserConfig } from "@/app/context/UserConfigContext";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const data = [
  {
    id: "1",
    icon: "asset/mobile.png",
    title: "Web Design",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    img: "https://webgen-images-bucket.s3.amazonaws.com/webgen/webgen-example.webp",
  }
];

type NewsProps = {
  interval: number;
  animation: string;
}

export default function News({ props }: { props: NewsProps }) {
  
  const [reload, setReload] = useState<boolean>(false);

  const { getModuleProps } = useUserConfig();

  const images = (getModuleProps('Landing', 'index') as any).images;

  useEffect(() => {
    setReload(false);

    const timer = setTimeout(() => {
      setReload(true);
    }, 1);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [props?.interval])

  const selectImageSource = () => {
    if (images.length > 0) return images.map((url: string, index: number) => (
      <div key={index}>
        <img src={url} alt={`Landing image - ${index + 1}`} />
      </div>
    ))
    return data.map((d) => (
      <div key={d.id}>
        <img src={d.img} alt={d.desc} />
      </div>
    ))
  }

  return (
    <div className="App">
      {reload && <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={(props?.interval ?? 5) * 1000}
        infinite={true}
        bullets={false}
        buttons={false}
        startup={true}
        animation={props?.animation ?? 'cubeAnimation'}
      >
        {selectImageSource()}
      </AutoplaySlider>}
    </div>
  );
}
