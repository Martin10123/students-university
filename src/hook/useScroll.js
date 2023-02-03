import { useEffect } from "react";

// Esta función usa el Hook useEffect de React para modificar
// el estilo del elemento body del documento. Se le está pasando
// un parámetro inicial, que por defecto es una matriz vacía,
// y va a verificar si esa matriz contiene el valor booleano "true".
// Si es así, el estilo del body cambiará a "hidden", en caso contrario,
// el estilo del body será "auto".

export const useScroll = (initialScroll = []) => {
  useEffect(() => {
    document.body.style.overflow = initialScroll.includes(true)
      ? "hidden"
      : "auto";
  }, [initialScroll]);
};
