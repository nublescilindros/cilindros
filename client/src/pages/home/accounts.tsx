import { RoutePrivate } from "@/Route/Route";
import CrudAccounts from "../../components/functional/CrudAccounts/Index";
import { useUi } from "@/store/hooks";

const crudAccountsPage = () => {
  return (
    <RoutePrivate>
      <CrudAccounts />
    </RoutePrivate>
  );
};

export default crudAccountsPage;
