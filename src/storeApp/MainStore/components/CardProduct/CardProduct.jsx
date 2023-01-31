import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { SentChatModal } from "../../../../chatting";
import { logicVotes } from "../../../../helpers";

import styles from "./cardProduct.module.css";

export const CardProduct = ({ product, infoUserActive, users }) => {
  const navigate = useNavigate();
  const {
    category,
    idDoc,
    name,
    photoProduct,
    price,
    stateProduct,
    uid,
    username,
    votesGood,
  } = product;
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const user = users.find((user) => user.uid === uid);

  const typeLike = votesGood?.includes(infoUserActive?.uid)
    ? "votesBad"
    : "votesGood";

  const onLikeToProduct = async () => {
    try {
      await logicVotes(
        product,
        typeLike,
        infoUserActive?.uid,
        `storeApp/${idDoc}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.content_card}>
        <figure className={styles.image}>
          <img src={photoProduct} alt="Producto" />
        </figure>

        <div className={styles.info_product}>
          <p className={styles.name_product}>{name}</p>

          <div className={styles.prices_state_product}>
            <p>$ {Number(price).toLocaleString()}</p>
            <p>{category}</p>
            <p>{stateProduct}</p>
          </div>

          <div className={styles.buttons_products}>
            <button
              onClick={() => navigate(`/${username}`)}
              className={styles.button_product}
            >
              <CgProfile />
            </button>
            {infoUserActive?.uid === uid ? (
              <div></div>
            ) : (
              <button
                className={styles.button_product}
                onClick={() => setOpenSendMessage(true)}
              >
                <FiMessageSquare />
              </button>
            )}
            <button className={styles.button_product} onClick={onLikeToProduct}>
              {typeLike === "votesBad" ? <FcLike /> : <FcLikePlaceholder />}
            </button>
          </div>
        </div>
      </div>

      {openSendMessage && (
        <SentChatModal
          setOpenSendMessage={setOpenSendMessage}
          userSelected={user}
          infoUserActive={infoUserActive}
          messagePreview="Estoy interesado en su producto, me podria brindar información acerca de este"
        />
      )}
    </>
  );
};
