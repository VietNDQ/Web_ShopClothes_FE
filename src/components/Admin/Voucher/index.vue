<template>
    <div class="container-fluid py-4">
        <!-- Header Section -->
        <div class="page-header mb-4">
            <div class="row align-items-center">
                <div class="col-lg-8">
                    <h2 class="page-title mb-2">
                        <i class="fa-solid fa-ticket me-2"></i>
                        Quản Lý Voucher
                    </h2>
                </div>
                <div class="col-lg-4 text-end">
                    <button class="btn btn-primary btn-lg shadow-sm" @click="openModal">
                        <i class="fa-solid fa-plus me-2"></i>Thêm Voucher Mới
                    </button>
                </div>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="card search-card mb-4 shadow-sm">
            <div class="card-body p-3">
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="fa-solid fa-magnifying-glass text-muted"></i>
                            </span>
                            <input 
                                v-model="keyword" 
                                @input="searchVoucher" 
                                @keyup.enter="searchVoucher"
                                type="text" 
                                class="form-control border-start-0 ps-0"
                                placeholder="Tìm kiếm theo mã voucher, tên voucher..."
                            />
                            <button 
                                v-if="keyword" 
                                class="btn btn-outline-secondary border-start-0" 
                                @click="keyword = ''; searchVoucher()"
                                type="button"
                            >
                                <i class="fa-solid fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <select v-model="selectedStatus" @change="loadData()" class="form-select form-select-lg">
                            <option value="">Tất cả trạng thái</option>
                            <option value="1">Hoạt động</option>
                            <option value="0">Tạm dừng</option>
                            <option value="2">Hết hạn</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="card shadow-sm">
            <div class="card-body text-center py-5">
                <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Đang tải...</span>
                </div>
                <p class="text-muted mb-0">Đang tải danh sách voucher...</p>
            </div>
        </div>

        <!-- Bảng danh sách voucher -->
        <div v-else class="card shadow-sm border-0">
            <div class="card-header bg-white border-bottom py-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold">
                        <i class="fa-solid fa-list me-2 text-primary"></i>
                        Danh sách voucher
                    </h5>
                    <span class="badge bg-primary">{{ listVoucher.length }} voucher</span>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0 align-middle">
                        <thead class="table-light">
                            <tr class="text-center">
                                <th style="width: 50px;">#</th>
                                <th style="width: 150px;">Mã Voucher</th>
                                <th>Tên Voucher</th>
                                <th style="width: 120px;">Loại Giảm</th>
                                <th style="width: 120px;">Giá Trị</th>
                                <th style="width: 100px;">Số Lượng</th>
                                <th style="width: 150px;">Thời Gian</th>
                                <th style="width: 100px;">Trạng Thái</th>
                                <th style="width: 180px;">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(voucher, index) in listVoucher" :key="voucher.id">
                                <td class="text-center align-middle">{{ index + 1 }}</td>
                                <td class="text-center align-middle">
                                    <span class="badge bg-info text-dark fw-bold">{{ voucher.ma_voucher }}</span>
                                </td>
                                <td class="align-middle">
                                    <strong>{{ voucher.ten_voucher }}</strong>
                                    <br>
                                    <small class="text-muted">{{ voucher.mo_ta || 'Không có mô tả' }}</small>
                                </td>
                                <td class="text-center align-middle">
                                    <span v-if="voucher.loai_giam_gia == 1" class="badge bg-success">Phần trăm</span>
                                    <span v-else class="badge bg-primary">Số tiền</span>
                                </td>
                                <td class="text-center align-middle">
                                    <strong v-if="voucher.loai_giam_gia == 1" class="text-success">
                                        {{ voucher.gia_tri_giam }}%
                                    </strong>
                                    <strong v-else class="text-primary">
                                        {{ formatCurrency(voucher.gia_tri_giam) }}
                                    </strong>
                                    <br>
                                    <small v-if="voucher.gia_tri_toi_thieu" class="text-muted">
                                        Tối thiểu: {{ formatCurrency(voucher.gia_tri_toi_thieu) }}
                                    </small>
                                    <br v-if="voucher.gia_tri_toi_da">
                                    <small v-if="voucher.gia_tri_toi_da" class="text-muted">
                                        Tối đa: {{ formatCurrency(voucher.gia_tri_toi_da) }}
                                    </small>
                                </td>
                                <td class="text-center align-middle">
                                    <span class="badge bg-secondary">
                                        {{ voucher.so_luong_da_su_dung }}/{{ voucher.so_luong }}
                                    </span>
                                </td>
                                <td class="text-center align-middle">
                                    <small>
                                        <div><strong>Bắt đầu:</strong></div>
                                        <div>{{ formatDate(voucher.ngay_bat_dau) }}</div>
                                        <div class="mt-1"><strong>Kết thúc:</strong></div>
                                        <div>{{ formatDate(voucher.ngay_ket_thuc) }}</div>
                                    </small>
                                </td>
                                <td class="text-center align-middle">
                                    <button 
                                        v-if="voucher.trang_thai == 1" 
                                        @click="changeStatus(voucher)"
                                        class="btn btn-success btn-sm"
                                    >
                                        Hoạt động
                                    </button>
                                    <button 
                                        v-else-if="voucher.trang_thai == 0" 
                                        @click="changeStatus(voucher)"
                                        class="btn btn-warning btn-sm"
                                    >
                                        Tạm dừng
                                    </button>
                                    <span v-else class="badge bg-danger">Hết hạn</span>
                                </td>
                                <td class="text-center align-middle">
                                    <button 
                                        @click="openUpdateModal(voucher)"
                                        class="btn btn-sm btn-primary me-1" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#updateModal"
                                        title="Sửa voucher"
                                    >
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                    <button 
                                        @click="deleteVoucher = voucher"
                                        class="btn btn-sm btn-danger" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                        title="Xóa voucher"
                                    >
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="listVoucher.length === 0">
                                <td colspan="9" class="text-center text-muted py-4">
                                    <i class="fa-solid fa-inbox fa-2x mb-2"></i>
                                    <div>Chưa có voucher nào</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Thêm Voucher -->
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createModalLabel">
                            <i class="fa-solid fa-plus me-2"></i>Thêm Voucher Mới
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="createVoucher">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Mã Voucher <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="create.ma_voucher" 
                                        type="text" 
                                        class="form-control"
                                        placeholder="VD: SALE50, NEWUSER100"
                                        required
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Tên Voucher <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="create.ten_voucher" 
                                        type="text" 
                                        class="form-control"
                                        placeholder="Nhập tên voucher"
                                        required
                                    >
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mô Tả</label>
                                    <textarea 
                                        v-model="create.mo_ta" 
                                        class="form-control" 
                                        rows="2"
                                        placeholder="Nhập mô tả voucher..."
                                    ></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Loại Giảm Giá <span class="text-danger">*</span></label>
                                    <select v-model="create.loai_giam_gia" class="form-select" required>
                                        <option value="1">Giảm theo phần trăm (%)</option>
                                        <option value="2">Giảm theo số tiền cố định (VNĐ)</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Giá Trị Giảm <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input 
                                            v-model="create.gia_tri_giam" 
                                            type="number" 
                                            class="form-control"
                                            :placeholder="create.loai_giam_gia == 1 ? 'VD: 10 (10%)' : 'VD: 50000'"
                                            step="0.01"
                                            min="0"
                                            required
                                        >
                                        <span class="input-group-text">
                                            {{ create.loai_giam_gia == 1 ? '%' : 'VNĐ' }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Giá Trị Đơn Hàng Tối Thiểu</label>
                                    <input 
                                        v-model="create.gia_tri_toi_thieu" 
                                        type="number" 
                                        class="form-control"
                                        placeholder="VD: 100000"
                                        step="0.01"
                                        min="0"
                                    >
                                </div>
                                <div class="col-md-6" v-if="create.loai_giam_gia == 1">
                                    <label class="form-label">Giá Trị Giảm Tối Đa</label>
                                    <input 
                                        v-model="create.gia_tri_toi_da" 
                                        type="number" 
                                        class="form-control"
                                        placeholder="VD: 50000"
                                        step="0.01"
                                        min="0"
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số Lượng <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="create.so_luong" 
                                        type="number" 
                                        class="form-control"
                                        placeholder="VD: 100"
                                        min="1"
                                        required
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Trạng Thái</label>
                                    <select v-model="create.trang_thai" class="form-select">
                                        <option value="1">Hoạt động</option>
                                        <option value="0">Tạm dừng</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày Bắt Đầu <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="create.ngay_bat_dau" 
                                        type="datetime-local" 
                                        class="form-control"
                                        required
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày Kết Thúc <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="create.ngay_ket_thuc" 
                                        type="datetime-local" 
                                        class="form-control"
                                        required
                                    >
                                </div>
                            </div>
                            <div class="modal-footer mt-4">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa-solid fa-save me-2"></i>Lưu Voucher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Cập Nhật Voucher -->
        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateModalLabel">
                            <i class="fa-solid fa-pen me-2"></i>Cập Nhật Voucher
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateVoucher">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Mã Voucher <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="edit.ma_voucher" 
                                        type="text" 
                                        class="form-control"
                                        required
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Tên Voucher <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="edit.ten_voucher" 
                                        type="text" 
                                        class="form-control"
                                        required
                                    >
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mô Tả</label>
                                    <textarea 
                                        v-model="edit.mo_ta" 
                                        class="form-control" 
                                        rows="2"
                                    ></textarea>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Loại Giảm Giá <span class="text-danger">*</span></label>
                                    <select v-model="edit.loai_giam_gia" class="form-select" required>
                                        <option value="1">Giảm theo phần trăm (%)</option>
                                        <option value="2">Giảm theo số tiền cố định (VNĐ)</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Giá Trị Giảm <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <input 
                                            v-model="edit.gia_tri_giam" 
                                            type="number" 
                                            class="form-control"
                                            step="0.01"
                                            min="0"
                                            required
                                        >
                                        <span class="input-group-text">
                                            {{ edit.loai_giam_gia == 1 ? '%' : 'VNĐ' }}
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Giá Trị Đơn Hàng Tối Thiểu</label>
                                    <input 
                                        v-model="edit.gia_tri_toi_thieu" 
                                        type="number" 
                                        class="form-control"
                                        step="0.01"
                                        min="0"
                                    >
                                </div>
                                <div class="col-md-6" v-if="edit.loai_giam_gia == 1">
                                    <label class="form-label">Giá Trị Giảm Tối Đa</label>
                                    <input 
                                        v-model="edit.gia_tri_toi_da" 
                                        type="number" 
                                        class="form-control"
                                        step="0.01"
                                        min="0"
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số Lượng <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="edit.so_luong" 
                                        type="number" 
                                        class="form-control"
                                        min="1"
                                        required
                                    >
                                    <small class="text-muted">Đã sử dụng: {{ edit.so_luong_da_su_dung }}</small>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Trạng Thái</label>
                                    <select v-model="edit.trang_thai" class="form-select">
                                        <option value="1">Hoạt động</option>
                                        <option value="0">Tạm dừng</option>
                                        <option value="2">Hết hạn</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày Bắt Đầu <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="edit.ngay_bat_dau" 
                                        type="datetime-local" 
                                        class="form-control"
                                        required
                                    >
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày Kết Thúc <span class="text-danger">*</span></label>
                                    <input 
                                        v-model="edit.ngay_ket_thuc" 
                                        type="datetime-local" 
                                        class="form-control"
                                        required
                                    >
                                </div>
                            </div>
                            <div class="modal-footer mt-4">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa-solid fa-save me-2"></i>Cập Nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Xóa Voucher -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">
                            <i class="fa-solid fa-trash me-2 text-danger"></i>Xác Nhận Xóa
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xóa voucher <strong>{{ deleteVoucher.ten_voucher }}</strong> ({{ deleteVoucher.ma_voucher }})?</p>
                        <p class="text-danger" v-if="deleteVoucher.so_luong_da_su_dung > 0">
                            <i class="fa-solid fa-exclamation-triangle me-2"></i>
                            Cảnh báo: Voucher này đã được sử dụng {{ deleteVoucher.so_luong_da_su_dung }} lần!
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">
                            <i class="fa-solid fa-trash me-2"></i>Xóa
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
    name: 'Voucher',
    data() {
        return {
            isLoading: false,
            listVoucher: [],
            keyword: '',
            selectedStatus: '',
            create: {
                ma_voucher: '',
                ten_voucher: '',
                mo_ta: '',
                loai_giam_gia: 1,
                gia_tri_giam: '',
                gia_tri_toi_thieu: '',
                gia_tri_toi_da: '',
                so_luong: '',
                ngay_bat_dau: '',
                ngay_ket_thuc: '',
                trang_thai: 1,
            },
            edit: {
                id: '',
                ma_voucher: '',
                ten_voucher: '',
                mo_ta: '',
                loai_giam_gia: 1,
                gia_tri_giam: '',
                gia_tri_toi_thieu: '',
                gia_tri_toi_da: '',
                so_luong: '',
                so_luong_da_su_dung: 0,
                ngay_bat_dau: '',
                ngay_ket_thuc: '',
                trang_thai: 1,
            },
            deleteVoucher: {},
            apiBaseUrl: 'http://127.0.0.1:8000',
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoading = true;
            try {
                const params = {};
                if (this.keyword) {
                    params.keyword = this.keyword;
                }
                if (this.selectedStatus !== '') {
                    params.trang_thai = this.selectedStatus;
                }
                
                const res = await axios.get(`${this.apiBaseUrl}/api/admin/voucher/data`, {
                    params: params,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                
                if (res.data.status) {
                    this.listVoucher = res.data.data;
                } else {
                    this.$toast?.error(res.data.message || 'Không thể tải danh sách voucher');
                }
            } catch (error) {
                console.error('Lỗi loadData:', error);
                this.$toast?.error('Đã xảy ra lỗi khi tải danh sách voucher');
            } finally {
                this.isLoading = false;
            }
        },
        searchVoucher() {
            this.loadData();
        },
        openModal() {
            // Reset form
            this.create = {
                ma_voucher: '',
                ten_voucher: '',
                mo_ta: '',
                loai_giam_gia: 1,
                gia_tri_giam: '',
                gia_tri_toi_thieu: '',
                gia_tri_toi_da: '',
                so_luong: '',
                ngay_bat_dau: '',
                ngay_ket_thuc: '',
                trang_thai: 1,
            };
        },
        openUpdateModal(voucher) {
            // Copy dữ liệu voucher vào edit
            this.edit = {
                id: voucher.id,
                ma_voucher: voucher.ma_voucher,
                ten_voucher: voucher.ten_voucher,
                mo_ta: voucher.mo_ta || '',
                loai_giam_gia: voucher.loai_giam_gia,
                gia_tri_giam: voucher.gia_tri_giam,
                gia_tri_toi_thieu: voucher.gia_tri_toi_thieu || '',
                gia_tri_toi_da: voucher.gia_tri_toi_da || '',
                so_luong: voucher.so_luong,
                so_luong_da_su_dung: voucher.so_luong_da_su_dung,
                ngay_bat_dau: this.formatDateTimeLocal(voucher.ngay_bat_dau),
                ngay_ket_thuc: this.formatDateTimeLocal(voucher.ngay_ket_thuc),
                trang_thai: voucher.trang_thai,
            };
        },
        async createVoucher() {
            try {
                const res = await axios.post(`${this.apiBaseUrl}/api/admin/voucher/create`, this.create, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                
                if (res.data.status) {
                    this.$toast?.success(res.data.message);
                    // Đóng modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('createModal'));
                    if (modal) modal.hide();
                    // Reload data
                    this.loadData();
                    // Reset form
                    this.openModal();
                } else {
                    this.$toast?.error(res.data.message || 'Không thể tạo voucher');
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    Object.values(error.response.data.errors).forEach(errorList => {
                        errorList.forEach(err => this.$toast?.error(err));
                    });
                } else {
                    this.$toast?.error(error.response?.data?.message || 'Đã xảy ra lỗi khi tạo voucher');
                }
            }
        },
        async updateVoucher() {
            try {
                const res = await axios.post(`${this.apiBaseUrl}/api/admin/voucher/update`, this.edit, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                
                if (res.data.status) {
                    this.$toast?.success(res.data.message);
                    // Đóng modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('updateModal'));
                    if (modal) modal.hide();
                    // Reload data
                    this.loadData();
                } else {
                    this.$toast?.error(res.data.message || 'Không thể cập nhật voucher');
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    Object.values(error.response.data.errors).forEach(errorList => {
                        errorList.forEach(err => this.$toast?.error(err));
                    });
                } else {
                    this.$toast?.error(error.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật voucher');
                }
            }
        },
        async confirmDelete() {
            try {
                const res = await axios.post(`${this.apiBaseUrl}/api/admin/voucher/delete`, {
                    id: this.deleteVoucher.id
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                
                if (res.data.status) {
                    this.$toast?.success(res.data.message);
                    // Đóng modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
                    if (modal) modal.hide();
                    // Reload data
                    this.loadData();
                    // Reset
                    this.deleteVoucher = {};
                } else {
                    this.$toast?.error(res.data.message || 'Không thể xóa voucher');
                }
            } catch (error) {
                this.$toast?.error(error.response?.data?.message || 'Đã xảy ra lỗi khi xóa voucher');
            }
        },
        async changeStatus(voucher) {
            try {
                const newStatus = voucher.trang_thai == 1 ? 0 : 1;
                const res = await axios.post(`${this.apiBaseUrl}/api/admin/voucher/change-status`, {
                    id: voucher.id,
                    trang_thai: newStatus
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                });
                
                if (res.data.status) {
                    this.$toast?.success(res.data.message);
                    this.loadData();
                } else {
                    this.$toast?.error(res.data.message || 'Không thể thay đổi trạng thái');
                }
            } catch (error) {
                this.$toast?.error(error.response?.data?.message || 'Đã xảy ra lỗi khi thay đổi trạng thái');
            }
        },
        formatCurrency(value) {
            if (!value) return '0 ₫';
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        formatDateTimeLocal(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
    }
};
</script>

<style scoped>
.page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-title {
    color: white;
    font-size: 28px;
    font-weight: 700;
    margin: 0;
}

.search-card {
    border-radius: 12px;
}

.table th {
    font-weight: 600;
    background-color: #f8f9fa;
}

.table td {
    vertical-align: middle;
}

.badge {
    font-size: 0.875rem;
    padding: 0.5em 0.75em;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 22px;
    }
}
</style>

