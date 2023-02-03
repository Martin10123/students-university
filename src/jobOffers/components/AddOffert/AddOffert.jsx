import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../../../firebase";
import { OffersLayout } from "../layout/pages/OffersLayout";
import { useAddOffer } from "../../hook/useAddOffer";
import { useContext } from "react";
import { AuthUserContext } from "../../../context";

const dataform = {
  nameOffer: "",
  descOffer: "",
  emailsOffer: "",
  numberProfesionals: "",
  requiredNecesary: "",
  semesterStudents: "",
  habilitiesNecesary: "",
};

export const AddOffert = ({ setOpenAddOffert }) => {
  const {
    arrayHabilitiesState,
    arrayRequiredState,
    emailsArray,
    formState,
    formSubmitted,
    formValidation,
    habilitiesArray,
    isFormValid,
    onInputChange,
    onSelectEmails,
    onSelectValues,
    requirementArray,
    setFormSubmitted,
    setHabilitiesArray,
    setRequirementArray,
    setStartLoading,
    startLoading,
  } = useAddOffer({ dataform });
  const { infoUserActive } = useContext(AuthUserContext);

  const onSubmitValues = async () => {
    const { nameOffer, descOffer, numberProfesionals, semesterStudents } =
      formState;

    if (
      !isFormValid ||
      requirementArray.length === 0 ||
      emailsArray.length === 0 ||
      habilitiesArray.length === 0
    )
      return setFormSubmitted(true);

    setStartLoading(true);
    try {
      await addDoc(collection(firebaseDB, "offersJob"), {
        closeOffer: false,
        descOffer,
        emailsArray,
        habilitiesArray,
        nameOffer,
        numberProfesionals,
        requirementArray,
        semesterStudents,
        uid: infoUserActive?.uid,
      });

      setStartLoading(false);
      setOpenAddOffert(false);
    } catch (error) {
      console.log(error);
      setStartLoading(false);
    }
  };

  return (
    <>
      <OffersLayout
        arrayHabilitiesState={arrayHabilitiesState}
        arrayRequiredState={arrayRequiredState}
        emailsArray={emailsArray}
        formState={formState}
        formSubmitted={formSubmitted}
        formValidation={formValidation}
        habilitiesArray={habilitiesArray}
        onCloseModal={() => setOpenAddOffert(false)}
        onInputChange={onInputChange}
        onSelectEmails={onSelectEmails}
        onSelectValues={onSelectValues}
        onSubmitValues={onSubmitValues}
        requirementArray={requirementArray}
        setHabilitiesArray={setHabilitiesArray}
        setOpenAddOffert={setOpenAddOffert}
        setRequirementArray={setRequirementArray}
        startLoading={startLoading}
        title="Agregar oferta"
      />
    </>
  );
};
