import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkNhanVienLogin from "./checkNhanVienLogin";
const routes = [
  {
    path: "/",
    component: () => import("../components/Client/TrangChu/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/chi-tiet-san-pham/:id_san_pham-:slug_san_pham",
    component: () => import("../components/Client/ChiTietSanPham/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/checkouts",
    component: () => import("../components/Client/GioHang/index.vue"),
    meta: { layout: "client" },
  },

  //Admin
  {
    path: "/admin/quan-ly-don-hang",
    component: () => import("../components/Admin/QuanLyDonHang/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/nhan-vien",
    component: () => import("../components/Admin/NhanVien/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/dang-nhap",
    component: () => import("../components/Admin/DangNhapAdmin/index.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/admin/khach-hang",
    component: () => import("../components/Admin/KhachHang/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/san-pham",
    component: () => import("../components/Admin/SanPham/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/danh-muc-san-pham",
    component: () => import("../components/Admin/DanhMuc/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/thuong-hieu",
    component: () => import("../components/Admin/ThuongHieu/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/bien-the-san-pham",
    component: () => import("../components/Admin/BienTheSanPham/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/hinh-anh-san-pham",
    component: () => import("../components/Admin/HinhAnhSanPham/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/phan-quyen",
    component: () => import("../components/Admin/PhanQuyen/index.vue"),
    meta: { layout: "default" },
  },
  //Sign khach hang
  {
    path: "/khach-hang/dang-nhap",
    component: () => import("../components/KhachHang/DangNhap/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/khach-hang/dang-ky",
    component: () => import("../components/KhachHang/DangKy/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/khach-hang/quen-mat-khau",
    component: () => import("../components/KhachHang/QuenMatKhau/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/khach-hang/profile",
    component: () => import("../components/KhachHang/Profile/index.vue"),
    meta: { layout: "client" },
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router