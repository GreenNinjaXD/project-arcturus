<template>
    <div class="blocks">

        <div class="blocks-nav">
            <div class="blocks-nav-characters">
                <h2 class="blocks-nav-characters-title" @click="blocks = 'characters'" :class="{ charbg: blocks === 'characters' }">Character
                </h2>
            </div>
            <div class="blocks-nav-comics">
                <h2 class="blocks-nav-comics-title" @click="blocks = 'comics'" :class="{ comicsbg: blocks === 'comics' }">
                    Comics</h2>
            </div>
            <div class="blocks-nav-events">
                <h2 class="blocks-nav-events-title" @click="blocks = 'events'" :class="{ eventsbg: blocks === 'events' }">
                    Events</h2>
            </div>
            <div class="blocks-nav-series">
                <h2 class="blocks-nav-series-title" @click="blocks = 'series'" :class="{ seriesbg: blocks === 'series' }">
                    Tv Shows</h2>
            </div>
            <router-link to="/">
                <i class="fa-solid fa-x blocks-nav-close"></i>
            </router-link>
        </div>

        <transition name="blocks-fade">
            <div class="blocks-characters" v-if="blocks === 'characters'">

                <div class="blocks-characters-left" v-for="char in getCharId">
                    <h2 class="blocks-characters-left-title">{{ char.name }}</h2>
                    <p class="blocks-characters-left-desc">{{ char.description || 'This element does not have a description' }}
                    </p>
                    <p class="blocks-characters-left-info">{{ char.modified }}</p>
                    <p class="blocks-characters-left-info-id">{{ char.id }}</p>
                </div>

                <div class="blocks-characters-right" v-for="char in getCharId">
                    <img :src="char.thumbnail.path + '/' + size" alt="">
                </div>

            </div>
        </transition>

        <transition name="blocks-fade">
            <div class="blocks-comics" v-if="blocks === 'comics'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide v-for="comics in getComId" class="blocks-item">
                        <img :src="comics.thumbnail.path + '/' + sizeP" alt="">
                        <h2 class="blocks-item-title">{{ comics.title }}</h2>
                        <p class="blocks-item-desc">{{ comics.description || 'This element does not have a description' }}</p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

        <transition name="blocks-fade">
            <div class="blocks-events" v-if="blocks === 'events'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide v-for="event in getEventsId" class="blocks-item">
                        <img :src="event.thumbnail.path + '/' + sizeP" alt="">
                        <h2 class="blocks-item-title">{{ event.title }}</h2>
                        <p class="blocks-item-desc">{{ event.description || 'This element does not have a description' }}</p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

        <transition name="blocks-fade">
            <div class="blocks-series" v-if="blocks === 'series'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide v-for="series in getSeriesId" class="blocks-item">
                        <img :src="series.thumbnail.path + '/' + sizeP" alt="">
                        <h2 class="blocks-item-title">{{ series.title }}</h2>
                        <p class="blocks-item-desc">{{ series.description || 'This element does not have a description' }}</p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { public_key, secret_key } from '@/urlt'
import md5 from "md5";
import { useRoute } from "vue-router"

const route = useRoute()

const useId = defineStore({
    id: 'Id',

    state: () => ({
        url: 'https://gateway.marvel.com:443/v1/public/characters/',
        characterId: null,
        characterIdComics: null,
        characterIdEvents: null,
        characterIdSeries: null,
    }),

    actions: {
        async getId() {
            try {
                const ts = Date.now();
                const hash = md5(ts + secret_key + public_key);
                const res = await axios.get(`${this.url}${route.params.id}?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resComics = await axios.get(`${this.url}${route.params.id}/comics?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resEvents = await axios.get(`${this.url}${route.params.id}/events?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resSeries = await axios.get(`${this.url}${route.params.id}/series?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                this.characterId = res.data.data.results
                this.characterIdComics = resComics.data.data.results
                this.characterIdEvents = resEvents.data.data.results
                this.characterIdSeries = resSeries.data.data.results

                // console.log(this.characterId);
            } catch (error) {
                // console.log(error);
            }
        }
    },
    getters: {},
})

const idStore = useId()
idStore.getId()
const getCharId = computed(() => idStore.characterId)
const getComId = computed(() => idStore.characterIdComics)
const getEventsId = computed(() => idStore.characterIdEvents)
const getSeriesId = computed(() => idStore.characterIdSeries)

const size = 'landscape_incredible.jpg'
const sizeP = 'portrait_incredible.jpg'

const blocks = ref('characters')

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

let swiperOptions = ref({
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        576: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 2.5
        },
        1200: {
            slidesPerView: 3
        },
        1400: {
            slidesPerView: 3
        }
    }
})

</script>