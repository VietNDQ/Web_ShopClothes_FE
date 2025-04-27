<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Danh Sách Khách Hàng</h5>
                </div>
                <div class="card-body">
                    <div class="input-group w-100">
                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                            class="form-control search-control" placeholder="Type to search...">
                        <button @click="timKiem()" class="btn btn-success">Tìm kiếm</button>
                    </div>
                    <table class="table table-bordered mb-0 mt-3 table-hover">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Họ Và Tên</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Ngày Sinh</th>
                                <th>Trạng Thái</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           <template v-for="(value, index) in list" :key="index">
                                <tr>
                                    <th class="align-middle text-center">{{ index + 1 }}</th>
                                    <td class="align-middle">{{ value.ho_va_ten }}</td>
                                    <td class="align-middle">{{ value.email }}</td>
                                    <td class="align-middle text-center">{{ value.so_dien_thoai }}</td>
                                    <td class="align-middle text-center">{{ value.ngay_sinh }}</td>
                                    <td class="align-middle text-center" style="width: 10%;">
                                        <button @click="doiTrangThai(value)" v-if="value.is_block == 0" class="btn btn-success">Hoạt Động</button>
                                        <button @click="doiTrangThai(value)" v-else class="btn btn-warning">Tạm Dừng</button>
                                    </td>
                                    <td class="align-middle text-center" style="width: 15%;">
                                        <button @click="Object.assign(edit,value)" class="btn btn-danger me-2"  data-bs-toggle="modal" data-bs-target="#capNhatModal">Cập Nhật</button>
                                        <button @click="Object.assign(del,value)" class="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#xoaModal">Xóa</button>
                                    </td>
                                </tr>
                           </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Cập Nhật Khách Hàng
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Họ và Tên</label>
                        <input v-model="edit.ho_va_ten" type="text" class="form-control" />
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Email</label>
                        <input v-model="edit.email" type="email" class="form-control" />
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Số Điện Thoại</label>
                        <input v-model="edit.so_dien_thoai" type="text" class="form-control" />
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Ngày Sinh</label>
                        <input v-model="edit.ngay_sinh" type="date" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button v-on:click="capNhat()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Xác Nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white">
                                <i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-1">
                                <h6 class="mb-1 text-white">
                                    Bạn chắc chắc xóa tài khoản khách hàng
                                    <b>{{ del.ho_va_ten }}</b> này chứ !!!
                                </h6>
                                <div class="text-white text-nowrap">
                                    <b>LƯU Ý !!!</b> Điều này không thể khôi phục khi ấn xác nhận
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button v-on:click="xoa()" type="button" class="btn btn-danger" data-bs-dismiss="modal">
                        Xóa
                    </button>
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
                ho_va_ten: "",
            },
            edit: {
                ho_va_ten: "",
                email: "",
                so_dien_thoai: "",
                ngay_sinh: "",
                password: "",
            },
            list: [],
            search: {},
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        timKiem() {
            if (this.search.ho_va_ten == "") {
                this.loadData();
                return;
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/khach-hang/search", this.search, {
                    headers: {
                       Authorization: 'Bearer' + localStorage.getItem('nhan_vien_login')
                    }
                })
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
                .post(
                    "http://127.0.0.1:8000/api/admin/khach-hang/change-status",value, {
                    headers: {
                       Authorization: 'Bearer' + localStorage.getItem('nhan_vien_login')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
      
        xoa() {
            axios
                .post("http://127.0.0.1:8000/api/admin/khach-hang/delete", this.del, {
                    headers: {
                       Authorization: 'Bearer' + localStorage.getItem('nhan_vien_login')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        capNhat() {
            axios
                .post("http://127.0.0.1:8000/api/admin/khach-hang/update", this.edit, {
                    headers: {
                       Authorization: 'Bearer' + localStorage.getItem('nhan_vien_login')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.loadData();
                        this.$toast.success(res.data.message);
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch((res) => {
                    const list = Object.values(res.response.data.errors);
                    list.forEach((v, i) => {
                        this.$toast.error(v[0]);
                    });
                });
        },
        loadData(){
            axios
                .get("http://127.0.0.1:8000/api/admin/khach-hang/data", {
                    headers: {
                       Authorization: 'Bearer' + localStorage.getItem('nhan_vien_login')
                    }
                })
                .then((res)=>{
                    this.list = res.data.data;
                })
        }
    },
}
</script>
<style></style>