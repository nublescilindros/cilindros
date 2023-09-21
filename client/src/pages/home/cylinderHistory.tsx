import { RoutePrivate } from "@/Route/Route";
import CylinderHistory from "../../components/functional/CylinderHistory/Index";

const cylinderHistoryPage = () => {
  return (
    <RoutePrivate>
      <CylinderHistory />
    </RoutePrivate>
  );
};

export default cylinderHistoryPage;
