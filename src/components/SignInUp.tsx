import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import './style/signInUp.css'
import { UserSignIn, User, createUserPayload } from '../types/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signUpUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../store/slices/signInSlice';

const SignInUp = () => {
    const [showSignUp, setShowSignUp] = useState(false)
    const navigate = useNavigate();
    const showSignUpForm = () => {
        setShowSignUp(!showSignUp)
    }
    const dispatch = useAppDispatch()
    const [newUser, setNewUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        password: '',
    })
    const [logInUser, setLogInUser] = useState<UserSignIn>({
        email: '',
        password: '',
    })

    const { onError } = useAppSelector((state) => state.auth)
    const logInError = useAppSelector((state) => state.signIn.onError)

    const handleSignUp = async () => {
        const isValid = newUser.name && newUser.email && newUser.phone && newUser.password
        if (!isValid)
            return
        dispatch(signUpUser({
            ...newUser,
            onSuccess: () => {
                navigate("/")
            }
        }))
    }

    const handleSignIn = async () => {
        const isValid = logInUser.email && logInUser.password
        if (!isValid)
            return
        dispatch(signInUser({
            ...logInUser,
            onSuccess: () => {
                navigate("/")
            }
        }))
    }


    return (
        <div className="mainContainer">
            <div className={`container ${showSignUp ? 'active' : 'hidden'}`} id="container">
                <div className="form-container sign-up">
                    <div className='form'>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <GoogleIcon />
                            </a>
                        </div>
                        <span>or use your email for registeration</span>
                        <input type="text" placeholder="Name" className={onError?.name ? 'errorInput' : 'Input'}
                            onChange={(evt) => setNewUser({ ...newUser, name: evt.target.value })}
                        />
                        {onError?.name && <span className='errorMessage'>{onError.name[0]}</span>}

                        <input type="email" placeholder="Email" className={onError?.email ? 'errorInput' : 'Input'}
                            onChange={(evt) => setNewUser({ ...newUser, email: evt.target.value })}
                        />
                        {onError?.email && <span className='errorMessage'>{onError.email[0]}</span>}

                        <input type="text" placeholder="Phone No." className={onError?.phone ? 'errorInput' : 'Input'}
                            onChange={(evt) => setNewUser({ ...newUser, phone: evt.target.value })}
                        />
                        {onError?.phone && <span className='errorMessage'>{onError.phone[0]}</span>}

                        <input type="password" placeholder="Password" className={onError?.password ? 'errorInput' : 'Input'}
                            onChange={(evt) => setNewUser({ ...newUser, password: evt.target.value })}
                        />
                        {onError?.password && <span className='errorMessage'>{onError.password[0]}</span>}
                        <button onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
                <div className="form-container sign-in">
                    <div className='form'>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon">
                                <GoogleIcon />
                            </a>
                        </div>
                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" className={logInError?.email ? 'errorInput' : 'Input'}
                            onChange={(evt) => setLogInUser({ ...logInUser, email: evt.target.value })}
                        />
                        {logInError?.email && <span className='errorMessage'>{logInError.email[0]}</span>}
                        <input type="password" placeholder="Password" className={logInError?.password ? 'errorInput' : 'Input'}
                            onChange={(evt) => setLogInUser({ ...logInUser, password: evt.target.value })}
                        />
                        {logInError?.password && <span className='errorMessage'>{logInError.password[0]}</span>}

                        <a href="#">Forget Your Password?</a>
                        <button onClick={handleSignIn}>Sign In</button>
                    </div>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login" onClick={showSignUpForm}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className='hidden' id="register" onClick={showSignUpForm}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInUp