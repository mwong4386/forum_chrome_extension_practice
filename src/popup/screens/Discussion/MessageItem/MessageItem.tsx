import { m_DiscussionMessage } from "../../../../models/m_DiscussionMessage";
import { fromNow } from "../../../../utils/date";
import styles from "./MessageItem.module.css";
interface props {
  containerStyles?: React.CSSProperties;
  message: m_DiscussionMessage;
  onMessageClick: (message: m_DiscussionMessage) => void;
}
const MessageItem = ({ message, onMessageClick, containerStyles }: props) => {
  return (
    <div
      className={styles["container"]}
      style={containerStyles}
      onClick={() => {
        onMessageClick(message);
      }}
    >
      <div className={styles["messageitem-header"]}>
        <div className={styles["username"]}>{message.createdByDisplayName}</div>
        <div className={styles["timestamp"]}>{fromNow(message.createdAt)}</div>
      </div>
      <div className={styles["message"]}>{message.message}</div>
    </div>
  );
};

export default MessageItem;
