import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddCategorySubscriberMutation,
  useAddSubCategorySubscriberMutation,
  useRemoveCategorySubscriberMutation,
  useRemoveSubCategorySubscriberMutation,
} from '../../app/services/adminApi';
import {
  useAddMobileNumberMutation,
  useEditMobileNumberMutation,
  useGetUserQuery,
} from '../../app/services/authApi';
import Button from '../Button/Button';

const SubscribeModal = ({
  handleClose,
  className: classes,
  data,
  dataType,
}) => {
  console.log(data);
  const user = useSelector(state => state.user);
  const { data: userData } = useGetUserQuery(user?._id);
  const [addNumber] = useAddMobileNumberMutation();
  const [editNumber] = useEditMobileNumberMutation();
  const [subscribeCategory] = useAddCategorySubscriberMutation();
  const [removeSubscribeCategory] = useRemoveCategorySubscriberMutation();
  const [removeSubscribeSubCategory] = useRemoveSubCategorySubscriberMutation();
  const [subscribeSubCategory] = useAddSubCategorySubscriberMutation();

  const subscribers = data?.subscribers;

  console.log(userData);

  const isSubscribedEmail = subscribers?.find(
    s => s.user === user?._id && s.subscriptionType === 'Email'
  );
  const isSubscribedSMS = subscribers?.find(
    s => s.user === user?._id && s.subscriptionType === 'SMS'
  );

  const handleSubscribeCategory = async ({ type, id }) => {
    try {
      await subscribeCategory({ type, id: data._id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSubscribeCategory = async ({ type, id }) => {
    try {
      await removeSubscribeCategory({ type, id: data._id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveSubscribeSubCategory = async ({ type, id }) => {
    try {
      await removeSubscribeSubCategory({ type, id: data._id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribeSubCategory = async ({ type, id }) => {
    try {
      await subscribeSubCategory({ type, id: data._id }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Subscribe to {data?.name}</h1>
      <div className='max-w-sm mx-auto'>
        <div className='flex justify-between items-center my-5'>
          <p className='font-bold text-lg'>Mobile Number</p>
          {!userData?.mobileNumber ? (
            <>
              <Button
                type='danger'
                onClick={() => {}}
                className='text-sm py-1 px-1 '
              >
                Add
              </Button>
            </>
          ) : (
            <>
              <Button
                type='danger'
                onClick={() => {}}
                className='text-sm py-1 px-1 '
              >
                Edit
              </Button>
            </>
          )}
        </div>
        <div className='flex justify-between items-center my-5'>
          {isSubscribedEmail ? (
            <>
              <p className='font-bold text-lg'>
                Subscribe to Email Notifications
              </p>
              <Button
                type='danger'
                onClick={() => {
                  if (dataType === 'Category') {
                    handleRemoveSubscribeCategory({
                      type: 'Email',
                      id: data._id,
                    });
                  } else {
                    handleRemoveSubscribeSubCategory({
                      type: 'Email',
                      id: data._id,
                    });
                  }
                }}
                className='text-sm py-1 px-1 '
              >
                Unsubscribe
              </Button>
            </>
          ) : (
            <>
              <p className='font-bold text-lg'>
                Subscribe to Email Notifications
              </p>
              <Button
                type='danger'
                onClick={() => {
                  if (dataType === 'Category') {
                    handleSubscribeCategory({ type: 'Email', id: data._id });
                  } else {
                    handleSubscribeSubCategory({ type: 'Email', id: data._id });
                  }
                }}
                className='text-sm py-1 px-1 '
              >
                Subscribe
              </Button>
            </>
          )}
        </div>
        <div className='flex justify-between items-center my-5'>
          {isSubscribedSMS && userData?.mobileNumber ? (
            <>
              <p className='font-bold text-lg'>
                Subscribe to SMS Notifications
              </p>
              <Button
                type='danger'
                onClick={() => {
                  if (dataType === 'Category') {
                    handleRemoveSubscribeCategory({
                      type: 'SMS',
                      id: data._id,
                    });
                  } else {
                    handleRemoveSubscribeSubCategory({
                      type: 'SMS',
                      id: data._id,
                    });
                  }
                }}
                className='text-sm py-1 px-1 '
              >
                Unsubscribe
              </Button>
            </>
          ) : userData?.mobileNumber ? (
            <>
              <p className='font-bold text-lg'>
                Subscribe to SMS Notifications
              </p>
              <Button
                type='danger'
                onClick={() => {
                  if (dataType === 'Category') {
                    handleSubscribeCategory({ type: 'SMS', id: data._id });
                  } else {
                    handleSubscribeSubCategory({ type: 'SMS', id: data._id });
                  }
                }}
                className='text-sm py-1 px-1 '
              >
                Subscribe
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <div className='flex gap-2 justify-end'>
        <Button type='danger' onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default SubscribeModal;
