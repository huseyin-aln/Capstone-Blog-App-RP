import AppRouter from "./app-router/AppRouter";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
