import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store/index';
import {  Media } from "./type";
import { BASE_URL } from "../../config";

export const mediaService = createApi({
    reducerPath:'mediaService',
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
    tagTypes:["Media"],
    endpoints: (builder) =>({
        mediaList: builder.query<Media[],void>({
            query: ()=>{
                return{
                    url:'media',
                    method:'GET',
                }
            },
            providesTags:["Media"],
        }),
    })
});
export const {
    
    useMediaListQuery,
    
} = mediaService;