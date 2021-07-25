export default function WeeklyInput(props) {
  const { values, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Weekly profit: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="weeklyProfit"
            id="weeklyProfit"
            placeholder="Weekly profit"
            title="* Weekly profit"
            value={values.weeklyProfit}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
      <td>
        <label>Weekly turnover: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="weeklyTurnover"
            id="weeklyTurnover"
            placeholder="Weekly turnover"
            title="* Weekly turnover"
            value={values.weeklyTurnover}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
    </tr>
  );
}
