"use client";

// Este es el que no funciona, proyecto actual
import { useState, useEffect } from "react";
import {
  Italic,
  Bold,
  UnderlineIcon,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from '@tiptap/extension-code-block'
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import TurndownService from "turndown";

export default function Editor({value, onChange } : { value:JSONContent, onChange:(value:JSONContent) => void}) {
    const [Copied, setCopied] = useState(false);
    const [fileName, setFileName] = useState("result");

    const turndown = new TurndownService();

    const handleCopy = async () => {
        if (!editor) return;
      
        try {
          const html = editor.getHTML();
          const text = editor.getText();
      
          const clipboardData: Record<string, Blob> = {
            "text/plain": new Blob([text], { type: "text/plain" }),
            "text/html": new Blob([html], { type: "text/html" }),
          };
      
          await navigator.clipboard.write([new ClipboardItem(clipboardData)]);
      
          alert("Text copy to clipboard");
        } catch (err) {
          console.error("Failed to copy:", err);
          alert("Failed to copy");
        }
      };

    const downloadTxtFile = () => {
        const text = editor?.getText()
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
      
        document.body.removeChild(a); 
        URL.revokeObjectURL(url);
      }


  const editor = useEditor({
    extensions: [
        StarterKit,
        Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      BulletList,
      CodeBlock,
      Underline,
      Strike,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value, 
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json)
    },
  });


  useEffect(() => {
    if (!editor) return;
    if (value && JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) {
      editor.commands.setContent(value);
    }
  }, [editor]);

  const baseBtnClass = "p-2 w-12 flex justify-center items-center border border-gray-700 rounded hover:bg-gray-300";
  const getClass = (isActive: boolean) =>
    `${baseBtnClass} ${isActive ? 'bg-gray-400' : 'bg-gray-100'}`;

  if (!editor) return null;

  return (

            <div className="flex flex-col w-full h-full text-black dark:text-white">
            <div className="flex justify-between p-10 items-center bg-gray-100 dark:bg-gray-800 h-14  border border-gray-300 dark:border-gray-700">
                <div className="">{fileName}</div>
                <div className="flex gap-5">
                    <button onClick={handleCopy} className=" p-2 bg-blue-500 text-white font-bold rounded">copy</button>
                    <button onClick={downloadTxtFile} className=" p-2 bg-blue-500 text-white font-bold rounded">download</button>
                </div>
            </div>
            <div className="flex w-full h-full min-h-[50dvh] bg-white">
                <div className="w-1/4 flex-col bg-gray-200">
                    <div style={{ marginBottom: "10px" }} className="grid grid-cols-2 p-2 gap-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={getClass(editor.isActive('bold'))}><Bold size={18} /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getClass(editor.isActive('italic'))}><Italic size={18} /></button>
                  <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={getClass(editor.isActive('underline'))}><UnderlineIcon size={18} /></button>
                  <button onClick={() => editor.chain().focus().toggleStrike().run()} className={getClass(editor.isActive('strike'))}><Strikethrough size={18} /></button>
                  <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={getClass(editor.isActive('codeBlock'))}><Code size={18} /></button>
                  <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={getClass(editor.isActive('blockquote'))}><Quote size={18} /></button>
                  <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={getClass(editor.isActive('bulletList'))}><List size={18} /></button>
                  <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={getClass(editor.isActive('orderedList'))}><ListOrdered size={18} /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={getClass(editor.isActive({ textAlign: 'left' }))}><AlignLeft size={18} /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={getClass(editor.isActive({ textAlign: 'center' }))}><AlignCenter size={18} /></button>
                  <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={getClass(editor.isActive({ textAlign: 'right' }))}><AlignRight size={18} /></button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} className={getClass(editor.isActive('heading', { level: 1 }))}><Heading1 size={18} /></button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={getClass(editor.isActive('heading', { level: 2 }))}><Heading2 size={18} /></button>
                  <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={getClass(editor.isActive('heading', { level: 3 }))}><Heading3 size={18} /></button>
                    </div>
                </div>
                <div className="w-full  min-w-28 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 overflow-scroll">
                    <EditorContent editor={editor} className="flex w-full h-full editor-content min-w-28 p-8" />
                </div>
            </div>
        </div>
  );
}

//     return(
//         <div className="flex flex-col w-full h-full text-black dark:text-white">
//             <div className="flex justify-between p-10 items-center bg-gray-100 dark:bg-gray-800 h-14  border border-gray-300 dark:border-gray-700">
//                 <div className="">{fileName}</div>
//                 <div className="flex gap-5">
//                     <button onClick={handleCopy} className=" p-2 bg-blue-500 text-white font-bold rounded">copy</button>
//                     <button onClick={downloadTxtFile} className=" p-2 bg-blue-500 text-white font-bold rounded">download</button>
//                 </div>
//             </div>
//             <div className="w-full h-full flex justify-center items-center p-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
//                 {text}
//             </div>
//         </div>
//     )
// }