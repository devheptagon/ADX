export default function TitleInput(props) {
  const { values, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Line1: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          <input
            type="text"
            name="line1"
            id="line1"
            placeholder="Line1"
            title="* Line1"
            value={values.line1}
            onChange={handleChange}
          />
        </fieldset>
      </td>
      <td>
        <label>Line2: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          <input
            type="text"
            name="line2"
            id="line2"
            placeholder="Line2"
            title="* Line2"
            value={values.line2}
            onChange={handleChange}
          />
        </fieldset>
      </td>
    </tr>
  );
}
