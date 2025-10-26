<template>
    <div class="page-content">
        <div class="chat-wrapper">
            <div class="chat-sidebar">
                <!-- Giữ nguyên sidebar -->
                <div class="chat-sidebar-header">
                    <div class="d-flex align-items-center">
                        <div class="chat-user-online">
                            <img src="assets/images/avatars/avatar-1.png" width="45" height="45" class="rounded-circle"
                                alt="" />
                        </div>
                        <div class="flex-grow-1 ms-2">
                            <p class="mb-0">{{ user.name || 'Khách hàng' }}</p>
                        </div>
                        <div class="dropdown">
                            <div class="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret"
                                data-bs-toggle="dropdown">
                                <i class="bx bx-dots-horizontal-rounded"></i>
                            </div>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="javascript:;">Settings</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:;">Help &amp; Feedback</a>
                                <a class="dropdown-item" href="javascript:;">Enable Split View Mode</a>
                                <a class="dropdown-item" href="javascript:;">Keyboard Shortcuts</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:;">Sign Out</a>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3"></div>
                    <div class="input-group input-group-sm">
                        <span class="input-group-text bg-transparent"><i class="bx bx-search"></i></span>
                        <input type="text" class="form-control" placeholder="People, groups, &amp; messages" />
                        <span class="input-group-text bg-transparent"><i class="bx bx-dialpad"></i></span>
                    </div>
                    <div class="chat-tab-menu mt-3">
                        <ul class="nav nav-pills nav-justified" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="pill" href="javascript:;"
                                    aria-selected="true" role="tab">
                                    <div class="font-24"><i class="bx bx-conversation"></i></div>
                                    <div><small>Chats</small></div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;" aria-selected="false"
                                    tabindex="-1" role="tab">
                                    <div class="font-24"><i class="bx bx-phone"></i></div>
                                    <div><small>Calls</small></div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;" aria-selected="false"
                                    tabindex="-1" role="tab">
                                    <div class="font-24"><i class="bx bxs-contact"></i></div>
                                    <div><small>Contacts</small></div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;" aria-selected="false"
                                    tabindex="-1" role="tab">
                                    <div class="font-24"><i class="bx bx-bell"></i></div>
                                    <div><small>Notifications</small></div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="chat-sidebar-content">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-Chats">
                            <div class="p-3">
                                <div class="meeting-button d-flex justify-content-between">
                                    <div class="dropdown">
                                        <a href="#"
                                            class="btn btn-white btn-sm radius-30 dropdown-toggle dropdown-toggle-nocaret"
                                            data-bs-toggle="dropdown"><i class="bx bx-video me-2"></i>Meet Now
                                            <i class="bx bxs-chevron-down ms-2"></i></a>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="#">Host a meeting</a>
                                            <a class="dropdown-item" href="#">Join a meeting</a>
                                        </div>
                                    </div>
                                    <div class="dropdown">
                                        <a href="#"
                                            class="btn btn-white btn-sm radius-30 dropdown-toggle dropdown-toggle-nocaret"
                                            data-bs-toggle="dropdown" data-display="static"><i
                                                class="bx bxs-edit me-2"></i>New Chat
                                            <i class="bx bxs-chevron-down ms-2"></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a class="dropdown-item" href="#">New Group Chat</a>
                                            <a class="dropdown-item" href="#">New Moderated Group</a>
                                            <a class="dropdown-item" href="#">New Chat</a>
                                            <a class="dropdown-item" href="#">New Private Conversation</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown mt-3">
                                    <a href="#"
                                        class="text-uppercase text-secondary dropdown-toggle dropdown-toggle-nocaret"
                                        data-bs-toggle="dropdown">Recent Chats <i class="bx bxs-chevron-down"></i></a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">Recent Chats</a>
                                        <a class="dropdown-item" href="#">Hidden Chats</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Sort by Time</a>
                                        <a class="dropdown-item" href="#">Sort by Unread</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Show Favorites</a>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-list">
                                <div class="list-group list-group-flush">
                                    <a href="javascript:;" class="list-group-item">
                                        <div class="d-flex">
                                            <div class="chat-user-online">
                                                <img src="assets/images/avatars/avatar-2.png" width="42" height="42"
                                                    class="rounded-circle" alt="" />
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                                <h6 class="mb-0 chat-title">Louis Litt</h6>
                                                <p class="mb-0 chat-msg">You just got LITT up, Mike.</p>
                                            </div>
                                            <div class="chat-time">9:51 AM</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chat-header d-flex align-items-center">
                <div class="chat-toggle-btn"><i class="bx bx-menu-alt-left"></i></div>
                <div>
                    <h4 class="mb-1 font-weight-bold">Nhân Viên Hỗ Trợ</h4>
                    <div class="list-inline d-sm-flex mb-0 d-none">
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><i
                                class="bx bx-images me-1"></i>Gallery</a>
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary">|</a>
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><i
                                class="bx bx-search me-1"></i>Find</a>
                    </div>
                </div>
                <div class="chat-top-header-menu ms-auto">
                    <a href="javascript:;"><i class="bx bx-video"></i></a>
                    <a href="javascript:;"><i class="bx bx-phone"></i></a>
                </div>
            </div>

            <!-- Hiển thị tin nhắn -->
            <div class="chat-messages flex-grow-1 p-3"
                style="overflow-y: auto; max-height: 400px; background: #f9f9f9;">
                <div v-if="messages.length === 0" class="text-center text-muted">Chưa có tin nhắn nào</div>
                <div v-for="(msg, index) in messages" :key="index" class="mb-3">
                    <strong>{{ msg.sender_id == user.id ? 'Bạn' : 'Người gửi ' + msg.sender_id }}</strong>:
                    <span>{{ msg.message }}</span><br />
                    <small class="text-muted">{{ formatDate(msg.created_at) }}</small>
                </div>
            </div>



            <div class="chat-footer d-flex align-items-center">
                <div class="flex-grow-1 pe-2">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bx bx-smile"></i></span>
                        <input type="text" class="form-control" placeholder="Type a message" v-model="tin_nhan_moi"
                            @keyup.enter="sendMessage" />
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
            user: {
                id: localStorage.getItem("id_khach_hang") || null,
                name: localStorage.getItem("ho_ten_khach_hang") || "Khách hàng",
            },
            messages: [],
            tin_nhan_moi: "",
        };
    },
    mounted() {
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

            const sender_id = localStorage.getItem("id_khach_hang");
            const sender_type = "user";
            axios
                .post(
                    "http://127.0.0.1:8000/api/chat-box/send-message",
                    {
                        message: this.tin_nhan_moi,
                        sender_id: sender_id,
                        sender_type: sender_type,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                        },
                    }
                )
                .then((res) => {
                    this.messages.push(res.data.data);
                    this.tin_nhan_moi = "";
                    this.scrollToBottom();
                })
                .catch((err) => {
                    const errors = err.response?.data?.errors || {};
                    Object.values(errors).forEach((msgs) => {
                        this.$toast.error(msgs[0]);
                    });
                });
        },
        loadTinNhan() {
            axios
                .get("http://127.0.0.1:8000/api/chat-box/get-messages", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                    },
                })
                .then((res) => {
                    this.messages = res.data.data;
                    this.scrollToBottom();
                })
                .catch((err) => {
                    const errors = err.response?.data?.errors || {};
                    Object.values(errors).forEach((msgs) => {
                        this.$toast.error(msgs[0]);
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
                if (container) container.scrollTop = container.scrollHeight;
            });
        },
    },
};
</script>

<style scoped>
.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    background: #f9f9f9;
}
</style>
