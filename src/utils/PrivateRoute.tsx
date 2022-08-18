import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
// import AuthContext from "../context/AuthContext";

// const PrivateRoute = ({ children, ...rest }) => {
//   let { user } = useContext(AuthContext);
//   return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>;
// };

// export default PrivateRoute;
    

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) {
  const { user, logoutUser } = useContext(AuthContext);
  if(user !== null) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};
