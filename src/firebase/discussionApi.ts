import { firestore } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  m_Discussion,
  discussionConverter,
  m_Discussion_Redirect,
} from "../models/m_Discussion";
import { discussionMessageConverter } from "../models/m_DiscussionMessage";

const discussionApi = {
  createWithMessage: async (message: m_Discussion) => {
    if (!message.messages) return;
    console.log(message);
    const batch = writeBatch(firestore);

    const ref = doc(
      collection(firestore, "discussions").withConverter(discussionConverter)
    );
    batch.set(ref, message);
    const discussionId = ref.id;
    const messagesRef = collection(
      firestore,
      "discussions",
      discussionId,
      "messages"
    ).withConverter(discussionMessageConverter);

    batch.set(doc(messagesRef), message.messages[0]);
    return await batch.commit();
  },

  create: async (message: m_Discussion_Redirect) => {
    const ref = collection(firestore, "discussions").withConverter(
      discussionConverter
    );

    return await addDoc(ref, message);
  },

  getDiscussions: async (url: string) => {
    console.log("getDiscussions", url);
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(
      snapshot,
      where("url", "==", url),
      orderBy("createdAt", "desc")
    );
    const docs = await getDocs(q);
    const m: m_Discussion[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_Discussion));
    return m;
  },

  getDiscussionByTags: async (tags: string[]) => {
    if (tags.length === 0) return;
    if (tags.length > 10) tags = tags.slice(0, 10);
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(
      snapshot,
      where("tags", "array-contains-any", tags),
      orderBy("createdAt", "desc")
    );
    const docs = await getDocs(q);
    const m: m_Discussion[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_Discussion));
    return m;
  },

  subscribeDiscussions: (
    url: string,
    callback: (messages: m_Discussion[]) => void
  ) => {
    const snapshot = collection(firestore, "discussions").withConverter(
      discussionConverter
    );
    const q = query(
      snapshot,
      where("url", "==", url),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const m: m_Discussion[] = [];
      querySnapshot.forEach((doc) => m.push(doc.data() as m_Discussion));
      callback(m);
    });
    return unsubscribe;
  },
};

export default discussionApi;
