import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/index';
import {  Category } from "./type";
import { BASE_URL } from "../../config";

export const categoryService = createApi({
    reducerPath:'categoryService',
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
        categoryList: builder.query<Category[],void>({
            query: ()=>{
                return{
                    url:'category',
                    method:'GET',
                }
            },
            providesTags:["Category"],
        }),
    })
});
export const {
    
    useCategoryListQuery,
    
} = categoryService;