import { createBrowserRouter } from "react-router-dom";
import { Home, BlogDetails, ErrorPage } from "../pages";
import { Default } from "../Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
