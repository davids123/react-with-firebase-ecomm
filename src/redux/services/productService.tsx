import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/index';
import {  Product } from "./type";
import { BASE_URL } from "../../config";


export const productService = createApi({
    reducerPath:'productService',
    baseQuery:fetchBaseQuery({
        baseUrl:BASE_URL,
        prepareHeaders: (headers,{getState})=>{
            const token = (getState() as RootState).auth.token

            //If we have a token set in state, let' assume that we should be passing it.
            if(token){
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["Product"],
    endpoints: (builder) =>({
        
        productList: builder.query<Product[],void>({
            query: ()=>{
                return{
                    url:`product`,
                    method:'GET',
                }
            },
            providesTags:["Product"],
        }),
        singleProduct: builder.query<Product,string>({
            query:(id)=>{
                return{
                    headers: {
                        'content-type': 'application/json',
                    },
                    url:`product/${id}`,
                    method:'GET',
                }
            },
            providesTags:["Product"],
        }),
        createProduct: builder.mutation<Product,Partial<Product>>({
            query:(data)=>{
                return{
                    headers: {
                        'content-type': 'application/json',
                    },
                    url:`product`,
                    method:'POST',
                    body:data
                }
            },
            invalidatesTags:["Product"],
        }),
        updateProduct: builder.mutation<Product,Partial<Product>>({
            query:({_id,...data})=>{
                return{
                    headers: {
                        'content-type': 'application/json',
                    },
                    url:`product/${_id}`,
                    method:'PUT',
                    body:data
                }
            },
            invalidatesTags:["Product"],
        }),
        deleteProduct: builder.mutation<Product,number>({
            query:(id)=>{
                return{
                    headers: {
                        'content-type': 'application/json',
                    },
                    url:`product/${id}`,
                    method:'DELETE',
                }
            },
            invalidatesTags:["Product"],
        }),

        
    })
});

export const {
    useProductListQuery,
    useSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productService;