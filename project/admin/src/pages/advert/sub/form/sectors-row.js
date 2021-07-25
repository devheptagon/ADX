import MultiSelect from "react-multi-select-component";

export default function SectorsInput(props) {
  const { sectorOptions, selectedSectors, selectSector, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Sectors: &nbsp;</label>
      </td>
      <td colSpan={3}>
        <fieldset>
          <MultiSelect
            options={sectorOptions}
            value={selectedSectors}
            labelledBy="Select Sector"
            hasSelectAll={false}
            onChange={(selection) => {
              selectSector(selection);
              handleChange({
                target: {
                  name: "sectors",
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
