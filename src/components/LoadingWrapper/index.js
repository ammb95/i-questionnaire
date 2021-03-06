import React from "react";
import { Spinner } from "reactstrap";

export default function LoadingWrapper({ loading, children }) {
  return <>{loading ? <Spinner /> : { ...children }}</>;
}
