<template>
    <div class="comics">
        <div class="comics-item" v-for="comics in getAllPage">
            <router-link :to="{ name: 'Comics', params: { id: comics.id } }">
                <img :src="comics.thumbnail.path + '/' + size" alt="">
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { useAllPage } from '@/stores/AllPage.js'
const allPageStore = useAllPage()
allPageStore.getAllPage()
const getAllPage = computed(() => allPageStore.comicsPage)

const size = 'portrait_incredible.jpg'

</script>

<style lang="scss" scoped>

.comics {
    margin: 200px 173px 50px 173px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;

    &-item {
        width: 300px !important;
        height: 450px !important;
        border-radius: 20px;
        position: relative;
        overflow: hidden;
        border: 1px solid #000;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.753);
        transition: .5s;

        & img {
            height: 100%;
            object-fit: cover;
            transition: .4s;
        }

        &:hover img {
            transform: scale(1.2);
        }

    }
}
</style>