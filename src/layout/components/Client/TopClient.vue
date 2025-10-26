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
                                        <a class="dropdown-item" href="/lich-su-mua-hang"><i class="fa-solid fa-list-check"></i> Lịch sử đơn hàng</a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a @click="LogOut()" class="dropdown-item" href="#"><i
                                                class="bx bx-log-out-circle me-2"></i>Đăng xuất</a>
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

                        <router-link to="/don-hang" class="text-decoration-none me-2">
                            <div class="dropdown me-4 account-group">
                                <a class="nav-link text-white" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <button class="btn btn-light border border-danger position-relative cart-btn">
                                        <i class="fa-solid fa-cart-shopping text-danger cart-icon"></i>
                                        <span class="cart-text ms-1">Giỏ hàng</span>
                                        <span
                                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                            {{ tong_so_luong }}
                                        </span>
                                    </button>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" style="width: 300%;">
                                    <li v-if="list_don_hang.length === 0">
                                        <a class="dropdown-item text-center">Giỏ hàng trống</a>
                                    </li>
                                    <li v-else v-for="(value, index) in list_don_hang" :key="index">
                                        <router-link to="/don-hang" class="dropdown-item">
                                            <div class="d-flex align-items-center card-body">
                                                <img :src="value.image" alt="Sản phẩm"
                                                    style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                                                <div>
                                                    <div><b>{{ value.ten_san_pham }}</b></div>
                                                    <div class="text-secondary small">{{ value.mau_sac }} / {{
                                                        value.kich_thuoc }}</div>
                                                    <div><span class="text-danger fw-bold">{{ formatVND(value.don_gia)
                                                    }}</span> x {{
                                                                value.so_luong }}</div>
                                                </div>
                                            </div>
                                        </router-link>
                                    </li>
                                    <li v-if="list_don_hang.length > 0">
                                        <hr>
                                        <a class="dropdown-item" href="/don-hang">
                                            <router-link to="/don-hang">
                                                <h6>Tổng tiền tạm tính: <b class="text-danger">{{ formatVND(thanh_tien)
                                                        }}</b></h6>
                                                <button class="btn btn-danger w-100 mt-2">Tiến hành
                                                    thanh toán</button>
                                            </router-link>
                                        </a>
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
import emitter from "@/eventBus";
export default {
    data() {
        return {
            user: {},
            list_don_hang: [],
            tong_so_luong: 0,
            thanh_tien: 0,
        };
    },
    mounted() {
        this.user = {
            name: localStorage.getItem("ho_ten_khach_hang"),
            check_kh: localStorage.getItem("check_kh"),
        };
        if (this.user.check_kh && localStorage.getItem("token_khach_hang")) {
            this.loadDonHang();
        }
        emitter.on('cap-nhat-gio-hang', this.loadDonHang);
    },
    unmounted() {
        emitter.off('cap-nhat-gio-hang', this.loadDonHang);
    },
    methods: {
        loadDonHang() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/get-data-don-hang', {}, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_don_hang = res.data.data;
                        this.tong_so_luong = res.data.tong_so_luong;
                        this.thanh_tien = res.data.tong_tien;
                    } else {
                        this.list_don_hang = [];
                        this.tong_so_luong = 0;
                        this.thanh_tien = 0;
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    this.list_don_hang = [];
                    this.tong_so_luong = 0;
                    this.thanh_tien = 0;
                    this.$toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi tải giỏ hàng');
                });
        },
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
                    this.user = {};
                    this.list_don_hang = [];
                    this.tong_so_luong = 0;
                    this.thanh_tien = 0;
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                    this.$router.push('/khach-hang/dang-nhap').then(() => {
                        location.reload();
                    });
                })
                .catch((err) => {
                    this.$toast.error('Đã xảy ra lỗi khi đăng xuất');
                    this.$router.push('/khach-hang/dang-nhap');
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(number);
        }
    }
};
</script>

<style></style>