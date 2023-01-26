import {
  BsArrowLeft,
  BsCameraVideo,
  BsFillCameraFill,
  BsTelephone,
} from "react-icons/bs";
import { MdOutlineAddReaction } from "react-icons/md";
import { TbMicrophone } from "react-icons/tb";
import { photoUser } from "../../assets";
import { useForm } from "../../hook";

import styles from "./chatMessage.module.css";

export const ChatMessage = ({
  infoUserActive,
  openChatMessage,
  setopenChatMessage,
}) => {
  const openChat = openChatMessage ? "" : styles.hidden_component;

  const { message, onInputChange, onResetForm } = useForm({ message: "" });

  const onSubmitMessage = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    try {
    } catch (error) {}

    onResetForm();
  };

  return (
    <div className={`${styles.container} ${openChat}`}>
      <div className={styles.content}>
        <div className={styles.nav_message}>
          <div className={styles.image_user}>
            <BsArrowLeft onClick={() => setopenChatMessage(false)} />

            <img src={photoUser} alt="Foto de perfil" />

            <span className={styles.name_user}>
              <p>{"displayName"}</p>
              <p>Hace 3 min</p>
            </span>
          </div>

          <div className={styles.content_mobile}>
            <BsTelephone />
            <BsCameraVideo />
          </div>
        </div>

        <div className={styles.messages_users}>
          {[1, 2].map((num) => (
            <div
              key={num}
              className={num === 1 ? styles.message_left : styles.message_right}
            >
              <div className={styles.message_img_hour}>
                <img
                  className={styles.img_user_message}
                  src={photoUser}
                  alt="Foto de martin"
                />
                <p>10:20pm</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                sunt officia, recusandae excepturi dolore perspiciatis aut
                deserunt impedit vitae amet placeat itaque tenetur quibusdam
                deleniti illo, laboriosam inventore. Quisquam, necessitatibus?
              </p>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};
