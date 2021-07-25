import React from "react";

export default function FooterRow(props) {
  const { isSubmitting, dirty, errors, cancel } = props;
  return (
    <React.Fragment>
      <tr>
        <td colSpan={4}>
          <button
            data-id="save"
            type="submit"
            disabled={isSubmitting || !dirty || Object.keys(errors).length}
          >
            Save
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <button data-id="cancel" onClick={cancel}>
            Cancel
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
}
