import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "../features/auth/pages/SignupPage";

export const routes = [
  {
    path: "/sign-up",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];
