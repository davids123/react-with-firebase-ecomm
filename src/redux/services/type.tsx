export interface Customers {
    firstname: string;
    lastname:string;
    email: string;
    mobile:string;
    role: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Brand{
    _id?: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface Product{
    _id?: string;
    title: string;
    slug?: string;
    description: string;
    price?: number;
    category: string;
    quantity: number;
    brand: string;
    sold: number;
    size:[];
    images:{
        url:string;
    }[] | undefined;
    color?:[];
    tags?:[];
    thumbnail:string;
    totalrating?: string;
    ratings?:[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface Category{
    _id?: string;
    title: string;
    image:string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface Color{
    _id?: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface Cart{
    _id?:string;
    userId?:any;
    productId?:any;
    quantity?:number;
    price?: number;
    color?:any;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface Media{
    _id?: string;
    user?: string;
    images?:[
        {
            url?:string;
        }
    ];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface User{
    name?:string;
    email:string;
    password:string;
    mobile?:string;
    role?:string;
}