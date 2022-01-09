import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import logo from '../assets/logo.png'
import background from '../assets/background.jpg'
import { useLoginMutation } from '../app/services/authApi'

const Login = () => {
  const navigate = useNavigate()
  const [login, result] = useLoginMutation()

  const responseGoogle = async res => {
    const user = res?.profileObj
    const token = res?.tokenId

    try {
      const ok = await login({ user, token }).unwrap()
      console.log(result)
      console.log(ok)
      // navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img
          src={background}
          className='w-full h-full object-cover content-center'
          alt='TUP Building'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5 flex flex-col justify-center items-center gap-4'>
            <img src={logo} alt='TUP-LOGO' width='75px' />
            <h1 className='text-4xl font-bold text-white'>TUP NewsLetter</h1>
          </div>
          <GoogleLogin
            clientId='1099313794047-4m3h89s72r18vrmc6d91954r2tacutck.apps.googleusercontent.com'
            render={renderProps => (
              <button
                type='button'
                className='bg-white flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none disabled:cursor-not-allowed disabled:bg-gray-300 shadow-lg hover:shadow-2xl tranform transition-all duration-75 ease-in-out hover:-translate-y-0.5 active:translate-y-0.5'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className='mr-4' /> Sign In with Google
              </button>
            )}
            onSuccess={responseGoogle}
            cookiePolicy='single_host_origin'
          />
        </div>
      </div>
    </div>
  )
}

export default Login
