import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/google`,
        { token: credentialResponse.credential }
      );

      // Save token, redirect, etc.
      localStorage.setItem("token", res.data.token);
      window.location.href = '/profile';
    } catch (error) {
      console.error("Google login error", error.response?.data || error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
