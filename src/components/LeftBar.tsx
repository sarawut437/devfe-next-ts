import { Foods } from "@/data_services/foods/getFood";
import { IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";



interface LeftBarProps {
    handleFilter: () => void;
    handleAddAllToCart: () => void;
    handleItemCountDecrement: (code: string) => void;
    handleItemCountIncrement: (code: string) => void;
    handleItemClick: (item:Foods ) => void;
    foods: Foods[] |null ;
    itemCounts: { [key: string]: number };
    SearchText: React.MutableRefObject<string>;
}

const LeftBar: React.FC<LeftBarProps> = ({
    handleFilter,
    handleAddAllToCart,
    handleItemCountDecrement,
    handleItemCountIncrement,
    handleItemClick,
    foods,
    itemCounts,
    SearchText,
}) => {
    return (
        <div className="flex">
            <div className="w-full h-auto p-2 space-y-2 bg-stone-300">
                {/* leftbar */}
                <div className="w-[1100px] overflow-y-auto h-[630px] bg-slate-100 ">
                    <div className="cursor-pointer flex flex-row w-full h-[48px] bg-white grid-cols-3 divide-x">
                        <div className="basis-1/4 flex items-center justify-center text-gray-500 hover:text-indigo-500 text-base">
                            <a href="/"> All Products </a>
                        </div>
                        <div className="basis-1/4 flex items-center justify-center text-gray-500 hover:text-indigo-500 text-base ">
                            <a href="/favorites"> Favorites</a>
                        </div>
                        <div className="basis-1/4 flex items-center justify-center text-gray-500 hover:text-indigo-500 text-base">
                            <a href="/templates"> Templates </a>
                        </div>

                        <div className="basis-1/2 flex items-center justify-right text-gray-500 text-base ">
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
                                onClick={handleFilter}
                            >
                                ค้นหา
                            </button>
                        </div>
                    </div>

                    <div className="relative  shadow-md sm:rounded-lg">
                        <div className="flex flex-row w-full h-[45px]  ">
                            <div className="w-6/12  px-7 py-3   text-gray-500  bg-white   ">
                                <span className="sr-only">Image</span>
                                Product Description
                            </div>
                            <div className="w-4/12 px-0 py-3  text-left text-gray-500  bg-white dark:text-gray-400">
                                Unit Price
                            </div>
                            <div
                                onClick={handleAddAllToCart}
                                className=" cursor-pointer w-3/12 px-1 py-3 rounded-none bg-indigo-500 text-white text-base text-center  hover:bg-indigo-400 "
                            >
                                + Add all
                            </div>
                        </div>
                    </div>
                    <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
                        <table className="">
                            <tbody>
                                {foods&& foods.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`h-auto ${
                                            index % 2 === 0
                                                ? "bg-green-50"
                                                : "bg-white"
                                        }`}
                                    >
                                        <td>
                                            <div className=" ml-10">
                                                <picture>
                                                    <img
                                                        src={item.image  ?? undefined}
                                                        alt={item.name}
                                                        className="w-16 h-16"
                                                    />
                                                </picture>
                                            </div>
                                        </td>
                                        <td className="w-4/12">
                                            <p className="text-indigo-500">
                                                {item.name}
                                            </p>
                                            <p className="text-slate-700">
                                                {item.store_id}
                                            </p>
                                            <p>{item.code}</p>
                                        </td>
                                        <td className="w-4/12 pl-6 text-slate-600">
                                            {item.price}
                                        </td>
                                        <td className="w-1/12">
                                            <div className="flex items-center justify-right">
                                                <button
                                                    onClick={() =>
                                                        handleItemCountDecrement(
                                                            item.code,
                                                        )
                                                    }
                                                    className="w-10 h-10 text-xl rounded-full border-2 border-indigo-500 text-indigo-500 focus:outline-none"
                                                >
                                                    <b> - </b>
                                                </button>
                                                <span className="mx-4 w-10 h-10 text-lg rounded-full border-2 border-indigo-500 text-slate-700 flex items-center justify-center focus:outline-none">
                                                    {itemCounts[item.code] || 0}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleItemCountIncrement(
                                                            item.code,
                                                        )
                                                    }
                                                    className="w-10 h-10 text-xl rounded-full border-2 border-indigo-500 text-indigo-500 focus:outline-none"
                                                >
                                                    <b> + </b>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleItemClick(item)
                                                    }
                                                    className="m-6 w-10 h-10 text-xl rounded-full bg-indigo-500 hover:bg-indigo-700 text-white flex items-center justify-center focus:outline-none"
                                                >
                                                    <span>
                                                        <IoCart />
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
