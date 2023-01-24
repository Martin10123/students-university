export const dateIsValid = (date) => {
  const today = new Date();
  const birthday = new Date(date);
  let age = today.getFullYear() - birthday.getFullYear();
  const result = today.getMonth() - birthday.getMonth();
  if (result < 0 || (result === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
};

export const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const passwordStrong = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

export const ValidatorFormRegister = {
  birthday: [
    (value) => value === "" || dateIsValid(value) <= 15,
    "Ingrese su edad real",
  ],
  displayName: [
    (value) => value.trim().length <= 20,
    "Ingrese su nombre completo",
  ],
  email: [(value) => regex.test(value) === false, "Ingrese un email valido"],
  password1: [
    (value) => value.trim().length < 10,
    "La contraseña debe ser más larga",
  ],
  password2: [(p1, p2) => p1 !== p2, "Las contraseñas no coinciden"],
  phoneNumber: [
    (value) => value.trim().length !== 10 || isNaN(value),
    "Ingrese un número de telefono valido",
  ],
  subject: [
    (value) => value.trim().length <= 6,
    "Ingrese el nombre completo de su carrera",
  ],
  semester: [
    (value) => {
      if (value <= 0 || value > 10) {
        return true;
      } else if (isNaN(value)) {
        return true;
      }
    },
    "Valor ingresado no valido",
  ],
};

export const ValidatorFormLogin = {
  email: [
    (value) => {
      if (regex.test(value) === false || value.trim().length <= 0) {
        return true;
      }
    },
    "Ingrese un email valido",
  ],
  password: [
    (value) => value.trim().length <= 0,
    "La contraseña no debe estar vacia",
  ],
};

export const ValidatorFormRecover = {
  email: [
    (value) => {
      if (regex.test(value) === false || value.trim().length <= 0) {
        return true;
      }
    },
    "Ingrese un email valido",
  ],
};

export const validatorFormEditProfile = {
  newSubject: [
    (value) => value.trim().length <= 6,
    "Ingrese el nombre completo de su carrera",
  ],

  newDisplayName: [
    (value) => value.trim().length <= 20,
    "Ingrese su nombre completo",
  ],

  newPhoneNumber: [
    (value) => value.trim().length !== 10 || isNaN(value),
    "Ingrese un número de telefono valido",
  ],

  newSemester: [
    (value) => {
      if (value <= 0 || value > 10) {
        return true;
      } else if (isNaN(value)) {
        return true;
      }
    },
    "Valor ingresado no valido",
  ],
};
