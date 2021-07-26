import MultiSelect from "react-multi-select-component";

export default function TagsRow(props) {
  const { tagOptions, selectedTags, selectTag, handleChange } = props;
  return (
    <tr>
      <td>
        <label>Tags: &nbsp;</label>
      </td>
      <td colSpan={3}>
        <fieldset>
          <MultiSelect
            options={tagOptions}
            value={selectedTags}
            labelledBy="Select Tag"
            hasSelectAll={false}
            onChange={(selection) => {
              selectTag(selection);
              handleChange({
                target: {
                  name: "tags",
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
