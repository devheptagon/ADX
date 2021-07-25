export default function TitleInput(props) {
  const { values, handleChange, errors } = props;
  return (
    <tr>
      <td>
        <label>Title: &nbsp;</label>
      </td>
      <td colSpan={3}>
        <fieldset>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            title="* Title"
            required="required"
            value={values.title}
            onChange={handleChange}
          />
        </fieldset>
        <span data-id="error">{errors.title}</span>
      </td>
    </tr>
  );
}
