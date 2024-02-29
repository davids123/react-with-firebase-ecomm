import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/index';
import {  Brand } from "./type";
import { BASE_URL } from "../../config";

export const brandService = createApi({
    reducerPath:'brandService',
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
    tagTypes:["Brand","Product","Category","Color"],
    endpoints: (builder) =>({
        brandList: builder.query<Brand[],void>({
            query: ()=>{
                return{
                    url:'brand',
                    method:'GET',
                }
            },
            providesTags:["Brand"],
        }),
    })
});
export const {
    
    useBrandListQuery,
    
} = brandService;