import { Route, Routes } from 'react-router-dom';
import Category from '../pages/Category/Category';
import Posts from '../pages/Posts';
import SubCategory from '../pages/SubCategory/SubCategory';
import UserProfile from '../pages/UserProfile/UserProfile';
import AdminCategory from '../pages/Admin/Category/AdminCategory';
import NotFound from '../pages/NotFound/NotFound';

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path='/user-profile/:userId' element={<UserProfile />} />
      <Route path='/category/:categoryName' element={<Category />} />
      <Route
        path='/category/:categoryName/:subCategoryName'
        element={<SubCategory />}
      />
      <Route path='/admin/category' element={<AdminCategory />} />
      <Route path='/' element={<Posts />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default HomeRoutes;
