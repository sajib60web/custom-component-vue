/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue").default;

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
    "example-component",
    require("./components/ExampleComponent.vue").default
);
Vue.component(
    "customer-component",
    require("./components/CustomerComponent.vue").default
);

const app = new Vue({
    el: "#app",
});
