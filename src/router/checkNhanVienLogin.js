import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default function (to, from, next) {
  const token = localStorage.getItem("nhan_vien_login");

  // 1️⃣ Nếu không có token -> Báo lỗi và chuyển login
  if (!token) {
    toaster.error("Bạn cần đăng nhập trước!");
    return next("/admin/dang-nhap");
  }

  // 2️⃣ Nếu có token -> Gọi API kiểm tra
  axios.post(
    "http://127.0.0.1:8000/api/admin/check-token",
    {},
    {
      headers: {
        Authorization: 'Bearer ' + token, // 💬 Giữ nguyên kiểu nối chuỗi bạn muốn
      },
    }
  )
  .then((response) => {
    if (response.data.status) {
      // 3️⃣ Token hợp lệ
      localStorage.setItem("ho_ten_nhan_vien", response.data.ho_va_ten);
      next();
    } else {
      // 4️⃣ Token không hợp lệ
      toaster.error(response.data.message || "Phiên đăng nhập hết hạn!");
      next("/admin/dang-nhap");
    }
  })
  .catch((error) => {
    // 5️⃣ Lỗi server hoặc lỗi khác
    console.error("Lỗi xác thực token:", error);
    toaster.error("Lỗi kết nối server, vui lòng đăng nhập lại!");
    next("/admin/dang-nhap");
  });
}
