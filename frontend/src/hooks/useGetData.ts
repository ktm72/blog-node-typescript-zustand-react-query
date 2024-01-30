import { useEffect, useState } from "react";

const useGetData = <T, U>(initialValue: T, link: string): U => {
  const [data, setData] = useState(initialValue || null);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async () => {
      try {
        const req = await fetch(link, {
          signal: controller.signal,
        });
        const res = await req.json();
        if (isMounted) {
          setData(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [link]);
  return data as U;
};

export default useGetData;
