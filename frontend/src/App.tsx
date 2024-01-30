import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ReactQuery from "./utils/ReactQuery";

function App() {
  return (
    <ReactQuery>
      <RouterProvider router={router} />
    </ReactQuery>
  );
}

export default App;
