import { useEffect, useState } from "react";
import { m_Message } from "../../../../models/m_Message";
import messageApi from "../../../../firebase/messageApi";

const useChatMessages = (url: string | undefined) => {
  const [messages, setMessages] = useState<m_Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!url) return;
    const unsubscribe = messageApi.subscribeMessages(url, (m) => {
      setMessages(m);
      loading && setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [url]);

  return { messages, loading };
};
export default useChatMessages;
