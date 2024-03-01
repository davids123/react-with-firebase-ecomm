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


/**
 * 
 * 
 * ++++++++++++++++++++++++++++++++++++++++++++++ Product Section Query Start ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

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
    images?:{urls:string;}[],
    colour?:{
        colorId:string,
        title:string,
        value:string,
    }[],
    tags?:{tag:string;}[],
    ratings?:{
        userId:string,
        thumbnail:string,
        message:string,
        rating:number,
    }[],
    rating?:number,
    sizes?:{size:string;}[],
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

/**
 * 
 * 
 * ++++++++++++++++++++++++++++++++++++++++++++++ Product Section Query End ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

/**
 * 
 * 
 * ++++++++++++++++++++++++++++++++++++++++++++++ Brand Section Query Start ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */


/**
 * This prosses id brand collection in firebase
 * create,update delete and patch of brand
 * @returns all brand query
 */

type BrandFormField = {
    title:string;
    slug:string;
    description?:string;
}

export const uploadBrand = async(
    formFields:BrandFormField,
    file:Blob | ArrayBuffer,
    fileName:string
)=>{
    try{
        const {
            title,
            slug,
            description,
           
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

        const brandData = {
            title:title,
            slug:slug,
            description:description,
            thumbnail:publicImageUrl,            
            created_at:serverTimestamp(),
            updated_at:serverTimestamp()
        }

        // Add the product to the cups collection
        // Remember that we're selling imaginary cups.

        const brandRef = await addDoc(collection(db,"brands"),brandData);

        //Add the cup id to the document refrence.
        await updateDoc(brandRef,{
            id:brandRef.id
        });
        return brandRef.id;
    }catch(error){
        console.log(error)
    }

}


/**
 * Reterive all documents in a collection and 
 * convert it into an array of brands.
 * @return the brand array
 */

export const getBrands = async():Promise<DocumentData[]> => {
    const brandRef = await getDocs(collection(db,"brands"));
    const brandsMap = brandRef.docs.map(doc=> doc.data());
    
    return brandsMap;
}


/**
 * Reterive all documents in a collection and 
 * convert it into an object of products.
 * @return the single product 
 */

export const getBrand = async(id:string) => {
    const brand = await getDoc(doc(db,"brands",id));    
    return brand.data();
}

export const updateBrand = async({id,data}:{id:string,data:BrandFormField}) =>{
    try{
        const updatedData =  await updateDoc(doc(db, "brands", id), data);
        return updatedData;
    }catch(error){
        console.log(error)
    }
}

export const deleteBrand = async(id:string):Promise<void> => {
    console.log(id) ;
}



/**
 * 
 * 
 * ++++++++++++++++++++++++++++++++++++++++++++++ Brand Section Query End ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
