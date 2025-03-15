import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
  {
    path: "/",
    component: () => import("../layout/wrapper/index.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/san-pham",
    component: () => import("../components/Admin/SanPham/index.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/danh-muc-san-pham",
    component: () => import("../components/Admin/DanhMuc/index.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/thuong-hieu",
    component: () => import("../components/Admin/ThuongHieu/index.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/bien-the-san-pham",
    component: () => import("../components/Admin/BienTheSanPham/index.vue"),
    meta: { layout: "default" },
  },
  //Sign
  {
    path: "/khach-hang/dang-nhap",
    component: () => import("../components/KhachHang/DangNhap/index.vue"),
    meta: { layout: "blank" },
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
    path: "/trang-chu",
    component: () => import("../components/Client/TrangChu/index.vue"),
    meta: { layout: "client" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router