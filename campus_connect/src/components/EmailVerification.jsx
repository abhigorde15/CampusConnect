import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { httpClient } from "../config/AxiosHelper";
const EmailVerification = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (token.trim()) {
      httpClient
        .get(`api/auth/verify?token=${token}`)
        .then(res => {
          toast.success(res.data);
          navigate("/auth");
        })
        .catch(err => {
          toast.error(err.response?.data || "Verification failed.");
        });
    } else {
      toast.error("Token cannot be empty");
    }
  };

  return (
    <div className="p-4 text-center text-gray-700">
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter code sent on Email'
          className='px-4 py-2 border-2'
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          type='submit'
          className='ml-3 bg-blue-600 px-4 py-2 rounded text-white'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
