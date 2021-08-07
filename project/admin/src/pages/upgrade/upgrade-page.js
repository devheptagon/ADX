import Layout from "Layout";
import styles from "styles/app.module.scss";
import { useState } from "react";

import UpgradePlans from "./upgrade-plans";
import PaymentForm from "./payment-form";

const options = [
  { amount: "£6.99", duration: "1" },
  { amount: "£34.99", duration: "6" },
  { amount: "£69.99", duration: "12" },
];

export default function UpgradePage() {
  const [plan, setPlan] = useState(null);

  const selectPlan = (e) => {
    const index = e.currentTarget.dataset.id;
    setPlan(index);
  };

  const submit = async (values, { setSubmitting, setStatus, resetForm }) => {
    setSubmitting(true);

    setSubmitting(false);
    alert("Registration successful!");
    //history.push("/login");
    setStatus({ success: true });
  };

  return (
    <Layout>
      <div className={styles.upgrade}>
        <UpgradePlans index={plan} onSelect={selectPlan} />

        {plan != null && (
          <PaymentForm
            amount={options[plan].amount}
            duration={options[plan].duration}
            submit={submit}
          />
        )}
      </div>
    </Layout>
  );
}
