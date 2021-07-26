export default function LeaseholdAndFreeholdRow(props) {
  const { values, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Leasehold Price: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="leaseHoldPrice"
            id="leaseHoldPrice"
            placeholder="Leasehold price"
            title="* Leasehold price"
            value={values.leaseHoldPrice}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
      <td>
        <label>Freehold Price: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          £
          <input
            type="number"
            name="freeHoldPrice"
            id="freeHoldPrice"
            placeholder="FreeHold price"
            title="* FreeHold price"
            value={values.freeHoldPrice}
            onChange={handleChange}
            min={0}
          />
        </fieldset>
      </td>
    </tr>
  );
}
