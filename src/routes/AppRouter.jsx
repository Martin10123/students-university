import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRouters } from "../auth";
import { SecondRouter } from "./SecondRouter";

export const AppRouter = () => {
  return (
    <Routes>
      {false ? (
        <Route path="/*" element={<SecondRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouters />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
