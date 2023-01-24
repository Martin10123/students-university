import { Navigate, Route, Routes } from "react-router-dom";

import { AboutApp } from "../aboutTheApp";
import { BoxComment } from "../boxComments";
import { CollegeVacation } from "../collegeVacation";
import { JobOffers } from "../jobOffers";
import { MainApp } from "../mainApp";
import { MainStore, SelfArticle } from "../storeApp";
import { MessagesApp } from "../chatting";
import { ProfilePage } from "../auth";

export const SecondRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/about" element={<AboutApp />} />
        <Route path="/chat" element={<MessagesApp />} />
        <Route path="/jobOffert" element={<JobOffers />} />
        <Route path="/store" element={<MainStore />} />
        <Route path="/store/selfArticle" element={<SelfArticle />} />
        <Route path="/vacations" element={<CollegeVacation />} />
        <Route path="/opinions/:name/:username" element={<BoxComment />} />

        <Route path="/:username" element={<ProfilePage />} />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
