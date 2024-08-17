import React, { useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import './style/signInUp.css'
import { UserSignIn, User, createUserPayload } from '../types/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signUpUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { signInGoogle, signInUser } from '../store/slices/signInSlice';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { CircularProgress } from '@mui/material';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

interface userGoogleCreditial {
    email: string
    name: string
}

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
    const [logInError, setLogInError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)


    const handleSignUp = async () => {
        const isValid = newUser.name && newUser.email && newUser.phone && newUser.password
        if (!isValid)
            return
        setLoading(true)
        dispatch(signUpUser({
            ...newUser,
            onSuccess: () => {
                setLoading(false)
                navigate("/")
            }
        }))
    }

    const handleSignIn = async () => {
        const isValid = logInUser.email && logInUser.password
        if (!isValid)
            return
        setLoading(true)
        dispatch(signInUser({
            ...logInUser,
            onSuccess: () => {
                setLoading(false)
                navigate("/")
            },
            onError: () => {
                setLoading(false)
                setLogInError(true)
            }
        }))
    }

    const googleSignIn = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const googleToken = response.access_token;
                const userProfileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                    headers: {
                        Authorization: `Bearer ${googleToken}`,
                    },
                });

                const userProfileData = await userProfileResponse.json();
                const { name, email } = userProfileData;
                dispatch(signInGoogle({
                    email, name,
                    onSuccess: () => {
                        setLoading(false)
                        navigate("/")
                    },
                    onError: () => {
                        setLoading(false)
                        setLogInError(true)
                    }
                }))


            } catch (error) {
                console.error('Google login error', error);
            }
        },
        onError: (error) => {
            console.error('Google login error', error);
        },
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mainContainer">
            <div className={`container ${showSignUp ? 'active' : 'hidden'}`} id="container">
                <div className="form-container sign-up">
                    <div className='form'>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <div className="socialBtn" onClick={() => googleSignIn()}>
                                <GoogleIcon />
                            </div>
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

                        <input type="number" placeholder="Phone No." className={onError?.phone ? 'errorInput' : 'Input'}
                            onChange={(evt) => setNewUser({ ...newUser, phone: evt.target.value })}
                        />
                        {onError?.phone && <span className='errorMessage'>{onError.phone[0]}</span>}

                        <div style={{ position: 'relative', width: '100%' }}>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className={onError?.password ? 'errorInput' : 'Input'}
                                onChange={(evt) => setNewUser({ ...newUser, password: evt.target.value })}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    fontSize: '18px'
                                }}
                            >
                                {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                            </span>
                        </div>

                        {onError?.password && <span className='errorMessage'>{onError.password[0]}</span>}
                        <button onClick={handleSignUp}>
                            {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Sign Up'}
                        </button>
                    </div>
                </div>
                <div className="form-container sign-in">
                    <div className='form'>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <div className="socialBtn" onClick={() => googleSignIn()}>
                                <GoogleIcon />
                            </div>
                        </div>
                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" className='Input'
                            onChange={(evt) => setLogInUser({ ...logInUser, email: evt.target.value })}
                        />

                        <div style={{ position: 'relative', width: '100%' }}>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className='Input'
                                onChange={(evt) => setLogInUser({ ...logInUser, password: evt.target.value })}
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    fontSize: '18px'
                                }}
                            >
                                {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                            </span>
                        </div>
                        {logInError && <span className='errorMessage'>Your email or password do not match. Please try again.</span>}

                        <a href="#">Forget Your Password?</a>
                        <button onClick={handleSignIn}>
                            {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Sign In'}
                        </button>
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