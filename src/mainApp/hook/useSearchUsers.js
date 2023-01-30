import { useContext, useState } from "react";
import { AuthUserContext } from "../../context";
import { useForm } from "../../hook";

export const useSearchUsers = () => {
  const [filterByCategory, setfilterByCategory] = useState([]);
  const { users, infoUserActive } = useContext(AuthUserContext);
  const [openFilter, setOpenFilter] = useState(false);
  const { search, onInputChange } = useForm({
    search: "",
  });

  const onSelectSubjects = (value) => {
    if (filterByCategory.includes(value)) {
      setfilterByCategory(
        filterByCategory.filter((subjectBefore) => subjectBefore !== value)
      );
    } else {
      if (filterByCategory.length === 1) return;

      setfilterByCategory([...filterByCategory, value]);
    }
  };

  const getUserByName = () => {
    if (search.length === 0) return users;

    return users.filter(
      ({ displayName, subject }) =>
        displayName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase().trim()) ||
        subject.toLocaleLowerCase().includes(search.toLocaleLowerCase().trim())
    );
  };

  return {
    filterByCategory,
    onInputChange,
    onSelectSubjects,
    openFilter,
    search,
    setOpenFilter,
    usersFilter: getUserByName(),
    infoUserActive,
  };
};
