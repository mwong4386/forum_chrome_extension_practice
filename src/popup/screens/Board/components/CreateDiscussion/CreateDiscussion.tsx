import { Controller, useForm } from "react-hook-form";
import {
  m_Discussion,
  m_Discussion_Redirect,
} from "../../../../../models/m_Discussion";
import discussionApi from "../../../../../firebase/discussionApi";
import { m_DiscussionMessage } from "../../../../../models/m_DiscussionMessage";
import styles from "./CreateDiscussion.module.css";
import { ErrorMessage } from "@hookform/error-message";

import { TextField, Autocomplete } from "@mui/material";
import { useEffect } from "react";
import { isValidUrl } from "../../../../../utils/url";

interface CreateDiscussionModel {
  topic: string;
  type: string;
  url: string;
  message: string;
  tags: string[];
}

interface props {
  url: string | undefined;
  user: any;
  urlTags?: string[];
}

const CreateDiscussion = ({ url, user, urlTags }: props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty, errors },
    reset,
    control,
  } = useForm<CreateDiscussionModel>({
    defaultValues: {
      topic: "",
      message: "",
      tags: [],
      url: "",
      type: "discussion",
    },
  });

  useEffect(() => {
    reset({ tags: urlTags });
  }, [urlTags]);
  const onSubmit = (model: CreateDiscussionModel) => {
    if (!url) return;
    if (!user) return;
    if (model.type === "discussion") {
      console.log("discussion");
      discussionApi.createWithMessage(
        new m_Discussion(
          undefined,
          url,
          model.topic,
          "discussion",
          1,
          user.uid,
          new Date(),
          user.displayName || "anonymous",
          user.uid,
          new Date(),
          user.displayName || "anonymous",
          [
            new m_DiscussionMessage(
              undefined,
              model.message || "",
              user.uid,
              new Date(),
              user.displayName || "anonymous"
            ),
          ],
          model.tags
        )
      );
    } else if (model.type === "redirect") {
      discussionApi.create(
        new m_Discussion_Redirect(
          undefined,
          url,
          model.topic,
          "redirect",
          user.uid,
          new Date(),
          user.displayName || "anonymous",
          model.tags,
          model.url
        )
      );
    }

    reset({
      topic: "",
      message: "",
      tags: urlTags,
      url: "",
      type: "discussion",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["container"]}>
        <div className={styles["title"]}>New Topic</div>
        <div className={styles["row"]}>
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            type="text"
            {...register("topic", { required: "Input your topic" })}
          />
        </div>
        <div
          className={`${styles["row"]} ${styles["error"]} error`}
          style={{ display: errors.topic ? "flex" : "none" }}
        >
          <ErrorMessage errors={errors} name="topic" />
        </div>

        <div className={styles["row"]}>
          <label htmlFor="topic">Tags</label>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => {
              return (
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  limitTags={5}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputRef={field.ref}
                      variant="filled"
                      placeholder="click enter after input tag"
                    />
                  )}
                  onChange={(e, value) => {
                    field.onChange(value);
                  }}
                  value={field.value || []}
                  sx={{
                    flex: 1,
                    "& .MuiFilledInput-root": { paddingTop: "1px" },
                  }}
                />
              );
            }}
          />
        </div>

        <div className={styles["row"]}>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            className={styles["header-select"]}
            {...register("type")}
          >
            <option value="discussion">Normal</option>
            <option value="redirect">Redirect</option>
          </select>
        </div>
        <div
          className={styles["row"]}
          style={{ display: watch("type") === "discussion" ? "flex" : "none" }}
        >
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            {...register("message", {
              validate: (value) => {
                if (watch("type") !== "discussion") return true;
                if (value !== "") return true;
                return "Input your message";
              },
            })}
          />
        </div>

        <div
          className={`${styles["row"]} ${styles["error"]} error`}
          style={{ display: errors.message ? "flex" : "none" }}
        >
          <ErrorMessage errors={errors} name="message" />
        </div>
        <div
          className={styles["row"]}
          style={{ display: watch("type") === "redirect" ? "flex" : "none" }}
        >
          <label htmlFor="url">Url</label>
          <input
            id="url"
            {...register("url", {
              validate: (value) => {
                if (watch("type") !== "redirect") return true;
                if (isValidUrl(value)) return true;
                return "Input valid url";
              },
            })}
          />
        </div>
        <div
          className={`${styles["row"]} ${styles["error"]} error`}
          style={{ display: errors.url ? "flex" : "none" }}
        >
          <ErrorMessage errors={errors} name="url" />
        </div>
        <div className={styles["button-row"]}>
          <button type="submit">Publish</button>
        </div>
      </form>
    </>
  );
};

export default CreateDiscussion;
