// SearchBar.jsx
import { useRef } from "react";
import { IoIosSearch } from "react-icons/io";

const Filter = ({ handleFilter }: { handleFilter: () => void }) => {
    const SearchText = useRef<string | null>(null);

    return (
        <div className="basis-1/2 flex items-center justify-right text-gray-500 text-base">
            <IoIosSearch className="text-gray-400 text-xl ml-2 mr-2" />
            <input
                type="text"
                className="input rounded-full bg-white w-full"
                placeholder="ค้นหาเมนูอาหาร"
                onChange={(e) => {
                    SearchText.current = e.target.value;
                }}
                />
            <button
                className="btn btn-pimary justify-center rounded-full w-[20%] text-white flex flex-wrap bg-indigo-500"
                onClick={() => handleFilter()}
            >
                ค้นหา
            </button>
        </div>
    );
};

export default Filter;
