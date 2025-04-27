<template>
    <div class="row">
        <div class="col-lg-5">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-1">Tên Sản Phẩm</h5>
                    <div class="input-group chat-search-data m-0">
                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                            class="form-control round" id="chat-search" placeholder="Search">
                        <span v-on:click="timKiem()" class="input-group-text"><i
                                class="fa-solid fa-magnifying-glass"></i></span>
                    </div>

                </div>
                <div class="card-body">
                    <template v-for="(value, index) in list_hinh_anh" :key="index">
                        <button @click="loadChiTietHinhAnh(value)" class="btn btn-outline-primary me-2 mb-2">{{
                            value.ten_san_pham }}</button>
                    </template>
                </div>
            </div>

        </div>
        <div class="col-lg-7">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-1">Hình ảnh sản phẩm: <i class="text-danger">{{ ten_san_pham_selected }}</i></h5>
                    <div class="d-flex justify-content-start">
                        <input v-model="create.hinh_anh" type="text" class=" form-control"
                            placeholder="Thêm hình ảnh sản phẩm" style="width: 40%;">
                        <button @click="themHinhAnh()" class="btn btn-outline-primary ms-2 text-nowrap"> <i
                                class="fa-solid fa-square-plus">
                            </i>Thêm
                            Hình Ảnh</button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover text-nowrap">
                            <thead class="text-center table-primary">
                                <tr>
                                    <th style="width: 5%;">#</th>
                                    <th>Hình Ảnh</th>
                                    <th style="width: 10%;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list_hinh_anh_chi_tiet" :key="index">
                                    <tr>
                                        <th class="align-middle text-center">{{ index + 1 }}</th>
                                        <td class="align-middle text-center">
                                            <img v-bind:src="value.hinh_anh" class="ms-1 img-fluid"
                                                style="width: 20%; height: 20%;" alt="">
                                        </td>
                                        <td class="align-middle text-center">
                                            <button @click="Object.assign(del, value)" class="btn btn-sm btn-danger"
                                                data-bs-toggle="modal" data-bs-target="#xoaHinhAnh">
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
    <!-- Modal Xóa-->
    <div class="modal fade" id="xoaHinhAnh" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Hình Ảnh Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn hình ảnh sản phẩm này không!
                                <div class="text-center">
                                    <img v-bind:src="del.hinh_anh" class="ms-1 img-fluid"
                                        style="width: 20%; height: 20%;" alt="">
                                </div>
                                <br>
                                <span class="text-danger">Lưu ý: Không thể phục hồi khi xóa?</span>
                            </div>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button @click="xoaHinhAnh()" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Xóa</button>
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
            create: {
                id_san_pham: null,
                hinh_anh: null,
            },
            list_hinh_anh: [],
            list_hinh_anh_chi_tiet: [],
            search: {},
            ten_san_pham_selected: '',
            selectedProduct: "",
            del: {},
            paginatedSanPham: [], // Định nghĩa biến paginatedSanPham
        }
    },
    mounted() {
        this.loadHinhAnh()
    },
    methods: {
        xoaHinhAnh() {
            axios
                .post("http://127.0.0.1:8000/api/admin/hinh-anh/delete", this.del)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadHinhAnh();
                        this.loadChiTietHinhAnh(this.selectedProduct);
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
        themHinhAnh() {
            var payLoad = {
                id_san_pham: this.selectedProduct.id_san_pham,
                hinh_anh: this.create.hinh_anh,
            };

            axios
                .post("http://127.0.0.1:8000/api/admin/hinh-anh/create", payLoad)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.create = {
                            id_san_pham: null,
                            hinh_anh: null,
                        },
                            this.loadChiTietHinhAnh(this.selectedProduct);
                        this.create.hinh_anh = "";
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    const list = Object.values(error.response.data.errors || {});
                    list.forEach((v) => {
                        this.$toast.error(v[0]);
                    });
                });
        },

        timKiem() {
            if (this.search.noi_dung == "") {
                this.loadHinhAnh();
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/hinh-anh/search", this.search)
                .then((res) => {
                    this.list_hinh_anh = res.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);

                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadChiTietHinhAnh(value) {
            this.selectedProduct = value;
            this.ten_san_pham_selected = value.ten_san_pham;
            var payLoad = {
                id: value.id_san_pham
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/chi-tiet-hinh-anh/data", payLoad)
                .then((res) => {
                    if (res.data.status) {
                        this.list_hinh_anh_chi_tiet = res.data.data;
                    }
                    else {
                        this.$toast.error(res.data.message);
                        this.list_hinh_anh_chi_tiet = res.data.data;
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
        loadHinhAnh() {
            axios
                .get("http://127.0.0.1:8000/api/admin/hinh-anh/data")
                .then((res) => {
                    this.list_hinh_anh = res.data.data;
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