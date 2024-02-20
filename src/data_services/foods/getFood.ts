export  type Foods = {
    id: number;
    name: string;
    code: string;
    price: string;
    store_id: string;
    image: string | null;
};
export  async function getFoods(): Promise<Foods[] | undefined> 
{
    try {
        const res = await fetch("http://localhost:3000/foods");
          const data: { result: Foods[] } = await res.json();
        

        return data.result;
    } catch (error) {
        return undefined;
    }
}
