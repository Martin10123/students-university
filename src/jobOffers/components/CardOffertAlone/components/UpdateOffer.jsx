import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../../../firebase";
import { useAddOffer } from "../../../hook/useAddOffer";
import { OffersLayout } from "../../layout";

export const UpdateOffer = ({ setOpenUpdate, offerJob }) => {
  const dataform = {
    nameOffer: offerJob.nameOffer,
    descOffer: offerJob.descOffer,
    emailsOffer: "",
    numberProfesionals: offerJob.numberProfesionals,
    requiredNecesary: "",
    semesterStudents: offerJob.semesterStudents,
    habilitiesNecesary: "",
  };

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

  const onUpdateValues = async () => {
    const { nameOffer, descOffer, numberProfesionals, semesterStudents } =
      formState;

    if (!isFormValid) return setFormSubmitted(true);

    setStartLoading(true);
    try {
      const habilities =
        habilitiesArray.length !== 0
          ? habilitiesArray
          : offerJob.habilitiesArray;

      const requirement =
        requirementArray.length !== 0
          ? requirementArray
          : offerJob.requirementArray;

      const emails =
        emailsArray.length !== 0 ? emailsArray : offerJob.emailsArray;

      await updateDoc(doc(firebaseDB, `offersJob/${offerJob.idDoc}`), {
        descOffer,
        emailsArray: emails,
        habilitiesArray: habilities,
        nameOffer,
        numberProfesionals,
        requirementArray: requirement,
        semesterStudents,
      });

      setStartLoading(false);
      setOpenUpdate(false);
    } catch (error) {
      console.log(error);
      setStartLoading(false);
    }
  };

  return (
    <OffersLayout
      arrayHabilitiesState={arrayHabilitiesState}
      arrayRequiredState={arrayRequiredState}
      emailsArray={emailsArray}
      formState={formState}
      formSubmitted={formSubmitted}
      formValidation={formValidation}
      habilitiesArray={habilitiesArray}
      messageUpdate="Ten en cuenta que si no llenas algún campo tomara los valores anteriores ya guardados"
      onCloseModal={() => setOpenUpdate(false)}
      onInputChange={onInputChange}
      onSelectEmails={onSelectEmails}
      onSelectValues={onSelectValues}
      onSubmitValues={onUpdateValues}
      requirementArray={requirementArray}
      setHabilitiesArray={setHabilitiesArray}
      setRequirementArray={setRequirementArray}
      startLoading={startLoading}
      title="Actualizar oferta"
    />
  );
};
