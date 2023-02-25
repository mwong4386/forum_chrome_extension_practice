import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { m_UrlInfo, urlInfoConverter } from "../models/m_UrlInfo";
const urlApi = {
  getInfo: async (url: string) => {
    const snapshot = collection(firestore, "urls").withConverter(
      urlInfoConverter
    );
    const q = query(snapshot, where("url", "==", url));
    const docs = await getDocs(q);
    const m: m_UrlInfo[] = [];
    docs.forEach((doc) => m.push(doc.data() as m_UrlInfo));
    return m.length > 0 ? m[0] : undefined;
  },
};
export default urlApi;
