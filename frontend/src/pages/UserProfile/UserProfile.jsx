import { useParams } from 'react-router-dom';
const UserProfile = () => {
  const { userId } = useParams();
  return <div>UserProfile : {userId} </div>;
};

export default UserProfile;
