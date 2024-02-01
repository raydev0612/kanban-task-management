/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDarkMode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }) {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const boards = useSelector((state) => state.boards);

  const toggleDarkMode = (checked) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
    >
      {/* Modal del menu dropdown */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All Boards ({boards?.length})
        </h3>
        <div>
          {boards.map((board, index) => (
            <div
              key={index}
              className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 cursor-alias ${
                board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"
              }`}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} alt="Icono Board" className="h-4" />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="flex items-baseline space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer"
          >
            <img src={boardIcon} alt="Icono" className="h-4" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>
          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="Icono" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <img src={darkIcon} alt="Icono" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
