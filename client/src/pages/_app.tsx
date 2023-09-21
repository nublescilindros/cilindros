import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useModals, useUi, useUser } from "../store/hooks/index";

import Template from "@/components/layout/template";
import ModalLoading from "@/components/ui/Loading/Loading";
import Modal from "@/components/ui/Modal/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal />

      <Template>
        <Component {...pageProps} />
      </Template>
    </>
  );
}
