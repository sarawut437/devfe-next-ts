import { Foods } from "@/data_services/foods/getFood";
import { IoCart } from "react-icons/io5";

type ProductListProps = {
    item: Foods | undefined;
    index?: number;
    handleItemClick: (item: Foods | undefined) => void; // Updated type here
    handleItemCountDecrement: (code: string) => void;
    handleItemCountIncrement: (itemCode: string) => void;
    itemCounts: { [key: string]: number };
};




const ProductItem: React.FC<ProductListProps>  = ({ item, index, handleItemClick, handleItemCountDecrement, handleItemCountIncrement, itemCounts }) => {
    return (
        <tr
            key={index}
            className={`h-auto ${
                index !== undefined && index % 2 === 0 ? "bg-green-50" : "bg-white"
            }`}
        >
            <td>
                <div className=" ml-10">
                    <picture>
                    {item && (
                        <img 
                            src={item.image ?? undefined}
                            alt={item.name}
                            className="w-16 h-16"
                        />
                        )}
                    </picture>
                </div>
            </td>
            <td className="w-4/12">
                <p className="text-indigo-500">{item?.name}</p>
                <p className="text-slate-700">{item?.store_id}</p>
                <p>{item?.code}</p>
            </td>
            <td className="w-4/12 pl-6 text-slate-600">
                {item?.price}
            </td>
            <td className="w-1/12">
                <div className="flex items-center justify-right">
                    <button
                        onClick={() =>item && handleItemCountDecrement(item.code)}
                        className="w-10 h-10 text-xl rounded-full border-2 border-indigo-500 text-indigo-500 focus:outline-none"
                    >
                        <b> - </b>
                    </button>
                    <span className="mx-4 w-10 h-10 text-lg rounded-full border-2 border-indigo-500 text-slate-700 flex items-center justify-center focus:outline-none">
                    {item && itemCounts[item.code] || 0}
                    </span>
                    <button
                        onClick={() =>item && handleItemCountIncrement(item.code)}
                        className="w-10 h-10 text-xl rounded-full border-2 border-indigo-500 text-indigo-500 focus:outline-none"
                    >
                        <b> + </b>
                    </button>
                    <button
                        onClick={() =>item && handleItemClick(item)}
                        className="m-6 w-10 h-10 text-xl rounded-full bg-indigo-500 hover:bg-indigo-700 text-white flex items-center justify-center focus:outline-none"
                    >
                        <span>
                            <IoCart />
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ProductItem;
