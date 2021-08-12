import { useState } from "react";
import statuses from "data/status.json";

export default function StatusParams(item) {
  const statusOptions = statuses?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedStatutes, setSelectedStatutes] = useState(
    item?.status ? [statusOptions.find((s) => s.value === item.status)] : []
  );

  const selectStatus = (selection) => {
    setSelectedStatutes(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };
  return { statusOptions, selectedStatutes, selectStatus };
}
