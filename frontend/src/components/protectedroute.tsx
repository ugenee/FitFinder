import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  user_id: number;
  user_age: number;
  user_gender: string;
  user_email: string;
  user_username: string;
}

function ProtectedRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get<User>("http://localhost:8000/user/me", {
          withCredentials: true, // ✅ include cookies
        });
        setUser(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error || !user) return <Navigate to="/login" replace />;

  return <Outlet />; // render child routes
}

export default ProtectedRoute;
