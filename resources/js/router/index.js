import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "home",
        component: require("../components/Dashboard.vue").default,
    },
    {
        path: "/customers",
        name: "customers",
        component: require("../components/customers/Index.vue").default,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
