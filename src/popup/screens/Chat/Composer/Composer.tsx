import MultilineInputbox from "../../../../components/MultilineInputbox/MultilineInputbox";
import styles from "./Composer.module.css";
import { useForm } from "react-hook-form";
interface props {
  placeholder?: string;
  onSubmit?: (text: string) => void;
  isDisabled?: boolean;
}
interface MessageModel {
  message: string;
}
const Composer = (props: props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<MessageModel>({
    defaultValues: {
      message: "",
    },
  });
  const onClick = (model: MessageModel) => {
    props.onSubmit && props.onSubmit(model.message);
    reset({
      message: "",
    });
  };
  return (
    <form onSubmit={handleSubmit(onClick)}>
      <div className={styles["input-group"]}>
        <div className={styles["inputbox"]}>
          <MultilineInputbox
            {...register("message", { required: "Input your message" })}
            maxRows={5}
            placeholder={props.placeholder}
            disabled={props.isDisabled || isSubmitting}
          ></MultilineInputbox>
        </div>
        <button
          type="submit"
          className={styles["submit-button"]}
          disabled={props.isDisabled || !isDirty || isSubmitting}
        >
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40995 21.75C4.28995 21.75 3.57995 21.37 3.12995 20.92C2.24995 20.04 1.62995 18.17 3.60995 14.2L4.47995 12.47C4.58995 12.24 4.58995 11.76 4.47995 11.53L3.60995 9.79999C1.61995 5.82999 2.24995 3.94999 3.12995 3.07999C3.99995 2.19999 5.87995 1.56999 9.83995 3.55999L18.3999 7.83999C20.5299 8.89999 21.6999 10.38 21.6999 12C21.6999 13.62 20.5299 15.1 18.4099 16.16L9.84995 20.44C7.90995 21.41 6.46995 21.75 5.40995 21.75ZM5.40995 3.74999C4.86995 3.74999 4.44995 3.87999 4.18995 4.13999C3.45995 4.85999 3.74995 6.72999 4.94995 9.11999L5.81995 10.86C6.13995 11.51 6.13995 12.49 5.81995 13.14L4.94995 14.87C3.74995 17.27 3.45995 19.13 4.18995 19.85C4.90995 20.58 6.77995 20.29 9.17995 19.09L17.7399 14.81C19.3099 14.03 20.1999 13 20.1999 11.99C20.1999 10.98 19.2999 9.94999 17.7299 9.16999L9.16995 4.89999C7.64995 4.13999 6.33995 3.74999 5.40995 3.74999Z"
              fill="black"
            />
            <path
              d="M10.8399 12.75H5.43994C5.02994 12.75 4.68994 12.41 4.68994 12C4.68994 11.59 5.02994 11.25 5.43994 11.25H10.8399C11.2499 11.25 11.5899 11.59 11.5899 12C11.5899 12.41 11.2499 12.75 10.8399 12.75Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      {/* {errors.message?.message && (
        <div className={styles["error-message"]}>{errors.message?.message}</div>
      )} */}
    </form>
  );
};

export default Composer;
