import { Navigate, Route, Routes } from 'react-router-dom';
import Category from '../pages/Category/Category';
import Home from '../pages/Home';
import ContentPost from '../pages/Admin/Content/Post/ContentPost';
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
import AllPost from '../pages/Admin/Content/Post/AllPost';
import PostAllCategory from '../pages/Admin/Content/Post/PostAllCategory';
import ContentSubCategory from '../pages/Admin/Content/SubCategory/ContentSubCategory';
import ContentAllSubCategory from '../pages/Admin/Content/SubCategory/ContentAllSubCategory';
import Post from '../pages/Post/Post';
import { useSelector } from 'react-redux';
import { useGetPermissionsQuery } from '../app/services/authApi';
import UserManage from '../pages/Admin/Content/User/UserManage';
import FilterManage from '../pages/Admin/Filter/FilterManage';

const HomeRoutes = () => {
  const user = useSelector(state => state.user);

  const { data, isLoading } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });

  return (
    <Routes>
      <Route path='/user-profile/:userId' element={<UserProfile />} />
      <Route path='/category/:categoryId' element={<Category />} />
      <Route
        path='/category/:categoryId/:subCategoryId'
        element={<SubCategory />}
      />
      <Route path='/admin/users' element={<UserManage />} />
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
        path='/content/category/:categoryId/all-posts/approved'
        element={<PostAllCategory type = {'A'}/>}
      />
       <Route
        path='/content/category/:categoryId/all-posts/pending'
        element={<PostAllCategory type = {'P'}/>}
      />
      <Route
        path='content/category/:categoryId/all-subcategories'
        element={<ContentAllSubCategory />}
      />

      <Route path='/content/post/all/approved' element={<AllPost type = {'A'}/>} />
      <Route path='/content/post/all/pending' element={<AllPost type = {'P'}/>} />
      <Route path='/content/post/:postId' element={<ContentPost />} />
      <Route path='/post/:postId' element={<Post />} />
      <Route path='/content/post' element={<PostManage />} />
      <Route path='/content/post/create' element={<CreatePost />} />
      <Route path='/admin/filter' element={<FilterManage />} />
      <Route
        path='/admin'
        element={
          user?.isAdmin || data?.showCategoryAdmin ? (
            <Navigate to='/admin/category' />
          ) : (
            <Navigate to='/admin/subcategory' />
          )
        }
      />
      <Route path='/' element={<Home />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default HomeRoutes;
