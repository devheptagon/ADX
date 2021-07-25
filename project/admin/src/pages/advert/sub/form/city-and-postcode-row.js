import MultiSelect from "react-multi-select-component";

export default function CityAndPostcodeInput(props) {
  const { cityOptions, selectedCities, selectCity, handleChange, values } =
    props;
  return (
    <tr>
      <td>
        <label>City: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          <MultiSelect
            options={cityOptions}
            value={selectedCities}
            labelledBy="Select City"
            hasSelectAll={false}
            onChange={(selection) => {
              selectCity(selection);
              handleChange({
                target: {
                  name: "city",
                  value: selection.length
                    ? selection[selection.length - 1].value
                    : "",
                },
              });
            }}
          />
        </fieldset>
      </td>
      <td>
        <label>Postcode: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          <input
            type="text"
            name="postcode"
            id="postcode"
            placeholder="Postcode"
            title="* Postcode"
            value={values.postcode}
            onChange={handleChange}
          />
        </fieldset>
      </td>
    </tr>
  );
}
