import { useSelector } from "react-redux";
import { useState } from "react";

export default function SectorParams(props) {
  const sectors = useSelector((state) => state.appReducer.sectors);
  const sectorOptions = sectors?.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const [selectedSectors, setSelectedSectors] = useState(
    props.item?.sectors
      ? sectorOptions.filter((s) =>
          props.item.sectors.split(",").includes(s.label)
        )
      : []
  );

  const selectSector = (selection) => {
    setSelectedSectors(selection);
  };
  return { sectorOptions, selectedSectors, selectSector };
}
