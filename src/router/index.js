import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import checkNhanVienLogin from "./checkNhanVienLogin";
import checkKhachHangLogin from "./checkKhachHangLogin";

const routes = [
  {
    path: "/",
    component: () => import("../components/Client/TrangChu/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/san-pham",
    component: () => import("../components/Client/SanPham/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/chi-tiet-san-pham/:slug",
    component: () => import("../components/Client/ChiTietSanPham/index.vue"),
    meta: { layout: "client" },
    
  },
  {
    path: "/don-hang",
    component: () => import("../components/Client/DonHang/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/lich-su-mua-hang",
    component: () => import("../components/Client/LichSuMuaHang/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/thanh-toan-chuyen-khoan",
    component: () => import("../components/Client/ThanhToanChuyenKhoan/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/khach-hang/chat-box",
    component: () => import("../components/Client/ChatBoxClient/index.vue"),
    meta: { layout: "client" },
  },
  //Admin
  {
    path: "/admin/thong-ke",
    component: () => import("../components/Admin/ThongKe/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/voucher",
    component: () => import("../components/Admin/Voucher/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
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
    path: "/dang-nhap",
    component: () => import("../components/Common/DangNhap/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/admin/dang-nhap",
    redirect: "/dang-nhap",
  },
  {
    path: "/admin/khach-hang",
    component: () => import("../components/Admin/KhachHang/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/san-pham",
    redirect: "/admin/dang-san-pham",
  },
  {
    path: "/admin/dang-san-pham",
    component: () => import("../components/Admin/QuanLySanPham/index.vue"),
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
    path: "/admin/phan-quyen",
    component: () => import("../components/Admin/PhanQuyen/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  {
    path: "/admin/profile",
    component: () => import("../components/Admin/NhanVien/Profile/index.vue"),
    meta: { layout: "default" },
    beforeEnter: checkNhanVienLogin,
  },
  //Sign khach hang
  {
    path: "/khach-hang/dang-nhap",
    redirect: "/dang-nhap",
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
    beforeEnter: checkKhachHangLogin
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router