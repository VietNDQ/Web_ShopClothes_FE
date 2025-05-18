import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default function (to, from, next) {
  axios
    .get(
      "http://127.0.0.1:8000/api/admin/check-token",{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("nhan_vien_login"),
        },
      }
    )
    .then((response) => {
      if (response.data.status) {
        localStorage.setItem("ho_ten_nhan_vien", response.data.ho_va_ten);
        localStorage.setItem("ten_chuc_vu",response.data.ten_chuc_vu)
        localStorage.setItem("email_nhan_vien", response.data.email);
        localStorage.setItem("avatar", response.data.avatar);
        localStorage.setItem("check_nhan_vien", response.data.status);
        next();
      } else {
        toaster.error(response.data.message || "Phiên đăng nhập hết hạn!");
        next("/admin/dang-nhap");
      }
    })
    .catch((error) => {
      console.error("Lỗi xác thực token:", error);
      toaster.error("Lỗi kết nối server, vui lòng đăng nhập lại!");
      next("/admin/dang-nhap");
    });
}
