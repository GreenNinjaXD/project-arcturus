<template>
    <div class="block">
        <div class="dial">
            <main>
                <div data-theme="dark">
                    <div class="selector" :class="{ active: isActive }">
                        <div class="knob" @click="isActive = !isActive"></div>
                        <ul>
                            <li>
                                <span>Home</span>
                                <input type="radio" name="choice" checked @click="layout = 'home'" />
                            </li>
                            <li>
                                <span>Play</span>
                                <input type="radio" name="choice" @click="layout = 'play'" />
                            </li>
                            <li>
                                <span>Music</span>
                                <input type="radio" name="choice" @click="layout = 'music'" />
                            </li>
                            <li>
                                <span>Spider</span>
                                <input type="radio" name="choice" @click="layout = 'spider'" />
                            </li>
                            <li>
                                <span>User</span>
                                <input type="radio" name="choice" @click="layout = 'user'" />
                            </li>
                            <li>
                                <span>Search</span>
                                <input type="radio" name="choice" @click="layout = 'search'" />
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <!-- The MIT License (MIT)

            Copyright (c) 2023 CubanSenpai (https://codepen.io/cubansenpai/pen/wvQqLEa)

            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE. -->

        </div>

        <div class="dial__item">

            <transition name="dial-fade">
                <div class="dial__item_home" v-if="layout === 'home' && isActive"
                    :class="{ act_homedial: layout === 'home' }">
                    <img src="../../assets/img/main.png" alt="">
                </div>
            </transition>

            <transition name="dial-fade">
                <div class="dial__item_play" v-if="layout === 'play' && isActive"
                    :class="{ act_playdial: layout === 'play' }">
                    <video src="../../assets/video/AmazingSpiderMan.mp4" controls></video>
                </div>
            </transition>

            <transition name="dial-fade">
                <div class="dial__item_music" v-if="layout === 'music' && isActive"
                    :class="{ act_musicdial: layout === 'music' }">
                    <MusicPlayer />
                </div>
            </transition>

            <transition name="dial-fade">
                <div class="dial__item_spider" v-if="layout === 'spider' && isActive"
                    :class="{ act_spiderdial: layout === 'spider' }">
                    <swiper class="swiper" :breakpoints="swiperOptions.breakpoints" :space-between="10">
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/sm.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/sm2.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/sm3.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/amsm.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/asm2.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/smffh.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/smhc.jpg" alt="">
                        </swiper-slide>
                        <swiper-slide class="dial__item_spider-src">
                            <img src="../../assets/img/smnwh.jpg" alt="">
                        </swiper-slide>
                    </swiper>
                </div>
            </transition>

            <transition name="dial-fade">
                <div class="dial__item_user" v-if="layout === 'user' && isActive"
                    :class="{ act_userdial: layout === 'user' }">
                    <Actors />
                </div>
            </transition>

            <transition name="dial-fade">
                <div class="dial__item_search" v-if="layout === 'search' && isActive"
                    :class="{ act_searchdial: layout === 'search' }">
                    <div class="dial__item_search-in">
                        <input type="text" placeholder="Search..." autofocus required>
                    </div>
                </div>
            </transition>

        </div>

    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer.vue";
import Actors from "@/components/Actors/Actors.vue";

const layout = ref(false)
const isActive = ref(false)

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
            slidesPerView: 4
        }
    }
})


</script>