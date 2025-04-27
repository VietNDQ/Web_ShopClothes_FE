<template>
    <div class="container-fuild">
        <div class="row">
            <div class="col-lg-12">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-8">
                            <h4><b> Thời Trang Mới Nhất</b></h4>
                        </div>
                        <div class="col-lg-4 text-end mt-2">
                            <i class="text-danger text-decoration-underline" data-bs-toggle="modal"
                                data-bs-target="#choseSize">
                                Hướng dẫn chọn size
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
    <div class="row">
        <div class="col-lg-9 col-md-12">
            <div class="row">
                <template v-for="(value, index) in paginatedSanPham" :key="(index)">
                    <div class="col-lg-4 col-md-4 product-grid">
                        <router-link :to="`/chi-tiet-san-pham/` + value.id + '-' + value.slug_san_pham">
                            <div class="card" style="height: 96%;">
                                <img v-bind:src="value.hinh_anh" class="card-img-top" style="height: 65%;">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-4 text-nowrap">
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
                    </router-link>
                    </div>
                </template>
                <!-- Nút chuyển trang -->
                <div class="row mt-1">
                    <hr class="mt-5">
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
                    style="border: none; border-top: 3px solid #000; display: inline-block; width: 130px; vertical-align: middle; margin: 0;">
            </div>
            <template v-for="(value, index) in listSanPham.slice(0, 5)" :key="index">
                <router-link :to="`/chi-tiet-san-pham/` + value.id + '-' + value.slug_san_pham">
                    <div class="row mb-2">
                    <div class="col-md-4">
                        <img v-bind:src="value.hinh_anh" style="height:70px;width:100%;" class="img-fluid">
                    </div>
                    <div class="col-md-8 mt-3">
                        <span>{{ value.ten_san_pham }}</span>
                        <p class="text-danger font-weight-bold">{{ formatVND(value.gia_ban) }}
                            <span class="text-muted"><del>{{ formatVND(value.gia_goc) }}</del></span>
                        </p>
                    </div>
                </div>
                </router-link>
            </template>
        </div>
    </div>
    <!-- Hướng dẫn cho size -->
    <div class="modal fade" id="choseSize" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"><b>Hướng dẫn chọn size</b></h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"> <span style="font-size:14px">Nếu bạn băn khoăn không biết chọn size nào cho phù
                        hợp với cân nặng và chiều cao của mình, đừng lo lắng! Hãy xem bảng hướng dẫn chọn size bên dưới
                        mà&nbsp;<span style="color:rgb(255, 0, 0)">Shop</span>&nbsp;tư vấn riêng dành cho bạn</span>
                    <div style="text-align:center">&nbsp;</div>
                    <div style="text-align:center"><img
                            src="https://4menshop.com/images/2025/02/20250225_942b24227803333462ad0a836de59c55_1740467669.png"
                            class="img-fluid" alt="Hướng dẫn chọn size - 1"><br> <br> <img
                            src="https://4menshop.com/images/2025/02/20250225_ce158bd0367fb835c4126585331a7c66_1740467669.png"
                            class="img-fluid" alt="Hướng dẫn chọn size - 2"><br> &nbsp;</div>
                    <div style="text-align:center"><img
                            src="https://4menshop.com/images/2016/12/20161226_ac1f530b18a20a327758473fa4930fc7_1482759836.jpg"
                            class="img-fluid" alt="Hướng dẫn chọn size - 3"></div> <span style="font-size:14px">Bảng
                        hướng dẫn chọn size
                        trên là bảng hướng dẫn dựa trên kinh nghiệm nhiều năm của Shop theo khảo sát nhu cầu sở thích
                        của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có những trường hợp ngoại lệ phụ thuộc theo vóc
                        dáng, sở thích của từng người. Ví dụ có người thích mặc ôm, có người thích mặc rộng...<br> <br>
                        Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp? Hãy liên hệ ngay với Bộ phận
                        Chăm sóc khách hàng của Shop qua&nbsp;Hotline <strong>(09)99 90 999</strong>&nbsp;để được hỗ
                        trợ thêm.</span>
                </div>
                <div class="modal-footer bg-cnter">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ĐÓNG CỬA SỔ</button>
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
            listSanPham: [],
            paginatedSanPham: [], // Định nghĩa biến paginatedSanPham
            currentPage: 1,
            itemsPerPage: 9,
            totalPages: 10,
        };
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
                .get("http://127.0.0.1:8000/api/home-page/san-pham/data-open")
                .then((res) => {
                    this.listSanPham = res.data.data;  
                    this.totalPages = Math.ceil(this.listSanPham.length / this.itemsPerPage);
                    this.updatePaginatedProducts();
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