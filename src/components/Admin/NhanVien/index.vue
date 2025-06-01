<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h4 class="text-danger mt-2">Danh Sách Nhân viên</h4>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNhanVien">
                        <i class="fa-solid fa-plus"></i> Thêm Nhân Viên
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Họ Tên</th>
                                    <th>Avatar</th>
                                    <th>Email</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Địa Chỉ</th>
                                    <th>Chức vụ</th>
                                    <th>Tình Trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list" :key="index">
                                    <tr>
                                        <th class="text-center align-middle">{{ index + 1 }}</th>
                                        <td class="align-middle">{{ value.ho_va_ten }}</td>
                                        <td class="align-middle">
                                            <img :src="value.avatar" class="rounded-circle" style="width: 100%;" alt="">
                                        </td>
                                        <td class="align-middle">{{ value.email }}</td>
                                        <td class="align-middle text-end">{{ value.so_dien_thoai }}</td>
                                        <td class="align-middle">{{ value.dia_chi }}</td>
                                        <td class="align-middle">{{ value.ten_chuc_vu }}</td>
                                        <td class="align-middle text-center">
                                            <button v-if="value.tinh_trang == 1" class="btn btn-success btn-sm">Hoạt
                                                Động</button>
                                            <button v-else class="btn btn-warning text-light btn-sm">Tạm Khóa</button>
                                        </td>
                                        <td class="text-center align-middle" style="width: 20%;">
                                            <button v-on:click="Object.assign(edit, value)"
                                                class="btn btn-sm btn-primary me-2" data-bs-toggle="modal"
                                                data-bs-target="#updateNhanVien"><i
                                                    class="fa-solid fa-wrench fa-xs"></i> Cập
                                                nhật</button>
                                            <button v-on:click="Object.assign(del, value)" class="btn btn-sm btn-danger"
                                                data-bs-toggle="modal" data-bs-target="#delNhanVien"><i
                                                    class="fa-solid fa-trash fa-xs"></i>
                                                Xóa</button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Thêm nhân viên Modal -->
    <div class="modal fade" id="addNhanVien" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Thêm Mới Nhân Viên</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Họ Và Tên</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Họ Tên" aria-label="First name">
                    <label for="">Avatar</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Avatar" aria-label="First name">
                    <label for="">Email</label>
                    <input type="email" class="form-control mt-2 mb-2" placeholder="Email" aria-label="First name">
                    <label for="">Số Điện Thoại</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Số Điện Thoại"
                        aria-label="First name">
                    <label for="">Mật Khẩu</label>
                    <input type="password" class="form-control mt-2 mb-2" placeholder="Mật Khẩu"
                        aria-label="First name">
                    <label for="">Địa Chỉ</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Địa Chỉ" aria-label="First name">
                    <label for="">Chức Vụ</label>
                    <select class="form-select mt-2 mb-2" aria-label="Default select example">
                        <option selected>Chọn Chức Vụ</option>
                        <option value="1">Quản Trị Viên</option>
                        <option value="2">Nhân Viên Bán Hàng</option>
                        <option value="3">Nhân Viên Kho</option>
                        <option value="4">Nhân Viên Giao Hàng</option>
                    </select>
                    <label for="">Tình Trạng</label>
                    <select class="form-select mt-2 mb-2" aria-label="Default select example">
                        <option selected>Chọn Tình Trạng</option>
                        <option value="1">Hoạt Động</option>
                        <option value="2">Tạm Khóa</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm Mới</button>
                </div>
            </div>
        </div>
    </div>
    <!--Cập Nhật Modal -->
    <div class="modal fade" id="updateNhanVien" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Cập Nhật Nhân Viên</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Họ Và Tên</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Họ Tên" aria-label="First name">
                    <label for="">Avatar</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Avatar" aria-label="First name">
                    <label for="">Email</label>
                    <input type="email" class="form-control mt-2 mb-2" placeholder="Email" aria-label="First name">
                    <label for="">Số Điện Thoại</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Số Điện Thoại"
                        aria-label="First name">
                    <label for="">Mật Khẩu</label>
                    <input type="password" class="form-control mt-2 mb-2" placeholder="Mật Khẩu"
                        aria-label="First name">
                    <label for="">Địa Chỉ</label>
                    <input type="text" class="form-control mt-2 mb-2" placeholder="Địa Chỉ" aria-label="First name">
                    <label for="">Chức Vụ</label>
                    <select class="form-select mt-2 mb-2" aria-label="Default select example">
                        <option selected>Chọn Chức Vụ</option>
                        <option value="1">Quản Trị Viên</option>
                        <option value="2">Nhân Viên Bán Hàng</option>
                        <option value="3">Nhân Viên Kho</option>
                        <option value="4">Nhân Viên Giao Hàng</option>
                    </select>
                    <label for="">Tình Trạng</label>
                    <select class="form-select mt-2 mb-2" aria-label="Default select example">
                        <option selected>Chọn Tình Trạng</option>
                        <option value="1">Hoạt Động</option>
                        <option value="2">Tạm Khóa</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập Nhật</button>
                </div>
            </div>
        </div>
    </div>
    <!--Xóa Modal -->
    <div class="modal fade" id="delNhanVien" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Xóa Nhân Viên</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa sản phẩm
                                <b class="text-danger">Tên Nhân Viên</b>
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
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios, { Axios } from 'axios';

export default {
    data() {
        return {
            create: {
                'ho_va_ten': '',
                'email': '',
                'avatar': '',
                'so_dien_thoai': '',
                'password': '',
                'dia_chi': '',
                'tinh_trang': '',
                'id_chuc_vu': '',
            },
            list: [],
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            axios
                .get('http://127.0.0.1:8000/api/admin/nhan-vien/data', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((response) => {
                    this.list = response.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);

                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        }
    },
}
</script>
<style></style>