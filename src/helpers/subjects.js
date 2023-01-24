export const allSubject = [
  "Matemáticas",
  "Estadística y Cálculo",
  "Castellano",
  "Historia",
  "Ciencias Sociales",
  "Geografía",
  "Derecho",
  "Contabilidad",
  "Administración",
  "Inglés",
  "Física",
  "Química",
  "Salud",
  "Biología",
  "Informática",
  "Tecnología y Electrónica",
  "Religión",
  "Filosofía",
  "Psicología",
  "Educ. Fisica",
  "Arte",
];

export const shortName = (name) => {
  return `${name?.split(" ")[0]} ${name?.split(" ")[2]}`;
};

export const generateUsernameUnic = (name) => {
  return `${name.substring(0, name.indexOf(" "))}${
    name.split(" ")[1]
  }${Math.round(Math.random() * 10000)}${Math.round(Math.random() * 15000)}`;
};
