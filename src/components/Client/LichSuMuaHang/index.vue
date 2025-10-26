<template>
    <div class="container">
        <h2 class="mb-4 fw-bold text-primary">Lịch Sử Mua Hàng</h2>

        <!-- Tabs -->
        <ul class="nav nav-tabs" id="orderTabs" role="tablist">
            <li v-for="(label, key) in tabs" :key="key" class="nav-item" role="presentation">
                <button class="nav-link" :class="{ active: activeTab === key }" :id="`${key}-tab`" data-bs-toggle="tab"
                    :data-bs-target="`#${key}`" type="button" role="tab" :aria-controls="key"
                    :aria-selected="activeTab === key" @click="activeTab = key">
                    {{ label }}
                </button>
            </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content mt-4">
            <div v-for="(label, key) in tabs" :key="key" class="tab-pane fade"
                :class="{ show: activeTab === key, active: activeTab === key }" :id="key" role="tabpanel"
                :aria-labelledby="`${key}-tab`">
                <div v-if="filteredProducts[key].length">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
                        <div class="col" v-for="product in filteredProducts[key]" :key="product.id">
                            <div class="card shadow-sm border-0">
                                <div class="card-body">
                                    <div class="row g-3 align-items-center">
                                        <div class="col-md-4">
                                            <img :src="product.image" class="img-fluid rounded"
                                                style="height: 20vh; width: 70%;" alt="Ảnh sản phẩm">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="d-flex justify-content-between">
                                                <h6 class="card-title">
                                                    <b>{{ product.ten_san_pham }}</b>
                                                </h6>
                                                <span class="text-end mt-2 mb-1 text-light"
                                                    :class="getBadgeClass(product.trang_thai)">
                                                    {{ getStatusLabel(product.trang_thai) }}
                                                </span>
                                            </div>

                                            <p class="mb-1">{{ product.kich_thuoc }} / {{ product.mau_sac }}</p>
                                            <p class="text-end mb-1">Ngày mua: <strong>{{ formatDate(product.created_at)
                                            }}</strong></p>
                                            <p class="text-end mb-1">Tổng tiền (SL sản phẩm {{ product.so_luong }}):
                                                <strong>{{ formatVND(product.tong_tien) }}</strong>
                                            </p>
                                            <div v-if="product.trang_thai === 3"
                                                class="mt-3 d-flex justify-content-end gap-2">
                                                <button class="btn btn-outline-danger btn-sm"
                                                    @click="xacNhanNhanHang(trang_thai_gui_len)">Chưa nhận được
                                                    hàng</button>
                                                <button class="btn btn-success btn-sm"
                                                    @click="xacNhanNhanHang(trang_thai_gui_len)">Tôi đã nhận
                                                    hàng</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-else class="text-muted mt-3">Không có đơn hàng nào.</p>
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
            tabs: {
                cho_xac_nhan: 'Chờ xác nhận',
                cho_lay_hang: 'Chờ lấy hàng',
                cho_giao_hang: 'Chờ giao hàng',
                da_nhan_hang: 'Đã nhận hàng',
                da_huy: 'Đã hủy'
            },
            products: []
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
        }
    },
    mounted() {
        this.loadLichSu();
    },
    methods: {
        xacNhanNhanHang(product, trang_thai_gui_len) {
            if (confirm("Bạn có chắc chắn với hành động này không?")) {
                if (product.trang_thai === 3) {
                    // Nếu muốn hỏi lại lần nữa:
                    if (trang_thai_gui_len === null) {
                        trang_thai_gui_len = confirm("Bạn đã nhận được hàng chưa?") ? 4 : 5;
                    }
                } else {
                    this.$toast.warning("Chỉ xác nhận khi đơn hàng đang ở trạng thái 'Chờ giao hàng'.");
                    return;
                }

                axios.post('http://127.0.0.1:8000/api/khach-hang/xac-nhan-nhan-hang', {
                    id: product.id,
                    trang_thai: trang_thai_gui_len
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
                    }
                })
                    .then((response) => {
                        if (response.data.status) {
                            this.products = response.data.data;
                            this.$toast.success(
                                trang_thai_gui_len === 4
                                    ? 'Xác nhận đã nhận hàng thành công!'
                                    : 'Đã ghi nhận bạn chưa nhận được hàng.'
                            );
                        } else {
                            this.$toast.error(response.data.message || 'Lỗi không xác định');
                        }
                    })
                    .catch((error) => {
                        console.error("Lỗi xác nhận đơn hàng:", error);
                        this.$toast.error("Đã xảy ra lỗi khi xác nhận.");
                    });
            }
        },
        loadLichSu() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/lich-su-mua-hang', {}, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
                    }
                })
                .then((response) => {
                    if (response.data.status) {
                        this.products = response.data.data;
                    } else {
                        this.$toast.error(response.data.message || 'Lỗi không xác định');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi lấy lịch sử mua hàng:', error);
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
        getBadgeClass(code) {
            const classes = {
                1: 'badge bg-warning text-dark',
                2: 'badge bg-info text-dark',
                3: 'badge bg-primary',
                4: 'badge bg-success',
                5: 'badge bg-danger'
            };
            return classes[code] || 'badge bg-secondary';
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('vi-VN');
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(number);
        }
    }
};
</script>

<style scoped></style>
