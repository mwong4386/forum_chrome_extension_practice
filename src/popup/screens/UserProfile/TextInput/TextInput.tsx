import { ForwardedRef, forwardRef, useState } from "react";
import EditButton from "./EditButton/EditButton";
import styles from "./TextInput.module.css";
interface props extends React.HTMLAttributes<HTMLInputElement> {
  id: string;
  children: React.ReactNode;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
const TextInput = forwardRef(
  (
    { id, children, isEditing, setIsEditing, ...rest }: props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const onClick = () => {
      setIsEditing(true);
    };
    return (
      <div className={styles["container"]}>
        {isEditing ? (
          <input ref={ref} {...rest} type="text"></input>
        ) : (
          <>
            <div id={id} className={styles["field"]}>
              {children}
            </div>
            <EditButton onClick={onClick} />
          </>
        )}
      </div>
    );
  }
);

export default TextInput;
