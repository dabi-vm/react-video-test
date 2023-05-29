import styles from "./Chapters.module.css";

interface IProps {
  chaptersTime: number[];
  handleClickChapter: (time: number) => void;
}
const Chapters = ({ chaptersTime, handleClickChapter }: IProps) => {
  return (
    <div className={styles.chaptersContainer}>
      <h6>Chapters</h6>
      <div className={styles.chapters}>
        {chaptersTime.map((time, idx) => (
          <button key={time} onClick={() => handleClickChapter(time)}>
            <h5>قسمت {idx + 1}</h5>
          </button>
        ))}
      </div>
      <caption>
        بعد از تماشای هر قسمت می توانید آن قسمت را دوباره تماشا کنید.
      </caption>
    </div>
  );
};

export default Chapters;
