import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/comics', name: 'ComicsPage', component: () => import('@/pages/ComicsPage.vue')},
    { path: '/characters', name: 'CharactersPage', component: () => import('@/pages/CharactersPage.vue')},
    { path: '/tvshows', name: 'TvShowsPage', component: () => import('@/pages/TvShowsPage.vue')},
    { path: '/events', name: 'EventsPage', component: () => import('@/pages/EventsPage.vue')},
    { path: '/character/:id', name: 'Character', component: () => import('@/components/Id/Id.vue')},
    { path: '/comic/:id', name: 'Comics', component: () => import('@/components/Id/IdComics.vue')},
    { path: '/tvshow/:id', name: 'Series', component: () => import('@/components/Id/IdSeries.vue')},
    { path: '/event/:id', name: 'Events', component: () => import('@/components/Id/IdEvents.vue')},
  ]
})

export default router
