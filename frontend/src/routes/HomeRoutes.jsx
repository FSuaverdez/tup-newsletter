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
import ContentSubCategoryManagePosts from '../pages/Admin/Content/SubCategory/ContentSubCategoryManagePosts';

import CreatePost from '../pages/Admin/Content/Post/CreatePost';
import PostManage from '../pages/Admin/Content/Post/PostManage';
import PostAllCategory from '../pages/Admin/Content/Post/PostAllCategory';
import ContentSubCategory from '../pages/Admin/Content/SubCategory/ContentSubCategory';

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
        path='/admin/category/edit/:categoryId/all-subcategories'
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
      <Route path='/content/subcategory' element={<ContentSubCategory />} />
      <Route
        path='/content/category/:categoryId'
        element={<ContentCategoryManage />}
      />
      <Route
        path='/content/subcategory/:subCategoryId'
        element={<ContentSubCategoryManagePosts />}
      />
      <Route
        path='/content/subcategory/:subCategoryId/create'
        element={<CreatePost />}
      />
      <Route
        path='/content/category/:categoryId/all-posts'
        element={<PostAllCategory />}
      />
      <Route path='/content/post' element={<PostManage />} />
      <Route path='/content/post/create' element={<CreatePost />} />
      <Route path='/admin' element={<Navigate to='/admin/category' />} />
      <Route path='/' element={<Posts />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default HomeRoutes;
