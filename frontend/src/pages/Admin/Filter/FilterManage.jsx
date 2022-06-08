import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import {
  useGetFilteredWordsQuery,
  useRemoveFilteredWordMutation,
} from '../../../app/services/adminApi';
import Modal from '../../../components/Modal/Modal';
import Input from '../../../components/Input/Input';
import Loading from '../../../components/Loading/Loading';
import FilterModal from './FilterModal';

const FilterManage = () => {
  const navigate = useNavigate();
  const { data: filteredWords, isLoading } = useGetFilteredWordsQuery();
  const [removeWord] = useRemoveFilteredWordMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = async id => {
    await removeWord({ id });
  };

  const handleOpen = async id => {
    setIsOpen(true);
  };

  const handleClose = async id => {
    setIsOpen(false);
  };

  const searchFilteredWords = filteredWords?.filter(word =>
    word.word.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage Filtered Words</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div className='border-t-2 border-black mt-10 pt-2'>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='success'
              onClick={() => {
                handleOpen();
              }}
            >
              Add
            </Button>
          </div>
          <Input
            fullWidth
            className='p-5'
            placeholder='Search'
            onChange={e => setSearch(e.target.value)}
          />
          <div>
            {searchFilteredWords &&
              searchFilteredWords.map(c => (
                <div
                  className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                  key={c._id}
                >
                  <p className='text-xl font-bold'>{c.word}</p>
                  <Button type='danger' onClick={() => handleDelete(c._id)}>
                    Delete
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal handleClose={handleClose}>
          <FilterModal handleCloseEdit={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default FilterManage;
