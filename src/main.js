import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client_index.vue'
import Blank from './layout//wrapper/blank_index.vue'
import Toaster from "@meforma/vue-toaster";
const app = createApp(App)

app.use(router)
app.use(Toaster, {
    // One of the options
    position: "top-right",
  });
app.component("default-layout", Default);
app.component("client-layout",Client)
app.component("blank_layout",Blank)
app.mount("#app")

