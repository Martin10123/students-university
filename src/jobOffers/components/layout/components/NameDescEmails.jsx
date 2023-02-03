import { BiRename } from "react-icons/bi";
import { ContentSeveralInfo } from "./ContentSeveralInfo";
import { MdAlternateEmail } from "react-icons/md";
import { MessageError } from "../../../../auth/helpers";

import { InputForm } from "../";

import styles from "../pages/offersLayout.module.css";

export const NameDescEmails = ({
  emailsArray,
  formState,
  formValidation,
  messageUpdate,
  onInputChange,
  onSelectEmails,
  formSubmitted,
}) => {
  const { nameOffer, descOffer, emailsOffer } = formState;
  const { nameOfferValid, descOfferValid } = formValidation;

  return (
    <>
      <InputForm
        errorActive={!!nameOfferValid && formSubmitted}
        Icon={BiRename}
        name="nameOffer"
        onChange={onInputChange}
        placeholder="Nombre de la oferta..."
        textError={nameOfferValid || ""}
        type="text"
        value={nameOffer}
      />

      <textarea
        className={styles.textarea_form}
        placeholder="Descripción del perfil que buscas..."
        name="descOffer"
        value={descOffer}
        onChange={onInputChange}
      />

      <MessageError
        errorActive={!!descOfferValid && formSubmitted}
        textError={descOfferValid || ""}
      />

      <InputForm
        errorActive={emailsArray.length === 0 && formSubmitted}
        Icon={MdAlternateEmail}
        name="emailsOffer"
        onChange={onInputChange}
        onSelectEmails={onSelectEmails}
        openButton={emailsOffer}
        placeholder="Ingresa el o los correos para enviar la CV..."
        textError={
          emailsArray.length === 0
            ? "Ingrese por lo menos un email"
            : "Ingresa un email valido"
        }
        type="email"
        value={emailsOffer}
      />

      <ContentSeveralInfo data={emailsArray} onChangeEmails={onSelectEmails} />
    </>
  );
};
