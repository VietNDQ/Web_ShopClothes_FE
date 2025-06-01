import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client_index.vue'
import Blank from './layout//wrapper/blank_index.vue'
import Toaster from "@meforma/vue-toaster";
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)

app.use(router)
app.use(Toaster, {
    position: "top-right",
  });
app.use(vue3GoogleLogin, {
  clientId: '775517963831-jtjpd9p1tsctq15k4h0bdqlemosmhh6e.apps.googleusercontent.com'
})
app.component("default-layout", Default);
app.component("client-layout",Client)
app.component("blank_layout",Blank)
app.mount("#app")

