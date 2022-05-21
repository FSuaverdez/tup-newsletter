import { Navigate, Route, Routes } from 'react-router-dom';
import Category from '../pages/Category/Category';
import Posts from '../pages/Posts';
import SubCategory from '../pages/SubCategory/SubCategory';
import UserProfile from '../pages/UserProfile/UserProfile';
import AdminCategory from '../pages/Admin/Category/AdminCategory';
import NotFound from '../pages/NotFound/NotFound';
import AdminCategoryManage from '../pages/Admin/Category/AdminCategoryManage';
import AdminSubCategory from '../pages/Admin/SubCategory/AdminSubCategory';
import AdminSubCategoryManage from '../pages/Admin/SubCategory/AdminSubCategoryManage';
import AdminAllCategory from '../pages/Admin/Category/AdminAllCategory';
import AdminCategoryAllUserPermissions from '../pages/Admin/Components/AdminCategoryAllUserPermissions';
import AdminSubCategoryAllUserPermissions from '../pages/Admin/Components/AdminSubCategoryAllUserPermissions';
import ContentCategory from '../pages/Admin/Content/Category/ContentCategory';
import ContentCategoryManage from '../pages/Admin/Content/Category/ContentCategoryManage';

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
      <Route path='/admin/subcategory' element={<AdminSubCategory />} />
      <Route
        path='/admin/category/edit/:categoryId'
        element={<AdminCategoryManage />}
      />
      <Route
        path='/admin/subcategory/edit/:subCategoryId'
        element={<AdminSubCategoryManage />}
      />
      <Route
        path='/admin/category/edit/:categoryId/all-categories'
        element={<AdminAllCategory />}
      />
      <Route
        path='/admin/category/edit/:categoryId/all-permissions'
        element={<AdminCategoryAllUserPermissions />}
      />
      <Route
        path='/admin/subcategory/edit/:subCategoryId/all-permissions'
        element={<AdminSubCategoryAllUserPermissions />}
      />
      <Route path='/content' element={<Navigate to='/content/category' />} />
      <Route path='/content/category' element={<ContentCategory />} />
      <Route
        path='/content/category/manage/:categoryId'
        element={<ContentCategoryManage />}
      />
      <Route path='/admin' element={<Navigate to='/admin/category' />} />
      <Route path='/' element={<Posts />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default HomeRoutes;
