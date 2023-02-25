import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";
import {
  discussionMessageConverter,
  m_DiscussionMessage,
} from "../models/m_DiscussionMessage";

const discussionMessageApi = {
  create: async (
    discussionId: string | undefined,
    message: m_DiscussionMessage
  ) => {
    if (discussionId === undefined) return;
    const snapshot = collection(
      firestore,
      "discussions",
      discussionId,
      "messages"
    ).withConverter(discussionMessageConverter);
    return await addDoc(snapshot, message);
  },

  getMessages: async (discussionId: string) => {
    const snapshot = collection(
      firestore,
      "discussions",
      discussionId,
      "messages"
    ).withConverter(discussionMessageConverter);
    const q = query(snapshot, orderBy("createdAt", "asc"));
    const docs = await getDocs(q);
    const m: m_DiscussionMessage[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_DiscussionMessage));
    return m;
  },
};

export default discussionMessageApi;
