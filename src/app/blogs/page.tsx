// pages/editor.tsx
"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import the React Quill styles
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

// Dynamically load React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Add image resizing and alignment modules
const ImageAlignStyle = Quill.import('formats/image');
ImageAlignStyle.className = 'custom-image';

const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // Toggle buttons
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],                                // Justify options
      ['link', 'image'],                                // Add links and images
      [{ 'color': [] }, { 'background': [] }],          // Color and background
      [{ 'font': [] }],
      [{ 'align': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // Subscript / superscript
    ]
  },
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link', 'image', 'align', 'color', 'background', 'font', 'script'
];

const EditorPage: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>('');

  // Save button logic: log the content without images
  const handleSave = () => {
    const filteredContent = editorContent.replace(/<img[^>]*>/g, ''); // Removing images
    console.log('Saved content (excluding images):', filteredContent);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center ">Blog Editor</h1>

      <ReactQuill
      className=' bg-slate-200 text-black bg-opacity-80 w-full min-h-[60vh]'
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        formats={formats}
        placeholder="Write something amazing..."
      />

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default EditorPage;
