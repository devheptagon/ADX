import { useSelector } from "react-redux";
import { useState } from "react";

export default function TagParams(props) {
  const tags = useSelector((state) => state.appReducer.tags);
  const tagOptions = tags?.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const [selectedTags, setSelectedTags] = useState(
    props.item?.tags
      ? tagOptions.filter((s) => props.item.tags.split(",").includes(s.label))
      : []
  );

  const selectTag = (selection) => {
    setSelectedTags(selection);
  };
  return { tagOptions, selectedTags, selectTag };
}
