<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header mt-2">
                    <div class="d-flex justify-content-between">
                        <h4>Danh Sách Biến Thể Sản Phẩm</h4>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#themMoi"><i
                                class="fa-solid fa-plus"></i>Thêm Mới</button>

                    </div>
                    <div class="input-group mt-3">
                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                            class="form-control search-control border border-1 border-dark" placeholder="Search..." />
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px"><i
                                class="bx bx-search"></i></span>
                        <button v-on:click="timKiem()" class="btn btn-outline-dark" type="button">
                            Tìm Kiếm
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="text-center">
                                    <th>STT</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Kích Thước</th>
                                    <th>Màu Sắc</th>
                                    <th>Chất Liệu</th>
                                    <th class="text-nowrap" style="width: 10%;">
                                        <i @click="up()" class="fa-solid fa-up-long text-danger fa-lg"></i>
                                        Số Lượng Tồn
                                        <i @click="down()" class="fa-solid fa-down-long text-primary fa-lg"></i>
                                    </th>
                                    <th>Tình Trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list" :key="index">
                                    <tr>
                                        <th class="text-center align-middle">{{ index + 1 }}</th>
                                        <td class="align-middle">{{ value.ten_san_pham }}</td>
                                        <td class="align-middle text-center">{{ value.kich_thuoc }}</td>
                                        <td class="align-middle">{{ value.mau_sac }}</td>
                                        <td class="align-middle">{{ value.chat_lieu }}</td>
                                        <td class="align-middle text-end">{{ value.so_luong_ton }}</td>
                                        <td class="align-middle text-center">
                                            <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 1"
                                                class="btn btn-success btn-sm">Còn Hàng</button>
                                            <button v-on:click="doiTrangThai(value)" v-else
                                                class="btn btn-warning btn-sm">Hết Hàng</button>
                                        </td>
                                        <td class="align-middle text-center" style="width: 15%;">
                                            <button v-on:click="Object.assign(edit, value)"
                                                class="btn btn-sm btn-primary me-2" data-bs-toggle="modal"
                                                data-bs-target="#update">
                                                <i class="fa-solid fa-pen"></i> Cập nhật
                                            </button>
                                            <button v-on:click="Object.assign(del, value)" class="btn btn-sm btn-danger"
                                                data-bs-toggle="modal" data-bs-target="#delete">
                                                <i class="fa-solid fa-trash fa-xs"></i> Xóa
                                            </button>
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
    <!-- Modal Thêm Mới-->
    <div class="modal fade" id="themMoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Biến Thể</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Tên Sản Phẩm</label>
                                    <select v-model="create.id_san_pham" class="form-control mt-2 mb-2">
                                        <option v-for="(value, index) in list_San_Pham" :key="index" :value="value.id">
                                            {{ value.ten_san_pham }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Kích Thước(Size)</label>
                                    <input v-model="create.kich_thuoc" type="text" class="form-control mt-2 mb-2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Màu Sắc</label>
                                    <input v-model="create.mau_sac" type="text" class="form-control mt-2 mb-2">
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Chất Liệu</label>
                                    <input v-model="create.chat_lieu" type="text" class="form-control mt-2 mb-2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">

                                    <label for="">Số Lượng Tồn</label>
                                    <input v-model="create.so_luong_ton" type="number" step="10"
                                        class="form-control mt-2 mb-2">
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Tình Trạng</label>
                                    <select v-model="create.tinh_trang" name="" class="form-control mt-2 mb-2" id="">
                                        <option value="1">Còn Hàng</option>
                                        <option value="0">Hết Hàng</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button @click="themMoi()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Cập Nhật-->
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Biến Thể Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Tên Sản Phẩm</label>
                                    <select v-model="edit.id_san_pham" class="form-control mt-2 mb-2">
                                        <option v-for="(value, index) in list_San_Pham" :key="index" :value="value.id">
                                            {{ value.ten_san_pham }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Kích Thước(Size)</label>
                                    <input v-model="edit.kich_thuoc" type="text" class="form-control mt-2 mb-2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Màu Sắc</label>
                                    <input v-model="edit.mau_sac" type="text" class="form-control mt-2 mb-2">
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Chất Liệu</label>
                                    <input v-model="edit.chat_lieu" type="text" class="form-control mt-2 mb-2">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <label for="">Số Lượng Tồn</label>
                                    <input v-model="edit.so_luong_ton" type="number" step="10"
                                        class="form-control mt-2 mb-2">
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Tình Trạng</label>
                                    <select v-model="edit.tinh_trang" name="" class="form-control mt-2 mb-2" id="">
                                        <option value="1">Còn Hàng</option>
                                        <option value="0">Hết Hàng</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button @click="capNhat()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        Nhật</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Xóa-->
    <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Biến Thể Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa biến thể sản phẩm
                                <b class="text-danger">{{ del.id_san_pham }}</b>
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
                    <button @click="xoa()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xóa</button>
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
            del: {
                'id': "",
                'id_san_pham': "",
            },
            create: {
                'id_san_pham': "",
                'kich_thuoc': "",
                'mau_sac': "",
                'chat_lieu': "",
                'so_luong_ton': "",
                'tinh_trang': "",
            },
            edit: {
                'id_san_pham': "",
                'kich_thuoc': "",
                'mau_sac': "",
                'chat_lieu': "",
                'so_luong_ton': "",
                'tinh_trang': "",
            },
            list: [],
            list_San_Pham: [],
            search: {},
        }
    },
    mounted() {
        this.loadData();
        this.loadDataSanPham();
    },
    methods: {
        timKiem() {
            if (this.search.noi_dung == "") {
                this.loadData();
                this.loadDataSanPham();
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/bien-the-san-pham/search", this.search)
                .then((res) => {
                    this.list = res.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);

                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        doiTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/admin/bien-the-san-pham/change-status", value)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataSanPham();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        capNhat() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bien-the-san-pham/update", this.edit)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataSanPham();
                        this.edit = {
                            'id_san_pham': "",
                            'kich_thuoc': "",
                            'mau_sac': "",
                            'chat_lieu': "",
                            'so_luong_ton': "",
                            'tinh_trang': "",
                        }
                    } else {
                        this.$toast.error(res.data.message)
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        themMoi() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bien-the-san-pham/create", this.create)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataSanPham();
                        this.create = {
                            'id_san_pham': "",
                            'kich_thuoc': "",
                            'mau_sac': "",
                            'chat_lieu': "",
                            'so_luong_ton': "",
                            'tinh_trang': "",
                        }
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
        xoa() {
            axios
                .post("http://127.0.0.1:8000/api/admin/bien-the-san-pham/delete", this.del)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataSanPham();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        loadDataSanPham() {
            axios
                .get("http://127.0.0.1:8000/api/admin/san-pham/data")
                .then((res) => {
                    this.list_San_Pham = res.data.data;
                })
        },
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/admin/bien-the-san-pham/data")
                .then((res) => {
                    this.list = res.data.data;
                })
        },
        up() {
            this.list.sort((a, b) => a.so_luong_ton - b.so_luong_ton);
        },
        down() {
            this.list.sort((a, b) => b.so_luong_ton - a.so_luong_ton);
        },
        formatVND(number) {
            return new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "VND",
            }).format(number);
        },
    },
}
</script>
<style></style>