import { RoutePrivate } from "@/Route/Route";
import CrudClients from "../../components/functional/CrudClients/Index";

const crudClientsPage = () => {
  return (
    <RoutePrivate>
      <CrudClients />
    </RoutePrivate>
  );
};

export default crudClientsPage;
