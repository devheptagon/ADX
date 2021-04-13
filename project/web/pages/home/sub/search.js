import React from "react";
import styles from "styles/home.module.scss";
import MultiSelect from "react-multi-select-component";

export default function Search() {
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear" },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" },
  ];

  const [selected, setSelected] = React.useState([]);

  return (
    <div className={styles.searchbox}>
      <div className={styles.businessType}>
        <label>LOOKING FOR</label>
        <br />
        <section>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
          />
        </section>
      </div>
      <div className={styles.location}>
        <label>LOCATION</label>
        <br />
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>
      <input type="button" title="SEARCH" value="SEARCH" />
    </div>
  );
}
