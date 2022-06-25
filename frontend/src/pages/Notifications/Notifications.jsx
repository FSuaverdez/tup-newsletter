import React from 'react';
import { Link } from 'react-router-dom';
import { useGetNotificationsQuery } from '../../app/services/postApi';
import Loading from '../../components/Loading/Loading';
import 'moment-timezone';
import moment from 'moment';

const Notifications = () => {
  const { data, isLoading } = useGetNotificationsQuery();
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Notifications</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        {isLoading && <Loading />}
        {data && (
          <>
            {data.map(p => (
              <Link to={`/post/${[p._id]}`} key={p._id}>
                <div className='border border-gray-300 p-2 rounded my-2'>
                  <div className='flex  justify-between gap-2  items-center'>
                    <div className='flex-col gap-2 items-center'>
                      <p className='text-sm font-bold'>{p.title}</p>
                      <p className='text-sm font-normal'>
                        {Math.abs(
                          new Date(
                            moment.tz(p.approvedAt.slice(0, 19), 'Asia/Manila')
                          ).getTime() - new Date().getTime()
                        ) /
                          (60 * 60 * 1000) <
                        24
                          ? moment(
                              moment.tz(
                                p.approvedAt.slice(0, 19),
                                'Asia/Manila'
                              )
                            ).fromNow()
                          : moment(
                              moment.tz(
                                p.approvedAt.slice(0, 19),
                                'Asia/Manila'
                              )
                            ).calendar()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
