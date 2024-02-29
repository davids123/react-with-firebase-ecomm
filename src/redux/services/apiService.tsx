import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/index';

import { BASE_URL } from "../../config";
import { User } from './type';

export const apiService = createApi({
    reducerPath:'apiService',
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
    tagTypes:["Brand","Product","Category","Color","User"],
    endpoints: (builder) =>({
        loginUser: builder.mutation<User,Partial<User>>({
            query: (data) =>{
                return{
                    url: 'user/login',
                    method: 'POST',
                    body:data,
                }
            },
            invalidatesTags:["User"],
        }),
        registerUser: builder.mutation<User,Partial<User>>({
            query:(data) =>{
                return{
                    headers:{
                        'content-type': 'application/json',
                    },
                    url: 'user/register',
                    method: 'POST',
                    body:data,
                }
            },
            invalidatesTags:["User"],
        }),
        
        
        createPaymentIntent: builder.mutation({
            query: (data) => {
                return{
                    url: 'payments/intent',
                    method: 'POST',
                    body: data,
                }
            }
        }),
        getUserCart: builder.query({
            query:() => {
                return{
                    headers: {
                        'content-type': 'application/json',
                    },
                    url:'user/cart',
                    method:'GET',
                }
            }
        }),
        addToUserCart: builder.mutation({
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
            }
        }),
        getColor: builder.query({
            query:(id)=>{
                return{
                    url:`color/${id}`,
                    method:'GET',
                }
            }
        })
    })
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,    
    useGetColorQuery,    
    useCreatePaymentIntentMutation,
} = apiService;