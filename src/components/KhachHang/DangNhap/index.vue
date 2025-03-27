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
                                        <input type="text" class="form-control">
                                    </div>
                                    <label for="">Password</label>
                                    <div class="input-group  mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-lock"></i></span>
                                        <input type="text" class="form-control">
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
                                    <button class="btn btn-primary mt-2 w-100">Đăng Nhập</button>
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
export default {

}
</script>

<style></style>
