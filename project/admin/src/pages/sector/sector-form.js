import { getSectorsEP, updateSectorsEP } from "integration/endpoints/sector";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSectorsAction } from "redux/app/appActions";
import { Formik, dis } from "formik";
import * as yup from "yup";

export default function SectorForm(props) {
  const dispatch = useDispatch();
  // const [title, setTitle] = useState(props.item.title);

  /*   const update = async () => {
    await updateSectorsEP({ id: props.item.id, title });
    const newList = await getSectorsEP();
    dispatch(setSectorsAction(newList));
    props.onClose();
  }; */

  const cancel = () => {
    props.onClose();
  };

  return (
    <Formik
      initialValues={{
        title: props.item.title,
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
        setSubmitting(true);
        await updateSectorsEP({ id: props.item.id, title: values.title });
        const newList = await getSectorsEP();
        dispatch(setSectorsAction(newList));
        setSubmitting(false);
        resetForm({});
        setStatus({ success: true });
        props.onClose();
      }}
    >
      {(props) => {
        const {
          values,
          //touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <table id="dataform">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Title">Title: &nbsp;</label>
                  </td>
                  <td>
                    {" "}
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
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>
                    <button
                      data-id="save"
                      type="submit"
                      disabled={
                        isSubmitting || !dirty || Object.keys(errors).length
                      }
                    >
                      Save
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button data-id="cancel" onClick={cancel}>
                      Cancel
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>
        );
      }}
    </Formik>
  );
}
