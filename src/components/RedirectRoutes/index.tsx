import { UserRole } from "@/Models/User/UserModel";
import { AuthContext } from "@/context/AuthContext";
import { Routes } from "@/utils/routes";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { ErrorOutlineRounded } from "@mui/icons-material";

interface RedirectRoutesProps {
  protectedRoutes: Array<string>;
  redirectRoutes: Array<string>;
  loggedInRoutes: Array<string>;
  children: any;
}

// Function used to redirect if route is unavailable for user
export default function RedirectRoutes({
  protectedRoutes,
  redirectRoutes,
  loggedInRoutes,
  children,
}: RedirectRoutesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { userContext, loggedIn, loading } = useContext(AuthContext);

  const isNoAuthRoute = redirectRoutes.indexOf(pathname!) !== -1;
  const isProtectedRoute = protectedRoutes.indexOf(pathname!) !== -1;
  const isLoggedInRoute = loggedInRoutes.some((route) =>
    pathname?.startsWith(route)
  );
  const isAdminRoute = pathname?.startsWith(Routes.Administration);
  const urlsWithoutLoader = ["not-found", "error"];
  let window: Window | undefined;

  if (
    loading &&
    !urlsWithoutLoader.find((str) => window?.location?.href?.includes(str))
  ) {
    return <Loader />;
  }

  // We check if user isn't logged in and redirect him to login
  if (!loggedIn) {
    if (isLoggedInRoute || isProtectedRoute || isAdminRoute) {
      router.push(Routes.Login);
      return <Loader />;
    }
  } else if (userContext) {
    // User is logged in
    // Here we check if user is not an admin
    if (userContext?.role !== UserRole.ADMIN) {
      if (isAdminRoute || isNoAuthRoute || isProtectedRoute) {
        // Here we check if user shouldn't be here
        router.push(Routes.Index);
        return <Loader />;
      }
    } else if (userContext?.role === UserRole.ADMIN && isNoAuthRoute) {
      // Here we check if user is admin and if shouldn't be here
      router.push(Routes.Index);
      return <Loader />;
    }
  } else {
    return <ErrorElement />;
  }

  return children;
}

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Loader = () => (
  <LoaderWrapper>
    <CircularProgress />
  </LoaderWrapper>
);

const ErrorElement = () => (
  <LoaderWrapper>
    <ErrorOutlineRounded />
  </LoaderWrapper>
);
