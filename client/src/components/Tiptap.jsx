import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CharacterCount } from "@tiptap/extensions";
import { useEffect, useState } from "react";
import "prosemirror-view/style/prosemirror.css";

const limit = 5000;

function Tiptap({ onEditorContentPost }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({ limit }),
    ],
    content: "<p>Write your content here...</p>",
    editorProps: {
      attributes: {
        class: 'prose break-words prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const updateCounts = () => {
      setCharCount(editor.storage.characterCount.characters());
      setWordCount(editor.storage.characterCount.words());
    };

    updateCounts(); // initial count

    editor.on('update', updateCounts);
    return () => editor.off('update', updateCounts);
  }, [editor]);

  useEffect(() => {
    if (editor && onEditorContentPost) {
      onEditorContentPost(editor);
    }
  }, [editor, onEditorContentPost]);

  if (!editor) return null;

  const percentage = Math.min(100, Math.round((100 / limit) * charCount));
  const circleLength = 31.4;
  const strokeDasharray = `${(percentage / 100) * circleLength} ${circleLength}`;

  return (
    <div>
      <div className="w-full max-w-screen-sm mx-auto overflow-x-hidden">
        <EditorContent editor={editor} />
        <div
          className={`flex gap-2 h-8 items-center mt-2 border-t border-gray-200 character-count ${
            charCount >= limit ? "character-count--warning text-red-500" : ""
          }`}
        >
          <svg height="20" width="20" viewBox="0 0 20 20">
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={strokeDasharray}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>
          {charCount} / {limit} characters ({wordCount} words)
        </div>
      </div>
    </div>
  );
}

export default Tiptap;
