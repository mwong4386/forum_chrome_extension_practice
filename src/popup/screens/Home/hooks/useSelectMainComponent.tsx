import { ReactNode, useEffect, useState } from "react";
import styles from "../Home.module.css";
interface props {
  initial?: "board" | "chat";
  renderSelect: React.Dispatch<React.SetStateAction<ReactNode>> | null;
}

const useSelectMainComponent = ({ initial = "board", renderSelect }: props) => {
  const [selected, setSelected] = useState(initial);
  const onChange = (e: any) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    if (!renderSelect) return;
    renderSelect(
      <select
        className={styles["header-select"]}
        onChange={onChange}
        value={selected}
      >
        <option value="board">Board</option>
        <option value="chat">Chat</option>
      </select>
    );
    return () => {
      renderSelect(<></>);
    };
  }, [renderSelect, selected]);

  return { selected, setSelected };
};

export default useSelectMainComponent;
