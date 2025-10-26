<template>
  <div class="page-content">
    <div class="chat-wrapper">
      <div class="chat-sidebar">
        <!-- giữ nguyên toàn bộ sidebar như bạn đã có -->
        <!-- ... (bỏ để ngắn gọn) -->
      </div>

      <div class="chat-header d-flex align-items-center">
        <div class="chat-toggle-btn"><i class="bx bx-menu-alt-left"></i></div>
        <div>
          <h4 class="mb-1 font-weight-bold">Harvey Inspector</h4>
          <div class="list-inline d-sm-flex mb-0 d-none">
            <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"
              ><i class="bx bx-images me-1"></i>Gallery</a
            >
            <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary">|</a>
            <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"
              ><i class="bx bx-search me-1"></i>Find</a
            >
          </div>
        </div>
        <div class="chat-top-header-menu ms-auto">
          <a href="javascript:;"><i class="bx bx-video"></i></a>
          <a href="javascript:;"><i class="bx bx-phone"></i></a>
        </div>
      </div>

      <!-- Thêm phần hiển thị messages -->
      <div
        class="chat-messages flex-grow-1 p-3"
        style="overflow-y: auto; max-height: 400px; background: #f9f9f9;"
      >
        <div v-if="messages.length === 0" class="text-center text-muted">Chưa có tin nhắn nào</div>
        <div v-for="(msg, index) in messages" :key="index" class="mb-3">
          <strong>{{ msg.user.name }}</strong>:
          <span>{{ msg.message }}</span><br />
          <small class="text-muted">{{ formatDate(msg.created_at) }}</small>
        </div>
      </div>

      <div class="chat-footer d-flex align-items-center">
        <div class="flex-grow-1 pe-2">
          <div class="input-group">
            <span class="input-group-text"><i class="bx bx-smile"></i></span>
            <input
              type="text"
              class="form-control"
              placeholder="Type a message"
              v-model="tin_nhan_moi"
              @keyup.enter="sendMessage"
            />
          </div>
        </div>
        <div class="chat-footer-menu">
          <a href="javascript:;" @click.prevent="sendMessage"><i class="bx bx-send"></i></a>
          <a href="javascript:;"><i class="bx bx-file"></i></a>
          <a href="javascript:;"><i class="bx bxs-contact"></i></a>
          <a href="javascript:;"><i class="bx bx-microphone"></i></a>
          <a href="javascript:;"><i class="bx bx-dots-horizontal-rounded"></i></a>
        </div>
      </div>

      <!--start chat overlay-->
      <div class="overlay chat-toggle-btn-mobile"></div>
      <!--end chat overlay-->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        user: {},
      messages: [],
      tin_nhan_moi: "",
    };
  },
  mounted() {
    this.user = {
        name: localStorage.getItem("ho_ten_nhan_vien") || "Nhân viên",
        id: localStorage.getItem("id_nhan_vien") || 0,
    }
    this.loadTinNhan();

    if (window.Echo) {
      Echo.channel("chat-box").listen(".message", (e) => {
        this.messages.push(e.message);
        this.$toast.success("Tin nhắn mới từ " + e.message.user.name);
        this.tin_nhan_moi = "";
        this.scrollToBottom();
      });
    }
  },
  methods: {
    sendMessage() {
      if (this.tin_nhan_moi.trim() === "") {
        this.$toast.error("Tin nhắn không được để trống");
        return;
      }

      axios
        .post(
          "http://127.0.0.1:8000/api/chat-box/send-message",
          { message: this.tin_nhan_moi },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token_nhan_vien"),
            },
          }
        )
        .then((res) => {
          this.messages.push(res.data.data);
          this.tin_nhan_moi = "";
          this.scrollToBottom();
        })
        .catch((err) => {
          const list = Object.values(err.response?.data.errors || {});
          list.forEach((v) => {
            this.$toast.error(v[0]);
          });
        });
    },

    loadTinNhan() {
      axios
        .get("http://127.0.0.1:8000/api/chat-box/get-messages", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_nhan_vien"),
          },
        })
        .then((res) => {
          this.messages = res.data.data;
          this.scrollToBottom();
        })
        .catch((err) => {
          const list = Object.values(err.response?.data.errors || {});
          list.forEach((v) => {
            this.$toast.error(v[0]);
          });
        });
    },

    formatDate(datetime) {
      if (!datetime) return "";
      return new Date(datetime).toLocaleString();
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".chat-messages");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
.chat-messages {
  /* Cho khung chat messages kéo dài, scroll được */
  flex-grow: 1;
  overflow-y: auto;
  background: #f9f9f9;
}
</style>
