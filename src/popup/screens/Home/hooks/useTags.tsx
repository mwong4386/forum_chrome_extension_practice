import { useEffect, useState } from "react";
import urlApi from "../../../../firebase/urlApi";

const useTags = (url: string | undefined) => {
  const [tags, setTags] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!url) return;
    urlApi.getInfo(url).then((info) => {
      if (info === undefined) setTags([]);
      else setTags(info.tags);
    });
  }, [url, setTags]);

  return { tags };
};

export default useTags;
