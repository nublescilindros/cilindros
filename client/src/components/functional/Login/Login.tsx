import Image from "next/image";
import styles from "./Login.module.scss";

import logoSvg from "../../../../public/img/svg/LOGO-GASES-ÑUBLE_page-0001.svg";
import svg from "@/utils/svg";

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Index";

import { useEffect, useState } from "react";
import { useUi, useUser } from "@/store/hooks";
import { useRouter } from "next/router";
import WindowAlert from "@/components/ui/WindowAlert/WindowAlert";
import { stateError } from "@/utils/constant";

const Login = () => {
  const router = useRouter();

  const {
    validateUser,
    user,
    typeErrorUser,
    setErrorUser,
    setUser,
    userError,
    resetUser,
  } = useUser();
  const { setUi, resetUi, resetModal } = useUi();

  const [stateInput, setStateInput] = useState<any>({
    id: "",
    password: "",
  });

  const changeInputs = (e: any) => {
    setStateInput({
      ...stateInput,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onlickLogin = () => {
    validateUser(stateInput.id, stateInput.password);
  };



  useEffect(() => {
    if (userError) {
      setUi({
        modal: {
          state: true,
          type: 1,
          text: "",
          component: (
            <WindowAlert
              title={stateError.user[typeErrorUser].title}
              button={[
                {
                  text: "Aceptar",
                  onClick: () => {
                    resetUi();
                    setErrorUser(false);
                  },
                },
              ]}
              close={() => {}}
            />
          ),
        },
      });
    }
  }, [userError]);



  return (
    <div className={styles.Container}>
      <div>
        <Image
          width={300}
          height={300}
          layout="fixed"
          src={logoSvg}
          alt="Logo"
        />
        <div>
          <Input
            onChange={changeInputs}
            name="id"
            value={stateInput.id}
            text={"Usuario"}
            icon={{ state: true, img: svg.person }}
          />
          <Input
            onChange={changeInputs}
            type="password"
            name="password"
            value={stateInput.password}
            text={"Contraseña"}
            icon={{ state: true, img: svg.key }}
          />
          <Button onclick={onlickLogin} text="Entrar" />
        </div>
      </div>
    </div>
  );
};

export default Login;
