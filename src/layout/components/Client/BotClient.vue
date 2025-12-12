<template>
	<footer class="bg-dark text-white py-5" data-bs-theme="dark">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<h4 class="text-white mb-2">Về chúng tôi</h4>
					<img src="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png"
						style="width: 15%;" class="mb-2" />
					<p>Thương hiệu thời trang dành cho cặp đôi hàng đầu Việt Nam</p>
					<p>
						<i class="me-1 fa-solid fa-location-dot"></i> Địa chỉ: Số 171 Cù Chính
						Lan, Phường An Khuê, Quận Thanh Khê, Tp. Đằ Nẵng
					</p>
					<p><i class="me-1 fa-solid fa-mobile"></i> Số điện thoại: 0990 009 990</p>
					<p><i class="me-1 fa-solid fa-envelope"></i> Email: nqv@hotmail.vn</p>
					<div>
						<a href="#" class="text-white me-3"><i class="fa-brands fa-square-facebook fa-2x"></i></a>
						<a href="#" class="text-white me-3"><i class="fa-brands fa-square-x-twitter fa-2x"></i></a>
						<a href="#" class="text-white"><i class="fa-brands fa-google fa-2x"></i></a>
					</div>
				</div>
				<div class="col-md-2">
					<h4 class="text-white mb-3">Chính sách</h4>
					<ul class="list-unstyled">
						<li class="mb-1"><a href="#" class="text-white">Tìm kiếm</a></li>
						<li class="mb-1"><a href="#" class="text-white">Giới thiệu</a></li>
						<li class="mb-1"><a href="#" class="text-white">Cơ hội việc làm</a></li>
					</ul>
				</div>
				<div class="col-md-3">
					<h4 class="text-white mb-3">Hỗ trợ khách hàng</h4>
					<ul class="list-unstyled">
						<li class="mb-1"><a href="#" class="text-white">Hướng dẫn mua hàng</a></li>
						<li class="mb-1"><a href="#" class="text-white">Hướng dẫn sử dụng</a></li>
						<li class="mb-1"><a href="#" class="text-white">Chi tiết kích cỡ</a></li>
						<li class="mb-1"><a href="#" class="text-white">Chính sách đổi trả & bảo hành</a></li>
						<li class="mb-1"><a href="#" class="text-white">Quy trình giao nhận và thanh toán</a></li>
						<li class="mb-1"><a href="#" class="text-white">Hệ Thống Cửa Hàng</a></li>
					</ul>
				</div>

				<div class="col-md-3">
					<h4 class="text-white mb-3">Phương thức thanh toán</h4>
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s"
						class="img-fluid me-2" style="width: 20%; height: 20%;" alt="" />
					<img src="https://weupgroup.vn/wp-content/uploads/2022/07/ship-cod-la-gi-1.jpg"
						class="img-fluid me-2" style="width: 20%; height: 20%;" />
					<img src="https://timo.vn/wp-content/uploads/thanh-toan-bang-internet-banking-2.jpg"
						class="img-fluid me-2" style="width: 20%; height: 20%;" />
					<img src="https://news.appotapay.com/wp-content/uploads/2022/04/huong-dan-tich-hop-thanh-toan-visa-master-vao-website-don-gian-1.jpg"
						class="img-fluid me-2" style="width: 25%; height: 20%;" />
				</div>
			</div>
			<div class="text-start mt-3">
				<p class="mb-0">&copy; Bản quyền thuộc về VN | Cung cấp bởi VN</p>
			</div>
		</div>
	</footer>

	<!-- Nút bật/tắt chat -->
	<!-- <button type="button" class="btn btn-primary rounded-circle d-flex justify-content-center align-items-center shadow"
		@click="showChat = !showChat" :title="showChat ? 'Đóng chat' : 'Mở chat'"
		style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; font-size: 28px; z-index: 1050;">
		<i :class="showChat ? 'fas fa-times' : 'fas fa-comments'"></i>
	</button> -->

	<!-- Popup chat -->
	<!-- <div v-if="showChat" class="card shadow" style="
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 320px;
      max-height: 450px;
      display: flex;
      flex-direction: column;
      z-index: 1060;
      border-radius: 12px;
    ">
		<div class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
			style="border-radius: 12px 12px 0 0;">
			<strong>Hỗ trợ trực tuyến</strong>
			<button type="button" class="btn btn-sm btn-light" @click="showChat = false" aria-label="Đóng"
				style="width: 32px; height: 32px; padding: 0; font-size: 18px; border-radius: 6px;">
				<i class="fas fa-times"></i>
			</button>
		</div>

		<div class="card-body flex-grow-1 d-flex flex-column"
			style="background: #f7f9fc; font-size: 14px; color: #444; padding: 0.75rem;">
			<p class="mb-2">Xin chào! Tôi có thể giúp gì cho bạn?</p>

			<div class="chat-messages flex-grow-1 overflow-auto" ref="chatMessages"
				style="max-height: 300px; padding-right: 0.5rem;">
				<div v-if="messages.length === 0" class="text-muted text-center">Chưa có tin nhắn nào</div>
				<div v-for="(msg, idx) in messages" :key="msg.id || idx" class="mb-2">
					<strong>{{ msg.sender_id == user.id ? 'Bạn' : 'Người khác' }}</strong>: {{ msg.message }}
					<br />
					<small class="text-muted">{{ formatDate(msg.created_at) }}</small>
				</div>
			</div>
		</div>

		<div class="card-footer p-2" style="border-radius: 0 0 12px 12px;">
			<div class="input-group">
				<input v-model="tin_nhan_moi" type="text" class="form-control" placeholder="Nhập tin nhắn..."
					@keyup.enter="sendMessage" style="border-radius: 20px 0 0 20px; border-right: none;" />
				<button class="btn btn-primary" @click="sendMessage" type="button"
					style="border-radius: 0 20px 20px 0;">
					<i class="fas fa-paper-plane"></i>
				</button>
			</div>
		</div>
	</div> -->
</template>

<script>
import axios from "axios";

export default {
	// data() {
	// 	return {
	// 		showChat: false,
	// 		user: {
	// 			id: localStorage.getItem("id_khach_hang") || null,
	// 			name: localStorage.getItem("ho_ten_khach_hang") || "Khách hàng",
	// 		},
	// 		messages: [],
	// 		tin_nhan_moi: "",
	// 	};
	// },
	// mounted() {
	// 	this.loadTinNhan();

	// 	if (window.Echo) {
	// 		Echo.channel("chat-box").listen(".message", (e) => {
	// 			if (e.message) {
	// 				this.messages.push(e.message);
	// 				this.$toast.success("Tin nhắn mới từ " + (e.message.user?.name || "Người khác"));
	// 				this.scrollToBottom();
	// 			}
	// 		});
	// 	}
	// },
	// methods: {
	// 	sendMessage() {
	// 		if (!this.tin_nhan_moi.trim()) {
	// 			this.$toast.error("Tin nhắn không được để trống");
	// 			return;
	// 		}

	// 		axios
	// 			.post('http://127.0.0.1:8000/api/chat-box/send-message',
	// 				{ message: this.tin_nhan_moi },
	// 				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang') } }
	// 			)
	// 			.then((res) => {
	// 				// Nếu backend trả về dữ liệu tin nhắn dưới data
	// 				const newMsg = res.data.data || res.data;
	// 				// Thêm user info nếu backend không trả kèm user
	// 				if (!newMsg.user) {
	// 					newMsg.user = { name: this.user.name };
	// 				}
	// 				this.messages.push(newMsg);
	// 				this.tin_nhan_moi = "";
	// 				this.scrollToBottom();
	// 			})
	// 			.catch((err) => {
	// 				const errors = err.response?.data?.errors || {};
	// 				Object.values(errors).forEach((msgs) => {
	// 					this.$toast.error(msgs[0]);
	// 				});
	// 			});
	// 	},
	// 	loadTinNhan() {
	// 		axios
	// 			.get("http://127.0.0.1:8000/api/chat-box/get-messages", {
	// 				headers: {
	// 					Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
	// 				},
	// 			})
	// 			.then((res) => {
	// 				this.messages = res.data.data;
	// 				this.scrollToBottom();
	// 			})
	// 			.catch((err) => {
	// 				const errors = err.response?.data?.errors || {};
	// 				Object.values(errors).forEach((msgs) => {
	// 					this.$toast.error(msgs[0]);
	// 				});
	// 			});
	// 	},
	// 	formatDate(datetime) {
	// 		if (!datetime) return "";
	// 		return new Date(datetime).toLocaleString();
	// 	},
	// 	scrollToBottom() {
	// 		this.$nextTick(() => {
	// 			const container = this.$refs.chatMessages;
	// 			if (container) container.scrollTop = container.scrollHeight;
	// 		});
	// 	},
	// },
};
</script>

<style scoped>
.chat-messages::-webkit-scrollbar {
	width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
	background-color: rgba(0, 0, 0, 0.15);
	border-radius: 3px;
}
</style>
