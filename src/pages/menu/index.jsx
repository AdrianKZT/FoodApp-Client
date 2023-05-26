
import FoodItem from "./[id]"
import { getFoodItem } from "../api/food"
import { useQuery } from "react-query"
import { ThreeDots } from "react-loader-spinner"

export default function FoodItemList ( props ) {
    const { data, isLoading } = useQuery("foods", getFoodItem)

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <ThreeDots 
                    height="80" 
                    width="80" 
                    radius="9"
                    color="#db0808" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto mb-20">
        
            <div className="grid gap-4 sm:grid-cols-3">
                {data?.map((food) => (
                    <FoodItem key={food._id} food={food}/>
                    ))}
            </div>

        </div>
    )
}

//this function getServerSideProps will not work if its not a page.
//getStaticProps and getServerSideProps
//both allows you to fetch data in your pages. getStaticProps is used to fetch data at build time while getServerSideProps fetch data at request time (data is fetch everytime a user requests the page.).
// export async function getServerSideProps() {
//     const data = await getFoodItem();
//     return {
//       props: { data },
//     };
// }