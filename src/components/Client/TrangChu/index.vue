<template>
    <div class="container-fuild">
        <div class="row">
            <div class="col-lg-9">
                <div class="card-header">
                    <h4><b> Thời Trang Mới Nhất</b></h4>
                </div>
            </div>

        </div>
        <hr>
    </div>
    <div class="row">
        <div class="col-lg-9 col-md-12">
            <div class="row product-grid">
                <template v-for="(value, index) in paginatedSanPham" :key="(index)">
                    <div class="col-lg-3 col-md-4 mt-2 mb-2 ">
                        <div class="mt">
                            <img v-bind:src="value.hinh_anh" class="card-img-top" style="height: 40vh;">
                            <div class="card-body">
                                <div class="row mt-2">
                                    <div class="col-lg-4">
                                        <h6 class="text-muted">{{ value.ten_thuong_hieu }}</h6>
                                    </div>
                                    <div class="col-lg-8 text-end">
                                        <span class="fw-bold">⭐5 | Đã bán 47</span>
                                    </div>
                                </div>
                                <h6 class="ellipsis mb-1">{{ value.ten_san_pham }}</h6>
                                <span class="text-muted text-decoration-line-through">
                                    Giá gốc: <span class="fw-bold">{{ formatVND(value.gia_goc) }}</span>
                                </span>
                                <p class="text-danger fw-bold text-nowrap">
                                    Giá bán: <span>{{ formatVND(value.gia_ban) }}</span>
                                    <span class="badge bg-warning text-dark ms-2">-{{ value.giam_gia }}%</span>
                                </p>
                                <div class="row">
                                    <div class="col-lg-8 text-nowrap">
                                        <button class="btn btn-primary">Mua Ngay</button>
                                    </div>
                                    <div class="col-lg-4">
                                        <button class="btn btn-danger float-end"><i
                                                class="fa-solid fa-cart-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <hr class="mt-5">
                <!-- Nút chuyển trang -->
                <div class="row mt-1">
                    <div class="col text-end">
                        <!-- Nút quay lại (ẩn khi ở trang đầu tiên) -->
                        <button class="btn btn-outline-danger" @click="prevPage"
                            :disabled="currentPage === 1">←</button>
                        <!-- Hiển thị các trang liên tiếp (3 trang) -->
                        <button v-for="page in visiblePages" :key="page" class="btn"
                            :class="{ 'btn-danger': page === currentPage, 'btn-outline-danger': page !== currentPage }"
                            @click="goToPage(page)">
                            {{ page }}
                        </button>
                        <!-- Nút tiếp theo (ẩn khi ở trang cuối cùng) -->
                        <button class="btn btn-outline-danger" @click="nextPage"
                            :disabled="currentPage === totalPages">→</button>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-lg-3">
            <div class="card-header text-center">
                <h5 style="display: inline-block; margin-right: 10px;"><b>Sản Phẩm HOT</b></h5>
                <hr
                    style="border: none; border-top: 3px solid #000; display: inline-block; width: 150px; vertical-align: middle; margin: 0;">
            </div>
            <template v-for="(value, index) in listSanPham.slice(0, 5)" :key="index">
                <div class="row mb-2">
                    <div class="col-md-4">
                        <img v-bind:src="value.hinh_anh" style="height: 11vh;width: 10vh;" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <span>{{ value.ten_san_pham }}</span>
                        <p class="text-danger font-weight-bold">{{ formatVND(value.gia_ban) }}
                            <span class="text-muted"><del>{{ formatVND(value.gia_goc) }}</del></span>
                        </p>
                    </div>
                </div>
            </template>

        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            listSanPham: [],
            currentPage: 1,
            itemsPerPage: 8,
            totalPages: 10,
        }
    },
    computed: {
        // Tính toán các trang cần hiển thị (3 trang liên tiếp)
        visiblePages() {
            let pages = [];
            const maxVisiblePages = 3;  // Số trang tối đa hiển thị
            let startPage = this.currentPage - 1;  // Trang bắt đầu (trang hiện tại - 1)
            let endPage = this.currentPage + 1;    // Trang kết thúc (trang hiện tại + 1)

            // Nếu trang hiện tại là trang 1, bắt đầu từ trang 1 và hiển thị thêm 2 trang nữa
            if (this.currentPage === 1) {
                startPage = 1;
                endPage = 3;
            }

            // Kiểm tra trang bắt đầu và kết thúc không vượt quá phạm vi
            startPage = Math.max(startPage, 1);
            endPage = Math.min(endPage, this.totalPages);

            // Tạo danh sách các trang cần hiển thị
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadData();  // Cập nhật dữ liệu khi chuyển trang
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadData();  // Cập nhật dữ liệu khi chuyển trang
            }
        },

        goToPage(page) {
            this.currentPage = page;
            this.loadData();  // Cập nhật dữ liệu khi chuyển đến một trang cụ thể
        },
        updatePaginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = this.currentPage * this.itemsPerPage;
            this.paginatedSanPham = this.listSanPham.slice(start, end);  // Cập nhật danh sách sản phẩm phân trang
        },
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/admin/san-pham/data-open")
                .then((res) => {
                    this.listSanPham = res.data.data;  // Giả sử API trả về danh sách sản phẩm trong `res.data.data`
                    this.totalPages = Math.ceil(this.listSanPham.length / this.itemsPerPage);  // Cập nhật tổng số trang
                    this.updatePaginatedProducts();  // Cập nhật danh sách sản phẩm theo trang hiện tại
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },

    },
}
</script>

<style>
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-center {
    position: relative;
    display: inline-block;
}

.dropdown-center:hover .dropdown-menu {
    display: block;
    margin-top: 0;
}

.dropdown-menu {
    display: none;
    position: absolute;
    background: white;
    min-width: 150px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
</style>