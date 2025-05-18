<template>
    <div class="d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="row row-cols-lg-2">
                <div class="col mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="text-center mb-5"><b>Đăng Nhập SHOPQA</b></h3>
                                    <label for="">Email</label>
                                    <div class="input-group  mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-envelope"></i></span>
                                        <input v-model="user.email" @keydown.enter="Login()" type="text"
                                            class="form-control">
                                    </div>
                                    <label for="">Password</label>
                                    <div class="input-group  mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-lock"></i></span>
                                        <input v-model="user.password" @keydown.enter="Login()" type="text"
                                            class="form-control">
                                    </div>
                                    <div class="text-end">
                                        <router-link to="/khach-hang/quen-mat-khau">
                                            <h6 class="text-primary mt-1"
                                                style="cursor: pointer; text-decoration: none;"
                                                onmouseover="this.style.textDecoration='underline'"
                                                onmouseout="this.style.textDecoration='none'">
                                                Quên mật khẩu?
                                            </h6>
                                        </router-link>
                                    </div>
                                    <button @click="Login()" class="btn btn-primary mt-2 w-100">Đăng Nhập</button>
                                    <div class="text-center mt-2">
                                        <div class="d-flex align-items-center text-muted mt-2 mb-2">
                                            <hr class="flex-grow-1">
                                            <h6 class="mx-2 mb-0">Hoặc</h6>
                                            <hr class="flex-grow-1">
                                        </div>

                                        <button class="btn btn-outline-dark w-100"><i class="fa-brands fa-google"></i>
                                            Đăng
                                            nhập bằng Google</button>
                                    </div>
                                    <div class="row justify-content-center align-items-center">
                                        <div class="col-lg-9">
                                            <div class="d-flex flex-row mt-3 justify-content-center">
                                                Bạn chưa có tài khoản?
                                                <router-link to="/khach-hang/dang-ky">
                                                    <h6 class="text-primary"
                                                        style="cursor: pointer; text-decoration: none;"
                                                        onmouseover="this.style.textDecoration='underline'"
                                                        onmouseout="this.style.textDecoration='none'">
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

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
        }
    },
    mounted() {
           console.log(localStorage.getItem("token_khach_hang"));
    },
    methods: {
        Login() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.user)
                .then((res) => {
                    if (res.data.status) {
                        localStorage.setItem("token_khach_hang", res.data.token);
                        localStorage.setItem("ho_ten_khach_hang", res.data.ho_va_ten);
                        localStorage.setItem("check_kh", 1); // nên đặt là 1 rõ ràng
                        this.$toast.success(res.data.message)
                        this.$router.push('/khach-hang/profile');
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        const list = Object.values(err.response.data.errors);
                        list.forEach((v) => {
                            this.$toast.error(v[0]);
                        });
                    } else {
                        this.$toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
                    }
                });
        }
    },
}
</script>

<style></style>
