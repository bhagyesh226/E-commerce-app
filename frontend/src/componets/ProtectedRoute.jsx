import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
