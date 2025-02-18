import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useUserStore } from "@/context/useUserStore";

export default function AdminLayout() {
  const { accessToken, fetchAccessToken } = useUserStore();

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken();
    }
    // if accessToken expires true or not
    // fetchAccessToken(); // that will call refresh token api(which return new access token)
  }, [accessToken, fetchAccessToken]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
