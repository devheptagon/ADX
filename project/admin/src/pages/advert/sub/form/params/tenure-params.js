import { useState } from "react";
import tenures from "data/tenure.json";

export default function TenureParams(item) {
  const tenureOptions = tenures?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedTenures, setSelectedTenures] = useState(
    item?.tenures
      ? tenureOptions.filter((s) => item.tenures.split(",").includes(s.value))
      : []
  );

  const selectTenures = (selection) => {
    setSelectedTenures(selection);
  };
  return { tenureOptions, selectedTenures, selectTenures };
}
