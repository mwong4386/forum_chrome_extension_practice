import styles from "./TagChip.module.css";
interface props {
  children?: React.ReactNode;
}

const TagChip = ({ children }: props) => {
  return <div className={styles["chip"]}>{children}</div>;
};

export default TagChip;
