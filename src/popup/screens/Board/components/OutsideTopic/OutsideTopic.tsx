import { Link } from "react-router-dom";
import {
  m_Discussion,
  m_Discussion_Redirect,
} from "../../../../../models/m_Discussion";
import styles from "./OutsideTopic.module.css";
import { fromNow } from "../../../../../utils/date";

interface props {
  model: m_Discussion_Redirect;
}
const OutsideTopic = ({ model }: props) => {
  return (
    <a
      href={model.redirectUrl}
      target="_blank"
      className={styles["container"]}
      rel="noopener noreferrer"
    >
      <div className={styles["discussion-header"]}>
        <div className={styles["username"]}>{model.createdByDisplayName}</div>
        <div className={styles["timestamp"]}>{fromNow(model.createdAt)}</div>
      </div>
      <div className={styles["discussion"]}>{model.topic}</div>
      <div className={styles["url"]}>({model.redirectUrl})</div>
    </a>
  );
};

export default OutsideTopic;
