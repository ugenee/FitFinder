import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PublicRoute() {
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user/me", {
          withCredentials: true, // send cookie
        });
        if (res.data) setHasToken(true);
      } catch (err) {
        setHasToken(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (hasToken) return <Navigate to="/home" replace />;

  return <Outlet />; // render login/signup if no token
}

export default PublicRoute;
