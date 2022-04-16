import React from 'react';
import { useParams } from 'react-router-dom';

const AdminCategoryEdit = () => {
  const { categoryId } = useParams();
  return <div>{categoryId}</div>;
};

export default AdminCategoryEdit;
