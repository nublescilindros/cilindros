import { useEffect, useState } from "react";

import styles from "./Route.module.scss";

import { useRouter } from "next/router";
import { useUi, useUser } from "@/store/hooks";
import WindowAlert from "../components/ui/WindowAlert/WindowAlert";
import { stateError } from "../utils/constant";
import NavMenu from "../components/ui/NavMenu";

const RoutePublic = ({ children }: any) => {
  const { setUi, resetUi, errorRequest } = useUi();
  const { resetUser, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const jwt: any = localStorage.getItem("tokenCylindersMunos");
    if (jwt != null) {
      setUi({ token: jwt });
      router.push("/home");
    }
  }, [user]);

  useEffect(() => {
    if (errorRequest) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: (
            <WindowAlert
              title={stateError.user[5].title}
              button={[
                {
                  text: "Aceptar",
                  onClick: () => {
                    localStorage.removeItem("tokenCylindersMunos");
                    resetUser();
                    resetUi();
                    router.push("/login");
                  },
                },
              ]}
              close={() => {}}
            />
          ),
        },
      });
    }
  }, [errorRequest]);

  return <>{children}</>;
};

const RoutePrivate = ({ children }: any) => {
  const { setUi, token, resetUi, errorToken, errorRequest } = useUi();
  const { resetUser, verifyUser } = useUser();
  const [stateLogin, setStateLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const jwt: any = localStorage.getItem("tokenCylindersMunos");
    if (jwt != null) {
      setUi({ token: jwt });
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (token != null && token != undefined) {
      verifyUser();
      setUi({ login: true });
      setStateLogin(true);
    }
  }, [token]);

  useEffect(() => {
    if (errorToken) {
      resetUser();
      resetUi();
      localStorage.removeItem("tokenCylindersMunos");
      router.push("/login");
    }
  }, [errorToken]);

  useEffect(() => {
    if (errorRequest) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: (
            <WindowAlert
              title={stateError.user[5].title}
              button={[
                {
                  text: "Aceptar",
                  onClick: () => {
                    localStorage.removeItem("tokenCylindersMunos");
                    resetUser();
                    resetUi();
                    router.push("/login");
                  },
                },
              ]}
              close={() => {}}
            />
          ),
        },
      });
    }
  }, [errorRequest]);

  return (
    <>
      <NavMenu />
      <div className={styles.container}>{stateLogin ? children : <></>}</div>
    </>
  );
};

export { RoutePublic, RoutePrivate };
