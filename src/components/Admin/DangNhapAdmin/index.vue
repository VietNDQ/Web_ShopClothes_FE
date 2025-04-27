<template>
    <div class="d-flex align-items-center justify-content-center ">
        <div class="container-fluid">
            <div class="row row-cols-lg-2">
                <div class="col mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="text-center mb-5 mt-4"><b>Nhân Viên Đăng Nhập SHOPQA</b></h3>
                                    <label for="">Email</label>
                                    <div class="input-group mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-envelope"></i></span>
                                        <input v-model="user.email" @keyup.enter="Login()" type="text"
                                            class="form-control">
                                    </div>
                                    <label for="">Password</label>
                                    <div class="input-group mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-lock"></i></span>
                                        <input v-model="user.password" @keyup.enter="Login()" type="text"
                                            class="form-control">
                                    </div>
                                    <div class="text-end">
                                        <router-link to="/quen-mat-khau">
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
    methods: {
    Login() {
        axios
            .post("http://127.0.0.1:8000/api/admin/dang-nhap", this.user)
            .then((res) => {
                if (res.data.status) {
                    localStorage.setItem('nhan_vien_login', res.data.token); // Lưu token vào localStorage
                    this.$toast.success(res.data.message);
                    this.$router.push('/admin/san-pham'); // Chuyển hướng tới trang sản phẩm
                } else {
                    this.$toast.error(res.data.message); // Hiển thị thông báo lỗi
                }
            })
            .catch((error) => {
                console.log(error.response); // In toàn bộ phản hồi lỗi từ server
                const list = Object.values(error.response?.data?.errors || { error: ['Đã xảy ra lỗi không xác định'] });
                list.forEach((v) => {
                    this.$toast.error(v[0]); // Hiển thị các lỗi
                });
            });
    }
}

}
</script>

<style></style>
