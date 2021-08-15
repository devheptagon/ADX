import React from "react";
import { useSelector } from "react-redux";
import styles from "styles/home.module.scss";
import MultiSelect from "react-multi-select-component";
import { useHistory } from "react-router-dom";

export default function Search() {
  const history = useHistory();
  const sectors = useSelector((state) => state.appReducer.sectors);
  const areas = useSelector((state) => state.appReducer.areas);

  const sectorOptions = sectors?.map((s) => ({
    label: s.title,
    value: s.id,
  }));
  const areaOptions = areas?.map((a) => ({ label: a, value: a }));

  const [selectedSectors, setSelectedSectors] = React.useState([]);
  const [selectedAreas, setSelectedAreas] = React.useState([]);

  const selectSector = (selection) => {
    setSelectedSectors(selection);
  };

  const selectArea = (selection) => {
    setSelectedAreas(selection);
  };

  const search = (e) => {
    const sectorParam = selectedSectors.length
      ? selectedSectors
          ?.map((s) => encodeURIComponent(s.label) + "|" + s.value)
          .join(",")
      : "";
    const areaParam = selectedAreas.length
      ? selectedAreas?.map((a) => encodeURIComponent(a.value)).join(",")
      : "";

    let param = sectorParam || areaParam ? "?p=true" : "?p=false";

    if (sectorParam) {
      param = param + "&s=" + sectorParam;
    }
    if (areaParam) {
      param = param + "&a=" + areaParam;
    }

    history.push("/business" + param);
  };

  return (
    <div className={styles.searchbox}>
      <div className={styles.businessType}>
        <label>LOOKING FOR</label>
        <br />
        <section>
          <MultiSelect
            options={sectorOptions}
            value={selectedSectors}
            onChange={selectSector}
            labelledBy="Select"
          />
        </section>
      </div>
      <div className={styles.location}>
        <label>LOCATION</label>
        <br />
        <MultiSelect
          options={areaOptions}
          value={selectedAreas}
          onChange={selectArea}
          labelledBy="Select"
        />
      </div>
      <input type="button" title="SEARCH" value="SEARCH" onClick={search} />
    </div>
  );
}
