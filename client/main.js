'use strict';

import Vue from 'vue';
import App from './app.vue';

Vue.config.debug = process.env.NODE_ENV === 'development';

Vue.use(require('vue-resource'));

/* eslint-disable no-new */
var app = new Vue({
	el: 'body',
	components: {App}
});

window.test = function () {
	app.$refs.app.$refs.map.mapLoadCallback();
};
