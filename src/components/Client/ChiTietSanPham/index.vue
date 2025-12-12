<template>
    <div class="row">
        <div class="col-lg-6">
            <div class="card image-container">
                <div class="image-scroll">
                    <template v-for="(image, index) in chi_tiet_san_pham.hinh_anh" :key="index">
                        <img v-bind:src="image" class="img-fluid" alt="">
                    </template>

                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <h4>{{ chi_tiet_san_pham.ten_san_pham }}</h4>
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
                    <h5>Giá bán: <b class="text-danger">{{ formatVND(chi_tiet_san_pham.gia_ban) }}</b> <span
                            class="text-secondary">Giá gốc:
                            <s>{{ formatVND(chi_tiet_san_pham.gia_goc) }}</s><span class="text-danger ms-2">(Giảm {{
                                chi_tiet_san_pham.giam_gia }}%)</span></span></h5>
                    <p v-if="chi_tiet_san_pham.tong_sl_ton <= 0" class="text-danger">Hết hàng</p>
                    <p v-else class="text-success">Còn {{ chi_tiet_san_pham.tong_sl_ton }} sản phẩm</p>
                    <hr>
                    <div class="row">
                        <div class="col-lg-6">
                            <h6>SIZE <i class="text-danger text-decoration-underline" data-bs-toggle="modal"
                                    data-bs-target="#choseSize">
                                    Hướng dẫn chọn size
                                </i>
                            </h6>
                            <select class="form-select" aria-label="Default select example">
                                <template v-for="(variant, index) in chi_tiet_san_pham.variants" :key="index">
                                    <option v-if="variant.kich_thuoc" :value="variant.kich_thuoc">{{ variant.kich_thuoc
                                    }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="col-lg-6">
                            <h6>Màu Sắc</h6>
                            <select class="form-select mb-2" aria-label="Default select example">
                                <template v-for="(variant, index) in chi_tiet_san_pham.variants" :key="index">
                                    <option v-if="variant.mau_sac" :value="variant.mau_sac">{{ variant.mau_sac }}
                                    </option>
                                </template>
                            </select>
                            <h6>SỐ LƯỢNG</h6>
                            <input type="number" step="1" class="form-control">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <button type="button" class="btn btn-danger w-100"><i class="fa-solid fa-cart-shopping"></i>
                                MUA NGAY</button>
                        </div>
                        <div class="col-lg-6">
                            <button type="button" class="btn btn-outline-danger w-100"><i class="fa-solid fa-plus"></i>
                                THÊM VÀO GIỎ HÀNG</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="mainTabs" role="tablist">
                        <li class="nav-item">
                            <button class="nav-link active" id="keywords-tab" data-bs-toggle="tab"
                                data-bs-target="#keywords" type="button" role="tab">TỪ KHÓA</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" id="rating-tab" data-bs-toggle="tab" data-bs-target="#rating"
                                type="button" role="tab">ĐÁNH GIÁ</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" id="comments-tab" data-bs-toggle="tab" data-bs-target="#comments"
                                type="button" role="tab">BÌNH LUẬN</button>
                        </li>
                    </ul>
                    <div class="tab-content mt-3" id="mainTabsContent">
                        <div class="tab-pane fade show active" id="keywords" role="tabpanel">
                            N/A
                        </div>
                        <div class="tab-pane fade" id="rating" role="tabpanel">
                            <h5>Đánh giá</h5>
                            <div class="d-flex align-items-center">
                                <div class="text-warning me-2">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                            </div>
                            <hr>
                            <h5>Gửi đánh giá của bạn</h5>
                            <label for="">
                                <h6>Họ và tên</h6>
                            </label>
                            <input type="text" class="form-control mb-2" style="width: 30%;" id="Họ và tên"
                                placeholder="Họ và tên">
                            <label for="">
                                <h6>Nội Dung Đánh giá</h6>
                            </label>
                            <textarea class="form-control mb-2" style="width: 40%;" placeholder="Đánh giá"
                                rows="3"></textarea>
                            <button class="btn btn-dark mt-2">Gửi đánh giá</button>
                        </div>
                        <div class="tab-pane fade" id="comments" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h5>0 bình luận</h5>
                                </div>
                                <div class="col-lg-6">
                                    <div class="d-flex justify-content-end align-items-center">
                                        <p class="mb-0">Sắp xếp theo:</p>
                                        <select class="form-select w-auto">
                                            <option selected>Cũ nhất</option>
                                            <option>Mới nhất</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <textarea class="form-control mb-3 mt-3" placeholder="Bình luận..." rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card-header">
                    <h4><b>Sản Phẩm Cùng Danh Mục</b></h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <template v-for="(value, index) in list_san_pham_cung_danh_muc" :key="index">
                            <template v-if="index < 4">
                                <div class="col-lg-3 col-md-4 mt-2 mb-2 ">
                                    <router-link :to="`/chi-tiet-san-pham/` + value.id + '-' + value.slug_san_pham">
                                        <div class="" style="height: 90%;">
                                            <img v-bind:src="value.hinh_anh" class="card-img-top img-fluid"
                                                style="height: 80%">
                                            <div class="card-body text-center mt-3">
                                                <h5><b>{{ value.ten_san_pham }}</b></h5>
                                                <div class="d-flex justify-content-center">
                                                    <p class="text-danger fw-bold text-nowrap">
                                                        Giá bán: <span> {{ formatVND(value.gia_ban) }}</span>
                                                    </p>
                                                    <span class="text-muted text-decoration-line-through ms-2">
                                                        Giá gốc: <span class="fw-bold"> {{ formatVND(value.gia_goc)
                                                            }}</span>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </template>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Modal Hướng dẫn cho size -->
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
    props: ['id_san_pham', 'slug_san_pham'],
    data() {
        return {
            danh_muc: {},
            chi_tiet_san_pham: {
                id: null,
                ten_thuong_hieu: '',
                ten_danh_muc: '',
                ten_san_pham: '',
                slug_san_pham: '',
                kich_thuoc: '',
                hinh_anh: '',
                mau_sac: '',
                giam_gia: 0,
                mo_ta: '',
                gia_goc: 0,
                gia_ban: 0,
                tong_sl_ton: 0,
                san_pham_lien_quan: [],
            },
            idSanPham: this.$route.params.id_san_pham,
            list_san_pham_cung_danh_muc: [],
        }
    },
    mounted() {
        this.idSanPham = this.$route.params.id_san_pham.split('-')[0];
        this.loadChiTietSanPham();
    },
    watch: {
        '$route.params': {
            handler() {
                this.idSanPham = this.$route.params.id_san_pham.split('-')[0];
                this.loadChiTietSanPham();
            },
            immediate: true
        }
    },
    methods: {
        loadSanPhamCungDanhMuc() {
            axios.get(`http://127.0.0.1:8000/api/home-page/san-pham/cung-danh-muc`, {
                params: {
                    id_danh_muc: this.chi_tiet_san_pham.id_danh_muc,
                    id_san_pham: this.chi_tiet_san_pham.id
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_san_pham_cung_danh_muc = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                });
        },

        loadChiTietSanPham() {
            axios
                .get("http://127.0.0.1:8000/api/home-page/san-pham/chi-tiet-san-pham/" + this.idSanPham)
                .then((res) => {
                    if (res.data.status) {
                        this.chi_tiet_san_pham = res.data.data;
                        this.$nextTick(() => {
                            this.loadSanPhamCungDanhMuc();
                        });
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
        }
        ,

        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number,)
        },

    },
}
</script>
<style></style>
