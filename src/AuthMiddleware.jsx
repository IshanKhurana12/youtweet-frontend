import { useNavigate } from "react-router-dom";
import { authState } from "../Recoil/login.atom";
import { useRecoilState } from "recoil";
import React, { useEffect } from 'react';

export default function AuthMiddleware({ children }) {
  const navigate = useNavigate();
  const [auth] = useRecoilState(authState);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth]);

  if (!auth.isAuthenticated) {
    return <div>Please login to continue.</div>;
  }

  return <>{children}</>;
}
