import { useCallback, useEffect, useState } from "react";
import { m_DiscussionMessage } from "../../../../models/m_DiscussionMessage";
import discussionMessageApi from "../../../../firebase/discussionMessageApi";

const useDiscussionMessages = (discussionId: string | undefined) => {
  const [messages, setMessages] = useState<m_DiscussionMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!discussionId) return;
    let unmount = false;
    discussionMessageApi.getMessages(discussionId).then((m) => {
      if (unmount) return;
      setMessages(m);
      setLoading(false);
    });
    return () => {
      unmount = true;
    };
  }, [discussionId]);

  const refresh = useCallback(() => {
    if (!discussionId) return;
    setLoading(true);
    discussionMessageApi.getMessages(discussionId).then((m) => {
      setMessages(m);
      setLoading(false);
    });
  }, [discussionId]);

  return { messages, loading, refresh };
};
export default useDiscussionMessages;
