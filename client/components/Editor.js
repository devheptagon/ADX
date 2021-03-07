import {useState} from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = ({content}) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(content),
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
}

export default TextEditor;