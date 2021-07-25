import { useState } from "react";
import cities from "data/city.json";

export default function CityParams(props) {
  const cityOptions = cities?.map((s) => ({
    label: s,
    value: s,
  }));

  const [selectedCities, setSelectedCities] = useState(
    props.item?.city
      ? [cityOptions.find((s) => s.value === props.item.city)]
      : []
  );

  const selectCity = (selection) => {
    setSelectedCities(
      selection.length ? [selection[selection.length - 1]] : [] //disables multi selection
    );
  };
  return { cityOptions, selectedCities, selectCity };
}
