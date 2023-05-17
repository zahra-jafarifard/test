import React from "react";
import CurrencyItems from "./currencyItems";
const Main = () => {
  // const [currencies, setCurrencies] = useState();

  // useEffect(() => {
  //   window.Electron.getData();
  // }, []);

  return (
    <div className="my-3">
      <CurrencyItems />
    </div>
  );
};

export default Main;
