<template>
    <header class="sticky-header">
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body w-100" data-bs-theme="dark">
                <div class="container-fluid">
                    <div class="d-flex align-items-center">
                        <img src="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png"
                            class="logo-icon" alt="logo icon" style="width: 40px; height: 40px" />
                        <h4 class="logo-text ms-2 text-white">TrueWear Shop</h4>
                    </div>
                    <!-- Search Bar -->
                    <div class="search-container flex-grow-1 mx-4">
                        <form @submit.prevent="handleSearch" class="d-flex">
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Tìm kiếm sản phẩm..." 
                                    v-model="searchQuery"
                                    @input="handleSearchInput"
                                    @focus="showSuggestions = true"
                                    @blur="hideSuggestions"
                                />
                                <button class="btn btn-outline-light" type="submit">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>
                        <!-- Search Suggestions Dropdown -->
                        <div v-if="showSuggestions && searchSuggestions.length > 0" class="search-suggestions">
                            <div 
                                v-for="(suggestion, index) in searchSuggestions" 
                                :key="suggestion.id || index"
                                class="suggestion-item"
                                @mousedown="selectSuggestion(suggestion)"
                            >
                                <div class="suggestion-image-wrapper">
                                    <img 
                                        :src="getImageUrl(suggestion.hinh_anh)" 
                                        :alt="suggestion.ten_san_pham"
                                        class="suggestion-image"
                                        @error="handleImageError($event)"
                                    />
                                </div>
                                <div class="suggestion-content">
                                    <div class="suggestion-name">{{ suggestion.ten_san_pham }}</div>
                                    <div class="suggestion-category text-muted small">{{ suggestion.ten_danh_muc || 'N/A' }}</div>
                                    <div class="suggestion-price text-danger fw-bold">
                                        {{ suggestion.gia_co_ban ? formatVND(suggestion.gia_co_ban) : 'Liên hệ' }}
                                    </div>
                                </div>
                                <div class="suggestion-icon">
                                    <i class="fa-solid fa-chevron-right text-muted"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <div class="d-flex align-items-center text-white me-4 phone-group">
                            <i class="fa-solid fa-phone-volume text-warning fa-2x me-2 call-icon"></i>
                            <div>
                                <span class="support-text">Hỗ trợ khách hàng</span><br />
                                <strong class="phone-number">0971 411 122</strong>
                            </div>
                        </div>
                        <template v-if="user.check_kh && user.name">
                            <div class="dropdown me-4 account-group">
                                <a class="nav-link text-white" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <strong class="account-text">Tài khoản</strong><br />
                                    <small class="account-name">{{ user.name || 'Khách hàng' }}</small>
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
            searchQuery: '',
            searchSuggestions: [],
            showSuggestions: false,
            searchTimeout: null,
            allProducts: [], // Cache tất cả sản phẩm để tìm kiếm
        };
    },
    mounted() {
        this.loadUserInfo();
        // Load giỏ hàng nếu đã đăng nhập
        if (this.user.check_kh) {
            this.loadDonHang();
        }
        // Load danh sách sản phẩm để tìm kiếm
        this.loadProductsForSearch();
        emitter.on('cap-nhat-gio-hang', this.loadDonHang);
        emitter.on('cap-nhat-user', this.loadUserInfo);
        // Listen for storage changes (when login happens in another tab/window)
        window.addEventListener('storage', this.handleStorageChange);
    },
    unmounted() {
        emitter.off('cap-nhat-gio-hang', this.loadDonHang);
        emitter.off('cap-nhat-user', this.loadUserInfo);
        window.removeEventListener('storage', this.handleStorageChange);
    },
    methods: {
        loadUserInfo() {
            const checkKh = localStorage.getItem("check_kh");
            const tokenKhachHang = localStorage.getItem("token_khach_hang");
            // Kiểm tra cả check_kh và token để đảm bảo đã đăng nhập
            const isLoggedIn = (checkKh === '1' || checkKh === 'true' || checkKh === true) && tokenKhachHang;
            
            this.user = {
                name: localStorage.getItem("ho_ten_khach_hang") || '',
                check_kh: isLoggedIn,
            };
        },
        handleStorageChange(e) {
            // Khi localStorage thay đổi (ví dụ từ trang đăng nhập)
            if (e.key === 'token_khach_hang' || e.key === 'ho_ten_khach_hang' || e.key === 'check_kh') {
                this.loadUserInfo();
                if (this.user.check_kh && localStorage.getItem("token_khach_hang")) {
                    this.loadDonHang();
                }
            }
        },
        loadDonHang() {
            const token = localStorage.getItem("token_khach_hang");
            if (!token) {
                this.list_don_hang = [];
                this.tong_so_luong = 0;
                return;
            }
            
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/get-data-don-hang', {}, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then((res) => {
                    if (res.data && res.data.status) {
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
                    // Chỉ hiển thị lỗi nếu không phải 401 (Unauthorized) hoặc 403 (Forbidden)
                    if (err.response && err.response.status !== 401 && err.response.status !== 403) {
                        this.$toast?.error(err.response?.data?.message || 'Đã xảy ra lỗi khi tải giỏ hàng');
                    }
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
        },
        async loadProductsForSearch() {
            // Không cần load tất cả sản phẩm nữa vì sẽ gọi API tìm kiếm
            // Giữ lại để tương thích nếu cần
        },
        handleSearchInput() {
            // Clear timeout nếu có
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            
            // Nếu không có query, ẩn suggestions
            if (!this.searchQuery || this.searchQuery.trim().length === 0) {
                this.searchSuggestions = [];
                this.showSuggestions = false;
                return;
            }
            
            // Debounce search suggestions - gọi API tìm kiếm
            this.searchTimeout = setTimeout(() => {
                this.searchProductsAPI(this.searchQuery);
            }, 300);
        },
        async searchProductsAPI(keyword) {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/search/products', {
                    params: {
                        keyword: keyword,
                        limit: 5 // Chỉ lấy 5 gợi ý
                    }
                });
                
                if (res.data && res.data.status && res.data.data) {
                    this.searchSuggestions = Array.isArray(res.data.data) ? res.data.data : [];
                    this.showSuggestions = this.searchSuggestions.length > 0;
                } else {
                    this.searchSuggestions = [];
                    this.showSuggestions = false;
                }
            } catch (error) {
                console.error('Lỗi tìm kiếm sản phẩm:', error);
                this.searchSuggestions = [];
                this.showSuggestions = false;
            }
        },
        handleSearch() {
            if (!this.searchQuery || this.searchQuery.trim().length === 0) {
                return;
            }
            
            // Chuyển đến trang sản phẩm với query parameter
            this.$router.push({
                path: '/san-pham',
                query: { tim_kiem: this.searchQuery.trim() }
            });
            
            // Reset search
            this.searchQuery = '';
            this.searchSuggestions = [];
            this.showSuggestions = false;
        },
        selectSuggestion(suggestion) {
            // Chuyển đến trang chi tiết sản phẩm hoặc trang sản phẩm với tìm kiếm
            this.$router.push({
                path: '/san-pham',
                query: { tim_kiem: suggestion.ten_san_pham }
            });
            
            // Reset search
            this.searchQuery = '';
            this.searchSuggestions = [];
            this.showSuggestions = false;
        },
        getImageUrl(url) {
            if (!url || url.trim() === '') {
                // Return SVG placeholder
                return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
            }
            return url;
        },
        handleImageError(event) {
            // Set placeholder khi lỗi
            event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
        },
        hideSuggestions() {
            // Delay để cho phép click vào suggestion
            setTimeout(() => {
                this.showSuggestions = false;
            }, 200);
        }
    }
};
</script>

<style scoped>
.sticky-header {
    position: sticky;
    top: 0;
    z-index: 1050;
    background-color: #212529;
}

.search-container {
    position: relative;
    max-width: 500px;
}

.search-container .input-group {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-container .form-control {
    border: none;
    border-radius: 25px 0 0 25px;
    padding: 8px 20px;
    background-color: rgba(255, 255, 255, 0.95);
}

.search-container .form-control:focus {
    background-color: #fff;
    box-shadow: none;
    border: none;
}

.search-container .btn {
    border-radius: 0 25px 25px 0;
    border: none;
    padding: 8px 20px;
    background-color: rgba(255, 255, 255, 0.95);
    color: #333;
}

.search-container .btn:hover {
    background-color: #fff;
    color: #007bff;
}

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-top: 5px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
}

.suggestion-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 12px;
}

.suggestion-item:hover {
    background-color: #f8f9fa;
    transform: translateX(2px);
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-image-wrapper {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.suggestion-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.suggestion-content {
    flex: 1;
    min-width: 0;
}

.suggestion-name {
    color: #333;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.suggestion-category {
    font-size: 12px;
    margin-bottom: 4px;
}

.suggestion-price {
    font-size: 14px;
}

.suggestion-icon {
    flex-shrink: 0;
    color: #999;
    font-size: 12px;
}

@media (max-width: 768px) {
    .search-container {
        max-width: 100%;
        margin: 10px 0;
    }
    
    .search-container .form-control {
        font-size: 14px;
        padding: 6px 15px;
    }
    
    .search-container .btn {
        padding: 6px 15px;
    }
}
</style>