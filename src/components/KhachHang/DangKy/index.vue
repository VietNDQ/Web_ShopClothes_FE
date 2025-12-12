<template>
    <div class="register-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-10">
                    <div class="register-card">
                        <div class="card-header-section">
                            <h2 class="register-title">
                                <i class="fa-solid fa-user-plus me-2"></i>
                                Đăng Ký Tài Khoản
                            </h2>
                            <p class="register-subtitle">Tạo tài khoản mới để mua sắm tại SHOPQA</p>
                        </div>
                        <div class="card-body-section">
                            <form @submit.prevent="dangKy()">
                                <div class="row g-3">
                                    <!-- Họ và tên -->
                                    <div class="col-md-12">
                                        <label class="form-label">
                                            Họ và tên <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fa-solid fa-user"></i>
                                            </span>
                                            <input 
                                                v-model="formData.ho_va_ten" 
                                                type="text" 
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.ho_va_ten }"
                                                placeholder="Nhập họ và tên đầy đủ"
                                                required
                                            >
                                        </div>
                                        <div v-if="errors.ho_va_ten" class="invalid-feedback d-block">
                                            {{ errors.ho_va_ten }}
                                        </div>
                                        <small class="text-muted">Từ 4 đến 50 ký tự</small>
                                    </div>

                                    <!-- Email -->
                                    <div class="col-md-12">
                                        <label class="form-label">
                                            Email <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fa-solid fa-envelope"></i>
                                            </span>
                                            <input 
                                                v-model="formData.email" 
                                                type="email" 
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.email }"
                                                placeholder="example@email.com"
                                                required
                                            >
                                        </div>
                                        <div v-if="errors.email" class="invalid-feedback d-block">
                                            {{ errors.email }}
                                        </div>
                                    </div>

                                    <!-- Số điện thoại -->
                                    <div class="col-md-6">
                                        <label class="form-label">
                                            Số điện thoại <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fa-solid fa-phone"></i>
                                            </span>
                                            <input 
                                                v-model="formData.so_dien_thoai" 
                                                type="tel" 
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.so_dien_thoai }"
                                                placeholder="0123456789"
                                                @input="formatPhoneNumber"
                                                required
                                            >
                                        </div>
                                        <div v-if="errors.so_dien_thoai" class="invalid-feedback d-block">
                                            {{ errors.so_dien_thoai }}
                                        </div>
                                        <small class="text-muted">10-11 chữ số</small>
                                    </div>

                                    <!-- Ngày sinh -->
                                    <div class="col-md-6">
                                        <label class="form-label">
                                            Ngày sinh <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fa-solid fa-calendar"></i>
                                            </span>
                                            <input 
                                                v-model="formData.ngay_sinh" 
                                                type="date" 
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.ngay_sinh }"
                                                :max="maxDate"
                                                required
                                            >
                                        </div>
                                        <div v-if="errors.ngay_sinh" class="invalid-feedback d-block">
                                            {{ errors.ngay_sinh }}
                                        </div>
                                    </div>

                                    <!-- Mật khẩu -->
                                    <div class="col-md-6">
                                        <label class="form-label">
                                            Mật khẩu <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fa-solid fa-lock"></i>
                                            </span>
                                            <input 
                                                v-model="formData.password" 
                                                :type="showPassword ? 'text' : 'password'"
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.password }"
                                                placeholder="Tối thiểu 6 ký tự"
                                                required
                                            >
                                            <button 
                                                class="btn btn-outline-secondary" 
                                                type="button"
                                                @click="showPassword = !showPassword"
                                            >
                                                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                            </button>
                                        </div>
                                        <div v-if="errors.password" class="invalid-feedback d-block">
                                            {{ errors.password }}
                                        </div>
                                        <small class="text-muted">Từ 6 đến 30 ký tự</small>
                                    </div>

                                    <!-- Xác nhận mật khẩu -->
                                    <div class="col-md-6">
                                        <label class="form-label">
                                            Xác nhận mật khẩu <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <i class="fa-solid fa-lock"></i>
                                            </span>
                                            <input 
                                                v-model="formData.re_password" 
                                                :type="showConfirmPassword ? 'text' : 'password'"
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.re_password }"
                                                placeholder="Nhập lại mật khẩu"
                                                required
                                            >
                                            <button 
                                                class="btn btn-outline-secondary" 
                                                type="button"
                                                @click="showConfirmPassword = !showConfirmPassword"
                                            >
                                                <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                            </button>
                                        </div>
                                        <div v-if="errors.re_password" class="invalid-feedback d-block">
                                            {{ errors.re_password }}
                                        </div>
                                    </div>

                                    <!-- Điều khoản -->
                                    <div class="col-md-12">
                                        <div class="form-check">
                                            <input 
                                                class="form-check-input" 
                                                type="checkbox" 
                                                v-model="agreeTerms"
                                                :class="{ 'is-invalid': !agreeTerms && submitted }"
                                                id="agreeTerms"
                                                required
                                            >
                                            <label class="form-check-label" for="agreeTerms">
                                                Tôi đồng ý với 
                                                <a href="#" class="text-primary">Điều khoản & Điều kiện</a> 
                                                và 
                                                <a href="#" class="text-primary">Chính sách bảo mật</a>
                                            </label>
                                        </div>
                                        <div v-if="!agreeTerms && submitted" class="invalid-feedback d-block">
                                            Vui lòng đồng ý với điều khoản để tiếp tục!
                                        </div>
                                    </div>
                                </div>

                                <div class="d-grid gap-2 mt-4">
                                    <button 
                                        type="submit" 
                                        class="btn btn-primary btn-lg"
                                        :disabled="isSubmitting"
                                    >
                                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                                        <i v-else class="fa-solid fa-user-plus me-2"></i>
                                        {{ isSubmitting ? 'Đang xử lý...' : 'Đăng Ký' }}
                                    </button>
                                </div>
                            </form>

                            <div class="divider-section mt-4">
                                <div class="d-flex align-items-center text-muted">
                                    <hr class="flex-grow-1">
                                    <span class="mx-3">Hoặc</span>
                                    <hr class="flex-grow-1">
                                </div>
                            </div>

                            <div class="text-center mt-4">
                                <p class="mb-0">
                                    Bạn đã có tài khoản?
                                    <router-link to="/dang-nhap" class="text-primary fw-bold">
                                        Đăng nhập tại đây
                                    </router-link>
                                </p>
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
    name: 'DangKyKhachHang',
    data() {
        return {
            formData: {
                ho_va_ten: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: ''
            },
            errors: {},
            showPassword: false,
            showConfirmPassword: false,
            agreeTerms: false,
            isSubmitting: false,
            submitted: false,
            apiBaseUrl: 'http://127.0.0.1:8000/api'
        }
    },
    computed: {
        maxDate() {
            const today = new Date();
            today.setFullYear(today.getFullYear() - 13); // Ít nhất 13 tuổi
            return today.toISOString().split('T')[0];
        }
    },
    methods: {
        formatPhoneNumber() {
            // Chỉ giữ lại số
            this.formData.so_dien_thoai = this.formData.so_dien_thoai.replace(/[^0-9]/g, '');
        },
        validateForm() {
            this.errors = {};
            let isValid = true;

            // Validate họ và tên
            if (!this.formData.ho_va_ten || this.formData.ho_va_ten.trim().length < 4) {
                this.errors.ho_va_ten = 'Họ và tên phải có ít nhất 4 ký tự!';
                isValid = false;
            } else if (this.formData.ho_va_ten.trim().length > 50) {
                this.errors.ho_va_ten = 'Họ và tên không được vượt quá 50 ký tự!';
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.formData.email) {
                this.errors.email = 'Email không được để trống!';
                isValid = false;
            } else if (!emailRegex.test(this.formData.email)) {
                this.errors.email = 'Email không đúng định dạng!';
                isValid = false;
            }

            // Validate số điện thoại
            const phone = this.formData.so_dien_thoai.replace(/[^0-9]/g, '');
            if (!phone || phone.length < 10) {
                this.errors.so_dien_thoai = 'Số điện thoại phải có ít nhất 10 chữ số!';
                isValid = false;
            } else if (phone.length > 11) {
                this.errors.so_dien_thoai = 'Số điện thoại không được vượt quá 11 chữ số!';
                isValid = false;
            }

            // Validate ngày sinh
            if (!this.formData.ngay_sinh) {
                this.errors.ngay_sinh = 'Ngày sinh không được để trống!';
                isValid = false;
            } else {
                const birthDate = new Date(this.formData.ngay_sinh);
                const today = new Date();
                if (birthDate >= today) {
                    this.errors.ngay_sinh = 'Ngày sinh phải trước ngày hiện tại!';
                    isValid = false;
                }
            }

            // Validate mật khẩu
            if (!this.formData.password || this.formData.password.length < 6) {
                this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
                isValid = false;
            } else if (this.formData.password.length > 30) {
                this.errors.password = 'Mật khẩu không được vượt quá 30 ký tự!';
                isValid = false;
            }

            // Validate xác nhận mật khẩu
            if (!this.formData.re_password) {
                this.errors.re_password = 'Vui lòng xác nhận mật khẩu!';
                isValid = false;
            } else if (this.formData.password !== this.formData.re_password) {
                this.errors.re_password = 'Mật khẩu xác nhận không khớp!';
                isValid = false;
            }

            // Validate điều khoản
            if (!this.agreeTerms) {
                isValid = false;
            }

            return isValid;
        },
        async dangKy() {
            this.submitted = true;
            this.errors = {};

            if (!this.validateForm()) {
                this.$toast?.error('Vui lòng kiểm tra lại thông tin đã nhập!');
                return;
            }

            this.isSubmitting = true;

            try {
                const payload = {
                    ho_va_ten: this.formData.ho_va_ten.trim(),
                    email: this.formData.email.trim(),
                    so_dien_thoai: this.formData.so_dien_thoai.replace(/[^0-9]/g, ''),
                    ngay_sinh: this.formData.ngay_sinh,
                    password: this.formData.password,
                    re_password: this.formData.re_password
                };

                const response = await axios.post(`${this.apiBaseUrl}/khach-hang/dang-ky`, payload);

                if (response.data.status) {
                    this.$toast?.success(response.data.message || 'Đăng ký thành công!');
                    // Redirect đến trang đăng nhập sau 1.5 giây
                    setTimeout(() => {
                        this.$router.push('/dang-nhap');
                    }, 1500);
                } else {
                    this.$toast?.error(response.data.message || 'Đăng ký thất bại!');
                }
            } catch (error) {
                if (error.response?.data?.errors) {
                    // Xử lý validation errors từ backend
                    const backendErrors = error.response.data.errors;
                    Object.keys(backendErrors).forEach(key => {
                        if (Array.isArray(backendErrors[key]) && backendErrors[key].length > 0) {
                            this.errors[key] = backendErrors[key][0];
                        }
                    });
                    
                    // Hiển thị tất cả lỗi
                    Object.values(backendErrors).forEach(errorList => {
                        if (Array.isArray(errorList)) {
                            errorList.forEach(err => this.$toast?.error(err));
                        }
                    });
                } else if (error.response?.data?.message) {
                    this.$toast?.error(error.response.data.message);
                } else {
                    this.$toast?.error('Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau!');
                }
            } finally {
                this.isSubmitting = false;
            }
        }
    }
}
</script>

<style scoped>
.register-container {
    min-height: 100vh;
    padding: 40px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
}

.register-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.card-header-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 30px;
    text-align: center;
    color: white;
}

.register-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
}

.register-subtitle {
    font-size: 14px;
    opacity: 0.9;
    margin: 0;
}

.card-body-section {
    padding: 40px;
}

.form-label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 8px;
}

.input-group-text {
    background-color: #f8f9fa;
    border-right: none;
}

.form-control {
    border-left: none;
}

.form-control:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-control.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 4px;
    font-size: 0.875rem;
    color: #dc3545;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 14px;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.divider-section {
    margin: 20px 0;
}

.form-check-input:checked {
    background-color: #667eea;
    border-color: #667eea;
}

.form-check-label a {
    text-decoration: none;
}

.form-check-label a:hover {
    text-decoration: underline;
}

.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}

@media (max-width: 768px) {
    .register-container {
        padding: 20px 10px;
    }

    .card-body-section {
        padding: 25px;
    }

    .register-title {
        font-size: 24px;
    }
}
</style>
