import Layout from "Layout";
import UpgradeForm from "./upgrade-form";
import styles from "styles/app.module.scss";
import { useState } from "react";

import UpgradePlans from "./upgrade-plans";

export default function UpgradePage() {
  const [plan, setPlan] = useState(null);
  const selectPlan = (e) => {
    const index = e.currentTarget.dataset.id;
    setPlan(index);
  };

  return (
    <Layout>
      <div className={styles.upgrade}>
        <UpgradePlans index={plan} onSelect={selectPlan} />
        <UpgradeForm />
      </div>
    </Layout>
  );
}
