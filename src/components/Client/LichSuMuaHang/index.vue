<template>
    <div class="order-history-page">
        <!-- Header Section -->
        <div class="page-header">
            <div class="container">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <h1 class="page-title">
                            <i class="fa-solid fa-clock-rotate-left me-2"></i>
                            Lịch Sử Mua Hàng
                        </h1>
                        <p class="page-subtitle text-muted">Theo dõi tất cả đơn hàng của bạn</p>
                    </div>
                    <div class="order-count-badge">
                        <span class="badge-count">{{ totalOrders }}</span>
                        <span class="badge-label">Đơn hàng</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="container">
            <div class="tabs-wrapper">
                <ul class="nav nav-pills custom-tabs" role="tablist">
                    <li v-for="(label, key) in tabs" :key="key" class="nav-item" role="presentation">
                        <button 
                            class="nav-link" 
                            :class="{ active: activeTab === key }" 
                            @click="activeTab = key"
                            type="button"
                        >
                            <i :class="getTabIcon(key)" class="me-2"></i>
                            {{ label }}
                            <span class="badge-count-tab">{{ filteredProducts[key].length }}</span>
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="loading-container">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tải...</span>
                </div>
                <p class="mt-3 text-muted">Đang tải lịch sử mua hàng...</p>
            </div>

            <!-- Tab Content -->
            <div v-else class="tab-content-wrapper">
                <div v-for="(label, key) in tabs" :key="key" 
                     class="tab-content-item"
                     :class="{ active: activeTab === key }">
                    <!-- Empty State -->
                    <div v-if="filteredProducts[key].length === 0" class="empty-state">
                        <div class="empty-icon">
                            <i class="fa-solid fa-box-open"></i>
                        </div>
                        <h3 class="empty-title">Chưa có đơn hàng</h3>
                        <p class="empty-text">Bạn chưa có đơn hàng nào trong mục này.</p>
                        <router-link to="/san-pham" class="btn btn-primary btn-lg mt-3">
                            <i class="fa-solid fa-shopping-bag me-2"></i>
                            Mua sắm ngay
                        </router-link>
                    </div>

                    <!-- Orders List -->
                    <div v-else class="orders-grid">
                        <div v-for="product in filteredProducts[key]" :key="product.id" class="order-card">
                            <div class="order-card-header">
                                <div class="order-info">
                                    <div class="order-id">
                                        <i class="fa-solid fa-hashtag me-2"></i>
                                        Đơn hàng #{{ product.ma_don_hang || product.id }}
                                    </div>
                                    <div class="order-date">
                                        <i class="fa-solid fa-calendar-days me-2"></i>
                                        {{ formatDate(product.created_at) }}
                                    </div>
                                    <div v-if="product.ten_nguoi_nhan" class="order-recipient">
                                        <i class="fa-solid fa-user me-2"></i>
                                        Người nhận: <strong>{{ product.ten_nguoi_nhan }}</strong>
                                    </div>
                                    <div v-if="product.so_dien_thoai" class="order-phone">
                                        <i class="fa-solid fa-phone me-2"></i>
                                        SĐT: <strong>{{ product.so_dien_thoai }}</strong>
                                    </div>
                                </div>
                                <div class="order-status-badge" :class="getStatusBadgeClass(product.trang_thai)">
                                    <i :class="getStatusIcon(product.trang_thai)" class="me-1"></i>
                                    {{ getStatusLabel(product.trang_thai) }}
                                </div>
                            </div>

                            <div class="order-card-body">
                                <div class="product-info">
                                    <div class="product-image-wrapper">
                                        <img 
                                            :src="getImageUrl(product.image)" 
                                            :alt="product.ten_san_pham"
                                            class="product-image"
                                            @error="handleImageError"
                                        />
                                    </div>
                                    <div class="product-details">
                                        <h5 class="product-name">{{ product.ten_san_pham }}</h5>
                                        <div class="product-variant">
                                            <span class="variant-item">
                                                <i class="fa-solid fa-ruler me-1"></i>
                                                Kích thước: <strong>{{ product.kich_thuoc || 'N/A' }}</strong>
                                            </span>
                                            <span class="variant-item">
                                                <i class="fa-solid fa-palette me-1"></i>
                                                Màu sắc: <strong>{{ product.mau_sac || 'N/A' }}</strong>
                                            </span>
                                        </div>
                                        <div class="product-quantity">
                                            <i class="fa-solid fa-cube me-2"></i>
                                            Số lượng: <strong>{{ product.so_luong }}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div class="order-summary">
                                    <div class="summary-item">
                                        <span class="summary-label">Đơn giá:</span>
                                        <span class="summary-value">{{ formatVND(product.don_gia) }}</span>
                                    </div>
                                    <div v-if="product.ma_voucher" class="summary-item voucher-info" style="background-color: #e7f5e7; padding: 8px; border-radius: 4px; margin: 5px 0;">
                                        <div style="display: flex; align-items: center; margin-bottom: 5px;">
                                            <i class="fa-solid fa-ticket-alt me-2" style="color: #28a745;"></i>
                                            <span class="summary-label" style="font-weight: 600;">Voucher:</span>
                                            <span class="summary-value" style="color: #28a745; font-weight: 600; margin-left: 5px;">{{ product.ma_voucher }}</span>
                                        </div>
                                        <div v-if="product.tong_tien_goc && product.tong_tien_goc > product.tong_tien" style="font-size: 0.85rem;">
                                            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                                                <span style="color: #6c757d;">Tổng tiền gốc:</span>
                                                <span style="color: #6c757d; text-decoration: line-through;">{{ formatVND(product.tong_tien_goc) }}</span>
                                            </div>
                                            <div v-if="product.tien_giam_gia" style="display: flex; justify-content: space-between;">
                                                <span style="color: #28a745;">Giảm giá:</span>
                                                <span style="color: #28a745; font-weight: 600;">-{{ formatVND(product.tien_giam_gia) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="summary-item total">
                                        <span class="summary-label">Tổng tiền:</span>
                                        <span class="summary-value">{{ formatVND(product.tong_tien) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div v-if="product.trang_thai === 3" class="order-card-footer">
                                <button 
                                    class="btn btn-outline-danger btn-action"
                                    @click="xacNhanNhanHang(product, 5)"
                                >
                                    <i class="fa-solid fa-xmark me-2"></i>
                                    Chưa nhận được hàng
                                </button>
                                <button 
                                    class="btn btn-success btn-action"
                                    @click="xacNhanNhanHang(product, 4)"
                                >
                                    <i class="fa-solid fa-check me-2"></i>
                                    Tôi đã nhận hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'OrderHistory',
    data() {
        return {
            activeTab: 'cho_xac_nhan',
            isLoading: false,
            tabs: {
                cho_xac_nhan: 'Chờ xác nhận',
                cho_lay_hang: 'Chờ lấy hàng',
                cho_giao_hang: 'Chờ giao hàng',
                da_nhan_hang: 'Đã nhận hàng',
                da_huy: 'Đã hủy'
            },
            products: [],
            apiBaseUrl: 'http://127.0.0.1:8000/api'
        };
    },
    computed: {
        filteredProducts() {
            const result = {
                cho_xac_nhan: [],
                cho_lay_hang: [],
                cho_giao_hang: [],
                da_nhan_hang: [],
                da_huy: []
            };
            this.products.forEach(p => {
                const mappedStatus = this.mapStatus(p.trang_thai);
                if (result[mappedStatus]) {
                    result[mappedStatus].push(p);
                }
            });
            return result;
        },
        totalOrders() {
            return this.products.length;
        }
    },
    mounted() {
        this.loadLichSu();
    },
    methods: {
        xacNhanNhanHang(product, trang_thai_gui_len) {
            if (!product || !product.id) {
                this.$toast?.error('Thông tin đơn hàng không hợp lệ!');
                return;
            }

            if (product.trang_thai !== 3) {
                this.$toast?.warning("Chỉ xác nhận khi đơn hàng đang ở trạng thái 'Chờ giao hàng'.");
                return;
            }

            const confirmMessage = trang_thai_gui_len === 4 
                ? 'Bạn có chắc chắn đã nhận được hàng không?'
                : 'Bạn có chắc chắn chưa nhận được hàng không?';
            
            if (!confirm(confirmMessage)) {
                return;
            }

            axios.post(`${this.apiBaseUrl}/khach-hang/xac-nhan-nhan-hang`, {
                id: product.id,
                trang_thai: trang_thai_gui_len
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
                }
            })
                .then((response) => {
                    if (response.data.status) {
                        this.$toast?.success(response.data.message);
                        this.loadLichSu();
                    } else {
                        this.$toast?.error(response.data.message || 'Lỗi không xác định');
                    }
                })
                .catch((error) => {
                    console.error("Lỗi xác nhận đơn hàng:", error);
                    const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi khi xác nhận.';
                    this.$toast?.error(errorMessage);
                });
        },
        loadLichSu() {
            this.isLoading = true;
            axios
                .post(`${this.apiBaseUrl}/khach-hang/lich-su-mua-hang`, {}, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
                    }
                })
                .then((response) => {
                    if (response.data.status) {
                        this.products = response.data.data || [];
                    } else {
                        this.$toast?.error(response.data.message || 'Lỗi không xác định');
                        this.products = [];
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy lịch sử mua hàng:', error);
                    this.$toast?.error('Đã xảy ra lỗi khi tải lịch sử mua hàng');
                    this.products = [];
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        mapStatus(code) {
            switch (code) {
                case 1: return 'cho_xac_nhan';
                case 2: return 'cho_lay_hang';
                case 3: return 'cho_giao_hang';
                case 4: return 'da_nhan_hang';
                case 5: return 'da_huy';
                default: return 'cho_xac_nhan';
            }
        },
        getStatusLabel(code) {
            const labels = {
                1: 'Chờ xác nhận',
                2: 'Chờ lấy hàng',
                3: 'Chờ giao hàng',
                4: 'Đã nhận hàng',
                5: 'Đã hủy'
            };
            return labels[code] || 'Không rõ';
        },
        getStatusIcon(code) {
            const icons = {
                1: 'fa-solid fa-clock',
                2: 'fa-solid fa-box',
                3: 'fa-solid fa-truck',
                4: 'fa-solid fa-check-circle',
                5: 'fa-solid fa-times-circle'
            };
            return icons[code] || 'fa-solid fa-question';
        },
        getStatusBadgeClass(code) {
            const classes = {
                1: 'status-warning',
                2: 'status-info',
                3: 'status-primary',
                4: 'status-success',
                5: 'status-danger'
            };
            return classes[code] || 'status-secondary';
        },
        getTabIcon(key) {
            const icons = {
                cho_xac_nhan: 'fa-solid fa-clock',
                cho_lay_hang: 'fa-solid fa-box',
                cho_giao_hang: 'fa-solid fa-truck',
                da_nhan_hang: 'fa-solid fa-check-circle',
                da_huy: 'fa-solid fa-times-circle'
            };
            return icons[key] || 'fa-solid fa-list';
        },
        formatDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        formatVND(number) {
            if (!number && number !== 0) return '0 ₫';
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(number);
        },
        getImageUrl(url) {
            if (!url || url === "") {
                return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='14'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
            }
            
            if (url.startsWith("http://") || url.startsWith("https://")) {
                return url;
            }
            
            if (url.startsWith("/storage")) {
                return `${this.apiBaseUrl.replace("/api", "")}${url}`;
            }
            
            return `${this.apiBaseUrl.replace("/api", "")}/storage/${url}`;
        },
        handleImageError(event) {
            if (event.target.src && event.target.src.startsWith('data:image/svg+xml')) {
                return;
            }
            const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='14'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
            event.target.src = placeholderSvg;
            event.target.onerror = null;
        }
    }
};
</script>

<style scoped>
.order-history-page {
    min-height: 80vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding-bottom: 3rem;
}

/* Header Section */
.page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 3rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.page-subtitle {
    font-size: 1.1rem;
    margin-top: 0.5rem;
    opacity: 0.9;
}

.order-count-badge {
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 1rem 1.5rem;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.badge-count {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
}

.badge-label {
    display: block;
    font-size: 0.9rem;
    opacity: 0.9;
    margin-top: 0.5rem;
}

/* Tabs */
.tabs-wrapper {
    background: white;
    border-radius: 15px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.custom-tabs {
    border: none;
    gap: 0.5rem;
}

.custom-tabs .nav-link {
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
    color: #6c757d;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
}

.custom-tabs .nav-link:hover {
    background: #f8f9fa;
    color: #495057;
    transform: translateY(-2px);
}

.custom-tabs .nav-link.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.badge-count-tab {
    background: rgba(255, 255, 255, 0.3);
    color: inherit;
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
    font-weight: 600;
}

.custom-tabs .nav-link.active .badge-count-tab {
    background: rgba(255, 255, 255, 0.3);
    color: white;
}

/* Loading State */
.loading-container {
    text-align: center;
    padding: 4rem 0;
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.empty-icon {
    font-size: 5rem;
    color: #dee2e6;
    margin-bottom: 1.5rem;
}

.empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
}

.empty-text {
    color: #6c757d;
    font-size: 1.1rem;
}

/* Orders Grid */
.orders-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .orders-grid {
        grid-template-columns: 1fr;
    }
}

.tab-content-item {
    display: none;
}

.tab-content-item.active {
    display: block;
}

/* Order Card */
.order-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
}

.order-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.order-card-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 1.25rem;
    border-bottom: 2px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.order-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.order-id {
    font-weight: 600;
    color: #495057;
    font-size: 1rem;
}

.order-date {
    font-size: 0.9rem;
    color: #6c757d;
}

.order-recipient {
    font-size: 0.9rem;
    color: #495057;
    margin-top: 0.25rem;
}

.order-phone {
    font-size: 0.9rem;
    color: #495057;
    font-weight: 500;
}

.order-status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.85rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.status-warning {
    background: #fff3cd;
    color: #856404;
}

.status-info {
    background: #d1ecf1;
    color: #0c5460;
}

.status-primary {
    background: #cfe2ff;
    color: #084298;
}

.status-success {
    background: #d1e7dd;
    color: #0f5132;
}

.status-danger {
    background: #f8d7da;
    color: #842029;
}

/* Order Card Body */
.order-card-body {
    padding: 1.5rem;
}

.product-info {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.product-image-wrapper {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #e9ecef;
    background: #f8f9fa;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-details {
    flex: 1;
}

.product-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.75rem;
    line-height: 1.4;
}

.product-variant {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
}

.variant-item {
    font-size: 0.9rem;
    color: #6c757d;
}

.variant-item strong {
    color: #495057;
}

.product-quantity {
    font-size: 0.95rem;
    color: #495057;
    font-weight: 500;
}

/* Order Summary */
.order-summary {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 1rem;
    border-top: 2px solid #e9ecef;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
}

.summary-item.total {
    border-top: 1px solid #dee2e6;
    margin-top: 0.5rem;
    padding-top: 0.75rem;
}

.summary-label {
    font-size: 0.95rem;
    color: #6c757d;
}

.summary-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: #dc3545;
}

.summary-item.total .summary-value {
    font-size: 1.3rem;
    color: #dc3545;
}

/* Order Card Footer */
.order-card-footer {
    padding: 1.25rem;
    background: #f8f9fa;
    border-top: 2px solid #e9ecef;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.btn-action {
    padding: 0.6rem 1.5rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
}

.btn-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-action.btn-success {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border: none;
}

.btn-action.btn-outline-danger:hover {
    background: #dc3545;
    color: white;
}

/* Responsive */
@media (max-width: 768px) {
    .page-title {
        font-size: 1.8rem;
    }

    .order-count-badge {
        margin-top: 1rem;
    }

    .custom-tabs .nav-link {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }

    .orders-grid {
        grid-template-columns: 1fr;
    }

    .product-info {
        flex-direction: column;
    }

    .product-image-wrapper {
        width: 100%;
        height: 200px;
    }

    .order-card-footer {
        flex-direction: column;
    }

    .btn-action {
        width: 100%;
        justify-content: center;
    }
}
</style>
