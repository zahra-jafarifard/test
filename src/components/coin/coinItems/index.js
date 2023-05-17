import React, { useReducer, useEffect, useState } from "react";

import CurrencyItems from "../../currency/currencyItems";
const initialState = [
  {
    ghadimBuy: 0,
    ghadimSell: 0,
    emamiBuy: 0,
    emamiSell: 0,
    nimBuy: 0,
    nimSell: 0,
    robSell: 0,
    robBuy: 0,
    yekGeramiSell: 0,
    yekGeramiBuy: 0,
    // parsianSell: 0,
    // parsianBuy: 0,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "Change":
      return state.map((data) => {
        return { ...data, [action.name]: action.value };
      });
    case "FetchCoins":
      return state.map((data) => {
        // console.log(action.data);
        return {
          ...data,
          ghadimBuy: action.data[0].buyPrice,
          ghadimSell: action.data[0].sellPrice,

          emamiBuy: action.data[1].buyPrice,
          emamiSell: action.data[1].sellPrice,

          nimBuy: action.data[2].buyPrice,
          nimSell: action.data[2].sellPrice,

          robBuy: action.data[3].buyPrice,
          robSell: action.data[3].sellPrice,

          yekGeramiBuy: action.data[4].buyPrice,
          yekGeramiSell: action.data[4].sellPrice,

          // parsianBuy: action.data[5].buyPrice,
          // parsianSell: action.data[5].sellPrice,
        };
      });
    case "Delete":
      return initialState;

    default:
      return state;
  }
};

const CoinItems = () => {
  const [inputValue, dispatch] = useReducer(reducer, initialState);
  const [Coins, setCoins] = useState([]);
  const [loadingSite, setLoadingSite] = useState(false);

  const deleteCoinHandler = () => {
    dispatch({ type: "Delete" });
  };

  const changeHandler = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    dispatch({ type: "Change", name, value });
  };

  useEffect(() => {
    const fetchFunc = async () => {
      let Data, _response;
      try {
        Data = await fetch(`${process.env.REACT_APP_URL}/api/getCoinNames`);
        _response = await Data.json();
      } catch (error) {
        console.log(error);
      }

      console.log(_response);
      if (Data.ok) {
        setCoins(_response.data);
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

  const updateCoinSiteHandler = async (e) => {
    let Data, _response;
    setLoadingSite(true);

    try {
      Data = await fetch(`${process.env.REACT_APP_URL}/api/updateCoin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify([
          {
            id: "1",
            buyPrice: inputValue[0].ghadimBuy,
            sellPrice: inputValue[0].ghadimSell,
          },
          {
            id: "2",
            buyPrice: inputValue[0].emamiBuy,
            sellPrice: inputValue[0].emamiSell,
          },
          {
            id: "3",
            buyPrice: inputValue[0].nimBuy,
            sellPrice: inputValue[0].nimSell,
          },
          {
            id: "4",
            buyPrice: inputValue[0].robBuy,
            sellPrice: inputValue[0].robSell,
          },
          {
            id: "5",
            buyPrice: inputValue[0].yekGeramiBuy,
            sellPrice: inputValue[0].yekGeramiSell,
          },
          // {
          //   id: "6",
          //   buyPrice: inputValue[0].parsianBuy,
          //   sellPrice: inputValue[0].parsianSell,
          // },

          {
            //   secretKey: process.env.REACT_APP_SECRET_KEY
            secretKey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw",
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
        Data = await fetch(`${process.env.REACT_APP_URL}/api/getCoinsPrice`);
        _response = await Data.json();
      } catch (error) {
        console.log(error);
      }

      if (Data.ok) {
        return dispatch({ type: "FetchCoins", data: _response.data });
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
    <div style={{ webkitAppRegion: "drag" }} className="pt-1">
      <div>
        <div
          style={{ direction: "rtl" }}
          className="my-3 text-sm justify-center mx-auto flex flex-row "
        >
          <div style={{ webkitAppRegion: "no-drag" }}>
            <div
              style={{ direction: "rtl" }}
              className="grid grid-cols-3 my-3 text-xs font-bold "
            >
              <div className="">سکه</div>
              <div className="">خرید</div>
              <div className="text-red-700 font-semibold">فروش</div>
            </div>
            <div className="grid grid-cols-3 my-2 gap-x-2 ">
              <div className="my-auto text-red-700 font-semibold">
               salammm
              </div>
              <input
                dir="ltr"
                name="ghadimBuy"
                value={inputValue[0].ghadimBuy}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700  "
              />
              <input
                dir="ltr"
                name="ghadimSell"
                value={inputValue[0].ghadimSell}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700  "
              />
            </div>

            <div className="grid grid-cols-3 my-2 gap-x-2">
              <div className="my-auto font-semibold "> {Coins[1]?.name}</div>
              <input
                dir="ltr"
                name="emamiBuy"
                value={inputValue[0].emamiBuy}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none  "
              />
              <input
                dir="ltr"
                name="emamiSell"
                value={inputValue[0].emamiSell}
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
              <div className=" ">سکه</div>
              <div className=" ">خرید</div>
              <div className="my-auto text-red-700 ">فروش</div>
            </div>
            <div className="grid grid-cols-3 my-2 gap-x-2 ">
              <div className="my-auto text-red-700 font-semibold">
                {Coins[2]?.name}
              </div>
              <input
                dir="ltr"
                name="nimBuy"
                value={inputValue[0].nimBuy}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
              />
              <input
                dir="ltr"
                name="nimSell"
                value={inputValue[0].nimSell}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700"
              />
            </div>

            <div className="grid grid-cols-3 my-2 gap-x-2">
              <div className="my-auto  font-semibold"> {Coins[3]?.name}</div>
              <input
                dir="ltr"
                name="robBuy"
                value={inputValue[0].robBuy}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none   "
              />
              <input
                dir="ltr"
                name="robSell"
                value={inputValue[0].robSell}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none  "
              />
            </div>
          </div>

          <div style={{ webkitAppRegion: "no-drag" }}>
            <div
              style={{ direction: "rtl" }}
              className="grid grid-cols-3 my-3 text-xs font-bold"
            >
              <div className=" ">سکه</div>
              <div className=" ">خرید</div>
              <div className="text-red-700 ">فروش</div>
            </div>
            <div className="grid grid-cols-3 my-2 gap-x-2 justify-between ">
              <div className="my-auto text-red-700  font-semibold">
                {Coins[4]?.name}
              </div>
              <input
                dir="ltr"
                name="yekGeramiBuy"
                value={inputValue[0].yekGeramiBuy}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
              />
              <input
                dir="ltr"
                name="yekGeramiSell"
                value={inputValue[0].yekGeramiSell}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none text-red-700 "
              />
            </div>
            {/* <div className="grid grid-cols-3 my-2 gap-x-2">
              <div className="my-auto   font-semibold"> {Coins[5]?.name}</div>
              <input
                dir="ltr"
                name="parsianBuy"
                value={inputValue[0].parsianBuy}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none  "
              />
              <input
                dir="ltr"
                name="parsianSell"
                value={inputValue[0].parsianSell}
                onChange={changeHandler}
                className="border-2 rounded-lg w-24 mx-auto  focus:outline-none "
              />
            </div> */}
          </div>
        </div>

        <div className="flex flex-row-reverse justify-center">
          <button
            style={{ webkitAppRegion: "no-drag" }}
            className={`px-3 py-1 text-sm  rounded-xl my-3 font-bold
            w-44  shadow-md  shadow-red-900 bg-black text-red-700
            ${loadingSite && "animate-pulse "}
            `}
            onClick={updateCoinSiteHandler}
          >
            {loadingSite
              ? " ... در حال به روز رسانی"
              : " به روز رسانی سکه در سایت"}
          </button>

          <button
            style={{ webkitAppRegion: "no-drag" }}
            className=" px-3 py-1 text-sm  mx-3 rounded-xl my-3 font-bold
            w-44  shadow-md  shadow-red-900 bg-black text-red-700"
            onClick={deleteCoinHandler}
          >
            حذف قیمت سکه
          </button>
        </div>
      </div>

      <CurrencyItems input={inputValue[0]} />

      <div className="flex flex-row-reverse justify-between text-xs font-bold mt-8 px-5 pb-2 text-gray-800">
        <div style={{ direction: "rtl" }}>
          کلیه حقوق مادی و معنوی این برنامه متعلق به شرکت تلمیس می باشد و کپی از
          آن پیگرد قانونی دارد .
        </div>
        <div>
          طراحی شده توسط شرکت
          <span
            // onClick={() => {
            //   return window.openTelmis.openTelmisSite();
            // }}
            className="text-red-900 font-extrabold cursor-pointer"
          >
            &nbsp;تلمیس
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoinItems;
