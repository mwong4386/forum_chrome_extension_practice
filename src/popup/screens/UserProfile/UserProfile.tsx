import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import TextInput from "./TextInput/TextInput";
import styles from "./UserProfile.module.css";
interface UserProfileModel {
  displayName: string;
}

const UserProfile = () => {
  const { user, updateDisplayName } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isDirty, errors },
    reset,
  } = useForm<UserProfileModel>({
    defaultValues: {
      displayName: "",
    },
  });
  const onSubmit = (model: UserProfileModel) => {
    updateDisplayName(model.displayName).then((success) => {
      if (success) {
        setIsEditing(false);
        reset({ displayName: "" });
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["layout"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className={styles["item-group"]}>
            <label htmlFor="displayName">Display Name:</label>
            <TextInput
              id="displayName"
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              {...register("displayName", { required: "Input your message" })}
            >
              {user?.displayName ? user.displayName : "No display name"}
            </TextInput>
          </div>
          <div className={styles["item-group"]}>
            <label htmlFor="displayName">Email:</label>
            <div id="displayName" className={styles["field"]}>
              {user?.email}
            </div>
          </div>
          <button
            className={styles["edit-button"]}
            type="submit"
            disabled={!isDirty || isSubmitted}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
