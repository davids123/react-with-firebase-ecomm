import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/index';
import {  Cart } from "./type";
import { BASE_URL } from "../../config";

export const cartService = createApi({
    reducerPath:'cartService',
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
    tagTypes:["Cart"],
    endpoints: (builder) =>({
        getUserCartList: builder.query<Cart[],void>({
            query:() => {
                return{
                    headers: {
                        'content-type': 'application/json',
                    },
                    url:'user/cart',
                    method:'GET',
                }
            },
            providesTags:["Cart"]
        }),
        // The mutation accepts a `Partial<Cart>` arg, and returns a `Cart  `
        addToUserCart: builder.mutation<Cart,Partial<Cart>>({
            query:(body:{
                productId:string,
                color:string,
                price:number,
                quantity:number
            })=>{
                return{
                    headers:{
                        'content-type': 'application/json',
                    },
                    url:'user/cart',
                    method:'POST',
                    body,
                }
            },
            invalidatesTags: ["Cart"],
        }),
        updeteUserCart:builder.mutation({
            query:(data)=>{
                return{
                    headers:{
                        'content-type': 'application/json',
                    },
                    url:'user/update-product-cart/654739fc4f68a0184682cc33/5',
                    method:'DELETE',
                    body:data,
                }
            },
            invalidatesTags: ["Cart"],
        }),
        deleteUserCart:builder.mutation<{cart_id: number},number>({
            query:(cart_id)=>{
                return{
                    headers:{
                        'content-type': 'application/json',
                    },
                    url:`user/delete-product-cart/${cart_id}`,
                    method:'DELETE',                    
                }
            },
            //invalidatesTags: ["Cart"],
        }),

    })
})

export const {
    useGetUserCartListQuery,
    useAddToUserCartMutation,
    useUpdeteUserCartMutation,
    useDeleteUserCartMutation,
} = cartService;