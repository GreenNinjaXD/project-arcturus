import {
    defineStore
} from 'pinia'
import axios from 'axios'
import {
    public_key,
    secret_key
} from '@/urls'
import md5 from "md5";

export const useAllPage = defineStore({
    id: 'AllPage',

    state: () => ({
        url: 'https://gateway.marvel.com:443/v1/public/',
        characterPage: null,
        comicsPage: null,
        seriesPage: null,
        eventsPage: null
    }),

    actions: {
        async getAllPage() {
            try {
                const ts = Date.now();
                const hash = md5(ts + secret_key + public_key);
                const res = await axios.get(`${this.url}characters?ts=${ts}&apikey=${public_key}&hash=${hash}&limit=80`)
                const resComics = await axios.get(`${this.url}comics?ts=${ts}&apikey=${public_key}&hash=${hash}&limit=80`)
                const resSeries = await axios.get(`${this.url}series?ts=${ts}&apikey=${public_key}&hash=${hash}&limit=80`)
                const resEvents = await axios.get(`${this.url}events?ts=${ts}&apikey=${public_key}&hash=${hash}&limit=80`)
                this.characterPage = res.data.data.results
                this.comicsPage = resComics.data.data.results
                this.seriesPage = resSeries.data.data.results
                this.eventsPage = resEvents.data.data.results


                // console.log(this.characterPage);
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {},
})