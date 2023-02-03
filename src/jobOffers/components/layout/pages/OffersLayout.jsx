import { useCloseModalOutside } from "../../../../hook";
import {
  ButtonsAddOffers,
  HabilitiesRequired,
  NameDescEmails,
  NumSemestesNumberProf,
} from "../components";

import styles from "./offersLayout.module.css";

export const OffersLayout = ({
  arrayHabilitiesState,
  arrayRequiredState,
  emailsArray,
  formState,
  formSubmitted,
  formValidation,
  habilitiesArray,
  messageUpdate,
  onCloseModal,
  onInputChange,
  onSelectEmails,
  onSelectValues,
  onSubmitValues,
  requirementArray,
  setHabilitiesArray,
  setRequirementArray,
  startLoading,
  title,
}) => {
  const ref = useCloseModalOutside(onCloseModal);

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.content}>
        <h2>{title}</h2>
        {!!messageUpdate && <p>{messageUpdate}</p>}

        <div className={styles.form}>
          <NameDescEmails
            emailsArray={emailsArray}
            formState={formState}
            formSubmitted={formSubmitted}
            formValidation={formValidation}
            messageUpdate={messageUpdate}
            onInputChange={onInputChange}
            onSelectEmails={onSelectEmails}
          />

          <NumSemestesNumberProf
            formState={formState}
            formSubmitted={formSubmitted}
            formValidation={formValidation}
            onInputChange={onInputChange}
          />

          <HabilitiesRequired
            arrayHabilitiesState={arrayHabilitiesState}
            arrayRequiredState={arrayRequiredState}
            formState={formState}
            formSubmitted={formSubmitted}
            habilitiesArray={habilitiesArray}
            onInputChange={onInputChange}
            onSelectValues={onSelectValues}
            requirementArray={requirementArray}
            setHabilitiesArray={setHabilitiesArray}
            setRequirementArray={setRequirementArray}
          />

          <ButtonsAddOffers
            onSubmitValues={onSubmitValues}
            startLoading={startLoading}
            title={title}
          />
        </div>
      </div>
    </section>
  );
};
