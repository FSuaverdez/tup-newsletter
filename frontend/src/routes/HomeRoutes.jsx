import { Navigate, Route, Routes } from 'react-router-dom';
import Category from '../pages/Category/Category';
import Home from '../pages/Home';
import ContentPost from '../pages/Admin/Content/Post/ContentPost';
import SubCategory from '../pages/SubCategory/SubCategory';
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
import EditPost from '../pages/Admin/Content/Post/EditPost';
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
      <Route path='/' element={<Home />} />
      <Route path='/category/:categoryId' element={<Category />} />
      <Route
        path='/category/:categoryId/:subCategoryId'
        element={<SubCategory />}
      />
      <Route path='/post/:postId' element={<Post />} />

      <Route
        path='/admin/users'
        element={user ? <UserManage /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/category'
        element={user ? <AdminCategory /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/subcategory'
        element={user ? <AdminSubCategory /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/category/edit/:categoryId'
        element={user ? <AdminCategoryManage /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/subcategory/edit/:subCategoryId'
        element={user ? <AdminSubCategoryManage /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/category/edit/:categoryId/all-subcategories'
        element={user ? <AdminAllCategory /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/category/edit/:categoryId/all-permissions'
        element={
          user ? <AdminCategoryAllUserPermissions /> : <Navigate to='/' />
        }
      />
      <Route
        path='/admin/subcategory/edit/:subCategoryId/all-permissions'
        element={
          user ? <AdminSubCategoryAllUserPermissions /> : <Navigate to='/' />
        }
      />

      <Route
        path='/content/category'
        element={user ? <ContentCategory /> : <Navigate to='/' />}
      />
      <Route
        path='/content/subcategory'
        element={user ? <ContentSubCategory /> : <Navigate to='/' />}
      />
      <Route
        path='/content/category/:categoryId'
        element={user ? <ContentCategoryManage /> : <Navigate to='/' />}
      />
      <Route
        path='/content/subcategory/:subCategoryId'
        element={user ? <ContentSubCategoryManagePosts /> : <Navigate to='/' />}
      />
      <Route
        path='/content/subcategory/:subCategoryId/create'
        element={user ? <CreatePost /> : <Navigate to='/' />}
      />
      <Route
        path='/content/category/:categoryId/all-posts/approved'
        element={user ? <PostAllCategory type={'A'} /> : <Navigate to='/' />}
      />
      <Route
        path='/content/category/:categoryId/all-posts/pending'
        element={user ? <PostAllCategory type={'P'} /> : <Navigate to='/' />}
      />
      <Route
        path='content/category/:categoryId/all-subcategories'
        element={user ? <ContentAllSubCategory /> : <Navigate to='/' />}
      />

      <Route
        path='/content/post/all/approved'
        element={user ? <AllPost type={'A'} /> : <Navigate to='/' />}
      />
      <Route
        path='/content/post/all/pending'
        element={user ? <AllPost type={'P'} /> : <Navigate to='/' />}
      />
      <Route
        path='/content/post/:postId'
        element={user ? <ContentPost /> : <Navigate to='/' />}
      />
      <Route
        path='/content/post'
        element={user ? <PostManage /> : <Navigate to='/' />}
      />
      <Route
        path='/content/post/create'
        element={user ? <CreatePost /> : <Navigate to='/' />}
      />
      <Route
        path='/content/post/create/:id'
        element={user ? <CreatePost /> : <Navigate to='/' />}
      />
      <Route
        path='/content/post/:postId/edit'
        element={user ? <EditPost /> : <Navigate to='/' />}
      />
      <Route
        path='/admin/filter'
        element={user ? <FilterManage /> : <Navigate to='/' />}
      />

      <Route path='/content' element={<Navigate to='/content/category' />} />
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
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};

export default HomeRoutes;
