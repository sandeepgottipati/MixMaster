import axios from 'axios'

export const placeholderApi = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
})