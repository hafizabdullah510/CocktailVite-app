import {
  About,
  Cocktails,
  Error,
  Navbar,
  Newsletter,
  SingleCocktailData,
} from "./components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loader as cocktailsLoader } from "./components/Cocktails";
import { loader as singleCocktailLoader } from "./components/SingleCocktail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Cocktails />,
          loader: cocktailsLoader(queryClient),
          errorElement: <Error />,
        },
        {
          path: "cocktail/:id",
          element: <SingleCocktailData />,
          loader: singleCocktailLoader(queryClient),
          errorElement: <Error />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "newsletter",
          element: <Newsletter />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
