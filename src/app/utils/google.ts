"use server";
import { Client } from "@googlemaps/google-maps-services-js";


const client = new Client();

export const autocomplete = async (userInput: string) => {

    if(!userInput) return;

    try {
        const autocompleteInstance = await client.placeAutocomplete({
            params: {
                input: userInput,
                components: ["country:ae"],
                key: process.env.GCP_KEY!
            }
        })

        return autocompleteInstance.data.predictions;
    } catch (error) {
        console.log(`Could not call autocomplete api: ${error}`);
    }
}