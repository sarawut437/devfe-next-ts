import { Customers } from "@/data_services/customers/getCustomers";

type Props ={
    customersInfo: Customers
}

const SearchBar: React.FC<Props> = ({customersInfo}) => {
    return (
        <div className="w-[100%] h-[58px] bg-white">
            <div className="justify-end flex items-center mt-2 mr-4">
                <span className="text-lg text-gray-400">{customersInfo.name}</span>
                <div className="ml-6 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center bg-gray-300">
                    {/* รูปโปรไฟล์ */}
                    <img
                        src="images/mm.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};
export default SearchBar;
