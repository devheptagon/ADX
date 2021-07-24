import { Editor } from "@tinymce/tinymce-react";
import { tinymceApiKey } from "config";

export default function RichText(props) {
  const { initialValue, field, handleChange } = props;
  return (
    <Editor
      initialValue={initialValue}
      init={{
        height: 200,
        menubar: false,
        plugins: [
          "advlist autolink lists link",
          "charmap print preview anchor help",
          "searchreplace visualblocks code",
          "insertdatetime media table paste wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
      }}
      onEditorChange={(e) => {
        handleChange({
          target: { name: field, value: e },
        });
      }}
      apiKey={tinymceApiKey}
    />
  );
}
