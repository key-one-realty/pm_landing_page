import axios, { AxiosError, AxiosRequestConfig } from "axios";


const axiosInstance = axios.create({
    baseURL: "http://webapi.goyzer.com/Company.asmx",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

export const makeRequest = async (url: string, axiosConfig?: AxiosRequestConfig<any> | undefined) => {
    try {
        const request = await axiosInstance(url, {
            ...axiosConfig
        });
        return request.data;

    } catch (error) {
        throw new AxiosError(`Could not make request: ${error}`)
    }
}