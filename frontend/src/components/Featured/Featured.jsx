import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/background.jpg';
import { useGetAllFeaturedPostsQuery } from '../../app/services/postApi';
import JoditEditor from 'jodit-react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
const Featured = props => {
  const { config } = props;
  const { data, isLoading, isFetching } = useGetAllFeaturedPostsQuery();
  const getImage = string => {
    let arr;
    if (string.match(/<img s([\w\W]+?)>/g)) {
      arr = string.match(/<img s([\w\W]+?)>/g);
    } else {
      arr = '';
    }

    return arr[0] || `<img src = ${img1} />`;
  };
  const handleFeaturedClick = (e) =>{
    console.log(e)
  }
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <div>
      {data?.length>0 && <h1 className='text-2xl font-bold mb-10'>Featured Posts</h1>}
      <Carousel
        breakPoints={breakPoints}
        showThumbs={false}
        swipeable={true}
        infiniteLoop={true}
        onSwipeMove = {handleFeaturedClick}
        emulateTouch = {true}
        autoPlay = {true}
      >
        {data?.map(c => {
          return (
            <div key={c._id} className='featured'>
              {/* <JoditEditor value={getImage(c.content)} config={config} /> */}
              <div className='featured-img'>{parse(getImage(c.content))} </div>
              <Link to={`/post/${c._id}`} key={c._id}>
                <p className='legend text-xl font-bold'>{c.title}</p>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Featured;
