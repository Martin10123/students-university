import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FirebaseAuth, FirebaseDB } from "../../../firebase";
import { createAccountDate, generateUsernameUnic } from "../../../helpers";
import { useForm } from "../../../hook";
import { ValidatorFormRegister } from "../../helpers";

// Todos los campos de los inputs que mandaremos a nuestro custom hooks useForm

const formDataRegister = {
  birthday: "",
  displayName: "",
  email: "",
  gender: "Hombre",
  password1: "",
  password2: "",
  phoneNumber: "",
  selectFormUser: "Brindar",
  semester: "",
  subject: "",
};

export const useRegister = () => {
  const [selectSubject, setSelectSubject] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ValidatorFormRegister es un array con las validaciones de cada campo de los inputs
  // que luego desestructuraremos para mostrar los mensajes de error por si un campo no se
  // lleno como queremos

  const { formState, formValidation, isFormValid, onInputChange } = useForm(
    formDataRegister,
    ValidatorFormRegister
  );

  // Función creada para seleccionar las materias en las que el usuario es bueno y quiera que se
  // muestren en su perfil, solo se aceptan 6, la primera condición pregunta si la materia que el
  // usuario selecciono ya ha sido seleccionada que la borre, y si no que la agregue

  const onSelectSubjects = (value) => {
    if (selectSubject.includes(value)) {
      setSelectSubject(
        selectSubject.filter((subjectBefore) => subjectBefore !== value)
      );
    } else {
      if (selectSubject.length === 6) return;

      setSelectSubject([...selectSubject, value]);
    }
  };

  // Función para registrar al usuario, condicional inicial es una función que creamos en
  // nuestro custom hook que nos valida si todos los campos de los inputs estan correctos

  const onSubmitForm = async () => {
    if (!isFormValid || selectSubject.length === 0)
      return setFormSubmitted(true);

    const formDataUnion = {
      ...formState,
      subjectSelectGood: selectSubject,
      isActive: false,
      activeAgo: 0,
      photoUrl: null,
      votesBad: [],
      votesGood: [],
    };

    try {
      const { email, password1, displayName } = formDataUnion;

      // desestructuramos de formDataUnion el email, password y el name, para enviarlos como parametro
      // a la

      const { user } = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password1
      );

      await updateProfile(FirebaseAuth.currentUser, {
        displayName,
      });

      const username = generateUsernameUnic(displayName);
      const createAccount = createAccountDate(new Date().getTime());

      delete formDataUnion.password1;
      delete formDataUnion.password2;

      await addDoc(collection(FirebaseDB, "users"), {
        ...formDataUnion,
        uid: user.uid,
        createAccount,
        username,
        photoUrl: null,
        votesBad: [],
        votesGood: [],
      });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Este email ya esta en uso");
      } else {
        setErrorMessage(error.code);
      }
    }
  };

  return {
    errorMessage,
    formState,
    formSubmitted,
    formValidation,
    onInputChange,
    onSelectSubjects,
    onSubmitForm,
    selectSubject,
  };
};
