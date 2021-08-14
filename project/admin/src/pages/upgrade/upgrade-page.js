import Layout from "Layout";
import styles from "styles/app.module.scss";
import { useState } from "react";
import { PaymentOptions } from "utils/appHelper";
import UpgradePlans from "./upgrade-plans";
import { upgradeEP } from "integration/endpoints/user";

export default function UpgradePage() {
  const [planIndex, setPlanIndex] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const selectPlan = (e) => {
    const index = +e.currentTarget.dataset.index;
    setPlanIndex(index);
  };

  const submit = async () => {
    const data = PaymentOptions[planIndex];
    setRedirecting(true);
    var stripeUrl = await upgradeEP(data);
    setRedirecting(false);
    window.parent.location = stripeUrl;
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
        <button disabled={planIndex === null || redirecting} onClick={submit}>
          {redirecting ? "Processing..." : "CONTINUE CHECKOUT"}
        </button>
      </div>
    </Layout>
  );
}
