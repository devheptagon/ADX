import Layout from "Layout";
import styles from "styles/app.module.scss";
import { useState } from "react";
import { PaymentOptions } from "utils/appHelper";
import UpgradePlans from "./upgrade-plans";

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
          options={PaymentOptions}
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
