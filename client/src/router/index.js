import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "detail/:id",
        name: "detail-question",
        component: () =>
          import(
            /* webpackChunkName: "detail-question" */ "../views/DetailQuestion.vue"
          )
      },
      {
        path: "addquestion",
        name: "add-question",
        component: () =>
          import(
            /* webpackChunkName: "add-question" */ "../views/AddQuestion.vue"
          )
      },
      {
        path: "myquestion",
        name: "my-question",
        component: () =>
          import(
            /* webpackChunkName: "my-question" */ "../views/UserQuestion.vue"
          )
      }
    ]
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignIn.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
