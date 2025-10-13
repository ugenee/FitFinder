import { queryOptions } from "@tanstack/react-query";

async function fetchCurrentUser() {
  const response = await fetch("https://fitfinder-backend-l8ma.onrender.com/user/me", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Not Authenticated");
  return response.json();
}

export function fetchCurrentUserQueryOptions() {
    return queryOptions ({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,  
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}