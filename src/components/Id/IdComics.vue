<template>
    <div class="comid">

        <div class="comid-nav">
            <div class="comid-nav-comics">
                <h2 class="comid-nav-comics-title" @click="blocks = 'comics'" :class="{ comicsbg: blocks === 'comics' }">
                    Comic</h2>
            </div>
            <div class="comid-nav-characters">
                <h2 class="comid-nav-characters-title" @click="blocks = 'characters'" :class="{ charbg: blocks === 'characters' }">
                    Characters
                </h2>
            </div>
            <div class="comid-nav-events">
                <h2 class="comid-nav-events-title" @click="blocks = 'events'" :class="{ eventsbg: blocks === 'events' }">
                    Events</h2>
            </div>
            <div class="comid-nav-series">
                <h2 class="comid-nav-series-title" @click="blocks = 'series'" :class="{ seriesbg: blocks === 'series' }">
                    Tv Shows</h2>
            </div>
            <router-link to="/">
                <i class="fa-solid fa-x comid-nav-close"></i>
            </router-link>
        </div>

        <transition name="comid-fade">
            <div class="comid-comics" v-if="blocks === 'comics'">

                <div class="comid-comics-left" v-for="com in getComId">
                    <h2 class="comid-comics-left-title">{{ com.title }}</h2>
                    <p class="comid-comics-left-desc">{{ com.description || 'This element does not have a description' }}
                    </p>
                    <p class="comid-comics-left-info">{{ com.modified }}</p>
                    <p class="comid-comics-left-info-id">{{ com.id }}</p>
                </div>

                <div class="comid-comics-right" v-for="com in getComId">
                    <img :src="com.thumbnail.path + '/' + size" alt="">
                </div>

            </div>
        </transition>

        <transition name="comid-fade">
            <div class="comid-characters" v-if="blocks === 'characters'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide v-for="char in getCharId" class="comid-item">
                        <img :src="char.thumbnail.path + '/' + sizeP" alt="">
                        <h2 class="comid-item-title">{{ char.name }}</h2>
                        <p class="comid-item-desc">{{ char.description || 'This element does not have a description' }}
                        </p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

        <transition name="comid-fade">
            <div class="comid-events" v-if="blocks === 'events'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide class="comid-item">
                        <img src="" alt="">
                        <h2 class="comid-item-title"></h2>
                        <p class="comid-item-desc">
                        </p>
                    </swiper-slide>
                </swiper>
            </div>
        </transition>

        <transition name="comid-fade">
            <div class="comid-series" v-if="blocks === 'series'">
                <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="80">
                    <swiper-slide class="comid-item">
                        <img src="" alt="">
                        <h2 class="comid-item-title"></h2>
                        <p class="comid-item-desc">
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
        url: 'https://gateway.marvel.com:443/v1/public/comics/',
        comicId: null,
        comicIdCharacters: null,
    }),

    actions: {
        async getId() {
            try {
                const ts = Date.now();
                const hash = md5(ts + secret_key + public_key);
                const res = await axios.get(`${this.url}${route.params.id}?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                const resChar = await axios.get(`${this.url}${route.params.id}/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`)
                this.comicId = res.data.data.results
                this.comicIdCharacters = resChar.data.data.results


                // console.log(this.comicId);
            } catch (error) {
                // console.log(error);
            }
        }
    },
    getters: {},
})

const idStore = useId()
idStore.getId()
const getComId = computed(() => idStore.comicId)
const getCharId = computed(() => idStore.comicIdCharacters)

const size = 'landscape_incredible.jpg'
const sizeP = 'portrait_incredible.jpg'

const blocks = ref('comics')

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
.comid {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
    margin-bottom: 600px;
    margin-top: 200px;
    font-family: Poppins;

    &.comid_active {
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

            &:hover .comid-nav-characters-title {
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

            &:hover .comid-nav-comics-title {
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

            &:hover .comid-nav-events-title {
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

            &:hover .comid-nav-series-title {
                transform: scale(1.1);
                background: #ffc06e;
            }
        }

        &-stories {

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

            &:hover .comid-nav-stories-title {
                transform: scale(1.1);
                background: #94fff6;
            }
        }
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
        width: 100%;

        &-left {
            height: 522px;
            background: linear-gradient(90deg, #3f0000 50%, #14141441 80%);
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

    &-series {
        position: absolute;
        top: 75px;
        left: 0;
        transition: 0.5s;
        // opacity: 0;
        border-radius: 0 0 10px 10px;
        overflow: hidden;
        box-shadow: 0 0 10px 0 #000;
        background: #693c00;
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

        &:hover .comid-item-title {
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

        &:hover .comid-item-desc {
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

.comid-fade-enter-active {
    transition: all .1s;
    transform: scale(0.9);
}

.comid-fade-leave-active {
    transition: all .5s;
}

.comid-fade-enter {
    transform: scale(1);
    opacity: 1;
}

.comid-fade-leave-to {
    transform: scale(0.9);
    opacity: 0;
}</style>