<template>
    <div class="card shadow-sm border-0 rounded-4">
        <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="mb-0 fw-bold text-primary">Quản Lý Đơn Hàng</h3>
            </div>
            <div class="input-group mb-4">
                <input type="text" class="form-control rounded-start-pill" placeholder="Tìm kiếm đơn hàng..."
                    v-model="searchQuery">
                <button @click="timKiem()" class="btn btn-primary rounded-end-pill">Tìm kiếm</button>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-bordered align-middle">
                    <thead class="table-primary">
                        <tr class="text-center">
                            <th>#</th>
                            <th>Người Nhận</th>
                            <th>Số Điện Thoại</th>
                            <th>Tổng Tiền</th>
                            <th>Chi Tiết</th>
                            <th>Phương Thức</th>
                            <th>Thanh Toán</th>
                            <th>Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in thong_tin_khach_hang" :key="index">
                            <tr>
                                <td class="text-center">{{ index + 1 }}</td>
                                <td>{{ value.ho_va_ten }}</td>
                                <td class="text-end">{{ value.so_dien_thoai }}</td>
                                <td class="text-end">{{ formatVND(value.tong_tien) }}</td>
                                <td class="text-center">
                                    <button class="btn btn-outline-danger btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#chiTietDonHangModal" @click="chonChiTiet(value.ma_don_hang)">
                                        <i class="fa-solid fa-clipboard ms-1"></i>
                                    </button>
                                </td>
                                <td class="text-center">
                                    <span style="width: 45%;" v-if="value.phuong_thuc_thanh_toan == 0"
                                        class="badge bg-danger">COD</span>
                                    <span style="width: 45%;" v-else class="badge bg-primary">Banking</span>
                                </td>
                                <td class="text-center">
                                    <span v-if="value.is_thanh_toan === 1" class="badge bg-success">Đã Thanh Toán</span>
                                    <span v-else-if="value.is_thanh_toan === 0" class="badge bg-warning">Chờ Thanh
                                        Toán</span>
                                    <span v-else class="badge bg-danger">Đã Hủy</span>
                                </td>
                                <td class="text-center">
                                    <button v-if="value.trang_thai_don_hang === 1" @click="xacNhanDonHang(value)"
                                        class="btn btn-warning btn-sm w-100 text-light">
                                        Xác nhận đơn
                                    </button>
                                    <button
                                        v-else-if="value.trang_thai_don_hang === 2"
                                        @click="xacNhanDonHang(value)" class="btn btn-info btn-sm w-100 text-light">
                                        Đã chuẩn bị hàng
                                    </button>
                                    <button
                                        v-else-if="value.trang_thai_don_hang === 3"
                                        @click="xacNhanDonHang(value)" class="btn btn-primary btn-sm w-100 text-light">
                                        Đang giao hàng
                                    </button>
                                    <button v-else-if="value.trang_thai_don_hang === 4" @click="xacNhanDonHang(value)"
                                        class="btn btn-success btn-sm w-100 text-light">
                                        Giao hàng thành công
                                    </button>
                                    <button v-else-if="value.trang_thai_don_hang === 5" @click="xacNhanDonHang(value)"
                                        class="btn btn-danger btn-sm w-100 text-light">
                                        Giao hàng thất bại
                                    </button>
                                </td>

                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Chi tiết đơn hàng Modal -->
    <div class="modal fade" id="chiTietDonHangModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4">
                <div class="modal-header border-0">
                    <h5 class="modal-title fw-bold" id="exampleModalLabel">Chi Tiết Đơn Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h6>Mã đơn hàng: {{ maDonHangDangChon }}</h6>
                    <h6>Địa Chỉ Nhận Hàng:</h6>
                    <span>{{ diaChiNhanHang }}</span>

                    <h6 class="mt-3">Nội dung hàng (Tổng SL sản phẩm):</h6>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(item, idx) in donHangChiTiet" :key="idx">
                            {{ item.ten_san_pham }} - SL: <b>{{ item.so_luong }}</b> - Đơn giá: {{
                                formatVND(item.don_gia)
                            }}
                        </li>
                    </ul>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-outline-secondary rounded-pill"
                        data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary rounded-pill" data-bs-dismiss="modal">Xác Nhận</button>
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
            searchQuery: ''
        }
    },
    mounted() {
        this.thongTinDonHang();
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
        formatDate(dateString) {
            if (!dateString || typeof dateString !== 'string') return '';
            return dateString.split('T')[0];
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
        }


    }
}

</script>
<style></style>