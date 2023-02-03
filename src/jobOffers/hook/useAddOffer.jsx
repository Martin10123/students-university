import { useState } from "react";
import { regex } from "../../auth/helpers";
import { useForm } from "../../hook";
import { validatorField, arrayHabilities, arrayRequirement } from "../helpers";

export const useAddOffer = ({ dataform }) => {
  const { formState, onInputChange, formValidation, isFormValid } = useForm(
    dataform,
    validatorField
  );
  const [emailsArray, setEmailsArray] = useState([]);
  const [requirementArray, setRequirementArray] = useState([]);
  const [habilitiesArray, setHabilitiesArray] = useState([]);
  const [arrayHabilitiesState, setArrayHabilitiesState] =
    useState(arrayHabilities);
  const [arrayRequiredState, setArrayRequiredState] =
    useState(arrayRequirement);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const onSelectValues = (array, setArray, value, whatIs) => {
    if (array.includes(value)) {
      setArray(array.filter((valueOld) => valueOld !== value));
      return;
    }

    if (whatIs === "habi") {
      if (array.length === 10) return;
      if (value.trim().length > 3) {
        setArray([...array, value]);

        !arrayHabilitiesState.includes(value) &&
          setArrayHabilitiesState([...arrayHabilitiesState, value]);

        formState.habilitiesNecesary = "";
      }
    } else {
      if (array.length === 10) return;
      if (value.trim().length > 3) {
        setArray([...array, value]);

        !arrayRequiredState.includes(value) &&
          setArrayRequiredState([...arrayRequiredState, value]);

        formState.requiredNecesary = "";
      }
    }
  };

  const onSelectEmails = (email) => {
    if (regex.test(email)) {
      if (emailsArray.includes(email)) {
        setEmailsArray(emailsArray.filter((e) => e !== email));
      } else {
        setEmailsArray([...emailsArray, email]);
        formState.emailsOffer = "";
      }
    }
  };

  return {
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
  };
};
