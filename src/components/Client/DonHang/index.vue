<template>
    <div class="row">
        <div class="col-lg-5">
            <div class="mb-3">
                <label class="form-label"><b>Chọn Địa Chỉ Nhận Hàng</b></label>
                <template v-if="list_dia_chi.length == 0">
                    <label for="">Bạn chưa có địa chỉ nhận hàng. Vui lòng thêm để đặt hàng</label>
                </template>
                <select v-else v-model="xac_nhan_dat_hang.id_dia_chi_giao_hang" class="form-select">
                    <template v-for="(value, index) in list_dia_chi" :key="index">
                        <option :value="value.id">{{ value.ten_nguoi_nhan }}, {{ value.so_dien_thoai }}, {{
                            value.dia_chi }}, {{ value.ten_tinh_thanh }}, {{ value.ten_quan_huyen }}, {{
                                value.ten_phuong_xa }}</option>
                    </template>
                </select>
            </div>
            <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#addDiaChiModal"><i
                    class="fa-solid fa-location-dot"></i>Thêm Địa Chỉ Nhận Hàng</button>
            <div class="col-lg-6 w-100">
                <h5 class="mb-3 mt-3">Hình thức thanh toán</h5>
                <div class="list-group w-100">
                    <label class="list-group-item d-flex align-items-center">
                        <input class="form-check-input me-2" type="radio" name="paymentMethod" value="0"
                            v-model="xac_nhan_dat_hang.phuong_thuc_thanh_toan" checked />
                        <i class="fa-solid fa-van-shuttle fa-2x me-2"></i>
                        <div>
                            <strong class="text-center">COD</strong><br />
                            <small>Thanh toán khi nhận hàng</small>
                        </div>
                    </label>
                    <label class="list-group-item d-flex align-items-center">
                        <input class="form-check-input me-2" type="radio" name="paymentMethod" value="1"
                            v-model="xac_nhan_dat_hang.phuong_thuc_thanh_toan" />
                        <i class="fa-solid fa-money-bill fa-2x me-2"></i>
                        <div>
                            <strong>Chuyển Khoản</strong><br />
                            <small>Thanh toán online</small>
                        </div>
                    </label>
                </div>
                <button class="btn btn-danger btn-lg w-100 mt-3" @click="xacNhanDatHang">
                    Đặt Hàng
                </button>
            </div>
        </div>

        <div class="col-lg-7" style="padding: 0;">
            <div class="card-header"
                style="background-color: #f8f9fa; border-bottom: 2px solid #dc3545; padding: 15px;">
                <h5 style="color: #dc3545; font-weight: 600; margin: 0;">Giỏ hàng có <i style="color: #333;">{{
                    tong_so_luong }}</i> sản phẩm</h5>
            </div>
            <div
                style="display: flex; justify-content: space-between; font-weight: 500; color: #333; padding: 10px 15px; border-bottom: 1px solid #dee2e6; background-color: #f1f1f1;">
                <span style="flex: 2; padding: 0 5px;">Sản Phẩm</span>
                <span style="flex: 1; text-align: right; padding: 0 5px;">Đơn Giá</span>
                <span style="flex: 1; text-align: center; padding: 0 5px;">Số Lượng</span>
                <span style="flex: 1; text-align: right; padding: 0 5px;">Thành Tiền</span>
                <span style="flex: 1; text-align: right; padding: 0 5px;">Thao Tác</span>
            </div>
            <div style="padding: 0 15px;">
                <div v-if="list_don_hang.length === 0" class="text-muted"
                    style="text-align: center; padding: 30px 0; color: #6c757d; font-size: 1.1rem;">
                    Không có sản phẩm nào trong giỏ hàng
                </div>
                <div v-else style="max-height: 400px; overflow-y: auto;">
                    <div v-for="(value, index) in list_don_hang" :key="value.id"
                        style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; transition: all 0.3s ease;">
                        <div style="flex: 2; display: flex; align-items: center; padding: 0 5px;">
                            <img :src="value.image"
                                style="width: 50px; height: 50px; object-fit: cover; border: 1px solid #eee; margin-right: 10px;"
                                alt="Ảnh" />
                            <div>
                                <h6
                                    style="font-size: 1rem; font-weight: 500; color: #333; margin: 0; line-height: 1.2;">
                                    {{ value.ten_san_pham }}</h6>
                                <p style="font-size: 0.85rem; color: #6c757d; margin: 3px 0 0; line-height: 1.2;">{{
                                    value.mau_sac }} / {{ value.kich_thuoc }}</p>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: right; padding: 0 5px;">
                            <h6 style="font-size: 1rem; font-weight: 500; color: #dc3545; margin: 0; line-height: 1.2;">
                                {{ formatVND(value.don_gia) }}</h6>
                        </div>
                        <div style="flex: 1; text-align: center; padding: 0 5px;">
                            <div class="d-flex align-items-center justify-content-center"
                                style="width: 100px; margin: 0 auto; border: 1px solid #ced4da; border-radius: 4px; overflow: hidden;">
                                <button type="button" class="btn btn-warning btn-sm"
                                    style="padding: 2px 4px; background-color: #ffc107; border: none; color: #fff; font-size: 1rem; border-radius: 0;"
                                    @click="updateQuantity(value, value.so_luong - 1)">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <input min="1" :value="value.so_luong" class="form-control text-center"
                                    style="width: 40px; border: none; padding: 2px; font-size: 0.9rem; background-color: #fff; text-align: center;"
                                    @change="updateQuantity(value, $event.target.value)" />
                                <button type="button" class="btn btn-danger btn-sm"
                                    style="padding: 2px 4px; background-color: #dc3545; border: none; color: #fff; font-size: 1rem; border-radius: 0;"
                                    @click="updateQuantity(value, value.so_luong + 1)">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div style="flex: 1; text-align: right; padding: 0 5px;">
                            <h6 style="font-size: 1rem; font-weight: 500; color: #dc3545; margin: 0; line-height: 1.2;">
                                {{ formatVND(value.don_gia * value.so_luong) }}</h6>
                        </div>
                        <div style="flex: 1; text-align: right; padding: 0 5px;">
                            <button @click="xoaDonHang(value.id)" class="btn btn-danger btn-sm"
                                style="padding: 2px 10px; background-color: #dc3545; border: none; border-radius: 4px; color: #fff; font-size: 0.9rem; line-height: 1.2;">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 0;">
            <!-- Voucher Section -->
            <div style="padding: 15px; border-top: 1px solid #dee2e6; background-color: #f8f9fa;">
                <div class="mb-3">
                    <label class="form-label" style="font-weight: 600; color: #333;">
                        <i class="fa-solid fa-ticket-alt me-2"></i>Mã giảm giá
                    </label>
                    <div class="d-flex gap-2">
                        <input 
                            v-model="ma_voucher" 
                            type="text" 
                            class="form-control" 
                            placeholder="Nhập mã voucher"
                            @keyup.enter="kiemTraVoucher"
                            :disabled="voucherApplied"
                        >
                        <button 
                            v-if="!voucherApplied"
                            @click="kiemTraVoucher" 
                            class="btn btn-primary"
                            :disabled="!ma_voucher || isLoadingVoucher"
                        >
                            <span v-if="isLoadingVoucher">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            </span>
                            <span v-else>Áp dụng</span>
                        </button>
                        <button 
                            v-else
                            @click="xoaVoucher" 
                            class="btn btn-danger"
                        >
                            <i class="fa-solid fa-times me-1"></i>Xóa
                        </button>
                    </div>
                    <div v-if="voucherInfo" class="mt-2">
                        <div class="alert alert-success mb-0 py-2" style="font-size: 0.9rem;">
                            <i class="fa-solid fa-check-circle me-2"></i>
                            <strong>{{ voucherInfo.ten_voucher }}</strong>
                            <br>
                            <small>{{ voucherInfo.mo_ta }}</small>
                        </div>
                    </div>
                    <div v-if="voucherError" class="mt-2">
                        <div class="alert alert-danger mb-0 py-2" style="font-size: 0.9rem;">
                            <i class="fa-solid fa-exclamation-circle me-2"></i>
                            {{ voucherError }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- Summary Section -->
            <div style="padding: 15px; border-top: 1px solid #dee2e6;">
                <div v-if="tong_tien_goc > 0" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #6c757d; font-size: 0.95rem;">Tổng tiền gốc:</span>
                    <span style="color: #6c757d; font-size: 0.95rem; text-decoration: line-through;">{{ formatVND(tong_tien_goc) }}</span>
                </div>
                <div v-if="tien_giam_gia > 0" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #28a745; font-size: 0.95rem;">
                        <i class="fa-solid fa-tag me-1"></i>Giảm giá:
                    </span>
                    <span style="color: #28a745; font-size: 0.95rem; font-weight: 600;">-{{ formatVND(tien_giam_gia) }}</span>
                </div>
                <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 10px; padding-top: 10px; border-top: 2px solid #dee2e6;">
                    <h5 style="font-weight: 600; color: #333; margin: 0 15px 0 0; font-size: 1.2rem;">Tổng tiền:</h5>
                    <h5 style="font-weight: 600; color: #dc3545; margin: 0; font-size: 1.2rem;">{{ formatVND(thanh_tien) }}</h5>
                </div>
            </div>
        </div>
    </div>
    <!--Thêm địa chỉ Modal -->
    <div class="modal fade" id="addDiaChiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Địa Chỉ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Tên Người Nhận</label>
                    <input v-model="create_dia_chi.ten_nguoi_nhan" type="text" class="form-control mt-2 mb-2">
                    <label for="">Số Điện Thoại <span class="text-danger">*</span></label>
                    <input 
                        v-model="create_dia_chi.so_dien_thoai" 
                        type="tel" 
                        class="form-control mt-2 mb-2"
                        placeholder="Nhập số điện thoại (10-11 chữ số)"
                        pattern="[0-9]{10,11}"
                        maxlength="11"
                        @input="formatPhoneNumber"
                    >
                    <label for="">Địa Chỉ Cụ Thể</label>
                    <input v-model="create_dia_chi.dia_chi" type="text" class="mt-2 mb-2 form-control"
                        placeholder="Nhập địa chỉ cụ thể">
                    <label for="">Chọn Tỉnh/Thành Phố</label>
                    <select v-model="create_dia_chi.id_tinh_thanh" @change="loadQuanHuyen(create_dia_chi.id_tinh_thanh)"
                        class="mt-2 mb-2 form-select">
                        <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                        <template v-for="(item, index) in list_tinh_thanh" :key="index">
                            <option :value="item.id">{{ item.ten_tinh_thanh }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Quận/Huyện</label>
                    <select v-on:change="loadPhuongXa(create_dia_chi.id_quan_huyen)"
                        v-model="create_dia_chi.id_quan_huyen" name="" id="" class="mt-2 mb-2 form-select" :disabled="!create_dia_chi.id_tinh_thanh">
                        <option value="">-- Chọn Quận/Huyện --</option>
                        <template v-for="(item, index) in list_quan_huyen" :key="index">
                            <option :value="item.id">{{ item.ten_quan_huyen }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Phường/Xã</label>
                    <select v-model="create_dia_chi.id_phuong_xa" name="" class="form-select" id="" :disabled="!create_dia_chi.id_quan_huyen">
                        <option value="">-- Chọn Phường/Xã --</option>
                        <template v-for="(item, index) in list_phuong_xa" :key="index">
                            <option :value="item.id">{{ item.ten_phuong_xa }}</option>
                        </template>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="addDiaChi()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                        Địa Chỉ</button>
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
            list_don_hang: [],
            tong_so_luong: 0,
            thanh_tien: 0,
            list_dia_chi: [],
            list_tinh_thanh: [],
            list_quan_huyen: [],
            list_phuong_xa: [],
            create_dia_chi: {
                id_tinh_thanh: '',
                id_khach_hang: '',
                id_quan_huyen: '',
                id_phuong_xa: '',
                dia_chi: '',
                toa_do_x: '',
                toa_do_y: '',
                ten_nguoi_nhan: '',
                so_dien_thoai: '',
            },
            xac_nhan_dat_hang: {
                id_dia_chi_giao_hang: '',
                ghi_chu:"",
                phuong_thuc_thanh_toan: '1', // Giá trị mặc định là 1 (COD)
                chi_tiet_don_hang: []
            },
            ma_voucher: '',
            voucherInfo: null,
            voucherError: '',
            voucherApplied: false,
            isLoadingVoucher: false,
            tong_tien_goc: 0,
            tien_giam_gia: 0,
        }
    },
    mounted() {
        this.loadDonHang();
        this.loadDiaChi();
        this.loadTinhThanh();
    },
    methods: {
        kiemTraVoucher() {
            if (!this.ma_voucher || !this.ma_voucher.trim()) {
                this.voucherError = 'Vui lòng nhập mã voucher!';
                return;
            }

            // Sử dụng tổng tiền gốc nếu có, nếu không thì dùng tổng tiền hiện tại
            const tongTienHienTai = this.tong_tien_goc > 0 ? this.tong_tien_goc : this.thanh_tien;

            this.isLoadingVoucher = true;
            this.voucherError = '';
            
            axios
                .get('http://127.0.0.1:8000/api/voucher/check', {
                    params: {
                        ma_voucher: this.ma_voucher.trim(),
                        tong_tien: tongTienHienTai
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.voucherInfo = res.data.data;
                        this.tien_giam_gia = res.data.tien_giam_gia || 0;
                        // Lưu tổng tiền gốc nếu chưa có
                        if (this.tong_tien_goc <= 0) {
                            this.tong_tien_goc = tongTienHienTai;
                        }
                        this.thanh_tien = res.data.tong_tien_sau_giam || (tongTienHienTai - this.tien_giam_gia);
                        this.voucherApplied = true;
                        this.voucherError = '';
                    } else {
                        this.voucherError = res.data.message || 'Mã voucher không hợp lệ!';
                        this.voucherInfo = null;
                        this.voucherApplied = false;
                        this.tien_giam_gia = 0;
                        // Không reset tong_tien_goc nếu đã có
                    }
                })
                .catch((error) => {
                    this.voucherError = error.response?.data?.message || 'Đã xảy ra lỗi khi kiểm tra voucher!';
                    this.voucherInfo = null;
                    this.voucherApplied = false;
                    this.tien_giam_gia = 0;
                    // Không reset tong_tien_goc nếu đã có
                })
                .finally(() => {
                    this.isLoadingVoucher = false;
                });
        },
        xoaVoucher() {
            this.ma_voucher = '';
            this.voucherInfo = null;
            this.voucherError = '';
            this.voucherApplied = false;
            this.tien_giam_gia = 0;
            // Khôi phục tổng tiền về giá trị gốc
            if (this.tong_tien_goc > 0) {
                this.thanh_tien = this.tong_tien_goc;
            }
            this.tong_tien_goc = 0;
        },
        xacNhanDatHang() {
            this.xac_nhan_dat_hang.chi_tiet_don_hang = this.list_don_hang.map(item => ({
                id_san_pham: item.id_san_pham,
                so_luong: item.so_luong,
                don_gia: item.don_gia,
                mau_sac: item.mau_sac,
                kich_thuoc: item.kich_thuoc
            }));

            // Thêm mã voucher vào request nếu có
            const payload = {
                ...this.xac_nhan_dat_hang,
                ma_voucher: this.voucherApplied ? this.ma_voucher.trim() : null
            };

            // Send order confirmation to backend
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/xac-nhan-dat-hang', payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        // Clear cart and reload data
                        emitter.emit('cap-nhat-gio-hang');
                        // Reset form
                        this.xac_nhan_dat_hang = {
                            id_dia_chi_giao_hang: '',
                            phuong_thuc_thanh_toan: '1',
                            chi_tiet_don_hang: []
                        };
                        // Reset voucher
                        this.xoaVoucher();
                        
                        // Kiểm tra phương thức thanh toán
                        const phuongThucThanhToan = parseInt(payload.phuong_thuc_thanh_toan);
                        if (phuongThucThanhToan === 1) {
                            // Chuyển khoản - chuyển đến trang thanh toán
                            const maDonHang = res.data.ma_don_hang || res.data.data?.ma_don_hang;
                            if (maDonHang) {
                                setTimeout(() => {
                                    this.$router.push({
                                        path: '/thanh-toan-chuyen-khoan',
                                        query: { ma_don_hang: maDonHang }
                                    });
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    this.$router.push('/lich-su-mua-hang');
                                }, 1000);
                            }
                        } else {
                            // COD - chuyển đến lịch sử mua hàng
                            setTimeout(() => {
                                this.$router.push('/lich-su-mua-hang');
                            }, 1000);
                        }
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    const errors = error.response?.data?.errors;
                    if (errors) {
                        Object.values(errors).forEach((errorList) => {
                            errorList.forEach((err) => this.$toast.error(err));
                        });
                    } else {
                        this.$toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi xác nhận đơn hàng');
                    }
                });
        },
        formatPhoneNumber(event) {
            // Chỉ cho phép nhập số
            let value = event.target.value.replace(/[^0-9]/g, '');
            // Giới hạn tối đa 11 chữ số
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            this.create_dia_chi.so_dien_thoai = value;
        },
        validatePhoneNumber(phone) {
            // Loại bỏ tất cả ký tự không phải số
            const cleaned = phone.replace(/[^0-9]/g, '');
            // Kiểm tra độ dài hợp lệ (10-11 chữ số)
            return cleaned.length >= 10 && cleaned.length <= 11;
        },
        addDiaChi() {
            // Validate số điện thoại trước khi gửi
            if (!this.create_dia_chi.so_dien_thoai || !this.create_dia_chi.so_dien_thoai.trim()) {
                this.$toast.error('Vui lòng nhập số điện thoại!');
                return;
            }
            
            // Làm sạch số điện thoại (loại bỏ khoảng trắng và ký tự đặc biệt)
            const cleanedPhone = this.create_dia_chi.so_dien_thoai.replace(/[^0-9]/g, '');
            
            if (!this.validatePhoneNumber(cleanedPhone)) {
                this.$toast.error('Số điện thoại không hợp lệ! Vui lòng nhập 10-11 chữ số.');
                return;
            }
            
            // Tạo payload với số điện thoại đã làm sạch
            const payload = {
                ...this.create_dia_chi,
                so_dien_thoai: cleanedPhone
            };
            
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/create", payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        // Lưu ID địa chỉ vừa tạo
                        const newDiaChiId = res.data.data?.id;
                        
                        // Reset form
                        this.create_dia_chi = {
                            id_tinh_thanh: '',
                            id_quan_huyen: '',
                            id_phuong_xa: '',
                            dia_chi: '',
                            toa_do_x: '',
                            toa_do_y: '',
                            ten_nguoi_nhan: '',
                            so_dien_thoai: '',
                        };
                        
                        // Load lại danh sách địa chỉ và tự động chọn địa chỉ vừa tạo
                        this.loadDiaChi(newDiaChiId);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    if (res.response && res.response.data && res.response.data.errors) {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v, i) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error(res.response?.data?.message || 'Đã có lỗi xảy ra khi thêm địa chỉ!');
                    }
                });
        },
        loadDiaChi(selectId = null) {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/dia-chi/get-data', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_dia_chi = res.data.data;
                        
                        // Tự động chọn địa chỉ nếu có ID được truyền vào
                        if (selectId) {
                            // Tìm địa chỉ có ID trùng khớp
                            const foundDiaChi = this.list_dia_chi.find(diaChi => diaChi.id == selectId);
                            if (foundDiaChi) {
                                this.xac_nhan_dat_hang.id_dia_chi_giao_hang = foundDiaChi.id;
                            } else if (this.list_dia_chi.length > 0) {
                                // Nếu không tìm thấy, chọn địa chỉ cuối cùng (địa chỉ mới nhất)
                                this.xac_nhan_dat_hang.id_dia_chi_giao_hang = this.list_dia_chi[this.list_dia_chi.length - 1].id;
                            }
                        } else if (this.list_dia_chi.length > 0 && !this.xac_nhan_dat_hang.id_dia_chi_giao_hang) {
                            // Nếu chưa có địa chỉ nào được chọn và có danh sách địa chỉ, chọn địa chỉ đầu tiên
                            this.xac_nhan_dat_hang.id_dia_chi_giao_hang = this.list_dia_chi[0].id;
                        }
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        },
        loadPhuongXa(id_quan_huyen) {
            if (!id_quan_huyen) {
                this.list_phuong_xa = [];
                this.create_dia_chi.id_phuong_xa = '';
                return;
            }
            var payload = {
                id_quan_huyen: id_quan_huyen
            };
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-phuong-xa", payload)
                .then((res) => {
                    if (res.data.status && res.data.data) {
                        this.list_phuong_xa = res.data.data;
                        // Reset phường/xã khi chọn quận/huyện mới
                        this.create_dia_chi.id_phuong_xa = '';
                    } else {
                        this.list_phuong_xa = [];
                    }
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                    this.list_phuong_xa = [];
                });
        },
        loadQuanHuyen(id_tinh_thanh) {
            if (!id_tinh_thanh) {
                this.list_quan_huyen = [];
                this.list_phuong_xa = [];
                this.create_dia_chi.id_quan_huyen = '';
                this.create_dia_chi.id_phuong_xa = '';
                return;
            }
            var payload = {
                id_tinh_thanh: id_tinh_thanh
            };
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-quan-huyen", payload)
                .then((res) => {
                    if (res.data.status && res.data.data) {
                        this.list_quan_huyen = res.data.data;
                        // Reset quận/huyện và phường/xã khi chọn tỉnh thành mới
                        this.create_dia_chi.id_quan_huyen = '';
                        this.create_dia_chi.id_phuong_xa = '';
                        this.list_phuong_xa = [];
                    } else {
                        this.list_quan_huyen = [];
                        this.list_phuong_xa = [];
                    }
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                    this.list_quan_huyen = [];
                    this.list_phuong_xa = [];
                });
        },
        loadTinhThanh() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-tinh-thanh")
                .then((res) => {
                    if (res.data.status && res.data.data) {
                        this.list_tinh_thanh = res.data.data;
                    } else if (res.data.data) {
                        // Nếu không có status nhưng có data
                        this.list_tinh_thanh = res.data.data;
                    } else {
                        this.list_tinh_thanh = [];
                    }
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                    this.list_tinh_thanh = [];
                });
        },
        xoaDonHang(id_don_hang) {
            axios
                .post(`http://127.0.0.1:8000/api/khach-hang/delete-don-hang/${id_don_hang}`, null, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang'),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        emitter.emit('cap-nhat-gio-hang');
                        this.loadDonHang();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi xóa đơn hàng:', error.response?.data);
                    this.$toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi xóa đơn hàng');
                });
        },
        loadDonHang() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/get-data-don-hang', {}, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_khach_hang'),
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_don_hang = res.data.data;
                        this.tong_so_luong = res.data.tong_so_luong;
                        const newThanhTien = res.data.tong_tien;
                        // Nếu đã áp dụng voucher, không cập nhật lại tổng tiền
                        if (!this.voucherApplied) {
                            this.thanh_tien = newThanhTien;
                            this.tong_tien_goc = newThanhTien;
                        } else {
                            // Cập nhật tổng tiền gốc để tính lại giảm giá
                            this.tong_tien_goc = newThanhTien;
                            // Tính lại giảm giá dựa trên voucher hiện tại
                            if (this.voucherInfo) {
                                this.kiemTraVoucher();
                            }
                        }
                    } else {
                        this.list_don_hang = [];
                        this.tong_so_luong = 0;
                        this.thanh_tien = 0;
                        this.tong_tien_goc = 0;
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    this.list_don_hang = [];
                    this.tong_so_luong = 0;
                    this.thanh_tien = 0;
                    this.tong_tien_goc = 0;
                    this.$toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi tải giỏ hàng');
                });
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        },
        updateQuantity(item, newQuantity) {
            const payload = {
                id_don_hang: item.id,
                so_luong: parseInt(newQuantity)
            };
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/update-don-hang', payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDonHang();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    this.$toast.error(error.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật số lượng');
                });
        }
    },
};
</script>