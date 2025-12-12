<template>
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <ul class="nav nav-tabs nav-fill mb-4">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#profile">
                                <i class="fa-solid fa-user me-2"></i>Thông tin cá nhân
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#address">
                                <i class="fa-solid fa-location-dot me-2"></i>Địa chỉ nhận hàng
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#password">
                                <i class="fa-solid fa-lock me-2"></i>Đổi mật khẩu
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="profile">
                            <div class="row g-4">
                                <div class="col-lg-4">
                                    <div class="card border-0 shadow-sm h-100">
                                        <div class="card-body text-center p-4">
                                            <!-- <img  alt="Avatar" class="rounded-circle mb-3 shadow-sm" -->
                                            <!-- width="120" height="120"> -->
                                            <h2 class="mb-1">{{ thong_tin.ho_va_ten }}</h2>
                                            <h4 class="mb-1">{{ thong_tin.email }}</h4>
                                            <p class="text-muted mb-3">Khách hàng thân thiết</p>
                                            <div class="row mt-5">
                                                <div class="col-5 text-center ms-auto">
                                                    <h1 class="mb-3 text-danger"><b>12</b></h1>
                                                    <h5 class="text-muted">Đơn hàng</h5>
                                                </div>
                                                <div class="col-5 text-center me-auto">
                                                    <h1 class="mb-3 text-primary"><b>5</b></h1>
                                                    <h5 class="text-muted">Đánh giá</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="card border-0 shadow-sm h-100">
                                        <div class="card-body p-4">
                                            <h3 class="card-title mb-4">Thông tin cá nhân</h3>
                                            <form @submit.prevent="updateProfile">
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">Họ và tên <span class="text-danger">*</span></label>
                                                        <input type="text" class="form-control" v-model="profileData.ho_va_ten"
                                                            placeholder="Nhập họ và tên" required>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Email</label>
                                                        <input :value="thong_tin.email" type="email"
                                                            class="form-control" disabled>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Số điện thoại</label>
                                                        <input type="tel" class="form-control" v-model="profileData.so_dien_thoai"
                                                            placeholder="Nhập số điện thoại">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Ngày sinh</label>
                                                        <input type="date" class="form-control" v-model="profileData.ngay_sinh">
                                                    </div>
                                                </div>
                                                <div class="text-end mt-4">
                                                    <button type="button" @click="resetProfileForm" class="btn btn-light me-2">Huỷ</button>
                                                    <button type="submit" class="btn btn-primary px-4" :disabled="isUpdatingProfile">
                                                        <span v-if="isUpdatingProfile" class="spinner-border spinner-border-sm me-2"></span>
                                                        Lưu thay đổi
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="address">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="mb-0 ms-4">Địa chỉ nhận hàng</h5>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDiaChiModal">
                                    <i class="fa-solid fa-plus me-2"></i>Thêm địa chỉ
                                </button>
                            </div>
                            
                            <!-- Loading state -->
                            <div v-if="isLoadingAddress" class="text-center py-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Đang tải...</span>
                                </div>
                                <p class="mt-3 text-muted">Đang tải danh sách địa chỉ...</p>
                            </div>
                            
                            <!-- Empty state -->
                            <div v-else-if="list_dia_chi.length === 0" class="text-center py-5">
                                <i class="fa-solid fa-location-dot fa-3x text-muted mb-3"></i>
                                <h5 class="text-muted">Chưa có địa chỉ nhận hàng</h5>
                                <p class="text-muted">Hãy thêm địa chỉ để nhận hàng nhanh chóng hơn</p>
                                <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#addDiaChiModal">
                                    <i class="fa-solid fa-plus me-2"></i>Thêm địa chỉ đầu tiên
                                </button>
                            </div>
                            
                            <!-- Address list -->
                            <div v-else>
                                <div v-for="(value, index) in list_dia_chi" :key="value.id || index" class="card border border-primary mb-3">
                                    <div class="card-body p-4">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="flex-grow-1">
                                                <h6 class="mb-1 fw-bold">{{ value.ten_nguoi_nhan }}</h6>
                                                <p class="mb-1">
                                                    <i class="fa-solid fa-phone me-2 text-muted"></i>
                                                    {{ value.so_dien_thoai }}
                                                </p>
                                                <p class="mb-0 text-muted">
                                                    <i class="fa-solid fa-location-dot me-2 text-danger"></i>
                                                    {{ value.dia_chi }}, {{ value.ten_phuong_xa }}, {{ value.ten_quan_huyen }}, {{ value.ten_tinh_thanh }}
                                                </p>
                                            </div>
                                            <div class="ms-3">
                                                <button @click="openUpdateModal(value)"
                                                    class="btn btn-outline-primary me-2" data-bs-toggle="modal"
                                                    data-bs-target="#updateDiaChiModal" title="Sửa địa chỉ">
                                                    <i class="fa-solid fa-pen"></i>
                                                </button>
                                                <button @click="delete_dia_chi = value" class="btn btn-outline-danger"
                                                    data-bs-toggle="modal" data-bs-target="#deleteDiaChiModal" title="Xóa địa chỉ">
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="password">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="card border-0 shadow-sm">
                                        <div class="card-body p-4">
                                            <h5 class="card-title mb-4">Đổi mật khẩu</h5>
                                            <form @submit.prevent="changePassword">
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Mật khẩu hiện tại <span class="text-danger">*</span></label>
                                                    <div class="password-input-wrapper">
                                                        <input 
                                                            :type="showOldPassword ? 'text' : 'password'" 
                                                            class="form-control"
                                                            v-model="doi_mat_khau.old_password"
                                                            placeholder="Nhập mật khẩu hiện tại" 
                                                            required>
                                                        <button 
                                                            type="button" 
                                                            class="password-toggle-btn"
                                                            @click="showOldPassword = !showOldPassword">
                                                            <i :class="showOldPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Mật khẩu mới <span class="text-danger">*</span></label>
                                                    <div class="password-input-wrapper">
                                                        <input 
                                                            :type="showNewPassword ? 'text' : 'password'" 
                                                            class="form-control"
                                                            v-model="doi_mat_khau.password" 
                                                            placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)" 
                                                            minlength="6" 
                                                            required>
                                                        <button 
                                                            type="button" 
                                                            class="password-toggle-btn"
                                                            @click="showNewPassword = !showNewPassword">
                                                            <i :class="showNewPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                        </button>
                                                    </div>
                                                    <small class="text-muted">Mật khẩu phải có ít nhất 6 ký tự</small>
                                                </div>
                                                <div class="mb-4">
                                                    <label class="form-label fw-semibold">Xác nhận mật khẩu mới <span class="text-danger">*</span></label>
                                                    <div class="password-input-wrapper">
                                                        <input 
                                                            :type="showConfirmPassword ? 'text' : 'password'" 
                                                            class="form-control"
                                                            v-model="doi_mat_khau.re_password"
                                                            placeholder="Nhập lại mật khẩu mới" 
                                                            required>
                                                        <button 
                                                            type="button" 
                                                            class="password-toggle-btn"
                                                            @click="showConfirmPassword = !showConfirmPassword">
                                                            <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-primary px-4" :disabled="isChangingPassword">
                                                    <span v-if="isChangingPassword" class="spinner-border spinner-border-sm me-2"></span>
                                                    Cập nhật mật khẩu
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <label for="">Số Điện Thoại</label>
                    <input v-model="create_dia_chi.so_dien_thoai" type="text" class="form-control mt-2 mb-2">
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
                    <select @change="loadPhuongXa(create_dia_chi.id_quan_huyen)"
                        v-model="create_dia_chi.id_quan_huyen" name="" id="" class="mt-2 mb-2 form-select">
                        <option value="">-- Chọn Quận/Huyện --</option>
                        <template v-for="(item, index) in list_quan_huyen" :key="index">
                            <option :value="item.id">{{ item.ten_quan_huyen }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Phường/Xã</label>
                    <select v-model="create_dia_chi.id_phuong_xa" name="" class="form-select" id="">
                        <option value="">-- Chọn Phường/Xã --</option>
                        <template v-for="(item, index) in list_phuong_xa" :key="index">
                            <option :value="item.id">{{ item.ten_phuong_xa }}</option>
                        </template>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="addDiaChi()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm Địa Chỉ</button>
                </div>
            </div>
        </div>
    </div>
    <!--Sửa địa chỉ Modal -->
    <div class="modal fade" id="updateDiaChiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhập Địa Chỉ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Tên Người Nhận</label>
                    <input v-model="update_dia_chi.ten_nguoi_nhan" type="text" class="form-control mt-2 mb-2">
                    <label for="">Số Điện Thoại</label>
                    <input v-model="update_dia_chi.so_dien_thoai" type="text" class="form-control mt-2 mb-2">
                    <label for="">Địa Chỉ Cụ Thể</label>
                    <input v-model="update_dia_chi.dia_chi" type="text" class="mt-2 mb-2 form-control"
                        placeholder="Nhập địa chỉ cụ thể">
                    <label for="">Chọn Tỉnh/Thành Phố</label>
                    <select v-model="update_dia_chi.id_tinh_thanh" @change="loadQuanHuyen(update_dia_chi.id_tinh_thanh)"
                        class="mt-2 mb-2 form-select">
                        <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                        <template v-for="(item, index) in list_tinh_thanh" :key="index">
                            <option :value="item.id">{{ item.ten_tinh_thanh }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Quận/Huyện</label>
                    <select @change="loadPhuongXa(update_dia_chi.id_quan_huyen)"
                        v-model="update_dia_chi.id_quan_huyen" name="" id="" class="mt-2 mb-2 form-select">
                        <option value="">-- Chọn Quận/Huyện --</option>
                        <template v-for="(item, index) in list_quan_huyen" :key="index">
                            <option :value="item.id">{{ item.ten_quan_huyen }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Phường/Xã</label>
                    <select v-model="update_dia_chi.id_phuong_xa" name="" class="form-select" id="">
                        <template v-for="(item, index) in list_phuong_xa" :key="index">
                            <option :value="item.id">{{ item.ten_phuong_xa }}</option>
                        </template>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="updateDiaChi()" type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Cập
                        Nhật
                        Địa Chỉ</button>
                </div>
            </div>
        </div>
    </div>
    <!--Xóa địa chỉ Modal -->
    <div class="modal fade" id="deleteDiaChiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Địa Chỉ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa địa chỉ
                                <b class="text-danger">
                                    <div>
                                        <h6 class="mb-1">{{ delete_dia_chi.ten_nguoi_nhan }}</h6>
                                        <p class="mb-1">{{ delete_dia_chi.so_dien_thoai }}</p>
                                        <p class="mb-0 text-muted">{{ delete_dia_chi.dia_chi }}, {{
                                            delete_dia_chi.ten_tinh_thanh
                                            }}, {{ delete_dia_chi.ten_quan_huyen }}, {{ delete_dia_chi.ten_phuong_xa }}
                                        </p>
                                    </div>
                                </b>
                                này không!
                                <br>
                                <span class="text-danger">Lưu ý: Không thể phục hồi khi xóa?</span>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="delDiaChi()" type="button" data-bs-dismiss="modal" class="btn btn-primary">Xóa
                        Địa
                        Chỉ</button>
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
            list_phuong_xa: [],
            list_tinh_thanh: [],
            list_quan_huyen: [],
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
            update_dia_chi: {
                id: '',
                id_khach_hang: '',
                id_tinh_thanh: '',
                id_quan_huyen: '',
                id_phuong_xa: '',
                dia_chi: '',
                toa_do_x: '',
                toa_do_y: '',
                ten_nguoi_nhan: '',
                so_dien_thoai: '',
            },
            delete_dia_chi: {},
            doi_mat_khau: {
                old_password: '',
                password: '',
                re_password: ''
            },
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            profileData: {
                ho_va_ten: '',
                so_dien_thoai: '',
                ngay_sinh: ''
            },
            thong_tin: {},
            list_dia_chi: [],
            isUpdatingProfile: false,
            isChangingPassword: false,
            isLoadingAddress: false,
        };
    },
    mounted() {
        this.loadTinhThanh();
        this.loadProFileKhachHang();
        this.loadDiaChi();
        
        // Listen for tab change events
        const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
        tabLinks.forEach(link => {
            link.addEventListener('shown.bs.tab', (event) => {
                const targetTab = event.target.getAttribute('href');
                if (targetTab === '#address') {
                    // Reload địa chỉ khi chuyển sang tab địa chỉ
                    this.loadDiaChi();
                }
            });
        });
    },
    methods: {
        loadDiaChi() {
            this.isLoadingAddress = true;
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_dia_chi = Array.isArray(res.data.data) ? res.data.data : [];
                    } else {
                        this.$toast.error(res.data.message || 'Không thể tải danh sách địa chỉ');
                        this.list_dia_chi = [];
                    }
                })
                .catch((err) => {
                    console.error("Lỗi loadDiaChi:", err);
                    if (err.response && err.response.data && err.response.data.errors) {
                        const list = Object.values(err.response.data.errors);
                        list.forEach((v, i) => {
                            if (Array.isArray(v)) {
                                v.forEach(error => this.$toast.error(error));
                            } else {
                                this.$toast.error(v);
                            }
                        });
                    } else {
                        this.$toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi tải danh sách địa chỉ');
                    }
                    this.list_dia_chi = [];
                })
                .finally(() => {
                    this.isLoadingAddress = false;
                });
        },
        loadProFileKhachHang() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lay-thong-tin-profile", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
                        // Populate profile form
                        this.profileData = {
                            ho_va_ten: res.data.thong_tin.ho_va_ten || '',
                            so_dien_thoai: res.data.thong_tin.so_dien_thoai || '',
                            ngay_sinh: res.data.thong_tin.ngay_sinh || ''
                        };
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        this.$toast.error("Vui lòng đăng nhập lại!");
                        localStorage.removeItem("token_khach_hang");
                        this.$router.push('/khach-hang/dang-nhap');
                    }
                });
        },
        updateProfile() {
            this.isUpdatingProfile = true;
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/update-profile", this.profileData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        // Update thong_tin với dữ liệu mới
                        if (res.data.thong_tin) {
                            this.thong_tin = res.data.thong_tin;
                            // Update localStorage nếu có ho_va_ten
                            if (res.data.thong_tin.ho_va_ten) {
                                localStorage.setItem("ho_ten_khach_hang", res.data.thong_tin.ho_va_ten);
                            }
                        }
                        // Reload profile để đảm bảo đồng bộ
                        this.loadProFileKhachHang();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.data) {
                        if (err.response.data.errors) {
                            const errors = Object.values(err.response.data.errors);
                            errors.forEach(errorList => {
                                if (Array.isArray(errorList)) {
                                    errorList.forEach(error => this.$toast.error(error));
                                }
                            });
                        } else {
                            this.$toast.error(err.response.data.message || 'Có lỗi xảy ra khi cập nhật thông tin');
                        }
                    } else {
                        this.$toast.error('Có lỗi xảy ra khi cập nhật thông tin');
                    }
                })
                .finally(() => {
                    this.isUpdatingProfile = false;
                });
        },
        resetProfileForm() {
            this.profileData = {
                ho_va_ten: this.thong_tin.ho_va_ten || '',
                so_dien_thoai: this.thong_tin.so_dien_thoai || '',
                ngay_sinh: this.thong_tin.ngay_sinh || ''
            };
        },
        addDiaChi() {
            // Validate
            if (!this.create_dia_chi.ten_nguoi_nhan || !this.create_dia_chi.ten_nguoi_nhan.trim()) {
                this.$toast.error('Vui lòng nhập tên người nhận!');
                return;
            }
            if (!this.create_dia_chi.so_dien_thoai || !this.create_dia_chi.so_dien_thoai.trim()) {
                this.$toast.error('Vui lòng nhập số điện thoại!');
                return;
            }
            if (!this.create_dia_chi.dia_chi || !this.create_dia_chi.dia_chi.trim()) {
                this.$toast.error('Vui lòng nhập địa chỉ cụ thể!');
                return;
            }
            if (!this.create_dia_chi.id_tinh_thanh) {
                this.$toast.error('Vui lòng chọn tỉnh/thành phố!');
                return;
            }
            if (!this.create_dia_chi.id_quan_huyen) {
                this.$toast.error('Vui lòng chọn quận/huyện!');
                return;
            }
            if (!this.create_dia_chi.id_phuong_xa) {
                this.$toast.error('Vui lòng chọn phường/xã!');
                return;
            }

            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/create", this.create_dia_chi, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
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
                        // Reset dropdowns
                        this.list_quan_huyen = [];
                        this.list_phuong_xa = [];
                        // Reload danh sách địa chỉ
                        this.loadDiaChi();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        const list = Object.values(err.response.data.errors);
                        list.forEach((v, i) => {
                            if (Array.isArray(v)) {
                                v.forEach(error => this.$toast.error(error));
                            } else {
                                this.$toast.error(v);
                            }
                        });
                    } else {
                        this.$toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi thêm địa chỉ');
                    }
                })
        },
        updateDiaChi() {
            // Load quận/huyện và phường/xã khi mở modal update
            if (this.update_dia_chi.id_tinh_thanh) {
                this.loadQuanHuyen(this.update_dia_chi.id_tinh_thanh);
            }
            if (this.update_dia_chi.id_quan_huyen) {
                this.loadPhuongXa(this.update_dia_chi.id_quan_huyen);
            }

            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/update", this.update_dia_chi, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.update_dia_chi = {
                            id: '',
                            id_tinh_thanh: '',
                            id_khach_hang: '',
                            id_quan_huyen: '',
                            id_phuong_xa: '',
                            dia_chi: '',
                            toa_do_x: '',
                            toa_do_y: '',
                            ten_nguoi_nhan: '',
                            so_dien_thoai: '',
                        };
                        this.loadDiaChi();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    if (res.response && res.response.data && res.response.data.errors) {
                        const list = Object.values(res.response.data.errors);
                        list.forEach((v, i) => {
                            if (Array.isArray(v)) {
                                v.forEach(error => this.$toast.error(error));
                            } else {
                                this.$toast.error(v);
                            }
                        });
                    } else {
                        this.$toast.error(res.response?.data?.message || 'Có lỗi xảy ra khi cập nhật địa chỉ');
                    }
                })
        },
        delDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/delete", this.delete_dia_chi, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDiaChi();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadPhuongXa(id_quan_huyen) {
            if (!id_quan_huyen) {
                this.list_phuong_xa = [];
                return;
            }
            var payload = {
                id_quan_huyen: id_quan_huyen
            }
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-phuong-xa", payload)
                .then((res) => {
                    this.list_phuong_xa = res.data.data || [];
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
                return;
            }
            var payload = {
                id_tinh_thanh: id_tinh_thanh
            }
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-quan-huyen", payload)
                .then((res) => {
                    this.list_quan_huyen = res.data.data || [];
                    // Reset phường/xã khi đổi tỉnh/thành
                    this.list_phuong_xa = [];
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                    this.list_quan_huyen = [];
                });
        },
        loadTinhThanh() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-tinh-thanh")
                .then((res) => {
                    this.list_tinh_thanh = res.data.data || [];
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                });
        },
        openUpdateModal(diaChi) {
            // Copy địa chỉ vào update_dia_chi
            this.update_dia_chi = {
                id: diaChi.id || '',
                id_tinh_thanh: diaChi.id_tinh_thanh || '',
                id_quan_huyen: diaChi.id_quan_huyen || '',
                id_phuong_xa: diaChi.id_phuong_xa || '',
                dia_chi: diaChi.dia_chi || '',
                ten_nguoi_nhan: diaChi.ten_nguoi_nhan || '',
                so_dien_thoai: diaChi.so_dien_thoai || '',
            };
            // Load quận/huyện và phường/xã
            if (this.update_dia_chi.id_tinh_thanh) {
                this.loadQuanHuyen(this.update_dia_chi.id_tinh_thanh);
            }
            if (this.update_dia_chi.id_quan_huyen) {
                this.loadPhuongXa(this.update_dia_chi.id_quan_huyen);
            }
        },
        onTabChange(tabName) {
            // Reload địa chỉ khi chuyển sang tab địa chỉ
            if (tabName === 'address') {
                this.loadDiaChi();
            }
        },
        changePassword() {
            // Validation
            if (!this.doi_mat_khau.old_password) {
                this.$toast.error('Vui lòng nhập mật khẩu hiện tại!');
                return;
            }
            if (!this.doi_mat_khau.password) {
                this.$toast.error('Vui lòng nhập mật khẩu mới!');
                return;
            }
            if (this.doi_mat_khau.password.length < 6) {
                this.$toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
                return;
            }
            if (this.doi_mat_khau.password !== this.doi_mat_khau.re_password) {
                this.$toast.error('Mật khẩu xác nhận không khớp!');
                return;
            }

            this.isChangingPassword = true;
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/change-password", this.doi_mat_khau, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        // Reset form
                        this.doi_mat_khau = {
                            old_password: '',
                            password: '',
                            re_password: ''
                        };
                        this.showOldPassword = false;
                        this.showNewPassword = false;
                        this.showConfirmPassword = false;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.data) {
                        if (err.response.data.errors) {
                            const errors = Object.values(err.response.data.errors);
                            errors.forEach(errorList => {
                                if (Array.isArray(errorList)) {
                                    errorList.forEach(error => this.$toast.error(error));
                                }
                            });
                        } else {
                            this.$toast.error(err.response.data.message || 'Có lỗi xảy ra khi đổi mật khẩu');
                        }
                    } else {
                        this.$toast.error('Có lỗi xảy ra khi đổi mật khẩu');
                    }
                })
                .finally(() => {
                    this.isChangingPassword = false;
                });
        }
    }
};
</script>
<style scoped>
.password-input-wrapper {
    position: relative;
}

.password-input-wrapper .form-control {
    padding-right: 45px;
}

.password-toggle-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 5px 10px;
    z-index: 10;
    transition: color 0.3s;
}

.password-toggle-btn:hover {
    color: #495057;
}

.password-toggle-btn:focus {
    outline: none;
    box-shadow: none;
}

.password-toggle-btn i {
    font-size: 16px;
}
</style>