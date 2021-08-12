import { useSelector } from "react-redux";
import { useState } from "react";

export default function SectorParams(item) {
  const sectors = useSelector((state) => state.appReducer.sectors);
  const sectorOptions = sectors?.map((s) => ({
    label: s.title,
    value: s.id,
  }));

  const [selectedSectors, setSelectedSectors] = useState(
    item?.sectors
      ? sectorOptions.filter(
          (s) =>
            item.sectors.split(",").includes(s.label) ||
            item.sectors.split(",").includes(s.value)
        )
      : []
  );

  const selectSector = (selection) => {
    setSelectedSectors(selection);
  };
  return { sectorOptions, selectedSectors, selectSector };
}
