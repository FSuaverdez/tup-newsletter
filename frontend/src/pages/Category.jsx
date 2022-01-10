import { useParams } from 'react-router-dom'

const Category = () => {
  const { categoryName } = useParams()

  return <div>{categoryName}</div>
}

export default Category
