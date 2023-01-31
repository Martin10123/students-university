export const validatorFormStore = {
  name: [(value) => value.trim().length <= 4, "Ingrese un nombre mas largo"],
  price: [
    (value) => value <= 0 || isNaN(value),
    "El valor ingresado no es correcto",
  ],
  productDesc: [
    (value) => value.trim().length <= 20,
    "Ingrese una descripción más detallada",
  ],
};
