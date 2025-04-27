<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div class="container-fluid ">
                    <div class="d-flex align-items-center">
                        <img src="https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-beauty-logo-design-png-image_6568470.png"
                            class="logo-icon" alt="logo icon">
                        <h4 class="logo-text ms-2 text-white">Shop</h4>
                    </div>
                    <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>

                    <div class="right-menu d-flex align-items-center ms-auto me-3">
                        <div class="d-flex align-items-center phone-info me-3">
                            <i class="fa-solid fa-phone-volume text-warning fa-2x me-2"></i>
                            <div class="me-2">
                                <span class="ms-1 text-white">Hỗ trợ khách hàng</span><br>
                                <span class="fw-bold ms-1 phone-number text-white">0971 411 122</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center account-info me-4">
                            <i class="fa-solid fa-user text-danger fa-2x me-2"></i>
                            <div class="me-2">
                                <span class="fw-bold ms-1 account-text text-white">Tài khoản</span><br>
                                <router-link to="/khach-hang/dang-nhap" class="text-decoration-none">
                                    <span class="ms-1 text-decoration-none account-link text-white">Đăng nhập</span>
                                </router-link>
                            </div>
                        </div>
                        <div>
                            <router-link to="/checkouts">
                                <button class="btn border border-danger bg-white text-dark px-2 position-relative cart-btn">
                                <i class="fa-solid fa-cart-shopping text-danger fa-lg"></i>
                                <span class="cart-text">Giỏ hàng</span>
                                <span class="badge text-bg-warning ms-1">0</span>
                            </button>
                            </router-link>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    </header>
</template>

<script>
export default {

}
</script>
<style>
/* Hover vào Hỗ trợ khách hàng: đổi màu số điện thoại từ đen sang đỏ */
.phone-info:hover .phone-number {
    color: red !important;
}

/* Hover vào Tài khoản: đổi màu "Tài khoản" và "Đăng nhập" từ đen sang đỏ */
.account-info:hover .account-text,
.account-info:hover .account-link {
    color: red !important;
}

/* Hover vào Giỏ hàng: chỉ đổi màu chữ "Giỏ hàng" từ đen sang đỏ */
.cart-btn:hover .cart-text {
    color: red !important;
}
</style>
