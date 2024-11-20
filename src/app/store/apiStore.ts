import { create } from "zustand";
import { makeRequest } from "../utils/Axios";
import { ContactInsertRequest } from "../utils/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import axios from "axios";


interface useApiStoreState {
    zapSent: boolean
    createContact: (data: ContactInsertRequest) => Promise<any>
    sendZap: (data: any) => Promise<any>
}

// const myMiddlewares = (f: useApiStoreState) => devtools(persist(f, { name: 'bearStore' }))


export const useApiStore = create<useApiStoreState>()( 
    devtools(
        persist(
                (set) => ({
    createContact: async (data: ContactInsertRequest) => {
        try {
            const formBody = new URLSearchParams(Object.entries(data).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
              }, {} as Record<string, string>)).toString()
            const createContact = await makeRequest("/ContactInsert", { method: "POST",  data: formBody})

            // console.log(`Response: ${createContact}`);
            

            return createContact
        } catch (error) {
            console.log(`Error submitting Contact: ${error}`);
            return false
        }
    },
    sendZap: async (data: any) => {
        try {
            let url = "https://hooks.zapier.com/hooks/catch/14438499/2r1pn7n"
            for(const [key, value] of Object.entries(data)){
                url += `?${key}=${value}`;
            }
            const invokeZap = await axios.get(url)

            if (invokeZap.status == 200){
                set(() => ({
                    zapSent: true,
                }))
            }

            return invokeZap.data;
        } catch (error) {
            console.log(`Error sending zap: ${error}`);
            // throw new AxiosError(`Error sending zap: ${error}`)
        }
    },
    zapSent: Boolean(false),
}),  
     {
    name: 'keyone_pm_api_store', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  })))