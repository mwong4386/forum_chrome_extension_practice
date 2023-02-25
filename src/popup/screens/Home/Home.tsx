import { useEffect, useMemo, useState } from "react";
import useHeader from "../../hooks/useHeader";
import Chat from "../Chat/Chat";
import Board from "../Board/Board";
import useSelectMainComponent from "./hooks/useSelectMainComponent";
import useTabUrl from "../../../hooks/useTabUrl";
import useTags from "./hooks/useTags";
import TagList from "../../components/TagsList/TagsList";
const Home = () => {
  const { renderCenterHeader, renderAsidePanelMainContent } = useHeader();
  const { url } = useTabUrl();
  const { tags } = useTags(url);

  useEffect(() => {
    if (!renderAsidePanelMainContent) return;
    if (tags === undefined || tags.length === 0) return;
    renderAsidePanelMainContent(<TagList tags={tags} />);
  }, [tags, renderAsidePanelMainContent]);

  const { selected } = useSelectMainComponent({
    renderSelect: renderCenterHeader,
  });

  return selected === "board" ? (
    <Board url={url} tags={tags} />
  ) : (
    <Chat url={url} />
  );
};

export default Home;
