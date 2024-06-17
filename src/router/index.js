import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/ClientView.vue";
import AdminView from "../views/AdminView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin",
      name: "addmin",
      component: AdminView,
    },
  ],
});

export default router;
