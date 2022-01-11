const AdminCategory = () => {
  return (
    <div className='p-5'>
      <h1 className='text-3xl'>Manage Categories</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg'>
        <h2 className='text-2xl'>Categories</h2>

        <div className='flex items-center w-full justify-end mb-5'>
          <button
            type='button'
            className='bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600'
          >
            Add Category
          </button>
        </div>
        <table class='table-auto w-full'>
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCategory
