import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/custom-animations/fall-animation.css";
import "react-awesome-slider/dist/custom-animations/fold-out-animation.css";
import "react-awesome-slider/dist/custom-animations/open-animation.css";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";

// @ts-ignore
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { useState } from "react";
import useDidMountEffect from "@/app/hooks/useDidMountEffect";
const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function News({interval = 5, animation = "cubeAnimation"}: {interval?: number, animation?: string}) {
  const data = [
    {
      id: "1",
      icon: "asset/mobile.png",
      title: "Web Design",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
      img: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_100040756-e1538485934255.jpeg?auto=format&q=60&fit=max&w=930",
    },
    {
      id: "2",
      icon: "asset/globe.png",
      title: "Mobile Application",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: "https://i.pinimg.com/originals/e9/c9/2f/e9c92f7869d682a6fa5a97fb8a298f30.jpg",
    },
    {
      id: "3",
      icon: "asset/writing.png",
      title: "Branding",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: "https://i.pinimg.com/originals/a9/f6/94/a9f69465d972a004ad581f245d6ad581.jpg",
    },
  ];

  const [reload, setReload] = useState(false);

  useDidMountEffect(()=> {
    setReload(false);

    const timer = setTimeout(() => {
      setReload(true);
    }, 1);

    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="App">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={interval * 1000}
        infinite={true}
        bullets={false}
        buttons={true}
        startup={true}
        animation={animation}
      >
        {data.map((d) => (
            <div key={d.id}>
              <img src={d.img} alt={d.desc} />
            </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}
