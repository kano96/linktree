import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logout } from "../firebase/firebase";

const SignOutView = () => {
  const navigate = useNavigate();
  const handleUserLoggedIn = async (user) => {
    await logout();
  };
  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };
  const hanldeUserNotLoggedIn = () => {
    navigate("/login");
  };

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={hanldeUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      Cerrando sesión...
    </AuthProvider>
  );
};

export default SignOutView;
