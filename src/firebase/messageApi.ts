import { firestore } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { m_Message, messageConverter } from "../models/m_Message";

const messageApi = {
  create: async (message: m_Message) => {
    const snapshot = collection(firestore, "messages").withConverter(
      messageConverter
    );
    return await addDoc(snapshot, message);
  },

  getMessage: async (url: string) => {
    const snapshot = collection(firestore, "messages").withConverter(
      messageConverter
    );
    const q = query(
      snapshot,
      where("url", "==", url),
      orderBy("createdAt", "desc")
    );
    const docs = await getDocs(q);
    const m: m_Message[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_Message));
    return m;
  },

  subscribeMessages: (
    url: string,
    callback: (messages: m_Message[]) => void
  ) => {
    const snapshot = collection(firestore, "messages").withConverter(
      messageConverter
    );
    const q = query(
      snapshot,
      where("url", "==", url),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const m: m_Message[] = [];
      querySnapshot.forEach((doc) => m.push(doc.data() as m_Message));
      callback(m);
    });
    return unsubscribe;
  },
};

export default messageApi;
