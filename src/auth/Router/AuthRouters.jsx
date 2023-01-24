import { Navigate, Route, Routes } from "react-router-dom";
import { ChooseOptions, LoginPage, RecoverAccount, RegisterPage } from "..";

export const AuthRouters = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="recoverAccount" element={<RecoverAccount />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="select" element={<ChooseOptions />} />

      <Route path="/*" element={<Navigate to="/auth/select" />} />
    </Routes>
  );
};
