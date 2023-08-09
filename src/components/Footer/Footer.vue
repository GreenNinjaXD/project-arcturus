<template>
    <div class="footers">
        <div class="footer" :class="footer">
            <div class="footer__nav">
                <li class="footer__nav_link" @click="footer = 'about'">About</li>
                <li class="footer__nav_link" @click="footer = 'contact'">Contact</li>
            </div>
            <transition name="footer-fade">
                <div class="footer__contact" v-if="footer == 'contact'">
                    <h2 class="footer__contact-title">Contact me</h2>
                    <form action="https://formsubmit.co/greenninjawillbewebprogrammer@gmail.com"
                        class="footer__contact-mail" method="POST">
                        <input type="text" name="name" required placeholder="Name">
                        <input type="email" name="email" required placeholder="Email">
                        <input type="text" name="subject" required placeholder="Subject">
                        <textarea name="msg" required placeholder="Message"></textarea>
                        <button>Submit</button>
                    </form>
                </div>
            </transition>
            <transition name="footer-fade">
                <div class="footer__mid" v-if="footer == 'about'">
                    <h2 class="footer__mid-title">GREEN NINJA</h2>
                    <p class="footer__mid-info">Data obtained from The Marvel Developer API</p>
                    <p class="footer__mid-info">Website created for educational purposes in Pro Web for graduation</p>
                </div>
            </transition>
        </div>
        <div class="social">
            <a href="https://t.me/greenninjaoff"><i class="fa-brands fa-telegram social-icon"></i></a>
            <a href="https://www.instagram.com/greenninjaxd/"><i class="fa-brands fa-instagram social-icon"></i></a>
            <a href="https://www.youtube.com/@greenninjaoff"><i class="fa-brands fa-youtube social-icon"></i></a>
            <a href="https://twitter.com/greenninjaxdoff"><i class="fa-brands fa-twitter social-icon"></i></a>
            <a href="https://www.reddit.com/user/greenninjaofficial"><i
                    class="fa-brands fa-reddit-alien social-icon"></i></a>
            <a href="https://github.com/GreenNinjaXD"><i class="fa-brands fa-github social-icon"></i></a>
            <a href="https://wa.link/ghk6av"><i class="fa-brands fa-whatsapp social-icon"></i></a>
            <a href="https://discord.gg/GTX4Zzhp"><i class="fa-brands fa-discord social-icon"></i></a>
            <a href="https://www.linkedin.com/in/green-wastaken-abb402287/"><i
                    class="fa-brands fa-linkedin-in social-icon"></i></a>
            <a href="https://www.pinterest.com/greenninjawillbewebprogrammer/"><i
                    class="fa-brands fa-pinterest-p social-icon"></i></a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const footer = ref('about')

</script>