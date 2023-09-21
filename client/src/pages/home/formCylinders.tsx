import { RoutePrivate } from "@/Route/Route";
import FormCylinders from "../../components/functional/FormCylinders/Index";

const formCylindersPage = () => {
  return (
    <RoutePrivate>
      <FormCylinders />
    </RoutePrivate>
  );
};

export default formCylindersPage;
