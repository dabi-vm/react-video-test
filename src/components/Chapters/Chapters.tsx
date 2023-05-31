import { memo } from "react";
import styles from "./Chapters.module.css";

interface IProps {
  chaptersTime: number[];
  handleClickChapter: (time: number) => void;
  videoPlayed: number;
  completePlayed: boolean;
}
const Chapters = ({
  chaptersTime,
  handleClickChapter,
  videoPlayed,
  completePlayed,
}: IProps) => {
  const formatMin = (time: number) => {
    return `${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`;
  };
  return (
    <div className={styles.chaptersContainer}>
      <h6>Chapters</h6>
      <div className={styles.chapters}>
        {chaptersTime.map((time, idx) => (
          <button
            key={time}
            onClick={() => handleClickChapter(time)}
            className={
              completePlayed || videoPlayed >= time ? styles.watched : ""
            }
            disabled={!(completePlayed || videoPlayed >= time)}
          >
            <h5>قسمت {idx + 1}</h5>
            <span>
              {formatMin(time - 30)} - {formatMin(time)}
            </span>
          </button>
        ))}
      </div>
      <p>بعد از تماشای هر قسمت می توانید آن قسمت را دوباره تماشا کنید.</p>
    </div>
  );
};

export default memo(Chapters);
