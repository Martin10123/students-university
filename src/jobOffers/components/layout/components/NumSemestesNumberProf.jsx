import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaUniversalAccess } from "react-icons/fa";
import { InputForm } from "../";

export const NumSemestesNumberProf = ({
  formState,
  formSubmitted,
  formValidation,
  onInputChange,
}) => {
  const { semesterStudents, numberProfesionals } = formState;
  const { semesterStudentsValid, numberProfesionalsValid } = formValidation;

  return (
    <>
      <InputForm
        errorActive={!!numberProfesionalsValid && formSubmitted}
        Icon={AiOutlineFieldNumber}
        name="numberProfesionals"
        onChange={onInputChange}
        placeholder="Cuantos trabajadores buscan?..."
        textError={numberProfesionalsValid || ""}
        type="text"
        value={numberProfesionals}
      />

      <InputForm
        errorActive={!!semesterStudentsValid && formSubmitted}
        Icon={FaUniversalAccess}
        name="semesterStudents"
        onChange={onInputChange}
        placeholder="Que semestre buscas?..."
        textError={semesterStudentsValid || ""}
        type="number"
        value={semesterStudents}
      />
    </>
  );
};
