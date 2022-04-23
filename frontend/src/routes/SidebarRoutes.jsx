import { Navigate, Route, Routes } from 'react-router-dom';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';
import SidebarCategory from '../components/Sidebar/SidebarCategory';

const SidebarRoutes = ({ categories, handleCloseSidebar }) => {
  return (
    <Routes>
      <Route path='/admin' element={<Navigate to='/admin/category' />} />
      <Route
        path='/admin/*'
        element={<SidebarAdmin handleCloseSidebar={handleCloseSidebar} />}
      />
      <Route path='/content' element={<>content</>} />
      <Route
        path='/*'
        element={
          <>
            {/* <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Categories
          </h3> */}
            {categories.map(category => (
              <SidebarCategory
                key={category.name}
                category={category}
                handleCloseSidebar={handleCloseSidebar}
              />
            ))}
          </>
        }
      />
    </Routes>
  );
};

export default SidebarRoutes;
