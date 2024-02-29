import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp, 
    getDocs, 
    updateDoc,
    
    doc, 
    DocumentData,
    getDoc
  } from "firebase/firestore";
  import { 
    getDownloadURL, 
    getStorage, 
    ref, 
    updateMetadata, 
    uploadBytes 
  } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCyIvqzE_Wv6HUStkQBuaZ1OcVHKa-9Opk",
    authDomain: "m-com-ad72f.firebaseapp.com",
    projectId: "m-com-ad72f",
    storageBucket: "m-com-ad72f.appspot.com",
    messagingSenderId: "930360203423",
    appId: "1:930360203423:web:2be15d42bded624ea7aaaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Firestore Database
export const db = getFirestore(app);

type FormFields = {
    title:string,
    price:number,
    selling_price:number,
    description:string,
    sku:string,
    brand:string,
    category:string,
    userId:string | undefined,
    slug?:string,
    images?:[{urls:string;}],
    colour?:[
        {
            colorId:string,
            title:string,
            value:string,
        }
    ],
    tags?:[{tag:string;}],
    ratings?:[
        {
            userId:string,
            thumbnail:string,
            message:string,
            rating:number,
        }
    ],
    rating?:number,
    sizes?:[{size:string;}],
    storeId?:string,
}

/**
 * Upload the product data with its
 * image URL to database
 * @returns Product is
 */

export const uploadProduct = async(
    formFields:FormFields,
    file:Blob | ArrayBuffer,
    fileName:string
) =>{
    try{
        const {
            title,price,
            selling_price,
            description,
            sku,
            brand,
            category,
            userId,
            slug,
            images,
            colour,
            tags,
            ratings,
            rating,
            sizes,
            storeId
        } = formFields;

        //upload image
        const imageRef = ref(storage,`images/${fileName}`);
        const uploadImage = await uploadBytes(imageRef,file);

        //Create file metadata.
        const newMetadata = {
            cacheContrrol:'public,max-age=2629800000', //1 month
            contentType:uploadImage.metadata.contentType
        }

        await updateMetadata(imageRef,newMetadata);

        //get the image url.
        const publicImageUrl = await getDownloadURL(imageRef)

        const cupsData = {
            title:title,
            description:description,
            sku:sku,
            price:price,
            selling_price:selling_price,
            qty:1,
            thumbnail:publicImageUrl,
            brand:brand,
            category:category,
            userId:userId,
            slug:slug,
            images:images,
            colour:colour,
            tags:tags,
            ratings:ratings,
            rating:rating,
            sizes:sizes,
            storeId:storeId,
            created_at:serverTimestamp(),
            updated_at:serverTimestamp()
        }

        // Add the product to the cups collection
        // Remember that we're selling imaginary cups.

        const cupRef = await addDoc(collection(db,"products"),cupsData);

        //Add the cup id to the document refrence.
        await updateDoc(cupRef,{
            id:cupRef.id
        });
        return cupRef.id;

    }catch(error){
        console.log(error);
    }
}

/**
 * Reterive all documents in a collection and 
 * convert it into an array of products.
 * @return the product array
 */

export const getProducts = async():Promise<DocumentData[]> => {
    const cupRef = await getDocs(collection(db,"products"));
    const productsMap = cupRef.docs.map(doc=> doc.data());
    
    return productsMap;
}

/**
 * Reterive all documents in a collection and 
 * convert it into an object of products.
 * @return the single product 
 */

export const getProduct = async(id:string) => {
    const product = await getDoc(doc(db,"products",id));    
    return product.data();
}
/**
 * update product in firebase product collection
 * and
 * @return the product query
 */

export const updateProduct = async() =>{
    try{

    }catch(error){
        console.log(error)
    }
}

export const deleteProduct = async(id:string):Promise<void> => {
    console.log(id) ;
}