<template>
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <ul class="nav nav-tabs nav-fill mb-4">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" href="#profile">
                                <i class="fa-solid fa-user me-2"></i>Thông tin cá nhân
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#address">
                                <i class="fa-solid fa-location-dot me-2"></i>Địa chỉ nhận hàng
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="tab" href="#password">
                                <i class="fa-solid fa-lock me-2"></i>Đổi mật khẩu
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="profile">
                            <div class="row g-4">
                                <div class="col-lg-4">
                                    <div class="card border-0 shadow-sm h-100">
                                        <div class="card-body text-center p-4">
                                            <!-- <img  alt="Avatar" class="rounded-circle mb-3 shadow-sm" -->
                                            <!-- width="120" height="120"> -->
                                            <h2 class="mb-1">{{ thong_tin.ho_va_ten }}</h2>
                                            <h4 class="mb-1">{{ thong_tin.email }}</h4>
                                            <p class="text-muted mb-3">Khách hàng thân thiết</p>
                                            <div class="row mt-5">
                                                <div class="col-5 text-center ms-auto">
                                                    <h1 class="mb-3 text-danger"><b>12</b></h1>
                                                    <h5 class="text-muted">Đơn hàng</h5>
                                                </div>
                                                <div class="col-5 text-center me-auto">
                                                    <h1 class="mb-3 text-primary"><b>5</b></h1>
                                                    <h5 class="text-muted">Đánh giá</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="card border-0 shadow-sm h-100">
                                        <div class="card-body p-4">
                                            <h3 class="card-title mb-4">Thông tin cá nhân</h3>
                                            <form>
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label">Họ và tên</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Nhập họ và tên">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Email</label>
                                                        <input :placeholder="thong_tin.email" type="email"
                                                            class="form-control" disabled>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Số điện thoại</label>
                                                        <input type="tel" class="form-control"
                                                            :placeholder="thong_tin.so_dien_thoai">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label">Ngày sinh</label>
                                                        <input type="date" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="text-end mt-4">
                                                    <button type="reset" class="btn btn-light me-2">Huỷ</button>
                                                    <button type="submit" class="btn btn-primary px-4">Lưu thay
                                                        đổi</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="address">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="mb-0 ms-4">Địa chỉ nhận hàng</h5>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDiaChiModal">
                                    <i class="fa-solid fa-plus me-2"></i>Thêm địa chỉ
                                </button>
                            </div>
                            <template v-for="(value, index) in list_dia_chi" :key="index">
                                <div class="card border border-primary">
                                    <div class="card-body p-4">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-1">{{ value.ten_nguoi_nhan }}</h6>
                                                <p class="mb-1">{{ value.so_dien_thoai }}</p>
                                                <p class="mb-0 text-muted">{{ value.dia_chi }}, {{ value.ten_tinh_thanh
                                                    }}, {{ value.ten_quan_huyen }}, {{ value.ten_phuong_xa }}</p>
                                            </div>
                                            <div>
                                                <button @click="update_dia_chi = value"
                                                    class="btn btn-outline-primary me-2" data-bs-toggle="modal"
                                                    data-bs-target="#updateDiaChiModal">
                                                    <i class="fa-solid fa-pen"></i>
                                                </button>
                                                <button @click="delete_dia_chi = value" class="btn btn-outline-danger"
                                                    data-bs-toggle="modal" data-bs-target="#deleteDiaChiModal">
                                                    <i class="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="tab-pane fade" id="password">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="card border-0 shadow-sm">
                                        <div class="card-body p-4">
                                            <h5 class="card-title mb-4">Đổi mật khẩu</h5>
                                            <form @submit.prevent="changePassword">
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Mật khẩu hiện tại</label>
                                                    <input type="password" class="form-control"
                                                        v-model="doi_mat_khau.old_password"
                                                        placeholder="Nhập mật khẩu hiện tại">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label fw-semibold">Mật khẩu mới</label>
                                                    <input type="password" class="form-control"
                                                        v-model="doi_mat_khau.password" placeholder="Nhập mật khẩu mới">
                                                </div>
                                                <div class="mb-4">
                                                    <label class="form-label fw-semibold">Xác nhận mật khẩu mới</label>
                                                    <input type="password" class="form-control"
                                                        v-model="doi_mat_khau.re_password"
                                                        placeholder="Nhập lại mật khẩu mới">
                                                </div>
                                                <button type="submit" class="btn btn-primary px-4">Cập nhật mật
                                                    khẩu</button>
                                            </form>
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
    <!--Thêm địa chỉ Modal -->
    <div class="modal fade" id="addDiaChiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Địa Chỉ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Tên Người Nhận</label>
                    <input v-model="create_dia_chi.ten_nguoi_nhan" type="text" class="form-control mt-2 mb-2">
                    <label for="">Số Điện Thoại</label>
                    <input v-model="create_dia_chi.so_dien_thoai" type="text" class="form-control mt-2 mb-2">
                    <label for="">Địa Chỉ Cụ Thể</label>
                    <input v-model="create_dia_chi.dia_chi" type="text" class="mt-2 mb-2 form-control"
                        placeholder="Nhập địa chỉ cụ thể">
                    <label for="">Chọn Tỉnh/Thành Phố</label>
                    <select v-model="create_dia_chi.id_tinh_thanh" @change="loadQuanHuyen(create_dia_chi.id_tinh_thanh)"
                        class="mt-2 mb-2 form-select">
                        <template v-for="(item, index) in list_tinh_thanh" :key="index">
                            <option :value="item.id">{{ item.ten_tinh_thanh }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Quận/Huyện</label>
                    <select v-on:change="loadPhuongXa(create_dia_chi, id_quan_huyen)"
                        v-model="create_dia_chi.id_quan_huyen" name="" id="" class="mt-2 mb-2 form-select">
                        <template v-for="(item, index) in list_quan_huyen" :key="index">
                            <option :value="item.id">{{ item.ten_quan_huyen }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Phường/Xã</label>
                    <select v-model="create_dia_chi.id_phuong_xa" name="" class="form-select" id="">
                        <template v-for="(item, index) in list_phuong_xa" :key="index">
                            <option :value="item.id">{{ item.ten_phuong_xa }}</option>
                        </template>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="addDiaChi()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm Địa Chỉ</button>
                </div>
            </div>
        </div>
    </div>
    <!--Sửa địa chỉ Modal -->
    <div class="modal fade" id="updateDiaChiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhập Địa Chỉ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Tên Người Nhận</label>
                    <input v-model="update_dia_chi.ten_nguoi_nhan" type="text" class="form-control mt-2 mb-2">
                    <label for="">Số Điện Thoại</label>
                    <input v-model="update_dia_chi.so_dien_thoai" type="text" class="form-control mt-2 mb-2">
                    <label for="">Địa Chỉ Cụ Thể</label>
                    <input v-model="update_dia_chi.dia_chi" type="text" class="mt-2 mb-2 form-control"
                        placeholder="Nhập địa chỉ cụ thể">
                    <label for="">Chọn Tỉnh/Thành Phố</label>
                    <select v-model="update_dia_chi.id_tinh_thanh" @change="loadQuanHuyen(update_dia_chi.id_tinh_thanh)"
                        class="mt-2 mb-2 form-select">
                        <template v-for="(item, index) in list_tinh_thanh" :key="index">
                            <option :value="item.id">{{ item.ten_tinh_thanh }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Quận/Huyện</label>
                    <select v-on:change="loadPhuongXa(update_dia_chi, id_quan_huyen)"
                        v-model="update_dia_chi.id_quan_huyen" name="" id="" class="mt-2 mb-2 form-select">
                        <template v-for="(item, index) in list_quan_huyen" :key="index">
                            <option :value="item.id">{{ item.ten_quan_huyen }}</option>
                        </template>
                    </select>
                    <label for="">Chọn Phường/Xã</label>
                    <select v-model="update_dia_chi.id_phuong_xa" name="" class="form-select" id="">
                        <template v-for="(item, index) in list_phuong_xa" :key="index">
                            <option :value="item.id">{{ item.ten_phuong_xa }}</option>
                        </template>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="updateDiaChi()" type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Cập
                        Nhật
                        Địa Chỉ</button>
                </div>
            </div>
        </div>
    </div>
    <!--Xóa địa chỉ Modal -->
    <div class="modal fade" id="deleteDiaChiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Địa Chỉ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa địa chỉ
                                <b class="text-danger">
                                    <div>
                                        <h6 class="mb-1">{{ delete_dia_chi.ten_nguoi_nhan }}</h6>
                                        <p class="mb-1">{{ delete_dia_chi.so_dien_thoai }}</p>
                                        <p class="mb-0 text-muted">{{ delete_dia_chi.dia_chi }}, {{
                                            delete_dia_chi.ten_tinh_thanh
                                            }}, {{ delete_dia_chi.ten_quan_huyen }}, {{ delete_dia_chi.ten_phuong_xa }}
                                        </p>
                                    </div>
                                </b>
                                này không!
                                <br>
                                <span class="text-danger">Lưu ý: Không thể phục hồi khi xóa?</span>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button v-on:click="delDiaChi()" type="button" data-bs-dismiss="modal" class="btn btn-primary">Xóa
                        Địa
                        Chỉ</button>
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
            list_phuong_xa: [],
            list_tinh_thanh: [],
            list_quan_huyen: [],
            create_dia_chi: {
                id_tinh_thanh: '',
                id_khach_hang: '',
                id_quan_huyen: '',
                id_phuong_xa: '',
                dia_chi: '',
                toa_do_x: '',
                toa_do_y: '',
                ten_nguoi_nhan: '',
                so_dien_thoai: '',
            },
            update_dia_chi: {
                id: '',
                id_khach_hang: '',
                id_tinh_thanh: '',
                id_quan_huyen: '',
                id_phuong_xa: '',
                dia_chi: '',
                toa_do_x: '',
                toa_do_y: '',
                ten_nguoi_nhan: '',
                so_dien_thoai: '',
            },
            delete_dia_chi: {},
            doi_mat_khau: {
                old_password: '',
                password: '',
                re_password: ''
            },
            thong_tin: {},
            list_dia_chi: [],
        };
    },
    mounted() {
        this.loadTinhThanh();
        this.loadProFileKhachHang();
        this.loadDiaChi();
    },
    methods: {
        loadDiaChi() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.list_dia_chi = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);

                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadProFileKhachHang() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lay-thong-tin-profile", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.thong_tin = res.data.thong_tin;
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        this.$toast.error("Vui lòng đăng nhập lại!");
                        localStorage.removeItem("token_khach_hang");
                        this.$router.push('/khach-hang/dang-nhap');
                    }
                });
        },
        addDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/create", this.create_dia_chi, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.create_dia_chi = {
                            id_tinh_thanh: '',
                            id_quan_huyen: '',
                            id_phuong_xa: '',
                            dia_chi: '',
                            toa_do_x: '',
                            toa_do_y: '',
                            ten_nguoi_nhan: '',
                            so_dien_thoai: '',
                        },
                            this.loadDiaChi();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        updateDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/update", this.update_dia_chi, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.updateDiaChi = {
                            id: '',
                            id_tinh_thanh: '',
                            id_khach_hang: '',
                            id_quan_huyen: '',
                            id_phuong_xa: '',
                            dia_chi: '',
                            toa_do_x: '',
                            toa_do_y: '',
                            ten_nguoi_nhan: '',
                            so_dien_thoai: '',
                        },
                            this.loadDiaChi();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        delDiaChi() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/delete", this.delete_dia_chi, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDiaChi();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadPhuongXa(id_quan_huyen) {
            var payload = {
                id_quan_huyen: id_quan_huyen
            }
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-phuong-xa", payload)
                .then((res) => {
                    this.list_phuong_xa = res.data.data;
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                });
        },
        loadQuanHuyen(id_tinh_thanh) {
            var payload = {
                id_tinh_thanh: id_tinh_thanh
            }
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-quan-huyen", payload)
                .then((res) => {
                    this.list_quan_huyen = res.data.data;
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                });
        },
        loadTinhThanh() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/get-tinh-thanh")
                .then((res) => {
                    this.list_tinh_thanh = res.data.data;
                    this.loadQuanHuyen();
                    this.loadPhuongXa();
                })
                .catch((error) => {
                    console.error("Lỗi tải dữ liệu:", error);
                });
        },
        saveProfile() {
            alert('Thông tin cá nhân đã được lưu!');
        },
        changePassword() {
            if (this.doi_mat_khau.password !== this.doi_mat_khau.re_password) {
                alert('Mật khẩu mới không khớp!');
                return;
            }
            alert('Mật khẩu đã được cập nhật!');
        }
    }
};
</script>
<style></style>