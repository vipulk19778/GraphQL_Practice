import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./Routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <RoutesConfig />
    </BrowserRouter>
  );
};

export default App;
