<template>
    <div class="thong-ke-container">
        <!-- Header Section -->
        <div class="page-header">
            <div class="header-content">
                <div class="header-title">
                    <h2 class="page-title">
                        <i class="fa-solid fa-chart-line me-2"></i>
                        Thống Kê & Báo Cáo
                    </h2>
                    <p class="page-subtitle">Tổng quan hoạt động kinh doanh</p>
                </div>
                <div class="header-actions">
                    <button @click="loadAllData()" class="btn btn-refresh">
                        <i class="fa-solid fa-rotate"></i> Làm mới
                    </button>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Đang tải...</span>
            </div>
            <p class="text-muted">Đang tải dữ liệu thống kê...</p>
        </div>

        <!-- Main Content -->
        <div v-else>
            <!-- Summary Cards -->
            <div class="row g-4 mb-4">
                <!-- Doanh Thu -->
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card stat-card-revenue">
                        <div class="stat-icon">
                            <i class="fa-solid fa-money-bill-wave"></i>
                        </div>
                        <div class="stat-content">
                            <h6 class="stat-label">Tổng Doanh Thu</h6>
                            <h3 class="stat-value">{{ formatCurrency(tongQuan.doanh_thu?.tong || 0) }}</h3>
                            <div class="stat-footer">
                                <span class="stat-change positive">
                                    <i class="fa-solid fa-arrow-up"></i>
                                    {{ tongQuan.doanh_thu?.tang_truong || 0 }}%
                                </span>
                                <span class="stat-period">so với tháng trước</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Đơn Hàng -->
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card stat-card-orders">
                        <div class="stat-icon">
                            <i class="fa-solid fa-shopping-cart"></i>
                        </div>
                        <div class="stat-content">
                            <h6 class="stat-label">Tổng Đơn Hàng</h6>
                            <h3 class="stat-value">{{ formatNumber(tongQuan.don_hang?.tong || 0) }}</h3>
                            <div class="stat-footer">
                                <span class="stat-change positive">
                                    <i class="fa-solid fa-arrow-up"></i>
                                    {{ tongQuan.don_hang?.tang_truong || 0 }}%
                                </span>
                                <span class="stat-period">so với tháng trước</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Khách Hàng -->
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card stat-card-customers">
                        <div class="stat-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h6 class="stat-label">Tổng Khách Hàng</h6>
                            <h3 class="stat-value">{{ formatNumber(tongQuan.khach_hang?.tong || 0) }}</h3>
                            <div class="stat-footer">
                                <span class="stat-change neutral">
                                    <i class="fa-solid fa-user-plus"></i>
                                    +{{ tongQuan.khach_hang?.thang_nay || 0 }} tháng này
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sản Phẩm -->
                <div class="col-lg-3 col-md-6">
                    <div class="stat-card stat-card-products">
                        <div class="stat-icon">
                            <i class="fa-solid fa-box"></i>
                        </div>
                        <div class="stat-content">
                            <h6 class="stat-label">Sản Phẩm Đã Bán</h6>
                            <h3 class="stat-value">{{ formatNumber(tongQuan.san_pham?.da_ban || 0) }}</h3>
                            <div class="stat-footer">
                                <span class="stat-change neutral">
                                    <i class="fa-solid fa-warehouse"></i>
                                    {{ tongQuan.san_pham?.tong || 0 }} sản phẩm trong kho
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="row g-4 mb-4">
                <!-- Doanh Thu Chart -->
                <div class="col-lg-8">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">
                                <i class="fa-solid fa-chart-area me-2"></i>
                                Doanh Thu Theo Thời Gian
                            </h5>
                            <div class="chart-controls">
                                <button 
                                    v-for="type in chartTypes" 
                                    :key="type.value"
                                    @click="selectedChartType = type.value; loadDoanhThu(); $nextTick(() => { renderDoanhThuChart(); })"
                                    :class="['btn btn-sm', selectedChartType === type.value ? 'btn-primary' : 'btn-outline-secondary']"
                                >
                                    {{ type.label }}
                                </button>
                            </div>
                        </div>
                        <div class="chart-body">
                            <canvas ref="doanhThuChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Đơn Hàng Theo Trạng Thái -->
                <div class="col-lg-4">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h5 class="chart-title">
                                <i class="fa-solid fa-chart-pie me-2"></i>
                                Đơn Hàng Theo Trạng Thái
                            </h5>
                        </div>
                        <div class="chart-body">
                            <canvas ref="donHangChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tables Section -->
            <div class="row g-4">
                <!-- Top Sản Phẩm Bán Chạy -->
                <div class="col-lg-8">
                    <div class="table-card">
                        <div class="table-header">
                            <h5 class="table-title">
                                <i class="fa-solid fa-fire me-2"></i>
                                Top Sản Phẩm Bán Chạy
                            </h5>
                            <select v-model="topProductLimit" @change="loadTopSanPham()" class="form-select form-select-sm" style="width: auto;">
                                <option :value="5">Top 5</option>
                                <option :value="10">Top 10</option>
                                <option :value="20">Top 20</option>
                            </select>
                        </div>
                        <div class="table-body">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style="width: 50px;">#</th>
                                            <th style="width: 80px;">Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Danh mục</th>
                                            <th class="text-end">Số lượng bán</th>
                                            <th class="text-end">Doanh thu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(sp, index) in topSanPham" :key="sp.id">
                                            <td>{{ index + 1 }}</td>
                                            <td>
                                                <img 
                                                    :src="getImageUrl(sp.hinh_anh)" 
                                                    :alt="sp.ten_san_pham"
                                                    class="product-thumb"
                                                    @error="handleImageError"
                                                >
                                            </td>
                                            <td>
                                                <strong>{{ sp.ten_san_pham }}</strong>
                                            </td>
                                            <td>
                                                <span class="badge bg-secondary">{{ sp.ten_danh_muc }}</span>
                                            </td>
                                            <td class="text-end">
                                                <strong>{{ formatNumber(sp.tong_so_luong_ban) }}</strong>
                                            </td>
                                            <td class="text-end">
                                                <strong class="text-success">{{ formatCurrency(sp.tong_doanh_thu) }}</strong>
                                            </td>
                                        </tr>
                                        <tr v-if="topSanPham.length === 0">
                                            <td colspan="6" class="text-center text-muted py-4">
                                                Chưa có dữ liệu
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Thống Kê Theo Danh Mục -->
                <div class="col-lg-4">
                    <div class="table-card">
                        <div class="table-header">
                            <h5 class="table-title">
                                <i class="fa-solid fa-tags me-2"></i>
                                Thống Kê Theo Danh Mục
                            </h5>
                            <select v-model="topDanhMucLimit" @change="loadThongKeDanhMuc()" class="form-select form-select-sm" style="width: auto;">
                                <option :value="5">Top 5</option>
                                <option :value="10">Top 10</option>
                                <option :value="20">Top 20</option>
                                <option :value="100">Top 100</option>
                            </select>
                        </div>
                        <div class="table-body">
                            <div class="category-list">
                                <div 
                                    v-for="(dm, index) in thongKeDanhMuc" 
                                    :key="dm.id"
                                    class="category-item"
                                >
                                    <div class="category-info">
                                        <h6 class="category-name">{{ dm.ten_danh_muc }}</h6>
                                        <div class="category-stats">
                                            <span class="stat-item">
                                                <i class="fa-solid fa-shopping-cart"></i>
                                                {{ formatNumber(dm.so_don_hang) }} đơn
                                            </span>
                                            <span class="stat-item">
                                                <i class="fa-solid fa-box"></i>
                                                {{ formatNumber(dm.tong_so_luong_ban) }} SP
                                            </span>
                                        </div>
                                    </div>
                                    <div class="category-revenue">
                                        <strong class="text-success">{{ formatCurrency(dm.tong_doanh_thu) }}</strong>
                                    </div>
                                </div>
                                <div v-if="thongKeDanhMuc.length === 0" class="text-center text-muted py-4">
                                    Chưa có dữ liệu
                                </div>
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
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    DoughnutController
} from 'chart.js';

// Đăng ký các components cần thiết
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineController,
    DoughnutController
);

export default {
    name: 'ThongKe',
    data() {
        return {
            isLoading: false,
            tongQuan: {},
            doanhThuData: [],
            donHangTrangThai: [],
            topSanPham: [],
            thongKeDanhMuc: [],
            selectedChartType: 'month',
            topProductLimit: 10,
            topDanhMucLimit: 10,
            chartTypes: [
                { label: 'Ngày', value: 'day' },
                { label: 'Tuần', value: 'week' },
                { label: 'Tháng', value: 'month' },
                { label: 'Năm', value: 'year' },
            ],
            doanhThuChartInstance: null,
            donHangChartInstance: null,
            apiBaseUrl: 'http://127.0.0.1:8000',
        };
    },
    mounted() {
        this.loadAllData();
    },
    beforeUnmount() {
        // Destroy charts
        if (this.doanhThuChartInstance) {
            this.doanhThuChartInstance.destroy();
        }
        if (this.donHangChartInstance) {
            this.donHangChartInstance.destroy();
        }
    },
    methods: {
        async loadAllData() {
            this.isLoading = true;
            try {
                // Load tất cả dữ liệu
                await Promise.all([
                    this.loadTongQuan(),
                    this.loadDoanhThu(),
                    this.loadDonHangTrangThai(),
                    this.loadTopSanPham(),
                    this.loadThongKeDanhMuc(),
                ]);
                
                // Đợi DOM cập nhật hoàn toàn trước khi render charts
                await this.$nextTick();
                
                // Render charts sau khi dữ liệu đã load và DOM đã sẵn sàng
                setTimeout(() => {
                    if (this.doanhThuData && this.doanhThuData.length > 0) {
                        this.renderDoanhThuChart();
                    }
                    if (this.donHangTrangThai && this.donHangTrangThai.length > 0) {
                        this.renderDonHangChart();
                    }
                }, 100);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                this.$toast?.error('Đã xảy ra lỗi khi tải dữ liệu thống kê');
            } finally {
                this.isLoading = false;
            }
        },
        async loadTongQuan() {
            try {
                const res = await axios.get(`${this.apiBaseUrl}/api/admin/thong-ke/tong-quan`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                if (res.data.status) {
                    this.tongQuan = res.data.data;
                }
            } catch (error) {
                console.error('Lỗi loadTongQuan:', error);
            }
        },
        async loadDoanhThu() {
            try {
                const res = await axios.get(`${this.apiBaseUrl}/api/admin/thong-ke/doanh-thu-theo-thoi-gian`, {
                    params: { type: this.selectedChartType },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                if (res.data.status && res.data.data) {
                    this.doanhThuData = res.data.data;
                    // Không render ở đây, sẽ render trong loadAllData hoặc khi click button
                } else {
                    console.warn('Không có dữ liệu doanh thu');
                    this.doanhThuData = [];
                }
            } catch (error) {
                console.error('Lỗi loadDoanhThu:', error);
                this.doanhThuData = [];
            }
        },
        async loadDonHangTrangThai() {
            try {
                const res = await axios.get(`${this.apiBaseUrl}/api/admin/thong-ke/don-hang-theo-trang-thai`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                if (res.data.status && res.data.data) {
                    this.donHangTrangThai = res.data.data;
                    // Không render ở đây, sẽ render trong loadAllData
                } else {
                    console.warn('Không có dữ liệu đơn hàng theo trạng thái');
                    this.donHangTrangThai = [];
                }
            } catch (error) {
                console.error('Lỗi loadDonHangTrangThai:', error);
                this.donHangTrangThai = [];
            }
        },
        async loadTopSanPham() {
            try {
                const res = await axios.get(`${this.apiBaseUrl}/api/admin/thong-ke/top-san-pham-ban-chay`, {
                    params: { limit: this.topProductLimit },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                if (res.data.status) {
                    this.topSanPham = res.data.data;
                }
            } catch (error) {
                console.error('Lỗi loadTopSanPham:', error);
            }
        },
        async loadThongKeDanhMuc() {
            try {
                const res = await axios.get(`${this.apiBaseUrl}/api/admin/thong-ke/theo-danh-muc`, {
                    params: { limit: this.topDanhMucLimit },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                if (res.data.status) {
                    this.thongKeDanhMuc = res.data.data;
                }
            } catch (error) {
                console.error('Lỗi loadThongKeDanhMuc:', error);
            }
        },
        renderDoanhThuChart() {
            if (!this.$refs.doanhThuChart) return;
            
            // Destroy existing chart trước
            if (this.doanhThuChartInstance) {
                this.doanhThuChartInstance.destroy();
                this.doanhThuChartInstance = null;
            }
            
            // Đợi một chút để đảm bảo canvas được giải phóng
            this.$nextTick(() => {
                const ctx = this.$refs.doanhThuChart.getContext('2d');
                
                this.doanhThuChartInstance = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.doanhThuData.map(item => item.label),
                        datasets: [{
                            label: 'Doanh thu (VNĐ)',
                            data: this.doanhThuData.map(item => item.value),
                            borderColor: 'rgb(102, 126, 234)',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            tension: 0.4,
                            fill: true,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return 'Doanh thu: ' + new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(context.parsed.y);
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function(value) {
                                        return new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                            notation: 'compact'
                                        }).format(value);
                                    }
                                }
                            }
                        }
                    }
                });
            });
        },
        renderDonHangChart() {
            if (!this.$refs.donHangChart) {
                console.warn('Canvas donHangChart chưa sẵn sàng');
                return;
            }
            
            // Kiểm tra dữ liệu
            if (!this.donHangTrangThai || this.donHangTrangThai.length === 0) {
                console.warn('Không có dữ liệu để vẽ biểu đồ đơn hàng');
                return;
            }
            
            // Destroy existing chart trước
            if (this.donHangChartInstance) {
                this.donHangChartInstance.destroy();
                this.donHangChartInstance = null;
            }
            
            // Đợi một chút để đảm bảo canvas được giải phóng
            this.$nextTick(() => {
                if (!this.$refs.donHangChart) return;
                
                const ctx = this.$refs.donHangChart.getContext('2d');
                
                const colors = [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ];

                try {
                    this.donHangChartInstance = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: this.donHangTrangThai.map(item => item.ten_trang_thai || 'Không xác định'),
                            datasets: [{
                                data: this.donHangTrangThai.map(item => item.so_luong || 0),
                                backgroundColor: colors.slice(0, this.donHangTrangThai.length),
                                borderWidth: 2,
                                borderColor: '#fff'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            const label = context.label || '';
                                            const value = context.parsed || 0;
                                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                            if (total === 0) return label + ': 0 đơn';
                                            const percentage = ((value / total) * 100).toFixed(1);
                                            return label + ': ' + value + ' đơn (' + percentage + '%)';
                                        }
                                    }
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Lỗi khi render biểu đồ đơn hàng:', error);
                }
            });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },
        formatNumber(value) {
            return new Intl.NumberFormat('vi-VN').format(value);
        },
        getImageUrl(url) {
            if (!url || url === '') {
                return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
            }
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            return `${this.apiBaseUrl}/storage/${url}`;
        },
        handleImageError(event) {
            event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
        },
    }
};
</script>

<style scoped>
.thong-ke-container {
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

/* Stat Cards */
.stat-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s;
    border-left: 4px solid;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-card-revenue {
    border-left-color: #10b981;
}

.stat-card-orders {
    border-left-color: #3b82f6;
}

.stat-card-customers {
    border-left-color: #8b5cf6;
}

.stat-card-products {
    border-left-color: #f59e0b;
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
}

.stat-card-revenue .stat-icon {
    background: linear-gradient(135deg, #10b981, #059669);
}

.stat-card-orders .stat-icon {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.stat-card-customers .stat-icon {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-card-products .stat-icon {
    background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-content {
    flex: 1;
}

.stat-label {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 8px 0;
    font-weight: 500;
}

.stat-value {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #1f2937;
}

.stat-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.stat-change {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
}

.stat-change.positive {
    color: #10b981;
    background: #d1fae5;
}

.stat-change.negative {
    color: #ef4444;
    background: #fee2e2;
}

.stat-change.neutral {
    color: #6b7280;
    background: #f3f4f6;
}

.stat-period {
    font-size: 12px;
    color: #9ca3af;
}

/* Chart Cards */
.chart-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    height: 100%;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
}

.chart-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
}

.chart-controls {
    display: flex;
    gap: 8px;
}

.chart-body {
    height: 300px;
    position: relative;
}

/* Table Cards */
.table-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.table-header {
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
}

.table-body {
    padding: 0;
}

.product-thumb {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
}

.category-list {
    padding: 16px;
}

.category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    transition: background 0.2s;
}

.category-item:hover {
    background: #f9fafb;
}

.category-item:last-child {
    border-bottom: none;
}

.category-info {
    flex: 1;
}

.category-name {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 8px 0;
}

.category-stats {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.stat-item {
    font-size: 12px;
    color: #6b7280;
}

.stat-item i {
    margin-right: 4px;
}

.category-revenue {
    font-size: 18px;
    font-weight: 700;
}

@media (max-width: 768px) {
    .thong-ke-container {
        padding: 12px;
    }
    
    .page-title {
        font-size: 22px;
    }
    
    .stat-value {
        font-size: 22px;
    }
    
    .chart-body {
        height: 250px;
    }
}
</style>

