import React from "react";
import ROUTES from "./routes";
import { Router as ReachRouter } from "@reach/router";

export default function Router() {
  return (
    <ReachRouter>
      {ROUTES.map(({ path, Page, ...props }) => (
        <Page path={path} key={path} {...props} />
      ))}
    </ReachRouter>
  );
}
