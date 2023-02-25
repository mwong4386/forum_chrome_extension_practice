import styles from "./TagsList.module.css";
import TagChip from "./TagChip/TagChip";

interface props {
  tags: string[];
}
const TagList = ({ tags }: props) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>Tags</div>
      {tags.map((tag) => {
        return <TagChip>{tag}</TagChip>;
      })}
    </div>
  );
};

export default TagList;
