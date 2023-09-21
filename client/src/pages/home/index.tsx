import { RoutePrivate } from "@/Route/Route";
import Home from "../../components/functional/Home/Index";

const homePage = () => {
  return (
    <RoutePrivate>
      <Home />
    </RoutePrivate>
  );
};

export default homePage;
