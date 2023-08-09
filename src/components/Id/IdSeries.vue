<template>
    <div class="tvid">

        <div class="tvid-nav">
            <div class="tvid-nav-series">
                <h2 class="tvid-nav-series-title" @click="blocks = 'series'" :class="{ seriesbg: blocks === 'series' }">
                    Tv Show</h2>
            </div>
            <div class="tvid-nav-characters">
                <h2 class="tvid-nav-characters-title" @click="blocks = 'characters'"
                    :class="{ charbg: blocks === 'characters' }">
                    Characters
                </h2>
            </div>
            <div class="tvid-nav-comics">
                <h2 class="tvid-nav-comics-title" @click="blocks = 'comics'" :class="{ comicsbg: blocks === 'comics' }">
                    Comics</h2>
            </div>
            <div class="tvid-nav-events">
                <h2 class="tvid-nav-events-title" @click="blocks = 'events'" :class="{ eventsbg: blocks === 'events' }">
                    Events</h2>
            </div>
            <router-link to="/">
                <i class="fa-solid fa-x tvid-nav-close"></i>
            </router-link>
        </div>

        <transition name="tvid-fade">
            <div class="tvid-serie" v-if="blocks === 'series'">

                <div class="tvid-serie-left" v-for="serie in getSerieId">
                    <h2 class="tvid-serie-left-title">{{ serie.title }}</h2>
                    <p class="tvid-serie-left-desc">{{ serie.description || 'This element does not have a description' }}
                    </p>
                    <p class="tvid-serie-left-info">{{ serie.modified }}</p>
                    <p class="tvid-serie-left-info-id">{{ serie.id }}</p>
                </div>

                <div class="tvid-serie-right" v-for="serie in getSerieId">
                    <img :src="serie.thumbnail.path + '/' + size" alt="">
                </div>

            </div>
        </transition>

        <transition name="tvid-fade">
            <div class="tvid-characters" v-if="blocks === 'characters'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide v-for="char in getCharId" class="tvid-item">
                        <img :src="char.thumbnail.path + '/' + sizeP" alt="">
                        <h2 class="tvid-item-title">{{ char.name }}</h2>
                        <p class="tvid-item-desc">{{ char.description || 'This element does not have a description' }}
                        </p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

        <transition name="tvid-fade">
            <div class="tvid-comics" v-if="blocks === 'comics'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide v-for="char in getComId" class="tvid-item">
                        <img :src="char.thumbnail.path + '/' + sizeP" alt="">
                        <h2 class="tvid-item-title">{{ char.title }}</h2>
                        <p class="tvid-item-desc">{{ char.description || 'This element does not have a description' }}
                        </p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

        <transition name="tvid-fade">
            <div class="tvid-events" v-if="blocks === 'events'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide class="tvid-item">
                        <img src="" alt="">
                        <h2 class="tvid-item-title"></h2>
                        <p class="tvid-item-desc">
                        </p>
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
    id: 'IdComics',

    state: () => ({
        url: 'https://gateway.marvel.com:443/v1/public/series/',
        serieId: null,
        serieIdCharacter: null,
        serieIdComic: null,
        serieIdEvent: null,
    }),

    actions: {
        async getId() {
            try {
                const ts = Date.now();
                const hash = md5(ts + secret_key + public_key);
                const res = await axios.get(`${this.url}${route.params.id}?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resChar = await axios.get(`${this.url}${route.params.id}/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resCom = await axios.get(`${this.url}${route.params.id}/comics?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resEve = await axios.get(`${this.url}${route.params.id}/events?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                this.serieId = res.data.data.results
                this.serieIdCharacter = resChar.data.data.results
                this.serieIdComic = resCom.data.data.results
                this.serieIdEvent = resEve.data.data.results


                // console.log(this.serieIdCreator);
            } catch (error) {
                // console.log(error);
            }
        }
    },
    getters: {},
})

const idStore = useId()
idStore.getId()
const getSerieId = computed(() => idStore.serieId)
const getCharId = computed(() => idStore.serieIdCharacter)
const getComId = computed(() => idStore.serieIdComic)
const getEveId = computed(() => idStore.serieIdEvent)

const size = 'landscape_incredible.jpg'
const sizeP = 'portrait_incredible.jpg'

const blocks = ref('series')

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

<style lang="scss" scoped>
.tvid {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
    margin-bottom: 600px;
    margin-top: 200px;
    font-family: Poppins;

    &.tvid_active {
        height: 100%;
        opacity: 1;
    }

    &-nav {
        display: flex;
        position: relative;

        &-close {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 35px;
            color: #fff;
            background: #0a0b1b;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            transition: .5s;
            box-shadow: 0 0 10px 0 #000;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
                background: #b5baf5;
            }
        }

        &-characters {

            &-title {
                padding: 20px;
                font-size: 35px;
                color: rgb(255, 255, 255);
                background: #0a0b1b;
                border-radius: 10px 10px 0 0;
                box-shadow: 0 0 10px 0 #000;
                cursor: pointer;
                transition: .5s;
            }

            &:hover .tvid-nav-characters-title {
                transform: scale(1.1);
                background: #9c9c9c;
            }
        }

        &-comics {

            &-title {
                padding: 20px;
                font-size: 35px;
                color: rgb(255, 255, 255);
                background: #0a0b1b;
                border-radius: 10px 10px 0 0;
                box-shadow: 0 0 10px 0 #000;
                cursor: pointer;
                transition: .5s;
            }

            &:hover .tvid-nav-comics-title {
                transform: scale(1.1);
                background: #ff6666;
            }
        }

        &-events {

            &-title {
                padding: 20px;
                font-size: 35px;
                color: rgb(255, 255, 255);
                background: #0a0b1b;
                border-radius: 10px 10px 0 0;
                box-shadow: 0 0 10px 0 #000;
                cursor: pointer;
                transition: .5s;
            }

            &:hover .tvid-nav-events-title {
                transform: scale(1.1);
                background: #5eff58;
            }
        }

        &-series {

            &-title {
                padding: 20px;
                font-size: 35px;
                color: rgb(255, 255, 255);
                background: #0a0b1b;
                border-radius: 10px 10px 0 0;
                box-shadow: 0 0 10px 0 #000;
                cursor: pointer;
                transition: .5s;
            }

            &:hover .tvid-nav-series-title {
                transform: scale(1.1);
                background: #ffc06e;
            }
        }
    }

    &-serie {
        position: absolute;
        top: 75px;
        left: 0;
        transition: 0.5s;
        // opacity: 0;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #000;
        width: 100%;

        &-left {
            height: 522px;
            background: linear-gradient(90deg, #693c00 50%, #14141441 80%);
            position: relative;
            z-index: 5;
            padding: 20px;
            font-family: Poppins;

            &-title {
                font-size: 60px;
                color: #fff;
                margin-top: 60px;
            }

            &-desc {
                font-size: 30px;
                max-width: 700px;
                color: rgba(255, 255, 255, 0.808);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                margin-top: 20px;
                margin-bottom: 30px;
            }

            &-info {
                font-size: 25px;
                color: rgba(255, 255, 255, 0.60);

                &-id {
                    font-size: 25px;
                    color: rgba(255, 255, 255, 0.60);
                    margin-top: 20px;
                }
            }
        }

        &-right {

            & img {
                position: absolute;
                top: 0;
                right: 0;
                height: 522px;
                width: 800px;
            }
        }
    }

    &-characters {
        position: absolute;
        top: 75px;
        left: 0;
        transition: 0.5s;
        // opacity: 0;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #000;
        background: #141414;
        width: 100%;
        height: 552px;
    }

    &-events {
        position: absolute;
        top: 75px;
        left: 0;
        transition: 0.5s;
        // opacity: 0;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #000;
        background: #024400;
        width: 100%;
        height: 552px;
    }

    &-comics {
        position: absolute;
        top: 75px;
        left: 0;
        transition: 0.5s;
        // opacity: 0;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #000;
        background: #3f0000;
        width: 100%;
        height: 552px;
    }

    &-item {
        width: 400px !important;
        height: 505px !important;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
        border: 1px solid #000;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.753);
        transition: .5s;
        position: relative;

        & img {
            width: 100%;
            object-fit: cover;
            transition: .4s;
        }

        &:hover img {
            transform: scale(1.2);
        }

        &::after {
            content: '';
            display: block;
            width: 400px;
            height: 505px;
            background: #000000d2;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: .5s;
        }

        &:hover::after {
            opacity: 1;
        }

        &-title {
            position: absolute;
            top: 30px;
            left: 20px;
            color: #fff;
            font-size: 30px;
            z-index: 5;
            opacity: 0;
            transition: .5s;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        &:hover .tvid-item-title {
            opacity: 1;
        }

        &-desc {
            position: absolute;
            top: 120px;
            left: 20px;
            color: #fff;
            font-size: 20px;
            z-index: 5;
            opacity: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            transition: .5s;
        }

        &:hover .tvid-item-desc {
            opacity: 1;
        }
    }
}

.charbg {
    background: #141414;
}

.comicsbg {
    background: #3f0000;
}

.eventsbg {
    background: #024400;
}

.seriesbg {
    background: #693c00;
}

.tvid-fade-enter-active {
    transition: all .1s;
    transform: scale(0.9);
}

.tvid-fade-leave-active {
    transition: all .5s;
}

.tvid-fade-enter {
    transform: scale(1);
    opacity: 1;
}

.tvid-fade-leave-to {
    transform: scale(0.9);
    opacity: 0;
}
</style>