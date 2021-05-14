import api from "../api";
import { useEffect, useState } from "react";
import useLoading from "./useLoading";

const useData = (dataName, url) => {
  const [myData, setMyData] = useState(null);
  const [loading, setLoading] = useLoading();

  const loadData = async ({ reload = true }) => {
    if (reload && !loading) {
      setLoading(true);
    }
    try {
      const {
        data: { [dataName]: items },
      } = await api.get(url);
      setMyData(items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData({ reload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: myData, setData: setMyData, loading, setLoading, loadData };
};

export default useData;
