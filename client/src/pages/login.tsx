import { RoutePublic } from "@/Route/Route";
import Login from "../components/functional/Login/Index";

const loginPage = () => {
  return (
    <RoutePublic>
      <Login />
    </RoutePublic>
  );
};

export default loginPage;
