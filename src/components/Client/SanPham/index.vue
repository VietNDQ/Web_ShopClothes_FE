<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card-header">
                    <div class="row">
                        <div class="col-lg-8">
                            <h4><b>Thời Trang Mới Nhất</b></h4>
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
        <div class="row">
            <div class="col-lg-9 col-md-12">
                <div class="row">
                    <template v-for="(value, index) in paginatedSanPham" :key="index">
                        <div class="col-lg-4 col-md-4 product-grid">
                            <div class="card" style="height: 96%;">
                                <router-link :to="`/chi-tiet-san-pham/` + value.id + '-' + value.slug_san_pham">
                                    <img v-bind:src="value.hinh_anh" class="card-img-top"
                                        style="height: 45vh; background-size: cover; background-repeat: no-repeat;">
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
                                        <span class="text-danger fw-bold text-nowrap">
                                            Giá bán: <span>{{ formatVND(value.gia_ban) }}</span>
                                            <span class="badge bg-warning text-dark ms-2">-{{ value.giam_gia }}%</span>
                                        </span>
                                    </div>
                                </router-link>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-8 text-nowrap">
                                            <button data-bs-toggle="modal" data-bs-target="#chiTietSanPhamModal"
                                                @click="openProductModal(value)" class="btn btn-primary">Mua Ngay</button>
                                        </div>
                                        <div class="col-lg-4">
                                            <button data-bs-toggle="modal" data-bs-target="#chiTietSanPhamModal"
                                                class="btn btn-danger float-end" @click="openProductModal(value)">
                                                <i class="fa-solid fa-cart-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!-- Nút chuyển trang -->
                    <div class="row mt-1">
                        <hr class="mt-5">
                        <div class="col text-end">
                            <button class="btn btn-outline-danger" @click="prevPage"
                                :disabled="currentPage === 1">←</button>
                            <button v-for="page in visiblePages" :key="page" class="btn"
                                :class="{ 'btn-danger': page === currentPage, 'btn-outline-danger': page !== currentPage }"
                                @click="goToPage(page)">
                                {{ page }}
                            </button>
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
                    <div class="modal-body">
                        <span style="font-size:14px">Nếu bạn băn khoăn không biết chọn size nào cho phù hợp với cân nặng
                            và
                            chiều cao của mình, đừng lo lắng! Hãy xem bảng hướng dẫn chọn size bên dưới mà <span
                                style="color:rgb(255, 0, 0)">Shop</span> tư vấn riêng dành cho bạn</span>
                        <div style="text-align:center"></div>
                        <div style="text-align:center"><img
                                src="https://4menshop.com/images/2025/02/20250225_942b24227803333462ad0a836de59c55_1740467669.png"
                                class="img-fluid" alt="Hướng dẫn chọn size - 1"><br><br><img
                                src="https://4menshop.com/images/2025/02/20250225_ce158bd0367fb835c4126585331a7c66_1740467669.png"
                                class="img-fluid" alt="Hướng dẫn chọn size - 2"><br></div>
                        <div style="text-align:center"><img
                                src="https://4menshop.com/images/2016/12/20161226_ac1f530b18a20a327758473fa4930fc7_1482759836.jpg"
                                class="img-fluid" alt="Hướng dẫn chọn size - 3"></div>
                        <span style="font-size:14px">Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa trên kinh
                            nghiệm nhiều
                            năm của Shop theo khảo sát nhu cầu sở thích của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ
                            có
                            những trường hợp ngoại lệ phụ thuộc theo vóc dáng, sở thích của từng người. Ví dụ có người
                            thích mặc
                            ôm, có người thích mặc rộng...<br><br>
                            Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp? Hãy liên hệ ngay với Bộ
                            phận Chăm
                            sóc khách hàng của Shop qua Hotline <strong>(09)99 90 999</strong> để được hỗ trợ
                            thêm.</span>
                    </div>
                    <div class="modal-footer bg-cnter">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ĐÓNG CỬA SỔ</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Chi Tiet San Pham Modal -->
        <div class="modal fade" id="chiTietSanPhamModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true" ref="chiTietSanPhamModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Sản Phẩm</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row" v-if="chi_tiet_san_pham && chi_tiet_san_pham.id">
                            <div class="col-lg-4">
                                <div class="card image-container">
                                    <div class="image-scroll">
                                        <template v-if="Array.isArray(chi_tiet_san_pham.hinh_anh)">
                                            <img v-for="(image, index) in chi_tiet_san_pham.hinh_anh" :key="index"
                                                v-bind:src="image" class="img-fluid"
                                                style="height: 40vh; width: 38vh; margin: 5px; object-fit: cover;">
                                        </template>
                                        <img v-else v-bind:src="chi_tiet_san_pham.hinh_anh" class="img-fluid"
                                            style="height: 40vh; width: 38vh;" alt="Hình sản phẩm">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="card">
                                    <div class="card-body">
                                        <h4>{{ chi_tiet_san_pham.ten_san_pham || 'Tên sản phẩm không có' }}</h4>
                                        <div class="d-flex align-items-center mb-2">
                                            <div class="text-warning me-2">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                            <div class="text-muted">
                                                (85 đánh giá / 102 lượt mua)
                                            </div>
                                        </div>
                                        <h5>Giá bán: <b class="text-danger">{{ formatVND(chi_tiet_san_pham.gia_ban || 0)
                                        }}</b>
                                            <span class="text-secondary">Giá gốc:
                                                <s>{{ formatVND(chi_tiet_san_pham.gia_goc || 0) }}</s><span
                                                    class="text-danger ms-2">(Giảm {{ chi_tiet_san_pham.giam_gia || 0
                                                    }}%)</span>
                                            </span>
                                        </h5>
                                        <p v-if="chi_tiet_san_pham.tong_sl_ton <= 0" class="text-danger">Hết hàng</p>
                                        <p v-else-if="chi_tiet_san_pham.tong_sl_ton" class="text-success">Còn {{
                                            chi_tiet_san_pham.tong_sl_ton }} sản phẩm</p>
                                        <p v-else class="text-warning">Số lượng không xác định</p>
                                        <hr>
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <h6>SIZE <i class="text-danger text-decoration-underline"
                                                        data-bs-toggle="modal" data-bs-target="#choseSize">Hướng dẫn
                                                        chọn size</i></h6>
                                                <div class="size-buttons d-flex gap-2 flex-wrap">
                                                    <button type="button" class="btn btn-sm" :class="{
                                                        'btn-primary': them_gio_hang.kich_thuoc === size,
                                                        'btn-outline-primary': them_gio_hang.kich_thuoc !== size && chi_tiet_san_pham.kich_thuoc_distinct.length,
                                                        'btn-secondary disabled': !chi_tiet_san_pham.kich_thuoc_distinct.length
                                                    }" v-for="(size, index) in chi_tiet_san_pham.kich_thuoc_distinct" :key="index"
                                                        @click="them_gio_hang.kich_thuoc = size"
                                                        :disabled="!chi_tiet_san_pham.kich_thuoc_distinct.length">
                                                        {{ size }}
                                                    </button>
                                                </div>
                                                <p v-if="!chi_tiet_san_pham.kich_thuoc_distinct.length"
                                                    class="text-danger">
                                                    Không có kích
                                                    thước khả
                                                    dụng</p>
                                            </div>
                                            <div class="col-lg-6">
                                                <h6>Màu Sắc</h6>
                                                <div class="color-buttons d-flex gap-2 flex-wrap">
                                                    <button type="button" class="btn btn-sm" :class="{
                                                        'btn-primary': them_gio_hang.mau_sac === color,
                                                        'btn-outline-primary': them_gio_hang.mau_sac !== color && chi_tiet_san_pham.mau_sac_distinct.length,
                                                        'btn-secondary disabled': !chi_tiet_san_pham.mau_sac_distinct.length
                                                    }" v-for="(color, index) in chi_tiet_san_pham.mau_sac_distinct" :key="index"
                                                        @click="them_gio_hang.mau_sac = color"
                                                        :disabled="!chi_tiet_san_pham.mau_sac_distinct.length">
                                                        {{ color }}
                                                    </button>
                                                </div>
                                                <p v-if="!chi_tiet_san_pham.mau_sac_distinct.length"
                                                    class="text-danger">Không
                                                    có màu sắc
                                                    khả dụng
                                                </p>
                                                <h6 class="mt-2">SỐ LƯỢNG</h6>
                                                <input type="number" step="1" class="form-control"
                                                    v-model.number="them_gio_hang.so_luong" min="1"
                                                    :max="chi_tiet_san_pham.tong_sl_ton || 999">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center text-danger">
                            Không có thông tin sản phẩm để hiển thị.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="themGioHang">Thêm
                            giỏ
                            hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import emitter from "@/eventBus";
export default {
    data() {
        return {
            them_gio_hang: {
                id_khach_hang: "",
                id_san_pham: "",
                kich_thuoc: "",
                mau_sac: "",
                so_luong: 1,
                tong_tien: 0,
                ghi_chu: null,
                tinh_trang: 0,
                ngay_dat: "",
                trang_thai: "",
            },
            chi_tiet_san_pham: {
                kich_thuoc_distinct: [],
                mau_sac_distinct: [],
                hinh_anh: [],
                tong_sl_ton: 0,
            },
            listSanPham: [],
            paginatedSanPham: [],
            currentPage: 1,
            itemsPerPage: 9,
            totalPages: 1,
        };
    },
    computed: {
        visiblePages() {
            const pages = [];
            const maxVisiblePages = 3;
            let startPage = this.currentPage - 1;
            let endPage = this.currentPage + 1;

            if (this.currentPage === 1) {
                startPage = 1;
                endPage = 3;
            }

            startPage = Math.max(startPage, 1);
            endPage = Math.min(endPage, this.totalPages);

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
        openProductModal(product) {
            this.chi_tiet_san_pham = {
                id: product.id || '',
                ten_san_pham: product.ten_san_pham || 'Tên sản phẩm không có',
                hinh_anh: Array.isArray(product.hinh_anh) ? product.hinh_anh : [product.hinh_anh || ''],
                gia_ban: product.gia_ban || 0,
                gia_goc: product.gia_goc || 0,
                giam_gia: product.giam_gia || 0,
                tong_sl_ton: product.tong_sl_ton || 0,
                kich_thuoc_distinct: product.kich_thuoc_distinct || [],
                mau_sac_distinct: product.mau_sac_distinct || [],
            };
            this.them_gio_hang.id_san_pham = product.id || '';
            this.them_gio_hang.kich_thuoc = '';
            this.them_gio_hang.mau_sac = '';
            this.them_gio_hang.so_luong = 1;
        },
        themGioHang() {
            const payload = {
                id_san_pham: this.chi_tiet_san_pham.id,
                so_luong: this.them_gio_hang.so_luong,
                kich_thuoc: this.them_gio_hang.kich_thuoc,
                mau_sac: this.them_gio_hang.mau_sac,
                ghi_chu: this.them_gio_hang.ghi_chu,
            };
            axios.post('http://127.0.0.1:8000/api/khach-hang/them-don-hang', payload, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.them_gio_hang.kich_thuoc = '';
                        this.them_gio_hang.mau_sac = '';
                        this.them_gio_hang.so_luong = 1;
                        this.them_gio_hang.id_san_pham = '';
                        emitter.emit('cap-nhat-gio-hang');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi thêm giỏ hàng:', error.response.data);
                    this.$toast.error(error.response.data.message || 'Đã xảy ra lỗi khi thêm giỏ hàng');
                });
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadData();
            }
        },
        goToPage(page) {
            this.currentPage = page;
            this.loadData();
        },
        updatePaginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = this.currentPage * this.itemsPerPage;
            this.paginatedSanPham = this.listSanPham.slice(start, end);
        },
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/san-pham/data-open")
                .then((res) => {
                    this.listSanPham = res.data.data || [];
                    this.totalPages = Math.ceil(this.listSanPham.length / this.itemsPerPage);
                    this.updatePaginatedProducts();
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", {
                        message: error.message,
                        status: error.response?.status,
                        data: error.response?.data,
                    });
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
    },
};
</script>

<style></style>




