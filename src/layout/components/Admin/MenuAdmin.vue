<template>
    <div class="nav-container primary-menu">
        <div class="container">
            <div class="mobile-topbar-header">
                <div>
                    <!-- <img src="assets/images/logo-icon.png" class="logo-icon" alt="logo icon"> -->
                </div>
                <div>
                    <h4 class="logo-text">Rukada</h4>
                </div>
                <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
                </div>
            </div>
            <nav class="navbar navbar-expand-xl">
                <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                    <li class="nav-item dropdown">
                        <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                            data-bs-toggle="dropdown">
                            <div class="parent-icon"><i class="fa-brands fa-usps"></i>
                            </div>
                            <div class="menu-title">Dịch Vụ Sản Phẩm</div>
                        </a>
                        <ul class="dropdown-menu" style="width: 120%;">
                            <li class="nav-item">
                                <router-link to="/admin/thuong-hieu">
                                    <a class="nav-link" href="/admin/thuong-hieu">
                                        <div class="parent-icon"><i class="fa-regular fa-registered"></i>
                                        </div>
                                        <div class="menu-title">Thương Hiệu</div>
                                    </a>
                                </router-link>
                            </li>
                            <router-link to="/admin/danh-muc-san-pham">
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/danh-muc-san-pham">
                                        <div class="parent-icon"><i class="fa-solid fa-layer-group"></i>
                                        </div>
                                        <div class="menu-title">Danh Mục</div>
                                    </a>
                                </li>
                            </router-link>
                            <router-link to="/admin/san-pham">
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/san-pham">
                                        <div class="parent-icon"><i class="fa-brands fa-product-hunt"></i>
                                        </div>
                                        <div class="menu-title">Sản Phẩm</div>
                                    </a>
                                </li>
                            </router-link>
                            <router-link to="/admin/bien-the-san-pham">
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/bien-the-san-pham">
                                        <div class="parent-icon"><i class="fa-solid fa-circle-radiation"></i>
                                        </div>
                                        <div class="menu-title">Biến Thể Sản Phẩm</div>
                                    </a>
                                </li>
                            </router-link>
                            <router-link to="/admin/hinh-anh-san-pham">
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/hinh-anh-san-pham">
                                        <div class="parent-icon"><i class="fa-solid fa-images"></i>
                                        </div>
                                        <div class="menu-title">Hình Ảnh Sản Phẩm</div>
                                    </a>
                                </li>
                            </router-link>
                        </ul>
                    </li>
                    <router-link to="/admin/khach-hang">
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/khach-hang">
                                <div class="parent-icon"><i class="fa-regular fa-address-card"></i>
                                </div>
                                <div class="menu-title">Khách Hàng</div>
                            </a>
                        </li>
                    </router-link>
                    <router-link to="/admin/nhan-vien">
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/nhan-vien">
                                <div class="parent-icon"><i class="fa-solid fa-users-viewfinder"></i>
                                </div>
                                <div class="menu-title">Nhân Viên</div>
                            </a>
                        </li>
                    </router-link>
                    <router-link to="/admin/quan-ly-don-hang">
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/quan-ly-don-hang">
                                <div class="parent-icon"><i class="fa-solid fa-list-check"></i>
                                </div>
                                <div class="menu-title">Quản Lý Đơn Hàng</div>
                            </a>
                        </li>
                    </router-link>
                </ul>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
   
}
</script>
<style></style>