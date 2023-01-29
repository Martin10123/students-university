export const ValidatorFormCollege = {
  start: [(value) => value === "", "Ingrese un fecha valida"],
  studentsLength: [
    (value) => value <= 0 || value >= 50,
    "El limite de estudiantes es de 50",
  ],
  subject: [
    (value) => value.trim().length <= 3,
    "Ingrese el nombre completo de la materia",
  ],
  teacher: [
    (value) => value.trim().length <= 10,
    "Ingrese el nombre completo del profesor",
  ],
};
