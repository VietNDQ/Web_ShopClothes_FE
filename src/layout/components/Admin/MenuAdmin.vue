<template>
    <div class="nav-container primary-menu">
        <div class="container">
            <div class="mobile-topbar-header">
                <div>
                    <h4 class="logo-text">Rukada</h4>
                </div>
                <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i></div>
            </div>
            <nav class="navbar navbar-expand-xl">
                <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">

                    <!-- Dịch vụ sản phẩm -->
                    <li v-if="coQuyen(31) || coQuyen(15) || coQuyen(39) || coQuyen(45) || coQuyen(50)"
                        class="nav-item dropdown">
                        <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                            data-bs-toggle="dropdown">
                            <div class="parent-icon"><i class="fa-brands fa-usps"></i></div>
                            <div class="menu-title">Dịch Vụ Sản Phẩm</div>
                        </a>
                        <ul class="dropdown-menu" style="width: 120%;">
                            <!-- Thương Hiệu - Component đã bị xóa, tạm thời ẩn -->
                            <!-- <li v-if="coQuyen(31)" class="nav-item">
                                <router-link to="/admin/thuong-hieu" class="nav-link">
                                    <div class="parent-icon"><i class="fa-regular fa-registered"></i></div>
                                    <div class="menu-title">Thương Hiệu</div>
                                </router-link>
                            </li> -->
                            <li v-if="coQuyen(15)" class="nav-item">
                                <router-link to="/admin/danh-muc-san-pham" class="nav-link">
                                    <div class="parent-icon"><i class="fa-solid fa-layer-group"></i></div>
                                    <div class="menu-title">Danh Mục</div>
                                </router-link>
                            </li>
                          
                            <li v-if="coQuyen(39)" class="nav-item">
                                <router-link to="/admin/dang-san-pham" class="nav-link">
                                    <div class="parent-icon"><i class="fa-solid fa-box"></i></div>
                                    <div class="menu-title">Quản Lý Sản Phẩm</div>
                                </router-link>
                            </li>
                           
                        </ul>
                    </li>

                    <li v-if="coQuyen(10)" class="nav-item">
                        <router-link to="/admin/khach-hang" class="nav-link">
                            <div class="parent-icon"><i class="fa-regular fa-address-card"></i></div>
                            <div class="menu-title">Khách Hàng</div>
                        </router-link>
                    </li>

                    <li v-if="coQuyen(1)" class="nav-item">
                        <router-link to="/admin/nhan-vien" class="nav-link">
                            <div class="parent-icon"><i class="fa-solid fa-users-viewfinder"></i></div>
                            <div class="menu-title">Nhân Viên</div>
                        </router-link>
                    </li>

                    <li v-if="coQuyen(7)" class="nav-item">
                        <router-link to="/admin/quan-ly-don-hang" class="nav-link">
                            <div class="parent-icon"><i class="fa-solid fa-list-check"></i></div>
                            <div class="menu-title">Quản Lý Đơn Hàng</div>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/admin/thong-ke" class="nav-link">
                            <div class="parent-icon"><i class="fa-solid fa-chart-line"></i></div>
                            <div class="menu-title">Thống Kê</div>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/admin/voucher" class="nav-link">
                            <div class="parent-icon"><i class="fa-solid fa-ticket"></i></div>
                            <div class="menu-title">Voucher</div>
                        </router-link>
                    </li>

                    <li v-if="coQuyen(28)" class="nav-item">
                        <router-link to="/admin/phan-quyen" class="nav-link">
                            <div class="parent-icon"><i class="fa-solid fa-users-gear"></i></div>
                            <div class="menu-title">Phân Quyền</div>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/admin/profile" class="nav-link">
                            <div class="parent-icon"><i class="fa-solid fa-user-circle"></i></div>
                            <div class="menu-title">Thông Tin Cá Nhân</div>
                        </router-link>
                    </li>

                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            list_chuc_nang_cap: []
        };
    },
    mounted() {
        const token = localStorage.getItem("token_nhan_vien");
        if (token) {
            this.layDanhSachQuyen();
        }
    },
    methods: {
        layDanhSachQuyen() {
            const token = localStorage.getItem("token_nhan_vien");
            if (!token) {
                this.list_chuc_nang_cap = [];
                return;
            }
            
            axios.post("http://127.0.0.1:8000/api/admin/phan-quyen/chuc-nang-nhan-vien", {}, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                if (res.data && res.data.data) {
                    this.list_chuc_nang_cap = res.data.data;
                } else {
                    this.list_chuc_nang_cap = [];
                }
            }).catch((error) => {
                // Chỉ log lỗi nếu không phải 401 (Unauthorized)
                if (error.response && error.response.status !== 401) {
                    console.error("Lỗi khi lấy danh sách quyền:", error);
                }
                this.list_chuc_nang_cap = [];
            });
        },
        coQuyen(idChucNang) {
            return this.list_chuc_nang_cap.includes(idChucNang);
        }
    }
};
</script>
<style></style>
