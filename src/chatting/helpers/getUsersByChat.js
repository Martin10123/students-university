export const getUserByChat = (chats, name) => {
  if (name === "") return chats;

  name = name?.toLocaleLowerCase();

  return chats?.filter((user) =>
    user.displayName?.toLocaleLowerCase().includes(name)
  );
};
