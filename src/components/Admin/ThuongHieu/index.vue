<template>
    <div class="row">
        <div class="col-lg-4 col-lg-md-12">
            <div class="card">
                <div class="card-header mt-2">
                    <h4>Thông Tin Thương Hiệu</h4>
                </div>
                <div class="card-body">
                    <label for="">Tên Thương Hiệu</label>
                    <input v-model="create.ten_thuong_hieu" type="text" class="form-control mt-2 mb-2"
                        placeholder="Nhập tên Thương Hiệu">

                    <label for="">Mô tả</label>
                    <textarea v-model="create.mo_ta" class="form-control mt-2 mb-2" rows="3"
                        placeholder="Nhập mô tả Thương Hiệu..."></textarea>
                </div>
                <div class="card-footer">
                    <button @click="themMoi()" class="btn btn-danger w-100"><i class="fa-solid fa-plus fa-xs"></i> Thêm
                        Thương Hiệu</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-lg-md-12">
            <div class="card">
                <div class="card-header text-center mt-2">
                    <h4>Danh Sách Thương Hiệu</h4>
                </div>
                <div class="card-body">
                    <div class="input-group">
                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text" class="form-control search-control" placeholder="Type to search...">
                        <button @click="timKiem()" class="btn btn-success">Tìm kiếm</button>
                    </div>
                    <div class="table-responsive mt-2">
                        <table class="table table-bordered table-hover">
                            <thead class="table-primary text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Thương Hiệu</th>
                                    <th>Mô Tả</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(value, index) in list" :key="index">
                                    <tr>
                                        <td class="text-center align-middle">{{ index + 1 }}</td>
                                        <td class="text-center align-middle">{{ value.ten_thuong_hieu }}</td>
                                        <td class="align-middle">{{ value.mo_ta }}</td>
                                        <td class="text-center align-middle" style="width: 20%;">
                                            <button v-on:click="Object.assign(edit, value)" class="btn btn-sm btn-primary me-2" data-bs-toggle="modal"
                                                data-bs-target="#update"><i class="fa-solid fa-wrench fa-xs"></i> Cập
                                                nhập</button>
                                            <button v-on:click="Object.assign(del, value)" class="btn btn-sm btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#delete"><i class="fa-solid fa-trash fa-xs"></i>
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
    <!-- Modal Cập Nhập-->
    <div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhập Thương Hiệu Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Tên Thương Hiệu</label>
                    <input v-model="edit.ten_thuong_hieu" type="text" class="form-control mt-2 mb-2"
                        placeholder="Nhập tên Thương Hiệu">

                    <label for="">Mô tả</label>
                    <textarea v-model="edit.mo_ta" class="form-control mt-2 mb-2" rows="3"
                        placeholder="Nhập mô tả Thương Hiệu..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button @click="capNhap()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập Nhập</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Xóa-->
    <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Thương Hiệu Sản Phẩm</h1>
                    <button type="button" class="btn-Hủy" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa danh mục
                                <b class="text-danger">{{ del.ten_thuong_hieu }}</b>
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
            create: {
                'ten_thuong_hieu': "",
                'mo_ta': "",
            },
            edit: {
                'ten_thuong_hieu': "",
                'mo_ta': "",
            },
            del: {
                'id' : "",
            },
            search:{},
            list: []
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        timKiem(){
            if(this.search.ten_thuong_hieu == "") {
                this.loadData();
                return;
            }
            axios
            .post("http://127.0.0.1:8000/api/admin/thuong-hieu/search", this.search)
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
        xoa(){
            axios
                .post("http://127.0.0.1:8000/api/admin/thuong-hieu/delete",this.del)
                .then((res)=>{
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
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
        capNhap() {
            axios
                .post("http://127.0.0.1:8000/api/admin/thuong-hieu/update", this.edit)
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.edit = {
                            'ten_thuong_hieu': "",
                            'mo_ta': "",
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
                .post("http://127.0.0.1:8000/api/admin/thuong-hieu/create", this.create)
                .then((res) => {
                    if ((res.data.status)) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.create = {
                            'ten_thuong_hieu': "",
                            'mo_ta': "",
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
        loadData() {
            axios
                .get("http://127.0.0.1:8000/api/admin/thuong-hieu/data")
                .then((res) => {
                    this.list = res.data.data;
                })
        }
    },
}
</script>
<style></style>