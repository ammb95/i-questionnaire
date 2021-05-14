import { useState } from "react";

import Loading from "../components/Loading";
import LoadingContext from "./index";

export default function LoadingWrapper({ initialValue, children }) {
  const [loading, setLoading] = useState(initialValue || true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <div className={`${!loading ? "hidden" : ""}`}>
        <Loading />
      </div>
      <div className={`${loading ? "hidden" : ""}`}>{children}</div>
    </LoadingContext.Provider>
  );
}
