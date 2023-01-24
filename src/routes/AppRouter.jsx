import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouters } from "../auth";
import { AuthUserContext } from "../context";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { SecondRouter } from "./SecondRouter";

export const AppRouter = () => {
  const { isLoggedIn, startLoading } = useContext(AuthUserContext);

  if (startLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/*" element={<SecondRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouters />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
