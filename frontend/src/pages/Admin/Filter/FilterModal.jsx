import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAddFilteredWordMutation,
  useEditCategoryMutation,
} from '../../../app/services/adminApi';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

const FilterModal = ({ handleCloseEdit, className: classes }) => {
  const [word, setWord] = useState('');
  const [wordError, setWordError] = useState(false);
  const [addWord] = useAddFilteredWordMutation();
  const handleSubmit = async () => {
    try {
      if (word) {
        await addWord({ word }).unwrap();
        handleCloseEdit();
        setWordError(false);
      } else {
        setWordError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Create Word</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <Input
            fullWidth
            type='text'
            name='name'
            label='Word'
            onChange={e => setWord(e.target.value)}
            value={word}
            required
          />
          {wordError && (
            <p className='text-red-500 text-sm'>Word is required.</p>
          )}
        </div>

        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseEdit}>
            Close
          </Button>
          <Button type='success' onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
