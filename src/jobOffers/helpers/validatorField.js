export const validatorField = {
  nameOffer: [
    (value) => value?.trim().length <= 5,
    "Ingrese un nombre más descriptivo",
  ],
  descOffer: [
    (value) => value?.trim().length <= 5,
    "Ingrese una descripción más detallada",
  ],

  numberProfesionals: [
    (value) => {
      if (value <= 0 || value > 100) {
        return true;
      } else if (isNaN(value)) {
        return true;
      }
    },
    "Ingrese un valor entre 0 y 100",
  ],
  semesterStudents: [
    (value) => {
      if (value < 0 || value > 10) {
        return true;
      } else if (isNaN(value)) {
        return true;
      }
    },
    "Valor ingresado no valido, ingrese un valor entre 0 y 10",
  ],
};
