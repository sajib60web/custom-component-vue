/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue").default;
import router from "./router";

import VueProgressBar from "vue-progressbar";
const VueProgressBarOptions = {
    color: "#50d38a",
    failedColor: "#874b4b",
    thickness: "5px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};
Vue.use(VueProgressBar, VueProgressBarOptions);
Vue.component(
    "pagination",
    require("./components/partials/PaginationComponent.vue").default
);

// Import Snotify Plugin
import Snotify, { SnotifyPosition } from "vue-snotify";
const Snotifyoptions = {
    toast: {
        position: SnotifyPosition.rightTop,
    },
};
Vue.use(Snotify, Snotifyoptions);

const app = new Vue({
    el: "#app",
    router,
});
