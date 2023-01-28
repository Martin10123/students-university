import { BsFillCameraFill } from "react-icons/bs";
import { MdOutlineAddReaction } from "react-icons/md";
import { TbMicrophone } from "react-icons/tb";

import styles from "./chatMessage.module.css";

export const InputSendMessage = ({
  message,
  onInputChange,
  onSubmitMessage,
}) => {
  return (
    <div className={styles.form_input}>
      <form className={styles.input_div} onSubmit={onSubmitMessage}>
        <div className={styles.camera_send_photo}>
          <BsFillCameraFill className={styles.svg_input} />
        </div>
        <input
          type="text"
          placeholder="Enviar un mensaje..."
          className={styles.input_form_value}
          name="message"
          value={message}
          onChange={onInputChange}
        />

        <div className={styles.content_other_svg}>
          <TbMicrophone className={styles.svg_input} />
          <MdOutlineAddReaction className={styles.svg_input} />
        </div>
      </form>
    </div>
  );
};
