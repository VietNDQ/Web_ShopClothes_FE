<template>
    <div class="order-management-container">
        <!-- Header Section -->
        <div class="page-header">
            <div class="header-content">
                <div class="header-title">
                    <h2 class="page-title">
                        <i class="fa-solid fa-clipboard-list me-2"></i>
                        Quản Lý Đơn Hàng
                    </h2>
                    <p class="page-subtitle">Tổng số đơn hàng: <strong>{{ thong_tin_khach_hang.length }}</strong></p>
                </div>
                <div class="header-actions">
                    <button @click="thongTinDonHang()" class="btn btn-refresh">
                        <i class="fa-solid fa-rotate"></i> Làm mới
                    </button>
                </div>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="search-filter-section">
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                <input 
                    type="text" 
                    class="form-control search-input" 
                    placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, số điện thoại..."
                    v-model="searchQuery"
                    @input="timKiem()"
                >
            </div>
            <div class="filter-badges">
                <span class="badge filter-badge" :class="{ active: selectedStatus === null }" @click="filterByStatus(null)">
                    Tất cả ({{ thong_tin_khach_hang.length }})
                </span>
                <span class="badge filter-badge" :class="{ active: selectedStatus === 1 }" @click="filterByStatus(1)">
                    Chờ xác nhận ({{ getCountByStatus(1) }})
                </span>
                <span class="badge filter-badge" :class="{ active: selectedStatus === 2 }" @click="filterByStatus(2)">
                    Đã chuẩn bị ({{ getCountByStatus(2) }})
                </span>
                <span class="badge filter-badge" :class="{ active: selectedStatus === 3 }" @click="filterByStatus(3)">
                    Đang giao ({{ getCountByStatus(3) }})
                </span>
                <span class="badge filter-badge" :class="{ active: selectedStatus === 4 }" @click="filterByStatus(4)">
                    Thành công ({{ getCountByStatus(4) }})
                </span>
                <span class="badge filter-badge" :class="{ active: selectedStatus === 5 }" @click="filterByStatus(5)">
                    Thất bại ({{ getCountByStatus(5) }})
                </span>
            </div>
        </div>

        <!-- Orders List -->
        <div class="orders-list" v-if="filteredOrders.length > 0">
            <div v-for="(order, index) in filteredOrders" :key="index" class="order-card">
                <div class="order-card-header">
                    <div class="order-info-left">
                        <div class="order-id">
                            <i class="fa-solid fa-hashtag me-2"></i>
                            <strong>Mã đơn:</strong> {{ order.ma_don_hang }}
                        </div>
                        <div class="order-date">
                            <i class="fa-solid fa-calendar-days me-2"></i>
                            {{ formatDateTime(order.created_at) }}
                        </div>
                    </div>
                    <div class="order-status-badge" :class="getStatusBadgeClass(order.trang_thai_don_hang)">
                        <i :class="getStatusIcon(order.trang_thai_don_hang)" class="me-1"></i>
                        {{ getStatusLabel(order.trang_thai_don_hang) }}
                    </div>
                </div>

                <div class="order-card-body">
                    <div class="order-content-left">
                        <!-- Customer Info -->
                        <div class="customer-section">
                            <h6 class="section-title">
                                <i class="fa-solid fa-user me-2"></i>Thông tin khách hàng
                            </h6>
                            <div class="customer-info">
                                <div class="info-item">
                                    <span class="info-label">Tên khách hàng:</span>
                                    <span class="info-value">{{ order.ho_va_ten }}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Số điện thoại:</span>
                                    <span class="info-value">{{ order.so_dien_thoai || 'Chưa có' }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary -->
                        <div class="order-summary-section">
                            <div class="summary-row">
                                <div class="summary-item">
                                    <span class="summary-label">Tổng tiền:</span>
                                    <div class="summary-value-wrapper">
                                        <span v-if="order.tong_tien_goc && order.tien_giam_gia > 0" class="summary-value price original-price">
                                            {{ formatVND(order.tong_tien_goc) }}
                                        </span>
                                        <span class="summary-value price" :class="{ 'discounted-price': order.tien_giam_gia > 0 }">
                                            {{ formatVND(order.tong_tien) }}
                                        </span>
                                    </div>
                                    <div v-if="order.tien_giam_gia > 0" class="discount-badge">
                                        <i class="fa-solid fa-tag me-1"></i>
                                        Giảm: {{ formatVND(order.tien_giam_gia) }}
                                    </div>
                                </div>
                                <div class="summary-item" v-if="order.ma_voucher">
                                    <span class="summary-label">Voucher:</span>
                                    <span class="badge bg-success">
                                        <i class="fa-solid fa-ticket me-1"></i>{{ order.ma_voucher }}
                                    </span>
                                </div>
                                <div class="summary-item">
                                    <span class="summary-label">Phương thức:</span>
                                    <span class="badge" :class="order.phuong_thuc_thanh_toan == 0 ? 'bg-danger' : 'bg-primary'">
                                        {{ order.phuong_thuc_thanh_toan == 0 ? 'COD' : 'Chuyển khoản' }}
                                    </span>
                                </div>
                                <div class="summary-item">
                                    <span class="summary-label">Thanh toán:</span>
                                    <span class="badge" :class="order.is_thanh_toan === 1 ? 'bg-success' : 'bg-warning'">
                                        {{ order.is_thanh_toan === 1 ? 'Đã thanh toán' : 'Chờ thanh toán' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="order-actions">
                        <button 
                            class="btn btn-detail" 
                            data-bs-toggle="modal"
                            data-bs-target="#chiTietDonHangModal" 
                            @click="chonChiTiet(order.ma_don_hang)"
                        >
                            <i class="fa-solid fa-eye me-2"></i>Xem chi tiết
                        </button>
                        <button 
                            v-if="order.trang_thai_don_hang < 4"
                            @click="xacNhanDonHang(order)"
                            class="btn btn-action"
                            :class="getActionButtonClass(order.trang_thai_don_hang)"
                        >
                            <i :class="getActionIcon(order.trang_thai_don_hang)" class="me-2"></i>
                            {{ getActionLabel(order.trang_thai_don_hang) }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
            <i class="fa-solid fa-inbox empty-icon"></i>
            <h4>Không có đơn hàng nào</h4>
            <p>Hiện tại chưa có đơn hàng nào phù hợp với bộ lọc của bạn.</p>
        </div>

        <!-- Chi tiết đơn hàng Modal -->
        <div class="modal fade" id="chiTietDonHangModal" tabindex="-1" aria-labelledby="chiTietDonHangModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="chiTietDonHangModalLabel">
                            <i class="fa-solid fa-clipboard-list me-2"></i>Chi Tiết Đơn Hàng
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Order Info -->
                        <div class="detail-section">
                            <h6 class="detail-section-title">
                                <i class="fa-solid fa-info-circle me-2"></i>Thông tin đơn hàng
                            </h6>
                            <div class="detail-info-grid">
                                <div class="detail-info-item">
                                    <span class="detail-label">Mã đơn hàng:</span>
                                    <span class="detail-value">{{ maDonHangDangChon }}</span>
                                </div>
                                <div class="detail-info-item">
                                    <span class="detail-label">Ngày đặt:</span>
                                    <span class="detail-value">{{ formatDateTime(getOrderDate()) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Customer Address -->
                        <div class="detail-section">
                            <h6 class="detail-section-title">
                                <i class="fa-solid fa-location-dot me-2"></i>Địa chỉ nhận hàng
                            </h6>
                            <div class="address-box">
                                <p class="address-text">{{ diaChiNhanHang || 'Chưa có thông tin' }}</p>
                            </div>
                        </div>

                        <!-- Products List -->
                        <div class="detail-section">
                            <h6 class="detail-section-title">
                                <i class="fa-solid fa-box me-2"></i>Sản phẩm trong đơn hàng
                            </h6>
                            <div class="products-list">
                                <div v-for="(item, idx) in donHangChiTiet" :key="idx" class="product-item">
                                    <div class="product-image-wrapper">
                                        <img 
                                            :src="getImageUrl(item.image)" 
                                            :alt="item.ten_san_pham"
                                            class="product-image"
                                            @error="handleImageError"
                                        />
                                    </div>
                                    <div class="product-info">
                                        <h6 class="product-name">{{ item.ten_san_pham }}</h6>
                                        <div class="product-details">
                                            <span class="product-detail-item">
                                                <i class="fa-solid fa-ruler me-1"></i>
                                                Kích thước: <strong>{{ item.kich_thuoc || 'N/A' }}</strong>
                                            </span>
                                            <span class="product-detail-item">
                                                <i class="fa-solid fa-palette me-1"></i>
                                                Màu sắc: <strong>{{ item.mau_sac || 'N/A' }}</strong>
                                            </span>
                                        </div>
                                        <div class="product-quantity-price">
                                            <span class="quantity">
                                                <i class="fa-solid fa-cube me-1"></i>
                                                Số lượng: <strong>{{ item.so_luong }}</strong>
                                            </span>
                                            <span class="price">
                                                Đơn giá: <strong>{{ formatVND(item.don_gia) }}</strong>
                                            </span>
                                        </div>
                                        <div class="product-total">
                                            <strong>Thành tiền: {{ formatVND(item.tong_tien) }}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Order Total -->
                        <div class="detail-section">
                            <div class="order-total-box">
                                <div v-if="getOrderVoucherInfo()" class="voucher-info mb-3">
                                    <div class="voucher-row">
                                        <span class="voucher-label">Mã voucher:</span>
                                        <span class="badge bg-success">{{ getOrderVoucherInfo().ma_voucher }}</span>
                                    </div>
                                    <div class="voucher-row">
                                        <span class="voucher-label">Tổng tiền gốc:</span>
                                        <span class="voucher-value original">{{ formatVND(getOrderVoucherInfo().tong_tien_goc) }}</span>
                                    </div>
                                    <div class="voucher-row">
                                        <span class="voucher-label">Tiền giảm giá:</span>
                                        <span class="voucher-value discount">-{{ formatVND(getOrderVoucherInfo().tien_giam_gia) }}</span>
                                    </div>
                                </div>
                                <div class="total-row">
                                    <span class="total-label">Tổng cộng:</span>
                                    <span class="total-value">{{ formatVND(getOrderTotal()) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fa-solid fa-times me-2"></i>Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            list_don_hang: [],
            chi_tiet_don_hang: [],
            thong_tin_khach_hang: [],
            donHangChiTiet: [],
            xac_nhan_don: {},
            maDonHangDangChon: '',
            diaChiNhanHang: '',
            searchQuery: '',
            selectedStatus: null,
            autoRefreshInterval: null
        }
    },
    computed: {
        filteredOrders() {
            let orders = this.thong_tin_khach_hang;
            
            // Filter by status
            if (this.selectedStatus !== null) {
                orders = orders.filter(order => order.trang_thai_don_hang === this.selectedStatus);
            }
            
            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                orders = orders.filter(order => 
                    order.ma_don_hang.toLowerCase().includes(query) ||
                    (order.ho_va_ten && order.ho_va_ten.toLowerCase().includes(query)) ||
                    (order.so_dien_thoai && order.so_dien_thoai.includes(query))
                );
            }
            
            return orders;
        }
    },
    mounted() {
        this.thongTinDonHang();
        // Auto-refresh mỗi 30 giây để cập nhật đơn hàng mới
        this.autoRefreshInterval = setInterval(() => {
            this.thongTinDonHang();
        }, 30000); // 30 giây
    },
    beforeUnmount() {
        // Clear interval khi component bị hủy
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
    },
    methods: {
        xacNhanDonHang(value) {
            var payload = {
                'ma_don_hang': value.ma_don_hang,
                'trang_thai': value.trang_thai_don_hang
            }
            axios
                .post('http://127.0.0.1:8000/api/admin/nhan-vien/xac-nhan-don-hang', payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.thongTinDonHang();
                    } else {
                        this.$toast.error(res.data.message)
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        const { data } = err.response;
                        if (data.errors) {
                            Object.values(data.errors).forEach((v) => {
                                this.$toast.error(v[0]);
                            });
                        } else {
                            this.$toast.error(data.message || 'Đã xảy ra lỗi.');
                        }
                    } else {
                        this.$toast.error('Không thể kết nối đến máy chủ.');
                    }
                });
        },
        thongTinDonHang() {
            axios
                .get('http://127.0.0.1:8000/api/admin/nhan-vien/get-don-hang', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_don_hang = Array.isArray(res.data.don_hang) ? res.data.don_hang : [];
                        this.thong_tin_khach_hang = Array.isArray(res.data.thong_tin_khach_hang) ? res.data.thong_tin_khach_hang : [];
                        this.chi_tiet_don_hang = Array.isArray(res.data.chi_tiet_don_hang) ? res.data.chi_tiet_don_hang : [];
                    } else {
                        console.warn('Lỗi API: không trả về status=true');
                    }
                })
                .catch(err => {
                    console.error('Lỗi API:', err);
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
        formatDateTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        chonChiTiet(ma_don_hang) {
            this.maDonHangDangChon = ma_don_hang;

            if (!Array.isArray(this.chi_tiet_don_hang)) {
                this.donHangChiTiet = [];
                this.diaChiNhanHang = '';
                return;
            }

            this.donHangChiTiet = this.chi_tiet_don_hang.filter(item => item.ma_don_hang === ma_don_hang);

            if (this.donHangChiTiet.length > 0) {
                const diaChi = this.donHangChiTiet[0];
                this.diaChiNhanHang = `${diaChi.dia_chi ?? ''}, ${diaChi.ten_phuong_xa ?? ''}, ${diaChi.ten_quan_huyen ?? ''}, ${diaChi.ten_tinh_thanh ?? ''}`;
            } else {
                this.diaChiNhanHang = '';
            }
        },
        getImageUrl(url) {
            if (!url) {
                return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
            }
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            return `http://127.0.0.1:8000/storage/${url}`;
        },
        handleImageError(event) {
            event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
        },
        timKiem() {
            // Search is handled by computed property
        },
        filterByStatus(status) {
            this.selectedStatus = status;
        },
        getCountByStatus(status) {
            return this.thong_tin_khach_hang.filter(order => order.trang_thai_don_hang === status).length;
        },
        getStatusBadgeClass(status) {
            const classes = {
                1: 'status-pending',
                2: 'status-preparing',
                3: 'status-shipping',
                4: 'status-success',
                5: 'status-failed'
            };
            return classes[status] || 'status-pending';
        },
        getStatusIcon(status) {
            const icons = {
                1: 'fa-solid fa-clock',
                2: 'fa-solid fa-box',
                3: 'fa-solid fa-truck',
                4: 'fa-solid fa-check-circle',
                5: 'fa-solid fa-xmark-circle'
            };
            return icons[status] || 'fa-solid fa-clock';
        },
        getStatusLabel(status) {
            const labels = {
                1: 'Chờ xác nhận',
                2: 'Đã chuẩn bị hàng',
                3: 'Đang giao hàng',
                4: 'Giao hàng thành công',
                5: 'Giao hàng thất bại'
            };
            return labels[status] || 'Chờ xác nhận';
        },
        getActionButtonClass(status) {
            const classes = {
                1: 'btn-warning',
                2: 'btn-info',
                3: 'btn-primary'
            };
            return classes[status] || 'btn-warning';
        },
        getActionIcon(status) {
            const icons = {
                1: 'fa-solid fa-check',
                2: 'fa-solid fa-box',
                3: 'fa-solid fa-truck'
            };
            return icons[status] || 'fa-solid fa-check';
        },
        getActionLabel(status) {
            const labels = {
                1: 'Xác nhận đơn',
                2: 'Đã chuẩn bị hàng',
                3: 'Đang giao hàng'
            };
            return labels[status] || 'Xác nhận đơn';
        },
        getOrderDate() {
            if (this.donHangChiTiet.length > 0) {
                return this.donHangChiTiet[0].created_at;
            }
            return '';
        },
        getOrderTotal() {
            // Nếu có thông tin voucher từ thanh_toans, sử dụng tong_tien từ đó
            if (this.donHangChiTiet.length > 0) {
                const firstItem = this.donHangChiTiet[0];
                // Kiểm tra xem có tong_tien từ thanh_toans không (nếu có voucher)
                if (firstItem.tong_tien_sau_giam) {
                    return parseFloat(firstItem.tong_tien_sau_giam);
                }
                // Nếu không có voucher, tính tổng từ các item
                return this.donHangChiTiet.reduce((total, item) => total + parseFloat(item.tong_tien || 0), 0);
            }
            return 0;
        },
        getOrderVoucherInfo() {
            // Lấy thông tin voucher từ thong_tin_khach_hang
            if (this.maDonHangDangChon) {
                const order = this.thong_tin_khach_hang.find(o => o.ma_don_hang === this.maDonHangDangChon);
                if (order && order.ma_voucher && order.tien_giam_gia > 0) {
                    return {
                        ma_voucher: order.ma_voucher,
                        tong_tien_goc: order.tong_tien_goc || order.tong_tien,
                        tien_giam_gia: order.tien_giam_gia
                    };
                }
            }
            return null;
        }
    }
}
</script>

<style scoped>
.order-management-container {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
}

/* Header Styles */
.page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.page-title {
    color: white;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
}

.page-subtitle {
    color: rgba(255, 255, 255, 0.9);
    margin: 8px 0 0 0;
    font-size: 14px;
}

.btn-refresh {
    background: white;
    color: #667eea;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-refresh:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Search and Filter */
.search-filter-section {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-box {
    position: relative;
    margin-bottom: 16px;
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
}

.search-input {
    padding-left: 45px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    height: 45px;
}

.search-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.filter-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.filter-badge {
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s;
    background-color: #f8f9fa;
    color: #6c757d;
    border: 1px solid #dee2e6;
}

.filter-badge:hover {
    background-color: #e9ecef;
}

.filter-badge.active {
    background-color: #667eea;
    color: white;
    border-color: #667eea;
}

/* Order Cards */
.orders-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.order-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    overflow: hidden;
}

.order-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.order-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-bottom: 2px solid #e9ecef;
}

.order-info-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.order-id {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
}

.order-date {
    font-size: 14px;
    color: #6c757d;
}

.order-status-badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
}

.status-pending {
    background-color: #fff3cd;
    color: #856404;
}

.status-preparing {
    background-color: #cfe2ff;
    color: #084298;
}

.status-shipping {
    background-color: #cff4fc;
    color: #055160;
}

.status-success {
    background-color: #d1e7dd;
    color: #0f5132;
}

.status-failed {
    background-color: #f8d7da;
    color: #842029;
}

.order-card-body {
    padding: 20px;
}

.customer-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
}

.section-title {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12px;
}

.customer-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 12px;
}

.info-item {
    display: flex;
    gap: 8px;
}

.info-label {
    font-weight: 600;
    color: #6c757d;
}

.info-value {
    color: #2c3e50;
}

.order-summary-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
}

.summary-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
}

.summary-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.summary-label {
    font-size: 14px;
    color: #6c757d;
}

.summary-value {
    font-size: 18px;
    font-weight: 600;
}

.summary-value.price {
    color: #dc3545;
    font-size: 20px;
}

.summary-value-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.summary-value.price.original-price {
    text-decoration: line-through;
    color: #6c757d;
    font-size: 14px;
    font-weight: normal;
}

.summary-value.price.discounted-price {
    color: #dc3545;
}

.discount-badge {
    font-size: 12px;
    color: #28a745;
    font-weight: 600;
    margin-top: 4px;
}

.order-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.btn-detail {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-detail:hover {
    background-color: #5a6268;
    transform: translateY(-2px);
}

.btn-action {
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    color: white;
    transition: all 0.3s;
}

.btn-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.empty-icon {
    font-size: 64px;
    color: #dee2e6;
    margin-bottom: 16px;
}

.empty-state h4 {
    color: #6c757d;
    margin-bottom: 8px;
}

.empty-state p {
    color: #adb5bd;
}

/* Modal Styles */
.modal-content {
    border-radius: 12px;
    border: none;
}

.modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px 12px 0 0;
    padding: 20px;
}

.modal-title {
    font-weight: 700;
    font-size: 20px;
}

.btn-close {
    filter: invert(1);
}

.modal-body {
    padding: 24px;
}

.detail-section {
    margin-bottom: 24px;
}

.detail-section:last-child {
    margin-bottom: 0;
}

.detail-section-title {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e9ecef;
}

.detail-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}

.detail-info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail-label {
    font-size: 14px;
    color: #6c757d;
    font-weight: 600;
}

.detail-value {
    font-size: 16px;
    color: #2c3e50;
}

.address-box {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

.address-text {
    margin: 0;
    color: #2c3e50;
    line-height: 1.6;
}

.products-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.product-item {
    display: flex;
    gap: 16px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.product-image-wrapper {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #dee2e6;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.product-name {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
}

.product-details {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.product-detail-item {
    font-size: 14px;
    color: #6c757d;
}

.product-quantity-price {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}

.quantity, .price {
    font-size: 14px;
    color: #6c757d;
}

.product-total {
    font-size: 16px;
    color: #dc3545;
    font-weight: 600;
}

.order-total-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    border-radius: 8px;
    text-align: right;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.total-label {
    font-size: 18px;
    font-weight: 600;
    color: white;
}

.total-value {
    font-size: 24px;
    font-weight: 700;
    color: white;
}

.voucher-info {
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin-bottom: 12px;
}

.voucher-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.voucher-row:last-child {
    margin-bottom: 0;
}

.voucher-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
}

.voucher-value {
    font-size: 16px;
    font-weight: 600;
}

.voucher-value.original {
    text-decoration: line-through;
    color: rgba(255, 255, 255, 0.7);
}

.voucher-value.discount {
    color: #90ee90;
}

.modal-footer {
    border-top: 1px solid #e9ecef;
    padding: 16px 24px;
}

/* Responsive */
@media (max-width: 768px) {
    .order-management-container {
        padding: 12px;
    }

    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }

    .order-card-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
    }

    .customer-info,
    .summary-row {
        grid-template-columns: 1fr;
    }

    .order-actions {
        flex-direction: column;
    }

    .order-actions .btn {
        width: 100%;
    }
}
</style>
