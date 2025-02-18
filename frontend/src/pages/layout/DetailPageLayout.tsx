import { Outlet, useNavigate } from "react-router";

const DetailPageLayout = () => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/");
  };

  return (
    <>
      <nav>
        <button onClick={handleNav} />
        <p>back</p>
      </nav>

      <Outlet />
    </>
  );
};

export default DetailPageLayout;
