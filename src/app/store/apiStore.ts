import { create } from "zustand";
import { makeRequest } from "../utils/Axios";
import { ContactInsertRequest } from "../utils/types";

interface useApiStoreState {
    createContact: (data: ContactInsertRequest) => void
}

export const useApiStore = create<useApiStoreState>()((set) => ({

    createContact: async (data: ContactInsertRequest) => {
        try {
            const formBody = new URLSearchParams(Object.entries(data).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
              }, {} as Record<string, string>)).toString()
            const createContact = await makeRequest("/ContactInsert", { method: "POST",  data: formBody})

            console.log(`Response: ${createContact}`);
            

            return createContact
        } catch (error) {
            console.log(`Error submitting Contact: ${error}`);
            return false
        }
    }
}))