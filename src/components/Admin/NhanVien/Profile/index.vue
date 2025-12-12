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
                            <a class="nav-link" data-bs-toggle="tab" href="#password">
                                <i class="fa-solid fa-lock me-2"></i>Đổi mật khẩu
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <!-- Tab Thông tin cá nhân -->
                        <div class="tab-pane fade show active" id="profile">
                            <div class="row g-4">
                                <div class="col-lg-4">
                                    <div class="card border-0 shadow-sm h-100">
                                        <div class="card-body text-center p-4">
                                            <div class="avatar-wrapper mb-3">
                                                <div class="avatar-circle bg-primary text-white d-flex align-items-center justify-content-center">
                                                    <i class="fa-solid fa-user fa-3x"></i>
                                                </div>
                                            </div>
                                            <h2 class="mb-1">{{ thong_tin.ho_va_ten || 'Chưa có tên' }}</h2>
                                            <h5 class="mb-1 text-muted">{{ thong_tin.email }}</h5>
                                            <p class="text-muted mb-3">
                                                <span class="badge bg-info">{{ thong_tin.chuc_vu?.ten_chuc_vu || 'Chưa có chức vụ' }}</span>
                                            </p>
                                            <div class="row mt-4">
                                                <div class="col-12 mb-3">
                                                    <div class="info-item">
                                                        <i class="fa-solid fa-phone me-2 text-primary"></i>
                                                        <span>{{ thong_tin.so_dien_thoai || 'Chưa có số điện thoại' }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="info-item">
                                                        <i class="fa-solid fa-location-dot me-2 text-primary"></i>
                                                        <span>{{ thong_tin.dia_chi || 'Chưa có địa chỉ' }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="card border-0 shadow-sm h-100">
                                        <div class="card-body p-4">
                                            <h3 class="card-title mb-4">
                                                <i class="fa-solid fa-edit me-2"></i>Thông tin cá nhân
                                            </h3>
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
                                                        <small class="text-muted">Email không thể thay đổi</small>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Số điện thoại</label>
                                                        <input type="tel" class="form-control" v-model="profileData.so_dien_thoai"
                                                            placeholder="Nhập số điện thoại">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Chức vụ</label>
                                                        <input :value="thong_tin.chuc_vu?.ten_chuc_vu || 'Chưa có chức vụ'" type="text"
                                                            class="form-control" disabled>
                                                        <small class="text-muted">Chức vụ không thể thay đổi</small>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <label class="form-label">Địa chỉ</label>
                                                        <textarea class="form-control" v-model="profileData.dia_chi"
                                                            placeholder="Nhập địa chỉ" rows="3"></textarea>
                                                    </div>
                                                </div>
                                                <div class="text-end mt-4">
                                                    <button type="button" @click="resetProfileForm" class="btn btn-light me-2">Huỷ</button>
                                                    <button type="submit" class="btn btn-primary px-4" :disabled="isUpdatingProfile">
                                                        <span v-if="isUpdatingProfile" class="spinner-border spinner-border-sm me-2"></span>
                                                        <i class="fa-solid fa-save me-2"></i>Lưu thay đổi
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tab Đổi mật khẩu -->
                        <div class="tab-pane fade" id="password">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="card border-0 shadow-sm">
                                        <div class="card-body p-4">
                                            <h3 class="card-title mb-4">
                                                <i class="fa-solid fa-key me-2"></i>Đổi mật khẩu
                                            </h3>
                                            <form @submit.prevent="changePassword">
                                                <div class="row g-3">
                                                    <div class="col-md-12">
                                                        <label class="form-label">Mật khẩu hiện tại <span class="text-danger">*</span></label>
                                                        <div class="password-input-wrapper">
                                                            <input 
                                                                :type="showOldPassword ? 'text' : 'password'" 
                                                                class="form-control" 
                                                                v-model="passwordData.old_password"
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
                                                    <div class="col-md-12">
                                                        <label class="form-label">Mật khẩu mới <span class="text-danger">*</span></label>
                                                        <div class="password-input-wrapper">
                                                            <input 
                                                                :type="showNewPassword ? 'text' : 'password'" 
                                                                class="form-control" 
                                                                v-model="passwordData.password"
                                                                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)" 
                                                                required>
                                                            <button 
                                                                type="button" 
                                                                class="password-toggle-btn"
                                                                @click="showNewPassword = !showNewPassword">
                                                                <i :class="showNewPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <label class="form-label">Xác nhận mật khẩu mới <span class="text-danger">*</span></label>
                                                        <div class="password-input-wrapper">
                                                            <input 
                                                                :type="showConfirmPassword ? 'text' : 'password'" 
                                                                class="form-control" 
                                                                v-model="passwordData.re_password"
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
                                                </div>
                                                <div class="text-end mt-4">
                                                    <button type="button" @click="resetPasswordForm" class="btn btn-light me-2">Huỷ</button>
                                                    <button type="submit" class="btn btn-primary px-4" :disabled="isChangingPassword">
                                                        <span v-if="isChangingPassword" class="spinner-border spinner-border-sm me-2"></span>
                                                        <i class="fa-solid fa-key me-2"></i>Đổi mật khẩu
                                                    </button>
                                                </div>
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
</template>

<script>
import axios from 'axios';

export default {
    name: 'NhanVienProfile',
    data() {
        return {
            thong_tin: {},
            profileData: {
                ho_va_ten: '',
                so_dien_thoai: '',
                dia_chi: ''
            },
            passwordData: {
                old_password: '',
                password: '',
                re_password: ''
            },
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            isUpdatingProfile: false,
            isChangingPassword: false
        }
    },
    mounted() {
        this.loadProfile();
    },
    methods: {
        loadProfile() {
            axios
                .get("http://127.0.0.1:8000/api/admin/nhan-vien/profile", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
                        // Populate profile form
                        this.profileData = {
                            ho_va_ten: res.data.thong_tin.ho_va_ten || '',
                            so_dien_thoai: res.data.thong_tin.so_dien_thoai || '',
                            dia_chi: res.data.thong_tin.dia_chi || ''
                        };
                    } else {
                        this.$toast.error(res.data.message || 'Không thể tải thông tin profile');
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        this.$toast.error("Vui lòng đăng nhập lại!");
                        localStorage.removeItem("token_nhan_vien");
                        this.$router.push('/admin/dang-nhap');
                    } else {
                        this.$toast.error(err.response?.data?.message || 'Đã xảy ra lỗi khi tải thông tin');
                    }
                });
        },
        updateProfile() {
            this.isUpdatingProfile = true;
            axios
                .post("http://127.0.0.1:8000/api/admin/nhan-vien/update-profile", this.profileData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_nhan_vien")
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
                                localStorage.setItem("ho_ten_nhan_vien", res.data.thong_tin.ho_va_ten);
                            }
                        }
                        // Reload profile để đảm bảo đồng bộ
                        this.loadProfile();
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
                dia_chi: this.thong_tin.dia_chi || ''
            };
        },
        changePassword() {
            this.isChangingPassword = true;
            axios
                .post("http://127.0.0.1:8000/api/admin/nhan-vien/change-password", this.passwordData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.resetPasswordForm();
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
        },
        resetPasswordForm() {
            this.passwordData = {
                old_password: '',
                password: '',
                re_password: ''
            };
            this.showOldPassword = false;
            this.showNewPassword = false;
            this.showConfirmPassword = false;
        }
    }
}
</script>

<style scoped>
.avatar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.avatar-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-item {
    padding: 8px 0;
    text-align: left;
}

.info-item i {
    width: 20px;
}

.nav-tabs .nav-link {
    color: #6c757d;
    border: none;
    border-bottom: 2px solid transparent;
}

.nav-tabs .nav-link:hover {
    border-color: #dee2e6;
    color: #495057;
}

.nav-tabs .nav-link.active {
    color: #0d6efd;
    border-bottom-color: #0d6efd;
    background-color: transparent;
}

.card {
    border-radius: 12px;
}

.form-control:focus,
.form-select:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #5568d3 0%, #6a4190 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

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

