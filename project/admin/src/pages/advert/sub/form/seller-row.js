import MultiSelect from "react-multi-select-component";

export default function SellerRow(props) {
  const { sellerOptions, selectedSellers, selectSeller, handleChange, errors } =
    props;

  if (!sellerOptions?.length) return null;

  return (
    <tr>
      <td>
        <label>Seller: &nbsp;</label>
      </td>
      <td colSpan={3}>
        <fieldset>
          <MultiSelect
            options={sellerOptions}
            value={selectedSellers}
            labelledBy="Select Seller"
            hasSelectAll={false}
            onChange={(selection) => {
              selectSeller(selection);
              handleChange({
                target: {
                  name: "seller_id",
                  value: selection.length
                    ? selection[selection.length - 1].value
                    : "",
                },
              });
            }}
          />
        </fieldset>
        <span data-id="error">{errors.seller_id}</span>
      </td>
    </tr>
  );
}
