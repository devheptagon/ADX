export default function MonthlyRow(props) {
  const { values, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Monthly profit: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="monthlyProfit"
            id="monthlyProfit"
            placeholder="Monthly profit"
            title="* Monthly profit"
            value={values.monthlyProfit}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
      <td>
        <label>Monthly turnover: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="monthlyTurnover"
            id="monthlyTurnover"
            placeholder="Monthly turnover"
            title="* Monthly turnover"
            value={values.monthlyTurnover}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
    </tr>
  );
}
