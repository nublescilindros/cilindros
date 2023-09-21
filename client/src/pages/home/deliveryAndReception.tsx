import { RoutePrivate } from "@/Route/Route";
import DeliveryAndReception from "../../components/functional/DeliveryAndReception/Index";

const deliveryAndReceptionPage = () => {
  return (
    <RoutePrivate>
      <DeliveryAndReception />
    </RoutePrivate>
  );
};

export default deliveryAndReceptionPage;
