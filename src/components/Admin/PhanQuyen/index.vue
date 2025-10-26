<template>
    <div class="row">
        <div class="col-lg-8">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card radius-10 border-top border-0 border-3 border-info">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Danh Sách Chức Vụ</h5>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themMoiModal">Thêm
                                Mới</button>
                        </div>
                        <div class="card-body">
                            <div class="input-group mb-3">
                                <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                                    class="form-control" placeholder="Search....">
                                <button v-on:click="timKiem()" class="btn btn-success input-group-text"
                                    style="width: 100px;">Tìm kiếm</button>
                            </div>
                            <div class="table-wrapper border rounded" style="overflow: hidden;">
                                <table class="table table-bordered mb-0">
                                    <thead class="text-center bg-primary text-light"
                                        style="display: table; width: 100%; table-layout: fixed;">
                                        <tr>
                                            <th style="width: 5%;">#</th>
                                            <th style="width: 27%;">Tên Chức Vụ</th>
                                            <th style="width: 18%;">Trạng Thái</th>
                                            <th style="width: 18%;">Cấp Quyền</th>
                                            <th style="width: 25%;">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style="display: block; max-height: 220px; overflow-y: auto; width: 100%;">
                                        <template v-for="(value, index) in list_chuc_vu" :key="index">
                                            <tr class="align-middle d-table w-100" style="table-layout: fixed;">
                                                <th class="text-center" style="width: 5%;">{{ index + 1 }}</th>
                                                <td style="width: 30%;">{{ value.ten_chuc_vu }}</td>
                                                <td class="text-center" style="width: 20%;"
                                                    @click="doiTrangThai(value)">
                                                    <button v-if="value.trang_thai == 1"
                                                        class="btn btn-success text-white">Hoạt Động</button>
                                                    <button v-else class="btn btn-warning text-white">Tạm Dừng</button>
                                                </td>
                                                <td class="text-center" style="width: 20%;">
                                                    <button @click="phanQuyen(value)"
                                                        class="btn btn-info text-white">Phân Quyền</button>
                                                </td>
                                                <td class="text-center" style="width: 25%;">
                                                    <i class="fa-solid fa-square-pen fa-2x text-primary me-2"
                                                        data-bs-toggle="modal" data-bs-target="#updateModal"
                                                        @click="Object.assign(update_chuc_vu, value)"></i>
                                                    <i class="fa-solid fa-trash fa-2x text-danger"
                                                        data-bs-toggle="modal" data-bs-target="#delModal"
                                                        @click="Object.assign(delete_chuc_vu, value)"></i>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="card radius-10 border-top border-0 border-3 border-info">
                        <div class="card-header">
                            <h5 class="mb-0">Đang Phân Quyền Cho <b class="text-danger">{{ chon_chuc_vu.ten_chuc_vu
                                || "......"
                                    }}</b></h5>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="text-center text-nowrap align-middle bg-primary text-light">
                                            <th>#</th>
                                            <th>Tên Chức Năng</th>
                                            <th>Tên Chức Vụ</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(value, index) in list_phan_quyen" :key="index">
                                            <tr class="align-middle">
                                                <td class="text-wrap">{{ index + 1 }}</td>
                                                <td class="text-wrap">{{ value.ten_chuc_nang }}</td>
                                                <td class="text-wrap">{{ value.ten_chuc_vu }}</td>
                                                <td class="text-center">
                                                    <button v-on:click="xoaPhanQuyen(value)" class="btn btn-danger">Xóa</button>
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
        <div class="col-lg-4">
            <div class="card radius-10 border-top border-0 border-3 border-info">
                <div class="card-header">
                    <h5 class="mb-0">Danh Sách Chức Năng</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="table-responsive" style="max-height: 500px; overflow: auto;">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr class="text-center text-nowrap align-middle bg-primary text-light">
                                        <th>#</th>
                                        <th>Tên Chức Năng</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list_chuc_nang" :key="index">
                                        <tr class="align-middle">
                                            <th class="text-center">{{ index + 1 }}</th>
                                            <td class="text-wrap">{{ value.ten_chuc_nang }}</td>
                                            <td class="text-center">
                                                <button class="btn btn-success" @click="capQuyen(value)">Cấp
                                                    Quyền</button>
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
    <!-- Modal Thêm Mới Chức Vụ -->
    <div class="modal fade" id="themMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Chức Vụ</label>
                        <input type="text" class="form-control mt-1" v-model="create_chuc_vu.ten_chuc_vu"
                            placeholder="Nhập tên chức vụ">
                    </div>
                    <div class="mb-2">
                        <label>Slug Chức Vụ</label>
                        <input type="text" class="form-control mt-1" v-model="create_chuc_vu.slug_chuc_vu"
                            placeholder="Nhập slug chức vụ">
                    </div>
                    <div class="mb-2">
                        <label>Trạng Thái</label>
                        <select class="form-select mt-1" v-model="create_chuc_vu.trang_thai">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button @click="taoChucVu()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Tạo
                        Mới</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cập Nhật Chức Vụ -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Chức Vụ</label>
                        <input type="text" class="form-control mt-1" v-model="update_chuc_vu.ten_chuc_vu"
                            placeholder="Nhập tên chức vụ">
                    </div>
                    <div class="mb-2">
                        <label>Slug Chức Vụ</label>
                        <input type="text" class="form-control mt-1" v-model="update_chuc_vu.slug_chuc_vu"
                            placeholder="Nhập slug chức vụ">
                    </div>
                    <div class="mb-2">
                        <label>Trạng Thái</label>
                        <select class="form-select mt-1" v-model="update_chuc_vu.trang_thai">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button @click="capNhatChucVu()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        Nhật</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Xóa Chức Vụ -->
    <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                </div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-dark">Bạn có chắc chắn muốn xóa chức vụ
                                        <b> {{ delete_chuc_vu.ten_chuc_vu }} </b>
                                        này không?
                                    </h6>
                                    <div class="text-dark"><b>Lưu ý: </b>Điều này không thể hoàn tác khi nhấn xác nhận
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button @click="xoaChucVu()" type="button" class="btn btn-danger"
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
            list_chuc_nang: [],
            list_chuc_vu: [],
            create_chuc_vu: {
                trang_thai: 1,
            },
            update_chuc_vu: {},
            delete_chuc_vu: {},
            delete_quyen: {},
            create_phan_quyen: {
                chuc_nang_id: null,
            },
            chon_chuc_vu: {},
            list_phan_quyen: [],
            search: {},

        }
    },
    mounted() {
        this.layDataChucVu();
        this.layDataChucNang();
    },
    methods: {
        capQuyen(value) {
            if (!this.chon_chuc_vu.id) {
                this.$toast.error('Vui lòng chọn quyền trước khi cấp quyền!');
                return;
            }

            const payload = {
                id_chuc_vu: this.chon_chuc_vu.id,
                id_chuc_nang: value.id
            };

            axios
                .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/create', payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((response) => {
                    if (response.data.status == true) {
                        this.$toast.success(response.data.message);
                        this.phanQuyen(this.chon_chuc_vu);
                    } else {
                        this.$toast.error(response.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        phanQuyen(value) {
            this.chon_chuc_vu = value;
            axios
                .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/data', this.chon_chuc_vu, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_phan_quyen = res.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        xoaPhanQuyen(value) {
            axios
                .post('http://127.0.0.1:8000/api/admin/chi-tiet-phan-quyen/delete',value, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.phanQuyen(this.chon_chuc_vu);
                        this.$toast.success(res.data.message)
                    } else {
                        this.$toast.error(res.data.message)
                    }
                })
        },
        layDataChucVu() {
            axios.get('http://127.0.0.1:8000/api/admin/chuc-vu/get-data', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                }
            })
                .then(response => {
                    this.list_chuc_vu = response.data.data;
                });
        },
        layDataChucNang() {
            axios.get('http://127.0.0.1:8000/api/admin/chuc-nang/get-data', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                }
            })
                .then(response => {
                    this.list_chuc_nang = response.data.data;
                });
        },
        taoChucVu() {
            axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/add-data', this.create_chuc_vu, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.create_chuc_vu = {
                            trang_thai: 1,
                        };
                        this.layDataChucVu();
                    }
                });
        },
        capNhatChucVu() {
            axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/update', this.update_chuc_vu, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDataChucVu();
                    }
                });
        },
        xoaChucVu() {
            axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/delete', this.delete_chuc_vu, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDataChucVu();
                    }
                });
        },
        doiTrangThai(payload) {
            axios.post('http://127.0.0.1:8000/api/admin/chuc-vu/change-status', payload, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token_nhan_vien')
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.layDataChucVu();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        },
        timKiem() {
            if (this.search.ho_va_ten == "") {
                this.loadData();
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/chuc-vu/search", this.search, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_chuc_vu = res.data.data;
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);

                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                })
        },
    }
}
</script>

<style></style>