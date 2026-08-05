"use client";

import React from "react";
import Select, {
  GroupBase,
  SingleValue,
  StylesConfig,
} from "react-select";

export interface CategoryItem {
  title: string;
  slug: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface CategorySelectProps {
  categories: CategoryItem[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  defaultOptionLabel?: string;
  defaultOptionPosition?: "top" | "bottom";
}

const customStyles: StylesConfig<
  CategoryOption,
  false,
  GroupBase<CategoryOption>
> = {
  control: (base) => ({
    ...base,
    borderColor: "#d1d5db",
    paddingTop: 2,
    paddingBottom: 2,
    boxShadow: "none",
    "&:hover": {
      borderColor: "#ccc",
    },
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
        ? "#bfdbfe"
        : undefined,
    color: state.isSelected ? "white" : "#111827",
  }),
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  defaultOptionLabel = "Tüm Kategoriler",
  defaultOptionPosition = "top",
}) => {
  const defaultOption: CategoryOption | null = defaultOptionLabel
    ? {
        value: "",
        label: defaultOptionLabel,
      }
    : null;

  let options: CategoryOption[] = categories.map((category) => ({
    value: category.slug,
    label: category.title,
  }));

  if (defaultOption) {
    options =
      defaultOptionPosition === "top"
        ? [defaultOption, ...options]
        : [...options, defaultOption];
  }

  const selectedOption =
    options.find((option) => option.value === selectedCategory) ??
    defaultOption;

  const handleChange = (
    selected: SingleValue<CategoryOption>
  ) => {
    setSelectedCategory(selected?.value ?? "");
  };

  return (
    <Select<CategoryOption, false>
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isSearchable={false}
      className="text-sm"
      classNamePrefix="react-select"
      styles={customStyles}
    />
  );
};

export default CategorySelect;