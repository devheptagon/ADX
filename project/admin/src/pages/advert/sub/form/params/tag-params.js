import { useSelector } from "react-redux";
import { useState } from "react";

export default function TagParams(item) {
  const tags = useSelector((state) => state.appReducer.tags);
  const tagOptions = tags?.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const [selectedTags, setSelectedTags] = useState(
    item?.tags
      ? tagOptions.filter(
          (s) =>
            item.tags.split(",").includes(s.label) ||
            item.tags.split(",").includes(s.value)
        )
      : []
  );

  const selectTag = (selection) => {
    setSelectedTags(selection);
  };
  return { tagOptions, selectedTags, selectTag };
}
