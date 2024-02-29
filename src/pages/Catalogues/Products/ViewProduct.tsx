
//import { collection } from "firebase/firestore";

import { useParams } from "react-router-dom";
//import { db } from "@/utils/firebase";

export default function ViewProduct(){
    const { id } = useParams();
    //const [product,setProduct] = useState<any>({});
    console.log(`==Product Id===${id}====`);

    
    return(
        <div>
            <h1>Product will be dispaly</h1>
        </div>
    );
}