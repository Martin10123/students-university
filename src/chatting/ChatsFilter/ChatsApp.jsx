import { BiSearchAlt } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hook";
import { CardChatFilter } from "./CardChatFilter";
import { shortName } from "../../helpers";

import styles from "./chatsApp.module.css";

export const ChatsApp = () => {
  const navigate = useNavigate();
  const { searchChat, onInputChange } = useForm({
    searchChat: "",
  });

  return (
    <section className={styles.container_chat}>
      <div className={styles.return_nav}>
        <BsArrowLeft onClick={() => navigate(-1)} />
        <p>{shortName("userActive?.displayName")}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.form_input}>
          <BiSearchAlt />
          <input
            type="text"
            placeholder="Buscar..."
            className={styles.filter_input}
            name="searchChat"
            value={searchChat}
            onChange={onInputChange}
          />
        </div>

        <div className={styles.content_chats_active}>
          <p className={styles.title_message}>Mensajes</p>

          <div className={styles.content_chats_to_message}>
            <CardChatFilter />
          </div>
        </div>
      </div>
    </section>
  );
};
