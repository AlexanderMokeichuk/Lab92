import Layout from "./UI/components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./features/Users/Login";
import Register from "./features/Users/Register";
import NotFound from "./UI/components/NotFound/NotFound";
import Chat from "./features/Chat/Chat";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={"/"} element={<Chat />} />
        <Route path={"/register"} element={(<Register />)} />
        <Route path={"/login"} element={(<Login />)} />
        <Route path={"*"} element={(<NotFound />)} />
      </Routes>
    </Layout>
  );
}

export default App;
