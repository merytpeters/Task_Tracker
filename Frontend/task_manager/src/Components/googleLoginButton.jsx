import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/google`,
        { token: credentialResponse.credential }
      );

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate('/profile');
      } else {
        console.error("No token received from server:", res.data);
      }
    } catch (error) {
      console.error("Google login error", error.response?.data || error.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
