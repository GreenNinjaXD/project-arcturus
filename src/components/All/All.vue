<template>
    <div class="character">

        <router-link to="/characters" class="character-title">
            <h2>Characters</h2>
        </router-link>

        <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
            <swiper-slide v-for="character in getCharacter" class="character-item">
                <router-link :to="{ name: 'Character', params: { id: character.id}}">
                    <img :src="character.thumbnail.path + '/' + size" alt="">
                </router-link>
            </swiper-slide>

        </swiper>

    </div>
    <div class="comics">

        <router-link to="/comics" class="comics-title">
            <h2>Comics</h2>
        </router-link>

        <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
            <swiper-slide v-for="comics in getComics" class="comics-item">
                <router-link :to="{ name: 'Comics', params: { id: comics.id}}">
                    <img :src="comics.thumbnail.path + '/' + size" alt="">
                </router-link>
            </swiper-slide>

        </swiper>

    </div>
    <div class="series">

        <router-link to="/tvshows" class="series-title">
            <h2>Tv Shows</h2>
        </router-link>

        <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
            <swiper-slide v-for="series in getSeries" class="series-item">
                <router-link :to="{ name: 'Series', params: { id: series.id}}">
                    <img :src="series.thumbnail.path + '/' + size" alt="">
                </router-link>
            </swiper-slide>

        </swiper>

    </div>
    <div class="events">

        <router-link to="/events" class="events-title">
            <h2>Events</h2>
        </router-link>

        <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
            <swiper-slide v-for="events in getEvents" class="events-item">
                <router-link :to="{ name: 'Events', params: { id: events.id}}">
                    <img :src="events.thumbnail.path + '/' + size" alt="">
                </router-link>
            </swiper-slide>

        </swiper>

    </div>

</template>

<script setup>
import { computed, ref } from "vue"

import { useAll } from '@/stores/All.js'
const allStore = useAll()
allStore.getAll()

const getCharacter = computed(() => allStore.character)
const getComics = computed(() => allStore.comics)
const getSeries = computed(() => allStore.series)
const getEvents = computed(() => allStore.events)



const size = 'portrait_incredible.jpg'

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