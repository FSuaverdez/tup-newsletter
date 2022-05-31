import { useEffect, useState } from 'react';
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
import Input from '../Input/Input';

const SubscribeModal = ({
  handleClose,
  className: classes,
  data,
  dataType,
}) => {
  const user = useSelector(state => state.user);
  const { data: userData } = useGetUserQuery(user?._id);
  const [addNumber] = useAddMobileNumberMutation();
  const [editNumber] = useEditMobileNumberMutation();
  const [subscribeCategory] = useAddCategorySubscriberMutation();
  const [removeSubscribeCategory] = useRemoveCategorySubscriberMutation();
  const [removeSubscribeSubCategory] = useRemoveSubCategorySubscriberMutation();
  const [subscribeSubCategory] = useAddSubCategorySubscriberMutation();
  const [showField,setShowField] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [numberError, setNumberError] = useState('');
  const [id,setId] = useState('');

  const subscribers = data?.subscribers;


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

  const handleShowField = ()=>{
    setShowField(true);
  }

  const handleCloseField = ()=>{
    setShowField(false);
    setNumberError('');
  }

  const handleSaveNumber = async () => {
    try {
      if (mobileNumber){
        const letters = /[a-zA-Z]+$/;
        if(mobileNumber.match(letters)){
          setNumberError('WL')
        }
        else{
          if(userData?.mobileNumber){
            await editNumber({mobileNumber,id}).unwrap();
            handleCloseField();
          }
          else{
            await addNumber({mobileNumber,id}).unwrap();
            handleCloseField();
          }
          setNumberError('')
        }
      }
      else{
        !mobileNumber&&setNumberError('N')
      } 
    }
    catch(error){

    }
  };

  useEffect(()=>{
    const setCurrent = () => {
      if(userData?.mobileNumber){
        setMobileNumber(userData?.mobileNumber)
      }
      setId(userData?._id);
      console.log(id)
    }
    setCurrent();
    
  },[userData]);

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
                type='info'
                onClick={handleShowField}
                className='text-sm py-2 px-6 '
              >
                Add
              </Button>
            </>
          ) : (
            <>
              <Button
                type='info'
                onClick={handleShowField}
                className='text-sm py-2 px-6 '
              >
                Edit
              </Button>
            </>
          )}
        </div>
        {showField && 
             <div>
                  <label htmlFor='name' className='font-bold text-gray-600'>
                    Enter your mobile number: ex:{'(09287889588)'}
                  </label>
                  <div>
                    <Input
                      fullWidth
                      type='text'
                      name='mobileNumber'
                      onChange={e => setMobileNumber(e.target.value)}
                      value={mobileNumber}
                      required
                    />
                  </div>
                  { numberError==='N' && <p className='text-red-500 text-sm'>Mobile Number is required.</p> }
                  { numberError==='WL' && <p className='text-red-500 text-sm'>Mobile Number must not contain characters.</p>}
                  <div className='flex gap-2 justify-end'>
                    <Button type='success' 
                      onClick={handleSaveNumber}
                      className='text-sm py-2 px-6 '
                    >
                      Save
                    </Button>
                    <Button type='danger' 
                      onClick={handleCloseField}
                      className='text-sm py-2 px-6 '
                    >
                      Cancel
                    </Button>
                  </div>
                  
              
              </div>
    
          }
        <div className='flex justify-between items-center my-5'>
          {isSubscribedEmail ? (
            <>
              <p className='font-bold text-lg'>
                Subscribe to Email Notifications
              </p>
              <Button
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
                className='text-sm py-2 px-4'
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
                type='success'
                onClick={() => {
                  if (dataType === 'Category') {
                    handleSubscribeCategory({ type: 'Email', id: data._id });
                  } else {
                    handleSubscribeSubCategory({ type: 'Email', id: data._id });
                  }
                }}
                className='text-sm py-2 px-6 max-w-6'
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
                className='text-sm py-2 px-4'
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
                type='success'
                onClick={() => {
                  if (dataType === 'Category') {
                    handleSubscribeCategory({ type: 'SMS', id: data._id });
                  } else {
                    handleSubscribeSubCategory({ type: 'SMS', id: data._id });
                  }
                }}
                className='text-sm py-2 px-6 max-w-6 '
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
