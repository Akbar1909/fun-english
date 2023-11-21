"use client";
import { isSSR } from "@/helpers/window";

const ClientWrapper = ({ children }) => {
  return <>{!isSSR() ? children : null}</>;
};

export default ClientWrapper;
