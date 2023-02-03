import { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { BsBookmark } from "react-icons/bs";
import { useScroll } from "../../../hook";
import { CardOffertAlone } from "../";
import { firebaseDB } from "../../../firebase";
import { AuthUserContext } from "../../../context";

import styles from "./cardOffert.module.css";

export const CardOffert = ({ offerJob }) => {
  const { requirementArray, descOffer, nameOffer, closeOffer, idDoc, uid } =
    offerJob;
  const { infoUserActive } = useContext(AuthUserContext);

  const [viewCardAlone, setViewCardAlone] = useState(false);

  const textDesc =
    descOffer.length >= 120 ? descOffer.substring(0, 120) + "..." : descOffer;
  const creatorUser = infoUserActive?.uid === uid;
  const gridButtons = {
    gridTemplateColumns: closeOffer || !creatorUser ? "1fr" : "1fr 1fr",
  };

  useScroll([viewCardAlone]);

  const onCloseOffer = async () => {
    try {
      await updateDoc(doc(firebaseDB, `offersJob/${idDoc}`), {
        closeOffer: !closeOffer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.info_card}>
        <h2 className={styles.name_offert}>{nameOffer}</h2>
        <p className={styles.desc_offert}>{textDesc}.</p>
        <div className={styles.box_requirement_offert}>
          <p>Requisitos</p>

          {requirementArray.slice(0, 2).map((reque) => (
            <p key={reque}>
              <BsBookmark /> {reque}.
            </p>
          ))}
        </div>

        <div className={styles.buttons_card} style={gridButtons}>
          {!closeOffer && (
            <button onClick={() => setViewCardAlone(true)}>Ver oferta</button>
          )}

          {closeOffer && !creatorUser && (
            <p className={styles.offer_close}>Esta oferta esta cerrada</p>
          )}

          {creatorUser && (
            <button
              className={styles.button_close}
              style={{
                background: closeOffer ? "#0099ff" : "transparent",
                color: closeOffer ? "#fff" : "#0099ff",
              }}
              onClick={onCloseOffer}
            >
              {closeOffer ? "Oferta cerrada" : "Cerrar oferta"}
            </button>
          )}
        </div>
      </div>

      {viewCardAlone && (
        <CardOffertAlone
          offerJob={offerJob}
          setViewCardAlone={setViewCardAlone}
          creatorUser={creatorUser}
        />
      )}
    </>
  );
};
