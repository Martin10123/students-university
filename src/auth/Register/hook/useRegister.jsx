import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { firebaseAuth, firebaseDB } from "../../../firebase";
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
  const [startLoading, setStartLoading] = useState(false);

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
    const validForm =
      formState.selectFormUser === "Brindar"
        ? !isFormValid || selectSubject.length === 0
        : !isFormValid;

    if (validForm) return setFormSubmitted(true);

    setStartLoading(true);

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
      // a la funcion que nos ofrece firebase para crear el usuario y actualizar su nombre

      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password1
      );

      await updateProfile(firebaseAuth.currentUser, {
        displayName: displayName,
      });

      // generateUsernameUnic función que genera un nombre de usuario aleatorio
      // utilizando su nombre y varios funciones pa generar numeros randoms
      const username = generateUsernameUnic(displayName);

      // createAccountDate función que genera la fecha de cuando creo su cuenta
      const createAccount = createAccountDate(new Date().getTime());

      delete formDataUnion.password1;
      delete formDataUnion.password2;

      await addDoc(collection(firebaseDB, "users"), {
        ...formDataUnion,
        uid: user.uid,
        createAccount,
        username,
        photoUrl: null,
        votesBad: [],
        votesGood: [],
      });

      setStartLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Este email ya esta en uso");
      } else {
        setErrorMessage(error.code);
      }
      setStartLoading(false);
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
    startLoading,
  };
};
