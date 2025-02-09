import "./App.css";
import TicTacToe from "./components/TicTacToe";
import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="w-screen min-h-screen items-center justify-center flex flex-col pt-8 bg-[#5A1E76] ">
      <div className="sm:absolute bottom-0 left-0 mb-2">
        <img
          src={logo}
          alt="Logo"
          className="xl:w-[400px] lg:w-[200px] h-auto w-[150px] "
        />
      </div>

      <div className=" flex mt-2 bg-[#43115B] rounded-[50px] ">
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
