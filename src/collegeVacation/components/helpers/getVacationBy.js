export const getVacationBy = (vacations, name) => {
  if (name === "") return vacations;

  name = name?.toLocaleLowerCase();

  return vacations?.filter(
    (user) =>
      user.displayName?.toLocaleLowerCase().includes(name) ||
      user.subject?.toLocaleLowerCase().includes(name) ||
      user.teacher?.toLocaleLowerCase().includes(name) ||
      user.phoneNumber?.toLocaleLowerCase().includes(name)
  );
};
