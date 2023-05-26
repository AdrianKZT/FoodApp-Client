import FoodDashboard from "./Food";
import { getFoodItem } from "../api/food";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export default function FoodItemList(props){
    const{ data } = useQuery("foods", getFoodItem, {
       refetchOnMount: false,
       revalidateOnMount: true,
    });

    const router = useRouter()

    return(
        <div className="flex mx-auto justify-center container mt-8 mb-20">
            <table className="table w-96">
                <thead>
                    <tr className="text-center">
                        <th>Food Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th/>
                        <th/>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((food) => (
                        <FoodDashboard key={food._id} food={food} />
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await getFoodItem();
    return {
      props: { data },
    };
  }