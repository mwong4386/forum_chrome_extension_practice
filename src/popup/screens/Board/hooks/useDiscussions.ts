import { useCallback, useEffect, useMemo, useState } from "react";
import {
  m_Discussion,
  m_Discussion_Redirect,
} from "../../../../models/m_Discussion";
import discussionApi from "../../../../firebase/discussionApi";
import { mergeDiscussion } from "../utils/array";

interface model {
  loading: boolean;
  topics: (m_Discussion | m_Discussion_Redirect)[];
}

const useDiscussions = (
  url: string | undefined,
  tags: string[] | undefined
) => {
  const [topics, setTopics] = useState<model>({ loading: true, topics: [] });
  const [topicsFromTag, setTopicsFromTag] = useState<model>({
    loading: true,
    topics: [],
  });
  useEffect(() => {
    if (url === undefined) return;
    let unmount = false;
    discussionApi.getDiscussions(url).then((m) => {
      if (unmount) return;
      setTopics({ loading: false, topics: m });
    });
    return () => {
      unmount = true;
    };
  }, [url]);

  useEffect(() => {
    if (tags === undefined) return; //still loading
    let unmount = false;
    if (tags.length === 0) {
      setTopicsFromTag({ loading: false, topics: [] });
      return;
    }
    discussionApi.getDiscussionByTags(tags).then((m) => {
      if (m === undefined) return;
      if (unmount) return;
      setTopicsFromTag({ loading: false, topics: m });
    });
    return () => {
      unmount = true;
    };
  }, [tags]);

  const result = useMemo(() => {
    if (topics.loading || topicsFromTag.loading)
      return { loading: true, data: [] };
    if (topicsFromTag.topics.length === 0)
      return { loading: false, data: topics.topics };
    if (topics.topics.length === 0)
      return { loading: false, data: topicsFromTag.topics };
    return {
      loading: false,
      data: mergeDiscussion(topics.topics, topicsFromTag.topics),
    };
  }, [topics, topicsFromTag]);

  const refresh = useCallback(() => {
    if (url === undefined) return;
    if (tags === undefined) return;
    setTopics((prev) => {
      return { ...prev, loading: true };
    });
    tags.length > 0 &&
      setTopicsFromTag((prev) => {
        return { ...prev, loading: true };
      });
    discussionApi.getDiscussions(url).then((m) => {
      setTopics({ loading: false, topics: m });
    });
    tags.length > 0 &&
      discussionApi.getDiscussionByTags(tags).then((m) => {
        if (m === undefined) return;
        setTopicsFromTag({ loading: false, topics: m });
      });
  }, [url, tags]);

  return {
    topics: result.data,
    loading: result.loading ?? true,
    refresh,
  };
};

export default useDiscussions;
