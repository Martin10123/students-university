export function filtrarComentarios(comentario) {
  let palabrasVulgares = [
    "chinga",
    "chingada",
    "chingue",
    "chingar",
    "chingón",
    "chingón",
    "pinche",
    "pinchería",
    "pendejo",
    "pendejada",
    "pendejear",
    "pendejada",
    "pendejada",
    "hijueputa",
    "hijueputear",
    "hijueputada",
    "jodido",
    "joder",
    "jodida",
    "jodienda",
    "mierda",
    "mierdero",
    "mierdoso",
    "mamada",
    "mamarracho",
    "cojudo",
    "cojudez",
    "cojudeces",
    "cojudo",
    "cojudería",
    "culero",
    "culero",
    "culerada",
    "culerada",
    "cabrón",
    "cabronada",
    "cabronazo",
    "cabronear",
    "marica",
    "mariconada",
    "marica",
    "maricón",
    "puta",
    "putada",
    "puto",
    "putear",
    "puterío",
    "putería",
    "pinche",
    "pinchería",
    "tonta",
    "tonto",
    "tontear",
    "tontada",
  ];
  let comentarioFiltrado = comentario;
  // Recorremos el array de palabras vulgares

  for (let i = 0; i < palabrasVulgares.length; i++) {
    // Reemplazamos la palabra malsonante por un asterisco
    comentarioFiltrado = comentarioFiltrado.replace(
      new RegExp(palabrasVulgares[i], "gi"),
      "*****"
    );
  }
  return comentarioFiltrado;
}
