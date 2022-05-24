import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import SelectCategory from '../../../../components/SelectCategory/SelectCategory';
import SelectSubCategory from '../../../../components/SelectSubCategory/SelectSubCategory';
import { useParams } from 'react-router-dom';
import { useGetSubCategoryQuery } from '../../../../app/services/subCategoryApi';

const CreatePost = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleCategoryChange = e => {
    setCategory(e);
    setSubCategory('');
  };
  const handleSubCategoryChange = e => {
    setSubCategory(e);
  };

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        CreatePost
        <SelectCategory value={category} onChange={handleCategoryChange} />
        <SelectSubCategory
          categoryId={category._id}
          value={subCategory}
          onChange={handleSubCategoryChange}
        />
        <div className='m-4 bg-white'>
          <Editor
            editorState={editorState}
            toolbarClassName='toolbarClassName'
            wrapperClassName='wrapperClassName'
            editorClassName='editorClassName'
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div>
          <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
