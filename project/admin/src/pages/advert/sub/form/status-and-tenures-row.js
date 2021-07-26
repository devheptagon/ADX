import MultiSelect from "react-multi-select-component";

export default function StatusAndTenuresRow(props) {
  const {
    handleChange,
    statusOptions,
    selectedStatutes,
    selectStatus,
    tenureOptions,
    selectedTenures,
    selectTenures,
  } = props;
  return (
    <tr>
      <td>
        <label>Status: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          <MultiSelect
            options={statusOptions}
            value={selectedStatutes}
            labelledBy="Select Status"
            hasSelectAll={false}
            onChange={(selection) => {
              selectStatus(selection);
              handleChange({
                target: {
                  name: "status",
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
        <label>Tenures: &nbsp;</label>
      </td>
      <td>
        <fieldset>
          <MultiSelect
            options={tenureOptions}
            value={selectedTenures}
            labelledBy="Select Tenures"
            hasSelectAll={false}
            onChange={(selection) => {
              selectTenures(selection);
              handleChange({
                target: {
                  name: "tenures",
                  value: selection.map((s) => s.value).join(","),
                },
              });
            }}
          />
        </fieldset>
      </td>
    </tr>
  );
}
