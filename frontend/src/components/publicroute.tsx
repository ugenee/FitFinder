import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

async function fetchCurrentUser() {
  const response = await fetch("http://localhost:8000/user/me", {
    method: "GET",
    credentials: "include", // cookies
  });
  if (!response.ok) throw new Error("Not Authenticated");
  return response.json();
}


function PublicRoute() {
  const {data: user, isLoading, isError} = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false, // stop retrying if not authenticated
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return null;
  if (user && !isError) return <Navigate to="/home" replace />;

  return <Outlet />; // render login/signup if no token
}

export default PublicRoute;
