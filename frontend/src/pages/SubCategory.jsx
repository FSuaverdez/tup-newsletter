import { useParams } from 'react-router-dom'

const SubCategory = () => {
  const { categoryName, subCategoryName } = useParams()
  return (
    <div>
      {categoryName}/{subCategoryName}
    </div>
  )
}

export default SubCategory
