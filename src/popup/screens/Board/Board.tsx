import { useEffect, useState } from "react";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import {
  m_Discussion,
  m_Discussion_Redirect,
} from "../../../models/m_Discussion";
import AddButton from "../../components/Button/AddButton/AddButton";
import RefreshButton from "../../components/Button/RefreshButton/RefreshButton";
import EmptyScreen from "../../components/EmptyScreen/EmptyScreen";
import BottomModal from "../../components/Modal/BottomModal/BottomModal";
import useAuth from "../../hooks/useAuth";
import useHeader from "../../hooks/useHeader";
import styles from "./Board.module.css";
import CreateDiscussion from "./components/CreateDiscussion/CreateDiscussion";
import OutsideTopic from "./components/OutsideTopic/OutsideTopic";
import Topic from "./components/Topic/Topic";
import useDiscussions from "./hooks/useDiscussions";

interface props {
  url: string | undefined;
  tags: string[] | undefined;
}
const Board = ({ url, tags }: props) => {
  const { topics, loading, refresh } = useDiscussions(url, tags);
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { renderRightHeader } = useHeader();
  useEffect(() => {
    if (!renderRightHeader) return;
    renderRightHeader(
      <div className={styles["header-right"]}>
        <RefreshButton onClick={refresh} />
        {user && (
          <AddButton
            onClick={() => {
              setModalVisible(true);
            }}
          />
        )}
      </div>
    );
    return () => {
      renderRightHeader(<></>);
    };
  }, [user, renderRightHeader, refresh]);

  return (
    <>
      <div className={styles["rows"]}>
        {loading && <LoadingScreen />}
        {!loading && topics.length === 0 && <EmptyScreen />}
        {!loading && topics.length > 0 && (
          <>
            {topics.map((item) =>
              item.type === "redirect" ? (
                <OutsideTopic model={item as m_Discussion_Redirect} />
              ) : (
                <Topic model={item as m_Discussion} />
              )
            )}
          </>
        )}
      </div>
      <BottomModal
        active={modalVisible}
        onClickBackdrop={() => setModalVisible(false)}
      >
        <CreateDiscussion url={url} user={user} urlTags={tags} />
      </BottomModal>
    </>
  );
};

export default Board;
