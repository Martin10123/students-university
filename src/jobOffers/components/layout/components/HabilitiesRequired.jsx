import { useState } from "react";
import { FcIdea } from "react-icons/fc";
import { GiBrain } from "react-icons/gi";
import { AutoComplete } from "./AutoComplete";
import { InputForm } from "../";

export const HabilitiesRequired = ({
  arrayHabilitiesState,
  arrayRequiredState,
  formState,
  formSubmitted,
  habilitiesArray,
  onInputChange,
  onSelectValues,
  requirementArray,
  setHabilitiesArray,
  setRequirementArray,
}) => {
  const [openHabilities, setOpenHabilities] = useState(false);
  const [openRequirement, setOpenRequirement] = useState(false);
  const { habilitiesNecesary, requiredNecesary } = formState;

  const countHabi = habilitiesArray.length;
  const countReque = requirementArray.length;

  const placeHabi =
    countHabi !== 0
      ? `${countHabi} habilidades seleccionadas`
      : "Habilidades necesarias...";

  const placeRequi =
    countReque !== 0
      ? `${countReque} requerimientos seleccionadas`
      : "Requerimientos necesarios...";

  return (
    <>
      <InputForm
        array={habilitiesArray}
        errorActive={countHabi === 0 && formSubmitted}
        Icon={GiBrain}
        infoSelectValues="habi"
        name="habilitiesNecesary"
        onChange={onInputChange}
        onClick={() => setOpenHabilities(true)}
        onSelectValues={onSelectValues}
        openButton={habilitiesNecesary}
        placeholder={placeHabi}
        setarray={setHabilitiesArray}
        textError="Debes escoger 1 opción por lo menos"
        type="text"
        typeOpenButton={true}
        value={habilitiesNecesary}
      />

      {openHabilities && (
        <AutoComplete
          arrayDataGlobal={arrayHabilitiesState}
          arrayWithData={habilitiesArray}
          onSelectValues={onSelectValues}
          setArrayWithData={setHabilitiesArray}
          closeModal={() => setOpenHabilities(false)}
          whatIs="habi"
        />
      )}

      <InputForm
        array={requirementArray}
        errorActive={countReque === 0 && formSubmitted}
        Icon={FcIdea}
        name="requiredNecesary"
        onChange={onInputChange}
        onClick={() => setOpenRequirement(true)}
        onSelectValues={onSelectValues}
        openButton={requiredNecesary}
        placeholder={placeRequi}
        setarray={setRequirementArray}
        textError="Debes escoger 1 opción por lo menos"
        type="text"
        typeOpenButton={true}
        value={requiredNecesary}
      />

      {openRequirement && (
        <AutoComplete
          arrayDataGlobal={arrayRequiredState}
          arrayWithData={requirementArray}
          onSelectValues={onSelectValues}
          setArrayWithData={setRequirementArray}
          closeModal={() => setOpenRequirement(false)}
        />
      )}
    </>
  );
};
