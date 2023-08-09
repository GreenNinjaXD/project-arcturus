<template>
    <nav class="mainnav">
        <div class="mainnav__item">

            <ul class="mainnav__item_list">
                <li>Русский</li>
                <li>|</li>
                <li>English</li>
            </ul>

            <router-link to="/">
                <img src="../../assets/img/logo.png" alt="" class="mainnav__item_logo">
            </router-link>

            <ul class="mainnav__item_right">
                <li class="mainnav__item_right-search" @click="src = 'ser'" :class="{ sact: src === 'ser' }">
                    <div class="mainnav__item_right-link">
                        Search <i class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
                    </div>
                </li>
                <li class="mainnav__item_right-log" @click="src = 'log'" :class="{ lact: src === 'log' }">
                    <div class="mainnav__item_right-log">Log in</div>
                </li>
                <li @click="src = 'none'" v-if="src === 'ser' || src === 'log'">
                    <div class="mainnav__item_right-close">
                        Close <i class="fa-solid fa-x"></i>
                    </div>
                </li>
            </ul>

        </div>
    </nav>
    <transition name="search-fade">
        <div class="search" v-if="src === 'ser'">
            <div class="search__in">
                <input type="text" placeholder="Search..." autofocus required>
            </div>
        </div>
    </transition>
    <transition name="search-fade">
        <div class="log" v-if="src === 'log'">
            <div class="log-main">
                <input type="checkbox" id="chk" aria-hidden="true">
                <div class="log-main-signup">
                    <form>
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required>
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="Password" name="pswd" placeholder="Password" required>
                        <button>Sign up</button>
                    </form>
                </div>
                <div class="log-main-login">
                    <form>
                        <label for="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required>
                        <input type="Password" name="pswd" placeholder="Password" required>
                        <button>login</button>
                    </form>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { computed, ref } from "vue"

const size = 'portrait_incredible.jpg'

const src = ref('')

</script>

<style lang="scss" scoped></style>