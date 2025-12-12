<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="text-center  mb-5 mt-4"><b>Đăng Ký SHOPQA</b></h3>

                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-3">
                                                <label for="firstName" class="form-label">FirstName</label>
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-3">
                                                <label for="lastName" class="form-label">LastName</label>
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <label for="">Email</label>
                                    <div class="input-group mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-envelope"></i></span>
                                        <input type="text" class="form-control">
                                    </div>
                                    <label for="">Password</label>
                                    <div class="input-group  mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-lock"></i></span>
                                        <input type="text" class="form-control">
                                    </div>
                                    <label for="">Re-enter Password</label>
                                    <div class="input-group  mt-2 mb-2"> <span class="input-group-text"><i
                                                class="fa-solid fa-lock"></i></span>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="mb-3">
                                        <label for="country" class="form-label">Đất nước</label>
                                        <select class="form-select">
                                            <option>Vietnam</option>
                                            <option>India</option>
                                            <option>USA</option>
                                            <option value="">Khác</option>
                                        </select>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox">
                                        <label class="form-check-label" for="terms">
                                            Tôi đồng ý với Điều khoản & Điều kiện
                                        </label>
                                    </div>
                                    <button class="btn btn-primary w-100"><i class="fa-regular fa-user fa-1x"></i> Đăng
                                        Ký</button>
                                    <div class="row justify-content-center align-items-center">
                                        <div class="col-lg-9">
                                            <div class="d-flex flex-row mt-3 justify-content-center">
                                                Bạn đã có tài khoản?
                                                <router-link to="/khach-hang/dang-nhap">
                                                    <h6 class="text-primary"
                                                        style="cursor: pointer; text-decoration: none;"
                                                        onmouseover="this.style.textDecoration='underline'"
                                                        onmouseout="this.style.textDecoration='none'">
                                                        Đăng nhập tại đây
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
