import React, { useRef, useEffect, useMemo } from "react";
import Hls from "hls.js";
import { getLocalStorage, setLocalStorage } from "../utils/storage";
import Chapters from "./Chapters/Chapters";

interface HlsVideoProps {
  src: string;
  chaptersSrc?: string;
}

const HlsVideoPlayer: React.FC<HlsVideoProps> = ({ src, chaptersSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const chaptersTime = useMemo(() => {
    const duration = +getLocalStorage("videoDuration");
    let times = [];
    for (let i = 0; i < 6; i++) {
      times.push((i + 1) * Math.floor(duration / 6));
    }
    return times;
  }, []);

  const handleSetVideoPlayed = (time: number) => {
    setLocalStorage("videoPlayed", time);
  };

  const handleLoadedMetadata = () => {
    setLocalStorage("videoDuration", videoRef?.current?.duration);
  };
  const handleOnSeeking = () => {
    if (
      videoRef.current?.currentTime &&
      videoRef.current.currentTime > +getLocalStorage("videoPlayed") &&
      +getLocalStorage("completePlayed") !== 1
    ) {
      alert("شما نمی توانید پیش از تماشای کامل این بخش به قسمت های بعد بروید");
      videoRef.current.currentTime = +getLocalStorage("videoPlayed");
      videoRef.current.play();
    }
  };

  const handleOnTimeUpdate = () => {
    if (
      videoRef.current?.currentTime &&
      chaptersTime.includes(Math.floor(videoRef.current.currentTime))
    ) {
      handleSetVideoPlayed(Math.floor(videoRef.current.currentTime));
      if (
        chaptersTime[chaptersTime.length - 1] ===
        Math.floor(videoRef.current.currentTime)
      ) {
        setLocalStorage("completePlayed", 1);
      }
    }
  };

  const handleClickChapter = (time: number) => {
    if (
      videoRef.current?.currentTime &&
      time <= +getLocalStorage("videoPlayed") &&
      +getLocalStorage("completePlayed") !== 1
    ) {
      videoRef.current.currentTime = time - chaptersTime[0];
      videoRef.current.play();
    } else {
      alert("شما نمی توانید پیش از تماشای کامل این بخش به قسمت های بعد بروید");
    }
  };

  const handleEnded = () => {
    setLocalStorage("completePlayed", 1);
  };

  useEffect(() => {
    const video = videoRef.current;
    handleSetVideoPlayed(0);
    const playVideo = () => {
      video?.play();
      document.removeEventListener("click", playVideo);
      document.removeEventListener("touchend", playVideo);
    };

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video as HTMLMediaElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        document.addEventListener("click", playVideo);
        document.addEventListener("touchend", playVideo);
      });
    } else if (video?.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        document.addEventListener("click", playVideo);
        document.addEventListener("touchend", playVideo);
      });
    }

    return () => {
      document.removeEventListener("click", playVideo);
      document.removeEventListener("touchend", playVideo);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        controls
        onLoadedMetadata={() => handleLoadedMetadata()}
        onTimeUpdate={() => handleOnTimeUpdate()}
        onSeeking={() => handleOnSeeking()}
        onEnded={() => handleEnded()}
      >
        <source src={src} type="application/x-mpegURL" />
        <track src={chaptersSrc} default />
      </video>
      <Chapters {...{ chaptersTime, handleClickChapter }} />
    </>
  );
};

export default HlsVideoPlayer;
