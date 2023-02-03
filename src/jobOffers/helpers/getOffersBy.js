export const getOfferBy = (offersJob, name) => {
  if (name === "") return offersJob;

  name = name.toLocaleLowerCase();

  return offersJob.filter(
    (user) =>
      user.nameOffer.toLocaleLowerCase().includes(name) ||
      user.numberProfesionals.includes(name) ||
      user.semesterStudents.includes(name)
  );
};
