import React from "react";
import { useDispatch } from "react-redux";
import styles from "styles/home.module.scss";
import MultiSelect from "react-multi-select-component";
import { getSectors, getAreas } from "api/api";
import { useHistory } from "react-router-dom";
import {
  setAreaFilterAction,
  setSectorFilterAction,
} from "redux/app/appActions";

export default function Search() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [sectors, setSectors] = React.useState([]);
  const [areas, setAreas] = React.useState([]);

  React.useEffect(() => {
    getSectors().then((res) => {
      setSectors(res);
    });
    getAreas().then((res) => setAreas(res));
    dispatch(setSectorFilterAction([]));
    dispatch(setAreaFilterAction([]));
  }, [dispatch]);

  const sectorOptions = sectors.map((s) => ({
    label: s.title,
    value: s.title,
  }));
  const areaOptions = areas.map((a) => ({ label: a.title, value: a.title }));

  const [selectedSectors, setSelectedSectors] = React.useState([]);
  const [selectedAreas, setSelectedAreas] = React.useState([]);

  const selectSector = (selection) => {
    setSelectedSectors(selection);
  };

  const selectArea = (selection) => {
    setSelectedAreas(selection);
  };

  const search = (e) => {
    dispatch(setSectorFilterAction(selectedSectors));
    dispatch(setAreaFilterAction(selectedAreas));
    setTimeout(() => {
      history.push("/business");
    }, 500);
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
