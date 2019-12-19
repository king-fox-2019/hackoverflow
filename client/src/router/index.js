import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/sign",
    name: "Sign",
    component: () => import(/* webpackChunkName: "Sign" */ "../views/Sign.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "FormSign" */ "../components/FormSign.vue"
          )
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "FormSign" */ "../components/FormSign.vue"
          )
      }
    ]
  },
  {
    path: "/ask",
    name: "Ask",
    component: () => import(/* webpackChunkName: "Ask" */ "../views/Ask.vue")
  },
  {
    path: "/question/:id",
    name: "Question",
    component: () => import(/* webpackChunkName: "Ask" */ "../views/Home.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
