import { Link } from "react-router-dom";
import { m_Discussion } from "../../../../../models/m_Discussion";
import { fromNow } from "../../../../../utils/date";
import styles from "./Topic.module.css";

interface props {
  model: m_Discussion;
}
const Topic = ({ model }: props) => {
  return (
    <Link
      to={`/discussions/${model.id}`}
      state={{ data: model }}
      className={styles["container"]}
    >
      <div className={styles["discussion-header"]}>
        <div className={styles["username"]}>{model.createdByDisplayName}</div>
        <div className={styles["timestamp"]}>{fromNow(model.lastReplyAt)}</div>
      </div>
      <div className={styles["discussion"]}>{model.topic}</div>
    </Link>
  );
};

export default Topic;
