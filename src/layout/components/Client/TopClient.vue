<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body w-100" data-bs-theme="dark">
                <div class="container-fluid">
                    <div class="d-flex align-items-center">
                        <img src="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png"
                            class="logo-icon" alt="logo icon" style="width: 40px; height: 40px" />
                        <h4 class="logo-text ms-2 text-white">TrueWear Shop</h4>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <div class="d-flex align-items-center text-white me-4 phone-group">
                            <i class="fa-solid fa-phone-volume text-warning fa-2x me-2 call-icon"></i>
                            <div>
                                <span class="support-text">Hỗ trợ khách hàng</span><br />
                                <strong class="phone-number">0971 411 122</strong>
                            </div>
                        </div>
                        <template v-if="user.check_kh">
                            <div class="dropdown me-4 account-group">
                                <a class="nav-link text-white" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <strong class="account-text">Tài khoản</strong><br />
                                    <small class="account-name">{{ user.name }}</small>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a class="dropdown-item" href="/khach-hang/profile"><i
                                                class="bx bx-user me-2"></i>Profile</a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a @click="LogOut()" class="dropdown-item" href="#"><i
                                                class="bx bx-log-out-circle me-2"></i>Đăng
                                            xuất</a>
                                    </li>
                                </ul>
                            </div>
                        </template>
                        <template v-else>
                            <div class="d-flex align-items-center me-4 account-group">
                                <i class="fa-solid fa-user text-danger fa-2x me-2 user-icon"></i>
                                <div>
                                    <router-link to="/khach-hang/dang-nhap">
                                        <strong class="account-text text-white">Tài khoản</strong><br />
                                    </router-link>
                                    <router-link to="/khach-hang/dang-nhap"
                                        class="account-link text-white text-decoration-none">
                                        Đăng nhập
                                    </router-link>
                                </div>
                            </div>
                        </template>

                        <router-link to="/checkouts" class="text-decoration-none me-2">
                            <div class="dropdown me-4 account-group">
                                <a class="nav-link text-white" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <button class="btn btn-light border border-danger position-relative cart-btn">
                                        <i class="fa-solid fa-cart-shopping text-danger cart-icon"></i>
                                        <span class="cart-text ms-1">Giỏ hàng</span>
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                            0
                                        </span>
                                    </button>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" style="width: 300%;">
                                    <li>
                                        <router-link to="/checkouts">
                                            <a class="dropdown-item" href="#">
                                                <div class="d-flex align-items-center card-body">
                                                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"
                                                        alt="Sản phẩm"
                                                        style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                                                    <div>
                                                        <div><b>Nguyễn Quốc Việt NÈ BẠN</b></div>
                                                        <div class="text-secondary small">Đen / Size</div>
                                                        <div><span class="text-danger fw-bold">99.000đ</span> x 1</div>
                                                    </div>
                                                </div>
                                            </a>
                                            <a class="dropdown-item" href="#">
                                                <div class="d-flex align-items-center card-body">
                                                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"
                                                        alt="Sản phẩm"
                                                        style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                                                    <div>
                                                        <div><b>Nguyễn Quốc Việt NÈ BẠN</b></div>
                                                        <div class="text-secondary small">Đen / Size</div>
                                                        <div><span class="text-danger fw-bold">99.000đ</span> x 1</div>
                                                    </div>
                                                </div>
                                            </a>
                                        </router-link>
                                    <li>
                                        <hr>
                                        <a class="dropdown-item" href="#">
                                            <h6>Tổng tiền tạm tính: <b class="text-danger">99.000đ</b></h6>
                                            <button class="btn btn-danger w-100 mt-2">Tiến hành thanh toán</button>
                                        </a>
                                    </li>
                                    </li>
                                </ul>
                            </div>
                        </router-link>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {},
        };
    },
    mounted() {
        this.user = {
            name: localStorage.getItem("ho_ten_khach_hang"),
            check_kh: localStorage.getItem("check_kh"),
        };
    },
    methods: {
        LogOut() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/logout', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    localStorage.removeItem("token_khach_hang");
                    localStorage.removeItem("check_kh");
                    localStorage.removeItem("ho_ten_khach_hang");
                    if (res.data.status) {
                        this.$toast.success(res.data.message);

                    } else {
                        this.$toast.error(res.data.message);
                    }
                    this.$router.push('/khach-hang/dang-nhap').then(() => {
                        location.reload(); // Tải lại trang để dữ liệu từ localStorage cập nhật vào header
                    });
                })
                .catch((res) => {
                    this.$toast.error('Đã xảy ra lỗi khi đăng xuất');
                    this.$router.push('/khach-hang/dang-nhap');
                });
        }
    },
};
</script>

<style></style>
