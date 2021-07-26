export default function AnnualRow(props) {
  const { values, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Annual profit: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="annualProfit"
            id="annualProfit"
            placeholder="Annual profit"
            title="* Annual profit"
            value={values.annualProfit}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
      <td>
        <label>Annual turnover: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="annualTurnover"
            id="annualTurnover"
            placeholder="Annual turnover"
            title="* Annual turnover"
            value={values.annualTurnover}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
    </tr>
  );
}
