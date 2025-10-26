<template>
    <div class="row">
        <div class="col-lg-5">
            <div class="card image-container" style="height: 70%;">
                <div class="image-scroll">
                    <template v-for="(image, index) in chi_tiet_san_pham.hinh_anh" :key="index">
                        <img v-bind:src="image" class="img-fluid" style="height: 70%;">
                    </template>
                </div>
            </div>
        </div>
        <div class="col-lg-7">
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
                                    data-bs-target="#choseSize">Hướng dẫn chọn size</i></h6>
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
                            <p v-if="!chi_tiet_san_pham.kich_thuoc_distinct.length" class="text-danger">Không có kích
                                thước khả
                                dụng</p>
                        </div>
                        <div class="col-lg-6">
                            <h6>Màu Sắc</h6>
                            <div class="color-buttons d-flex gap-2 flex-wrap">
                                <button type="button" class="btn btn-sm" :class="{
                                    'btn-danger': them_gio_hang.mau_sac === color,
                                    'btn-outline-primary': them_gio_hang.mau_sac !== color && chi_tiet_san_pham.mau_sac_distinct.length,
                                    'btn-secondary disabled': !chi_tiet_san_pham.mau_sac_distinct.length
                                }" v-for="(color, index) in chi_tiet_san_pham.mau_sac_distinct" :key="index"
                                    @click="them_gio_hang.mau_sac = color"
                                    :disabled="!chi_tiet_san_pham.mau_sac_distinct.length">
                                    {{ color }}
                                </button>
                            </div>
                            <p v-if="!chi_tiet_san_pham.mau_sac_distinct.length" class="text-danger">Không có màu sắc
                                khả dụng
                            </p>
                            <h6 class="mt-2">SỐ LƯỢNG</h6>
                            <input type="number" step="1" class="form-control" v-model.number="them_gio_hang.so_luong"
                                min="1" :max="chi_tiet_san_pham.tong_sl_ton || 999">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <button type="button" class="btn btn-danger w-100"><i class="fa-solid fa-cart-shopping"></i>
                                MUA
                                NGAY</button>
                        </div>
                        <div class="col-lg-6">
                            <button @click="themGioHang()" type="button" class="btn btn-outline-danger w-100"><i
                                    class="fa-solid fa-plus"></i> THÊM VÀO GIỎ HÀNG</button>
                        </div>
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
                <div class="modal-body"> <span style="font-size:14px">Nếu bạn băn khoăn không biết chọn size nào cho
                        phù
                        hợp với cân nặng và chiều cao của mình, đừng lo lắng! Hãy xem bảng hướng dẫn chọn size bên
                        dưới
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
                        trên là bảng hướng dẫn dựa trên kinh nghiệm nhiều năm của Shop theo khảo sát nhu cầu sở
                        thích
                        của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có những trường hợp ngoại lệ phụ thuộc theo
                        vóc
                        dáng, sở thích của từng người. Ví dụ có người thích mặc ôm, có người thích mặc rộng...<br>
                        <br>
                        Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp? Hãy liên hệ ngay với Bộ
                        phận
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
import emitter from "@/eventBus";

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
                hinh_anh: [],
                giam_gia: 0,
                mo_ta: '',
                gia_goc: 0,
                gia_ban: 0,
                tong_sl_ton: 0,
                kich_thuoc_distinct: [],
                mau_sac_distinct: [],
            },
            them_gio_hang: {
                id_san_pham: '',
                kich_thuoc: '',
                mau_sac: '',
                so_luong: 1,
                ghi_chu: null,
            },
            idSanPham: this.$route.params.id_san_pham,
            list_san_pham_cung_danh_muc: [],
        };
    },
    mounted() {
        this.idSanPham = this.$route.params.id_san_pham.split('-')[0];
        this.loadChiTietSanPham();
        this.loadSanPhamCungDanhMuc();
    },
    watch: {
        '$route.params': {
            handler() {
                this.idSanPham = this.$route.params.id_san_pham.split('-')[0];
                this.loadChiTietSanPham();
            },
            immediate: true,
        },
    },
    methods: { 
        themGioHang() {
            const payload = {
                id_san_pham: this.chi_tiet_san_pham.id,
                so_luong: this.them_gio_hang.so_luong,
                kich_thuoc: this.them_gio_hang.kich_thuoc,
                mau_sac: this.them_gio_hang.mau_sac,
                ghi_chu: this.them_gio_hang.ghi_chu || null,
            };

            axios
                .post('http://127.0.0.1:8000/api/khach-hang/them-don-hang', payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang'),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.them_gio_hang.kich_thuoc = '';
                        this.them_gio_hang.mau_sac = '';
                        this.them_gio_hang.so_luong = 1;
                        this.them_gio_hang.ghi_chu = null;
                        emitter.emit('cap-nhat-gio-hang');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi thêm giỏ hàng:', error.response?.data);
                    this.$toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi thêm giỏ hàng');
                });
        },
        loadSanPhamCungDanhMuc() {
            axios
                .get(`http://127.0.0.1:8000/api/home-page/san-pham/cung-danh-muc`, {
                    params: {
                        id_danh_muc: this.chi_tiet_san_pham.id_danh_muc,
                        id_san_pham: this.chi_tiet_san_pham.id,
                    },
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
                .get(`http://127.0.0.1:8000/api/home-page/san-pham/chi-tiet-san-pham/${this.idSanPham}`)
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
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        },
    },
};
</script>
<style></style>