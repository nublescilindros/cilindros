import { RoutePrivate } from "@/Route/Route";
import CrudCylinders from "../../components/functional/CrudCylinders/Index";

const crudCylindersPage = () => {
  return (
    <RoutePrivate>
      <CrudCylinders />
    </RoutePrivate>
  );
};

export default crudCylindersPage;
