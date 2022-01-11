import { Route, Routes } from 'react-router-dom'
import Category from '../pages/Category'
import Posts from '../pages/Posts'
import SubCategory from '../pages/SubCategory'
import UserProfile from './UserProfile'
import AdminCategory from '../pages/AdminCategory'

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
      <Route path='/*' element={<Posts />} />
    </Routes>
  )
}

export default HomeRoutes
