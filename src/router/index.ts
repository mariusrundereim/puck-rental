import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ],
});

export default router;

/*

Paths

{
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/fleet",
      name: "fleet",
      component: () => import("../views/Fleet.vue"),
    },
    {
      path: "/locations",
      name: "locations",
      component: () => import("../views/Locations.vue"),
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("../views/FAQ.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contact.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/Auth.vue"),
    },

*/
