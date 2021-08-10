import Layout from "Layout";
import styles from "styles/app.module.scss";
import { useState } from "react";

import UpgradePlans from "./upgrade-plans";

const options = [
  { amount: "£6.99", duration: "1" },
  { amount: "£34.99", duration: "6" },
  { amount: "£69.99", duration: "12" },
];

export default function UpgradePage() {
  const [planIndex, setPlanIndex] = useState(null);

  const selectPlan = (e) => {
    const index = +e.currentTarget.dataset.index;
    setPlanIndex(index);
  };

  const submit = async () => {
    //upgradeEP(planIndex);
    //history.push("/login");
  };

  return (
    <Layout>
      <div className={styles.upgrade}>
        <UpgradePlans
          index={planIndex}
          onSelect={selectPlan}
          options={options}
        />
        <br />
        <br />
        <button disabled={!planIndex} onClick={submit}>
          CONTINUE CHECKOUT
        </button>
      </div>
    </Layout>
  );
}
