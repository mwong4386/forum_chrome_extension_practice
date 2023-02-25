import { useEffect, useRef, useState } from "react";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import messageApi from "../../../firebase/messageApi";
import { m_Message } from "../../../models/m_Message";
import useAuth from "../../hooks/useAuth";
import styles from "./Chat.module.css";
import Composer from "./Composer/Composer";
import EmptyMessages from "./EmptyMessages/EmptyMessages";
import MessageItem from "./MessageItem/MessageItem";
import ScrollToBtn from "./ScrollToBtn/ScrollToBtn";
import useChatMessages from "./hooks/useChatMessages";

interface props {
  url: string | undefined;
}

const Chat = ({ url }: props) => {
  const { messages, loading } = useChatMessages(url);
  const composerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [scrollToBottomVisible, setScrollToBottomVisible] =
    useState<boolean>(false);
  useEffect(() => {
    if (!composerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!rowsRef.current) return;
      rowsRef.current.style.borderBottomWidth = `${composerRef.current?.clientHeight}px`;
    });
    resizeObserver.observe(composerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleScroll = (e: any) => {
    setScrollToBottomVisible(e.target.scrollTop < -50);
  };

  const onSubmitMessage = (message: string) => {
    if (url) {
      messageApi
        .create(
          new m_Message(
            undefined,
            url,
            message,
            user?.uid,
            new Date(),
            user?.displayName || "anonymous"
          )
        )
        .catch(() => {});
    }
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
        {!loading && messages.length === 0 && <EmptyMessages />}
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

export default Chat;
