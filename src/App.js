import "./App.css";

import Main from "./components";

function App() {
  return (
    <div
      style={{ webkitAppRegion: "drag" }}
      className="App IRANSansWeb text-gray-700 rounded-3xl bg-[#c0c0c0]"
    >
      <Main />
    </div>
  );
}

export default App;
