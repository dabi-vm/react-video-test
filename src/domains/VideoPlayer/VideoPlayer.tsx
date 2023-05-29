import styles from "./VideoPlayer.module.css";
import HlsVideoPlayer from "../../components/HLSVideoPlayer";

const VideoPlayer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>VideoPlayer</h2>
      </div>
      <div className={styles.flex}>
        <HlsVideoPlayer src="https://butaneacademy.arvanvod.ir/kO915PoEzY/WnQ25GyVYJ/h_,1080_1200,k.mp4.list/master.m3u8" />
      </div>
    </div>
  );
};

export default VideoPlayer;
