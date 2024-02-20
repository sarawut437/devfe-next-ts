"use client";
import LeftBar from "@/components/LeftBar";
import SearchBar from "@/components/UserBar";
import { Customers, getCustomerByid } from "@/data_services/customers/getCustomers";
import { Foods, getFoods } from "@/data_services/foods/getFood";
import { useEffect, useRef, useState } from "react";
import Loading from "./loading";

type items = {
    img: string | undefined;
    name: string;
    company: string;
    code: string;
    price: string;
};

const Page = () => {
    const SearchText = useRef<string>("");

    const [customers, setCustomers] = useState<Customers |null>(null);
     useEffect(() => {
        (async()=>{
         const customersInfo = await getCustomerByid(2)
         setCustomers(customersInfo?? null)
        })()
          
    },[]);

    const [foods, setFoods] = useState<Foods[] |null>(null);
     useEffect(() => {
        (async()=>{
         const foodsList = await getFoods()
         setFoods(foodsList?? null)
        })()
          
    },[]);

    const handleFilter = () => {
        console.log("keyword ->", SearchText.current);
        if(!foods){
            return 
        }
        const filterOutput = foods.filter((item) => {
        
            return item.name
                .toLowerCase()
                .includes(SearchText.current.toLowerCase());
        });

        console.log("filter menu ->", filterOutput);
        
    };

    const [selectProductItems, setProductItems] = useState<Foods[]>([]);

    const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});

    const handleItemClick = (item: Foods) => {
        const existingItemIndex = selectProductItems.findIndex(
            (existingItem) => existingItem.code === item.code,
        );

        if (existingItemIndex !== -1) {
            // ถ้ามีอยู่แล้ว ให้เพิ่มจำนวนของสินค้านั้น
            setItemCounts((prevCounts) => ({
                ...prevCounts,
                [item.code]: prevCounts[item.code] || 0,
            }));
        } else {
            // ถ้ายังไม่มีในตะกร้า ให้เพิ่มเข้าไป
            setProductItems((prevSelectedItems) => [
                ...prevSelectedItems,
                item,
            ]);
            setItemCounts((prevCounts) => ({
                ...prevCounts,
                [item.code]: prevCounts[item.code] || 0,
            }));
        }
    };

    const handleRemoveItem = (index: number) => {
        const newProductItems = [...selectProductItems];
        newProductItems.splice(index, 1);
        setProductItems(newProductItems);
    };
    //cart
    const totalProductpriceSum = selectProductItems.reduce(
        (sum, item) => sum + parseFloat(item.price.replace("$", "")),
        0,
    );
    const handleRemoveAllItems = () => {
        setProductItems([]);
    };
    const handleItemCountIncrement = (itemCode: string) => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [itemCode]: (prevCounts[itemCode] || 0) + 1,
        }));
    };

    const handleItemCountDecrement = (itemCode: string) => {
        if (itemCounts[itemCode] > 0) {
            setItemCounts((prevCounts) => ({
                ...prevCounts,
                [itemCode]: prevCounts[itemCode] - 1,
            }));
        }
    };

    //เพิ่มเมนูทั้งหมด
    const [selectFoods,setSelectFoods]=useState<Foods[]>([]);
    const [allItemsAdded, setAllItemsAdded] = useState(false);
    const handleAddAllToCart = () => {
        if(!foods){
            return 
        }

        foods.forEach((item) => {
            handleItemCountIncrement(item.code);
            handleItemClick(item);
        });
        setAllItemsAdded(true);
    };
    
    if(!customers){
        return <Loading/>

    }
    return (
        <div className="flex flex-col h-screen">
			<SearchBar customersInfo={customers} />
            <div className="flex flex-1">
            <LeftBar handleFilter={ handleFilter} handleAddAllToCart={handleAddAllToCart} handleItemCountDecrement={handleItemCountDecrement} handleItemCountIncrement={handleItemCountIncrement} handleItemClick={handleItemClick} foods={foods} itemCounts={itemCounts} SearchText={SearchText} />
     
</div>
        </div>
    );
};

export default Page;
