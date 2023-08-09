import {
    defineStore
} from 'pinia'
import axios from 'axios'
import {
    public_key,
    secret_key
} from '@/urls'
import md5 from "md5";

export const useAll = defineStore({
    id: 'All',

    state: () => ({
        url: 'https://gateway.marvel.com:443/v1/public/',
        character: null,
        comics: null,
        series: null,
        events: null,
    }),

    actions: {
        async getAll() {
            try {
                const ts = Date.now();
                const hash = md5(ts + secret_key + public_key);
                const res = await axios.get(`${this.url}characters?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resComics = await axios.get(`${this.url}comics?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resSeries = await axios.get(`${this.url}series?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resEvents = await axios.get(`${this.url}events?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                this.character = res.data.data.results
                this.comics = resComics.data.data.results
                this.series = resSeries.data.data.results
                this.events = resEvents.data.data.results

                // console.log(this.events);
                // console.log(this.creators);
            } catch (error) {
                console.log(error);
            }
        },
        getters: {},
    }
})