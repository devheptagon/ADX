import { useState } from "react";
import tenures from "data/tenure.json";

export default function TenureParams(props) {
  const tenureOptions = tenures?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedTenures, setSelectedTenures] = useState(
    props.item?.tenures
      ? tenureOptions.filter((s) =>
          props.item.tenures.split(",").includes(s.value)
        )
      : []
  );

  const selectTenures = (selection) => {
    setSelectedTenures(selection);
  };
  return { tenureOptions, selectedTenures, selectTenures };
}
