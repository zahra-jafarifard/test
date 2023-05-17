import React, { useReducer, useEffect, useState } from "react";

const initialState = [
  {
    dollarBuy: 0,
    dollarSell: 0,
    euroBuy: 0,
    euroSell: 0,
    canadaBuy: 0,
    canadaSell: 0,
    australiaSell: 0,
    australiaBuy: 0,
    pondSell: 0,
    pondBuy: 0,
    derhamEmaratSell: 0,
    derhamEmaratBuy: 0,
    swedSell: 0,
    swedBuy: 0,
    norvezhBuy: 0,
    norvezhSell: 0,
    danmarkSell: 0,
    danmarkBuy: 0,
    lirSell: 0,
    lirBuy: 0,
    ferankSwissSell: 0,
    ferankSwissBuy: 0,
    yenZhaponSell: 0,
    yenZhaponBuy: 0,
    rigitMaleziSell: 0,
    rigitMaleziBuy: 0,
    yoanChinSell: 0,
    yoanChinBuy: 0,
    dinarAraghSell: 0,
    dinarAraghBuy: 0,
    manatSell: 0,
    manatBuy: 0,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "Change":
      return state.map((data) => {
        return { ...data, [action.name]: action.value };
      });
    case "FetchCurrency":
      return state.map((data) => {
        return {
          ...data,
          dollarBuy: action.data[0].buyPrice,
          dollarSell: action.data[0].sellPrice,

          euroBuy: action.data[1].buyPrice,
          euroSell: action.data[1].sellPrice,

          canadaBuy: action.data[2].buyPrice,
          canadaSell: action.data[2].sellPrice,

          australiaBuy: action.data[3].buyPrice,
          australiaSell: action.data[3].sellPrice,

          pondBuy: action.data[4].buyPrice,
          pondSell: action.data[4].sellPrice,

          derhamEmaratBuy: action.data[5].buyPrice,
          derhamEmaratSell: action.data[5].sellPrice,

          swedBuy: action.data[6].buyPrice,
          swedSell: action.data[6].sellPrice,

          norvezhBuy: action.data[7].buyPrice,
          norvezhSell: action.data[7].sellPrice,

          danmarkBuy: action.data[8].buyPrice,
          danmarkSell: action.data[8].sellPrice,

          lirBuy: action.data[9].buyPrice,
          lirSell: action.data[9].sellPrice,

          ferankSwissBuy: action.data[10].buyPrice,
          ferankSwissSell: action.data[10].sellPrice,

          yenZhaponBuy: action.data[11].buyPrice,
          yenZhaponSell: action.data[11].sellPrice,

          rigitMaleziBuy: action.data[12].buyPrice,
          rigitMaleziSell: action.data[12].sellPrice,

          yoanChinBuy: action.data[13].buyPrice,
          yoanChinSell: action.data[13].sellPrice,

          dinarAraghBuy: action.data[14].buyPrice,
          dinarAraghSell: action.data[14].sellPrice,

          manatBuy: action.data[15].buyPrice,
          manatSell: action.data[15].sellPrice,
        };
      });

    case "Delete":
      return initialState;

    default:
      return state;
  }
};

const CurrencyItems = ({ input }) => {
  const [inputValue, dispatch] = useReducer(reducer, initialState);
  const [Currencies, setCurrencies] = useState([]);
  const [loadingSite, setLoadingSite] = useState(false);

  const changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    // console.log(name, value);
    dispatch({ type: "Change", name, value });
  };

  const deleteCurrencyHandler = () => {
    dispatch({ type: "Delete" });
  };
  const closeHandler = () => {
    window.closeApp.closeApplication();
  };

  useEffect(() => {
    const fetchFunc = async () => {
      let Data, _response;
      try {
        Data = await fetch(
          `${process.env.REACT_APP_URL}/api/getCurrenciesPrice`
        );
        _response = await Data.json();
      } catch (error) {
        console.log(error);
      }

      if (Data.ok) {
        return dispatch({ type: "FetchCurrency", data: _response.data });
      }

      if (Data.status === 500) {
        console.log("Error 500 Occurred...");
      }

      if (!Data.ok) {
        console.log("An Error Occurred...");
      }
    };
    fetchFunc();
  }, []);

  const updateCurrencySiteHandler = async (e) => {
    let Data, _response;
    setLoadingSite(true);

    try {
      Data = await fetch(`${process.env.REACT_APP_URL}/api/updatecurrency`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify([
          {
            id: "1",
            buyPrice: inputValue[0].dollarBuy,
            sellPrice: inputValue[0].dollarSell,
          },
          {
            id: "2",
            buyPrice: inputValue[0].euroBuy,
            sellPrice: inputValue[0].euroSell,
          },
          {
            id: "3",
            buyPrice: inputValue[0].canadaBuy,
            sellPrice: inputValue[0].canadaSell,
          },
          {
            id: "4",
            buyPrice: inputValue[0].australiaBuy,
            sellPrice: inputValue[0].australiaSell,
          },
          {
            id: "5",
            buyPrice: inputValue[0].pondBuy,
            sellPrice: inputValue[0].pondSell,
          },
          {
            id: "6",
            buyPrice: inputValue[0].derhamEmaratBuy,
            sellPrice: inputValue[0].derhamEmaratSell,
          },
          {
            id: "7",
            buyPrice: inputValue[0].swedBuy,
            sellPrice: inputValue[0].swedSell,
          },
          {
            id: "8",
            buyPrice: inputValue[0].norvezhBuy,
            sellPrice: inputValue[0].norvezhSell,
          },
          {
            id: "9",
            buyPrice: inputValue[0].danmarkBuy,
            sellPrice: inputValue[0].danmarkSell,
          },
          {
            id: "10",
            buyPrice: inputValue[0].lirBuy,
            sellPrice: inputValue[0].lirSell,
          },
          {
            id: "11",
            buyPrice: inputValue[0].ferankSwissBuy,
            sellPrice: inputValue[0].ferankSwissSell,
          },
          {
            id: "12",
            buyPrice: inputValue[0].yenZhaponBuy,
            sellPrice: inputValue[0].yenZhaponSell,
          },
          {
            id: "13",
            buyPrice: inputValue[0].rigitMaleziBuy,
            sellPrice: inputValue[0].rigitMaleziSell,
          },
          {
            id: "14",
            buyPrice: inputValue[0].yoanChinBuy,
            sellPrice: inputValue[0].yoanChinSell,
          },
          {
            id: "15",
            buyPrice: inputValue[0].dinarAraghBuy,
            sellPrice: inputValue[0].dinarAraghSell,
          },
          {
            id: "16",
            buyPrice: inputValue[0].manatBuy,
            sellPrice: inputValue[0].manatSell,
          },

          {
            secretKey: process.env.REACT_APP_SECRET_KEY,
          },
        ]),
      });
    } catch {
      setLoadingSite(false);

      return window.errorNotif.showErrorNotification();
    }
    setLoadingSite(false);

    try {
      _response = await Data.json();
    } catch {
      return window.errorNotif.showErrorNotification();
    }

    if (Data.ok) {
      return window.successNotif.showSuccessNotification();
    }

    if (Data.status === 500) {
      return window.errorNotif.showErrorNotification();
    }

    if (!Data.ok) {
      return window.errorNotif.showErrorNotification();
    }
  };

  useEffect(() => {
    const fetchFunc = async () => {
      let Data, _response;
      try {
        Data = await fetch(`${process.env.REACT_APP_URL}/api/getCurrencyNames`);
        _response = await Data.json();
      } catch (error) {
        console.log(error);
      }
      if (Data.ok) {
        setCurrencies(_response.data);
      }

      if (Data.status === 500) {
        console.log("Error 500 Occurred...");
      }

      if (!Data.ok) {
        console.log("An Error Occurred...");
      }
    };
    fetchFunc();
  }, []);
  return (
    <div>
      <div
        style={{ direction: "rtl", webkitAppRegion: "drag" }}
        className="my-3 text-sm justify-center mx-auto flex flex-row "
      >
        <div style={{ webkitAppRegion: "no-drag" }}>
          <div
            style={{ direction: "rtl" }}
            className="grid grid-cols-3 my-3 text-xs font-bold"
          >
            <div className="">ارز</div>
            <div className="">خرید</div>
            <div className="text-red-700">فروش</div>
          </div>

          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[0]?.name}
            </div>
            <input
              dir="ltr"
              name="dollarBuy"
              value={inputValue[0].dollarBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
            <input
              dir="ltr"
              name="dollarSell"
              value={inputValue[0].dollarSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
          </div>

          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[1]?.name}</div>
            <input
              dir="ltr"
              name="euroBuy"
              value={inputValue[0].euroBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="euroSell"
              value={inputValue[0].euroSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[2]?.name}
            </div>
            <input
              dir="ltr"
              name="canadaBuy"
              value={inputValue[0].canadaBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
            <input
              dir="ltr"
              name="canadaSell"
              value={inputValue[0].canadaSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[3]?.name}</div>
            <input
              dir="ltr"
              name="australiaBuy"
              value={inputValue[0].australiaBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="australiaSell"
              value={inputValue[0].australiaSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[4]?.name}
            </div>
            <input
              dir="ltr"
              name="pondBuy"
              value={inputValue[0].pondBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
            <input
              dir="ltr"
              name="pondSell"
              value={inputValue[0].pondSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[5]?.name}</div>
            <input
              dir="ltr"
              name="derhamEmaratBuy"
              value={inputValue[0].derhamEmaratBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="derhamEmaratSell"
              value={inputValue[0].derhamEmaratSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
        </div>

        <div style={{ webkitAppRegion: "no-drag" }} className="mx-4">
          <div
            style={{ direction: "rtl" }}
            className="grid grid-cols-3 my-3 text-xs font-bold"
          >
            <div className="">ارز</div>
            <div className="">خرید</div>
            <div className="text-red-700">فروش</div>
          </div>

          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[6]?.name}
            </div>
            <input
              dir="ltr"
              name="swedBuy"
              value={inputValue[0].swedBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
            <input
              dir="ltr"
              name="swedSell"
              value={inputValue[0].swedSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[7]?.name}</div>
            <input
              dir="ltr"
              name="norvezhBuy"
              value={inputValue[0].norvezhBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="norvezhSell"
              value={inputValue[0].norvezhSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[8]?.name}
            </div>
            <input
              dir="ltr"
              name="danmarkBuy"
              value={inputValue[0].danmarkBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
            <input
              dir="ltr"
              name="danmarkSell"
              value={inputValue[0].danmarkSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
            />
          </div>

          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[9]?.name}</div>
            <input
              dir="ltr"
              name="lirBuy"
              value={inputValue[0].lirBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="lirSell"
              value={inputValue[0].lirSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[10]?.name}
            </div>
            <input
              dir="ltr"
              name="ferankSwissBuy"
              value={inputValue[0].ferankSwissBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
            <input
              dir="ltr"
              name="ferankSwissSell"
              value={inputValue[0].ferankSwissSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[11]?.name}</div>
            <input
              dir="ltr"
              name="yenZhaponBuy"
              value={inputValue[0].yenZhaponBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="yenZhaponSell"
              value={inputValue[0].yenZhaponSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
        </div>

        <div style={{ webkitAppRegion: "no-drag" }}>
          <div
            style={{ direction: "rtl" }}
            className="grid grid-cols-3 my-3 text-xs font-bold"
          >
            <div className="">ارز</div>
            <div className="">خرید</div>
            <div className="text-red-700">فروش</div>
          </div>

          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[12]?.name}
            </div>
            <input
              dir="ltr"
              name="rigitMaleziBuy"
              value={inputValue[0].rigitMaleziBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
            <input
              dir="ltr"
              name="rigitMaleziSell"
              value={inputValue[0].rigitMaleziSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[13]?.name}</div>
            <input
              dir="ltr"
              name="yoanChinBuy"
              value={inputValue[0].yoanChinBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="yoanChinSell"
              value={inputValue[0].yoanChinSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold text-red-700">
              {Currencies[14]?.name}
            </div>
            <input
              dir="ltr"
              name="dinarAraghBuy"
              value={inputValue[0].dinarAraghBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
            <input
              dir="ltr"
              name="dinarAraghSell"
              value={inputValue[0].dinarAraghSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
            />
          </div>

          <div className="grid grid-cols-3 my-2 gap-x-2">
            <div className="font-semibold">{Currencies[15]?.name}</div>
            <input
              dir="ltr"
              name="manatBuy"
              value={inputValue[0].manatBuy}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
            <input
              dir="ltr"
              name="manatSell"
              value={inputValue[0].manatSell}
              onChange={changeHandler}
              className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
            />
          </div>
        </div>
      </div>

      <div
        style={{ webkitAppRegion: "no-drag" }}
        className="flex flex-row-reverse justify-center "
      >
        <button
          className={`px-3 py-1 text-sm mx-3  rounded-xl my-3 font-bold w-44  shadow-md  shadow-red-900 bg-black text-red-700 
          ${loadingSite && "animate-pulse "}
          `}
          onClick={updateCurrencySiteHandler}
        >
          {loadingSite
            ? " ... در حال به روز رسانی"
            : " به روز رسانی ارز در سایت"}
        </button>

        <button
          className="px-3 py-1 text-sm   rounded-xl my-3 font-bold  w-40  shadow-md shadow-red-900  bg-black text-red-700"
          onClick={deleteCurrencyHandler}
        >
          حذف قیمت ارز
        </button>
      </div>
      <div className="grid w-40 mx-auto">
        <button
          style={{ webkitAppRegion: "no-drag" }}
          className="px-10 py-1 text-sm mx-3  rounded-xl my-3 font-bold w-44  shadow-md  shadow-black text-black bg-red-700
          "
          onClick={closeHandler}
        >
          خروج
        </button>
      </div>
    </div>
  );
};

export default CurrencyItems;
