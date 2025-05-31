
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@chakra-ui/react";

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
    <Grid
      templateAreas={{
        base: `"nav" "list" "page"`, // Stack nav, form, and list in one column for small screens
        lg: `"nav nav" "list list" "page page"`, // In large screens, side by side
        md: `"nav nav nav" "list list list" "page page page"`,
        sm: `"nav nav nav nav" "list list list list" "page page page page"`,
      }}
      templateColumns={{
        base: "1fr",
        md: "1fr",
        sm: "1fr",
      }}
      padding={3}
    >

      <Outlet />

    </Grid>
  );
}
