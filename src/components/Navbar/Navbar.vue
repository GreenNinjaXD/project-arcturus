<template>
    <div class="opener">
        <div class="navbar__opener" :class="{ navactive: isActive }" @click="isActive = !isActive">
            <i class="fa-solid fa-horizontal-rule bars bars-tr"></i>
        </div>
        <div class="opbar__opener" :class="{ navactive: isActive }" @click="isActive = !isActive">
            <i class="fa-solid fa-horizontal-rule bars bars-tr opbar"></i>
        </div>
        <div class="opbar__opener-t" :class="{ navactive: isActive }" @click="isActive = !isActive">
            <i class="fa-solid fa-horizontal-rule bars bars-tr opbar"></i>
        </div>
    </div>
    <transition name="slide-fade">
        <nav class="nav" v-if="isActive">
            <div class="nav__item">
                <ul class="nav__item_list">
                    <li v-for="link in links" :key="link.title">
                        <router-link :to="link.url" class="nav__item_list-link">{{ link.title }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </transition>
</template>

<script setup>

import { ref } from "vue";

const links = ref([
    { title: 'Comics', url: '/comics' },
    { title: 'Tv Shows', url: '/tvshows' },
    { title: 'Events', url: '/events' },
    { title: 'Characters', url: '/characters' },
])

const isActive = ref(false)

</script>