import { useLocation, Navigate, Outlet } from "react-router-dom";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const useAuth = () => {
  let Token = getCookie("Token");
  return Token != "";
};

const ProtectedRoutes = ({ allowedRoles }) => {
  let username = getCookie("UserName");
  let utipo = getCookie("UTipo");

  console.log(utipo);

  const location = useLocation();
  const isAuth = useAuth();
  return isAuth && utipo === allowedRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
