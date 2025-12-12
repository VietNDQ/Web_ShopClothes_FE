<template>
    <div class="d-flex align-items-center justify-content-center">
        <div class="container-fluid">
            <div class="row row-cols-lg-2">
                <div class="col mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="text-center mb-5 mt-4"><b>Đăng Nhập SHOPQA</b></h3>
                                    <label for="">Email</label>
                                    <div class="input-group mt-2 mb-2">
                                        <span class="input-group-text">
                                            <i class="fa-solid fa-envelope"></i>
                                        </span>
                                        <input 
                                            v-model="user.email" 
                                            @keyup.enter="Login()" 
                                            type="text"
                                            class="form-control"
                                            placeholder="Nhập email của bạn"
                                        >
                                    </div>
                                    <label for="">Password</label>
                                    <div class="input-group mt-2 mb-2">
                                        <span class="input-group-text">
                                            <i class="fa-solid fa-lock"></i>
                                        </span>
                                        <input 
                                            v-model="user.password" 
                                            @keyup.enter="Login()" 
                                            :type="showPassword ? 'text' : 'password'"
                                            class="form-control"
                                            placeholder="Nhập mật khẩu"
                                        >
                                        <button 
                                            class="btn btn-outline-secondary" 
                                            type="button"
                                            @click="showPassword = !showPassword"
                                        >
                                            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                                        </button>
                                    </div>
                                    <div class="text-end">
                                        <router-link to="/khach-hang/quen-mat-khau">
                                            <h6 class="text-primary mt-1"
                                                style="cursor: pointer; text-decoration: none;"
                                                @mouseover="$event.target.style.textDecoration='underline'"
                                                @mouseout="$event.target.style.textDecoration='none'">
                                                Quên mật khẩu?
                                            </h6>
                                        </router-link>
                                    </div>
                                    <button 
                                        @click="Login()" 
                                        class="btn btn-primary mt-2 w-100"
                                        :disabled="isLoggingIn"
                                    >
                                        <span v-if="isLoggingIn" class="spinner-border spinner-border-sm me-2"></span>
                                        <i v-else class="fa-solid fa-sign-in-alt me-2"></i>
                                        Đăng Nhập
                                    </button>
                                    <div class="text-center mt-2">
                                        <div class="d-flex align-items-center text-muted mt-2 mb-2">
                                            <hr class="flex-grow-1">
                                            <h6 class="mx-2 mb-0">Hoặc</h6>
                                            <hr class="flex-grow-1">
                                        </div>
                                        <GoogleLogin :callback="LoginGoogle" style="width: 100%;" />
                                    </div>
                                    <div class="row justify-content-center align-items-center">
                                        <div class="col-lg-9">
                                            <div class="d-flex flex-row mt-3 justify-content-center">
                                                Bạn chưa có tài khoản?
                                                <router-link to="/khach-hang/dang-ky">
                                                    <h6 class="text-primary"
                                                        style="cursor: pointer; text-decoration: none;"
                                                        @mouseover="$event.target.style.textDecoration='underline'"
                                                        @mouseout="$event.target.style.textDecoration='none'">
                                                        Đăng ký tại đây
                                                    </h6>
                                                </router-link>
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
    </div>
</template>

<script>
import axios from 'axios';
import { decodeCredential } from 'vue3-google-login';
import emitter from "@/eventBus";

export default {
    name: 'DangNhapChung',
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            showPassword: false,
            isLoggingIn: false,
            apiBaseUrl: 'http://127.0.0.1:8000/api'
        }
    },
    mounted() {
        this.kiemTraDangNhap();
    },
    methods: {
        async Login() {
            if (!this.user.email || !this.user.password) {
                this.$toast?.error('Vui lòng nhập đầy đủ email và mật khẩu!');
                return;
            }

            this.isLoggingIn = true;

            try {
                // Thử đăng nhập với admin trước
                const adminResponse = await axios.post(`${this.apiBaseUrl}/admin/dang-nhap`, this.user);
                
                if (adminResponse.data.status === 1 || adminResponse.data.status === true) {
                    // Đăng nhập admin thành công
                    localStorage.setItem("token_nhan_vien", adminResponse.data.token);
                    localStorage.removeItem("token_khach_hang"); // Xóa token khách hàng nếu có
                    localStorage.removeItem("ho_ten_khach_hang");
                    localStorage.removeItem("check_kh");
                    
                    this.$toast?.success(adminResponse.data.message || 'Đăng nhập thành công!');
                    this.$router.push('/admin/san-pham').then(() => {
                        location.reload();
                    });
                    return;
                }
            } catch (adminError) {
                // Nếu đăng nhập admin thất bại, tiếp tục thử với khách hàng
                console.log('Admin login failed, trying customer login...');
            }

            try {
                // Thử đăng nhập với khách hàng
                const customerResponse = await axios.post(`${this.apiBaseUrl}/khach-hang/dang-nhap`, this.user);
                
                if (customerResponse.data.status === true || customerResponse.data.status === 1) {
                    // Đăng nhập khách hàng thành công
                    localStorage.setItem("token_khach_hang", customerResponse.data.token);
                    localStorage.setItem("ho_ten_khach_hang", customerResponse.data.ho_va_ten || '');
                    // Đảm bảo check_kh luôn là string "1" để dễ kiểm tra
                    localStorage.setItem("check_kh", customerResponse.data.status ? '1' : '0');
                    localStorage.removeItem("token_nhan_vien"); // Xóa token admin nếu có
                    
                    // Emit event để cập nhật user info ở TopClient
                    emitter.emit('cap-nhat-user');
                    
                    this.$toast?.success(customerResponse.data.message || 'Đăng nhập thành công!');
                    this.$router.push('/').then(() => {
                        location.reload();
                    });
                    return;
                } else {
                    this.$toast?.error(customerResponse.data.message || 'Đăng nhập thất bại!');
                }
            } catch (customerError) {
                // Xử lý lỗi từ cả 2 API
                if (customerError.response?.data?.errors) {
                    const errors = Object.values(customerError.response.data.errors);
                    errors.forEach(errorList => {
                        if (Array.isArray(errorList)) {
                            errorList.forEach(error => this.$toast?.error(error));
                        }
                    });
                } else if (customerError.response?.data?.message) {
                    this.$toast?.error(customerError.response.data.message);
                } else {
                    this.$toast?.error('Tài khoản hoặc mật khẩu không chính xác!');
                }
            } finally {
                this.isLoggingIn = false;
            }
        },
        LoginGoogle(response) {
            const payload = {
                'id_token': response.credential,
            };
            axios
                .post(`${this.apiBaseUrl}/khach-hang/login-google`, payload)
                .then((res) => {
                    if (res.data.status) {
                        localStorage.setItem("token_khach_hang", res.data.token);
                        localStorage.setItem("ho_ten_khach_hang", res.data.ho_va_ten);
                        localStorage.setItem("check_kh", res.data.status || '1');
                        localStorage.removeItem("token_nhan_vien");
                        
                        // Emit event để cập nhật user info ở TopClient
                        emitter.emit('cap-nhat-user');
                        
                        this.$toast?.success(res.data.message);
                        this.$router.push('/').then(() => {
                            location.reload();
                        });
                    } else {
                        this.$toast?.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        const list = Object.values(err.response.data.errors);
                        list.forEach((v) => {
                            this.$toast?.error(v[0]);
                        });
                    } else {
                        this.$toast?.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                    }
                });
        },
        async kiemTraDangNhap() {
            // Kiểm tra token admin
            const adminToken = localStorage.getItem("token_nhan_vien");
            if (adminToken) {
                try {
                    const adminCheck = await axios.get(`${this.apiBaseUrl}/admin/check-token`, {
                        headers: {
                            Authorization: "Bearer " + adminToken
                        }
                    });
                    if (adminCheck.data.status) {
                        this.$router.push("/admin/san-pham");
                        return;
                    }
                } catch (error) {
                    localStorage.removeItem("token_nhan_vien");
                }
            }

            // Kiểm tra token khách hàng
            const customerToken = localStorage.getItem("token_khach_hang");
            if (customerToken) {
                try {
                    const customerCheck = await axios.get(`${this.apiBaseUrl}/khach-hang/check-token`, {
                        headers: {
                            Authorization: 'Bearer ' + customerToken
                        }
                    });
                    if (customerCheck.data.status) {
                        this.$router.push("/");
                        return;
                    }
                } catch (error) {
                    localStorage.removeItem("token_khach_hang");
                    localStorage.removeItem("ho_ten_khach_hang");
                    localStorage.removeItem("check_kh");
                }
            }
        }
    },
}
</script>

<style scoped>
.card {
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 2rem;
}

.input-group-text {
    background-color: #f8f9fa;
    border-right: none;
}

.form-control:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 12px;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}
</style>

