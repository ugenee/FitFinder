import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

async function fetchCurrentUser() {
  const response = await fetch("https://fitfinder-backend-l8ma.onrender.com/user/me", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Not Authenticated");
  return response.json();
}

function ProtectedRoute() {
  const {data: user, isLoading, isError} = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });
  
  if (isLoading) return null;
  if (isError || !user) return <Navigate to="/login" replace />;

  return <Outlet />; // render child routes
}

export default ProtectedRoute;
