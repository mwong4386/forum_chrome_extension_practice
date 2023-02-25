import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import discussionMessageApi from "../../../firebase/discussionMessageApi";
import { m_Discussion } from "../../../models/m_Discussion";
import { m_DiscussionMessage } from "../../../models/m_DiscussionMessage";
import RefreshButton from "../../components/Button/RefreshButton/RefreshButton";
import EmptyScreen from "../../components/EmptyScreen/EmptyScreen";
import TitleWithTooltip from "../../components/Layout/TitleWithTooltip/TitleWithTooltip";
import useAuth from "../../hooks/useAuth";
import useHeader from "../../hooks/useHeader";
import Composer from "./Composer/Composer";
import styles from "./Discussion.module.css";
import MessageItem from "./MessageItem/MessageItem";
import ScrollToBtn from "./ScrollToBtn/ScrollToBtn";
import useDiscussionMessages from "./hooks/useDiscussionMessages";

const Discussion = () => {
  const location = useLocation();
  const data = location.state?.data as m_Discussion;
  const { messages, loading, refresh } = useDiscussionMessages(data.id);
  const composerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [scrollToBottomVisible, setScrollToBottomVisible] =
    useState<boolean>(false);
  const { renderCenterHeader: renderTitle, renderRightHeader } = useHeader();

  useEffect(() => {
    if (!composerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!rowsRef.current) return;
      rowsRef.current.style.borderBottomWidth = `${composerRef.current?.clientHeight}px`;
    });
    resizeObserver.observe(composerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (renderRightHeader === null) return;
    renderRightHeader(
      <div className={styles["header-right"]}>
        <RefreshButton onClick={refresh} />
      </div>
    );
    return () => {
      renderRightHeader(<></>);
    };
  }, [renderRightHeader]);

  useEffect(() => {
    if (renderTitle === null) return;
    if (!data.topic) return;

    renderTitle(<TitleWithTooltip>{data.topic}</TitleWithTooltip>);
    return () => {
      renderTitle("");
    };
  }, [data.topic, renderTitle]);

  const handleScroll = (e: any) => {
    setScrollToBottomVisible(e.target.scrollTop < -50);
  };

  const onSubmitMessage = async (message: string) => {
    if (data.id === undefined) return;
    await discussionMessageApi.create(
      data.id,
      new m_DiscussionMessage(
        undefined,
        message,
        user?.uid,
        new Date(),
        user?.displayName || "anonymous"
      )
    );
    refresh();
  };

  const scrollToBottom = () => {
    if (!rowsRef.current) return;
    rowsRef.current.scrollTo({
      top: rowsRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div ref={rowsRef} className={styles["rows"]} onScroll={handleScroll}>
        {loading && <LoadingScreen />}
        {!loading && messages.length === 0 && <EmptyScreen />}
        {!loading && (
          <>
            {messages.map((message) => {
              return (
                <MessageItem
                  key={message.id}
                  containerStyles={{ marginBottom: "1em" }}
                  message={message}
                  onMessageClick={(m) => console.log(m)}
                ></MessageItem>
              );
            })}

            <ScrollToBtn
              visible={scrollToBottomVisible}
              onClick={scrollToBottom}
            />
          </>
        )}
      </div>
      <div ref={composerRef} className={styles["composer"]}>
        {!loading && (
          <Composer
            placeholder="Express yourselves"
            onSubmit={onSubmitMessage}
            isDisabled={!user}
          ></Composer>
        )}
      </div>
    </>
  );
};

export default Discussion;
