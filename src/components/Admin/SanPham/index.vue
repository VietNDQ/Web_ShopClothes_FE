<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header mt-2">
                    <div class="d-flex justify-content-between">
                        <h3>Danh Sách Sản Phẩm</h3>
                        <button type="button" class="btn btn-primary radius-30" data-bs-toggle="modal"
                            data-bs-target="#themMoi">
                            <i class="fa-solid fa-plus fa-spin"></i>Thêm Mới Sản Phẩm
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead class="table-secondary text-center">
                                    <tr>
                                        <th colspan="100%">
                                            <div class="input-group w-100">
                                                <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung"
                                                    type="text"
                                                    class="form-control search-control border border-1 border-danger"
                                                    placeholder="Search..." />
                                                <span class="position-absolute top-50 search-show translate-middle-y"
                                                    style="left: 15px"><i class="bx bx-search"></i></span>
                                                <button v-on:click="timKiem()" class="btn btn-outline-danger"
                                                    type="button">
                                                    Tìm Kiếm
                                                </button>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Sản Phẩm</th>
                                        <th>Tên Thương Hiệu</th>
                                        <th>Tên Danh Mục</th>
                                        <th>Giá Gốc(VND)</th>
                                        <th>Giá Bán(VND)</th>
                                        <th>Giám Giá(%)</th>
                                        <th>Hình Ảnh</th>
                                        <th class="text-nowrap" style="width: 10%;">
                                            <i @click="up()" class="fa-solid fa-up-long text-danger fa-lg"></i>
                                            Tổng Số Lượng Tồn
                                            <i @click="down()" class="fa-solid fa-down-long text-primary fa-lg"></i>
                                        </th>
                                        <th>Tình Trạng</th>
                                        <th>Mô Tả</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list" :key="index">
                                        <tr>
                                            <th class="text-center align-middle">{{ index + 1 }}</th>
                                            <td class="align-middle">{{ value.ten_san_pham }}</td>
                                            <td class="align-middle">{{ value.ten_thuong_hieu }}</td>
                                            <td class="align-middle">{{ value.ten_danh_muc }}</td>
                                            <td class="align-middle text-end">{{ formatVND(value.gia_goc) }}</td>
                                            <td class="align-middle text-end">{{ formatVND(value.gia_ban) }}</td>
                                            <td class="align-middle text-center"><span
                                                    class="btn btn-outline-danger rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                                                    style="width: 40px; height: 40px;">
                                                    {{ value.giam_gia }}%
                                                </span></td>
                                            <td class="align-middle text-center">
                                                <img :src="value.hinh_anh" class="img-fluid" alt="Rolex Submariner" />
                                            </td>
                                            <td class="align-middle text-center">{{ value.TONG_SL_TON }}</td>
                                            <td class="align-middle text-center">
                                                <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 1"
                                                    class="btn btn-success btn-sm">Còn Hàng</button>
                                                <button v-on:click="doiTrangThai(value)" v-else
                                                    class="btn btn-warning btn-sm">Hết Hàng</button>
                                            </td>
                                            <td class="text-center align-middle">
                                                <button v-on:click="Object.assign(del, value)" class="btn"
                                                    data-bs-toggle="modal" data-bs-target="#moTaModal">
                                                    <i class="fa-solid fa-circle-info"></i>
                                                </button>
                                            </td>
                                            <td class="align-middle text-center">
                                                <button v-on:click="Object.assign(edit, value)"
                                                    class="btn btn-sm btn-primary me-2" data-bs-toggle="modal"
                                                    data-bs-target="#update">
                                                    <i class="fa-solid fa-pen"></i> Cập nhật
                                                </button>
                                                <button v-on:click="Object.assign(del, value)"
                                                    class="btn btn-sm btn-danger" data-bs-toggle="modal"
                                                    data-bs-target="#delete">
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
    </div>
    <!-- Modal mô tả ngắn-->
    <div class="modal fade" id="moTaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Mô Tả Sản Phẩm
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <span v-html="del.mo_ta"></span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Thêm Mới-->
    <div class="modal fade" id="themMoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Thêm Mới Sản Phẩm
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Tên Sản Phẩm</label>
                                    <input v-model="create.ten_san_pham" type="text" class="form-control mt-2 mb-2"
                                        placeholder="Nhập tên Sản Phẩm" />
                                </div>
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Slug Sản Phẩm</label>
                                    <input v-model="create.slug_san_pham" type="text" class="form-control mt-2 mb-2"
                                        placeholder="Nhập slug Sản Phẩm" />
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Tên Thương Hiệu</label>
                                    <select v-model="create.id_thuong_hieu" name="" id=""
                                        class="form-control mt-2 mb-2">
                                        <template v-for="(value, index) in list_thuong_hieu" :key="index">
                                            <option v-bind:value="value.id">{{ value.ten_thuong_hieu }}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Tên Danh Mục</label>
                                    <select v-model="create.id_danh_muc" name="" id="" class="form-control mt-2 mb-2">
                                        <template v-for="(value, index) in list_danh_muc" :key="index">
                                            <option v-bind:value="value.id">{{ value.ten_danh_muc }}</option>
                                        </template>
                                    </select>
                                </div>

                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Hình Ảnh</label>
                                    <input v-model="create.hinh_anh" type="text" step="2" class="form-control mt-2 mb-2"
                                        name="" />
                                </div>
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Giá Sản Phẩm(VNĐ)</label>
                                    <input v-model="create.gia_goc" type="number" step="2"
                                        class="form-control mt-2 mb-2" />
                                </div>

                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6">
                                    <label for="">Giảm Giá(%)</label>
                                    <input v-model="create.giam_gia" type="text" class="form-control">
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Tình Trạng</label>
                                    <select v-model="create.tinh_trang" name="" class="form-control mt-2 mb-2" id="">
                                        <option value="1">Còn Hàng</option>
                                        <option value="0">Hết Hàng</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <label for="">Mô Tả</label>
                                    <textarea v-model="create.mo_ta" name="" type="text"
                                        class="form-control mt-2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Hủy
                    </button>
                    <button @click="themMoi()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Thêm Mới
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Cập Nhập-->
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Tên Sản Phẩm</label>
                                    <input v-model="edit.ten_san_pham" type="text" class="form-control mt-2 mb-2"
                                        placeholder="Nhập tên Sản Phẩm" />
                                </div>
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Slug Sản Phẩm</label>
                                    <input v-model="edit.slug_san_pham" type="text" class="form-control mt-2 mb-2"
                                        placeholder="Nhập slug Sản Phẩm" />
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Tên Thương Hiệu</label>
                                    <select v-model="edit.ten_thuong_hieu" name="" id="" class="form-control mt-2 mb-2">
                                        <template v-for="(value, index) in list_thuong_hieu" :key="index">
                                            <option v-bind:value="value.id">{{ value.ten_thuong_hieu }}</option>
                                        </template>
                                    </select>
                                </div>
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Tên Danh Mục</label>
                                    <select v-model="edit.ten_danh_muc" name="" id="" class="form-control mt-2 mb-2">
                                        <template v-for="(value, index) in list_danh_muc" :key="index">
                                            <option v-bind:value="value.id">{{ value.ten_danh_muc }}</option>
                                        </template>
                                    </select>
                                </div>

                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Hinh Ảnh</label>
                                    <input v-model="edit.hinh_anh" type="text" step="2" class="form-control mt-2 mb-2"
                                        name="" />
                                </div>
                                <div class="col-lg-6 col-md-auto">
                                    <label for="">Giá Sản Phẩm(VNĐ)</label>
                                    <input v-model="edit.gia_goc" type="number" step="2"
                                        class="form-control mt-2 mb-2" />
                                </div>

                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6">
                                    <label for="">Giảm Giá(%)</label>
                                    <input v-model="edit.giam_gia" type="text" class="form-control">
                                </div>
                                <div class="col-lg-6">
                                    <label for="">Tình Trạng</label>
                                    <select v-model="edit.tinh_trang" name="" class="form-control mt-2 mb-2" id="">
                                        <option value="1">Còn Hàng</option>
                                        <option value="0">Hết Hàng</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <label for="">Mô Tả</label>
                                    <textarea v-model="edit.mo_ta" name="" type="text"
                                        class="form-control mt-2"></textarea>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa sản phẩm
                                <b class="text-danger">{{ del.ten_san_pham }}</b>
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
import axios from "axios";

export default {
    data() {
        return {
            del: {
                'id': "",
                'ten_san_pham': "",
            },
            create: {
                'id_thuong_hieu': "",
                'id_danh_muc': "",
                'ten_san_pham': "",
                'slug_san_pham': "",
                'gia_goc': "",
                'giam_gia': "",
                'hinh_anh': "",
                'mo_ta': "",
                'tinh_trang': "",
            },
            edit: {
                'id_thuong_hieu': "",
                'id_danh_muc': "",
                'ten_san_pham': "",
                'slug_san_pham': "",
                'gia_goc': "",
                'giam_gia': "",
                'hinh_anh': "",
                'mo_ta': "",
                'tinh_trang': "",
            },
            list: [],
            list_thuong_hieu: [],
            list_danh_muc: [],
            list_san_pham_join: [],
            search: {},
        }
    },
    mounted() {
        this.loadData();
        this.loadDataDanhMuc();
        this.loadDataThuongHieu();

    },
    methods: {
        timKiem() {
            if (this.search.noi_dung == "") {
                this.loadData();
                this.loadDataDanhMuc();
                this.loadDataThuongHieu();
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/search", this.search)
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
                .post("http://127.0.0.1:8000/api/admin/san-pham/change-status", value)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataDanhMuc();
                        this.loadDataThuongHieu();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        xoa() {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/delete", this.del)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataDanhMuc();
                        this.loadDataThuongHieu();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        capNhat() {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/update", this.edit)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.loadDataDanhMuc();
                        this.loadDataThuongHieu();
                        this.edit = {
                            'id_thuong_hieu': "",
                            'id_danh_muc': "",
                            'ten_san_pham': "",
                            'slug_san_pham': "",
                            'gia_goc': "",
                            'giam_gia': "",
                            'hinh_anh': "",
                            'mo_ta': "",
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
        themMoi() {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/create", this.create)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.create = {
                            'id_thuong_hieu': "",
                            'id_danh_muc': "",
                            'ten_san_pham': "",
                            'slug_san_pham': "",
                            'gia_goc': "",
                            'giam_gia': "",

                            'hinh_anh': "",
                            'mo_ta': "",
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
        loadDataDanhMuc() {
            axios
                .get("http://127.0.0.1:8000/api/admin/danh-muc/data-open")
                .then((res) => {
                    this.list_danh_muc = res.data.data;
                })
        },
        loadDataThuongHieu() {
            axios
                .get("http://127.0.0.1:8000/api/admin/thuong-hieu/data-open")
                .then((res) => {
                    this.list_thuong_hieu = res.data.data;
                })
        },
        up() {
            // Sắp xếp theo tổng số lượng tồn tăng dần
            this.list.sort((a, b) => a.TONG_SL_TON - b.TONG_SL_TON);
        },
        down() {
            // Sắp xếp theo tổng số lượng tồn giảm dần
            this.list.sort((a, b) => b.TONG_SL_TON - a.TONG_SL_TON);
        },

        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/admin/san-pham/data")
                .then((res) => {
                    this.list = res.data.data;
                })
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
x`x`