import { useState } from "react";
import { useForm } from "../../hook";

export const useSearchUsers = () => {
  const [filterByCategory, setfilterByCategory] = useState([]);
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

  return {
    filterByCategory,
    onInputChange,
    onSelectSubjects,
    openFilter,
    search,
    setOpenFilter,
  };
};
