import { Foods } from "@/data_services/foods/getFood";
import { MdDelete } from "react-icons/md";

  type RightBarProps = {
    selectProductItems: Foods[];  
    itemCounts: { [key: string]: number };
    handleRemoveItem: (index: number) => void;
    handleRemoveAllItems: () => void;
  };
  

const RightBar: React.FC<RightBarProps> = ({ selectProductItems, itemCounts, handleRemoveItem, handleRemoveAllItems }) => {
    return (
        
        <div className="flex">
            {/* RightSidebar */}
            <div className="w-[250px] h-[645px] bg-stone-300 p-2 space-y-2 ">
                <div className="w-[260px] h-full bg-white flex flex-col">
                    <div className="bg-indigo-500 h-[70px]">
                        <p className="pl-3 text-white text-2xl mt-5">
                            Your order
                        </p>
                    </div>
                    <ul
                        className="p-3 pb-1.5 text-indigo-500 cursor-pointer"
                        onClick={handleRemoveAllItems}
                    >
                        Remove all{" "}
                    </ul>

                    <p className="p-3 pb-2 text-gray-600 border-solid border-b-2 border-gray">
                        GOOD FOODS INC.
                    </p>

                    {selectProductItems.length > 0 && (
                        <div className="w-full h-[295px]  overflow-y-scroll  ">
                            <table className=" ml-4 justify-center table w-52 h-auto">
                                {selectProductItems.map((item, index) => (
                                    <tbody
                                        key={index}
                                        className="  w-52 h-full "
                                    >
                                        <tr className=" mt-2 mb-2 flex flex-row justify-between">
                                            <td>{item.name}</td>
                                            <td>
                                                <span className="mx-1">
                                                    x {itemCounts[item.code]}
                                                </span>{" "}
                                            </td>
                                        </tr>
                                        <tr className=" mb-4 flex flex-row justify-between border-solid border-b-2 border-gray">
                                            <td className="mb-2">
                                                <div className=" cursor-pointer rounded-full bg-red-700 text-white p-2">
                                                    <MdDelete
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                index,
                                                            )
                                                        }
                                                        className="text-xl"
                                                    />
                                                </div>
                                            </td>
                                            <td className="mt-4">
                                                <span className="">
                                                    {(
                                                        parseFloat(
                                                            item.price.replace(
                                                                "$",
                                                                "",
                                                            ),
                                                        ) *
                                                        (itemCounts[
                                                            item.code
                                                        ] || 0)
                                                    ).toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    )}

                    <div className=" h-[100px] justify-center items-center bg-indigo-500 flex flex-row ">
                        <table className=" text-white text-lg ">
                            <tbody>
                                <tr>
                                    <td className="pl-4">Items :</td>
                                    <td className="pl-32">
                                        {selectProductItems.reduce(
                                            (total, item) =>
                                                total + itemCounts[item.code],
                                            0,
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pl-4">Total :</td>
                                    <td className="pl-28">
                                        {selectProductItems
                                            .reduce(
                                                (total, item) =>
                                                    total +
                                                    parseFloat(
                                                        item.price.replace(
                                                            "$",
                                                            "",
                                                        ),
                                                    ) *
                                                        (itemCounts[
                                                            item.code
                                                        ] || 0),
                                                0,
                                            )
                                            .toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="h-[65px] justify-center items-center  bg-indigo-800 flex flex-row">
                        <button className="text-white text-xl">
                            <a href="/place_order"> Place order</a>
                        </button>
                    </div>
                </div>
            </div>
         </div>
    );
};

export default RightBar;
