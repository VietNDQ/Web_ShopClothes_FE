<template>
    <div class="row">
        <div class="col-lg-4 col-lg-md-12">
            <div class="card">
                <div class="card-header mt-2">
                    <h4>Thông Tin Danh Mục</h4>
                </div>
                <div class="card-body">
                    <label for="">Tên danh mục</label>
                    <input v-model="create.ten_danh_muc" type="text" class="form-control mt-2 mb-2"
                        placeholder="Nhập tên danh mục">
                    <label for="">Hình ảnh danh mục</label>
                    <div class="image-upload-section mt-2 mb-2">
                        <input 
                            ref="createImageInput"
                            type="file" 
                            accept="image/*"
                            class="d-none"
                            @change="handleCreateImageUpload"
                        >
                        <div class="image-preview-box">
                            <img 
                                v-if="createImagePreview" 
                                :src="createImagePreview" 
                                alt="Preview"
                                class="preview-image"
                            >
                            <div v-else class="image-placeholder-box">
                                <i class="fa-solid fa-image text-muted"></i>
                                <p class="text-muted mb-0 mt-2">Chưa có hình ảnh</p>
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-2">
                            <button 
                                type="button"
                                class="btn btn-sm btn-primary"
                                @click="$refs.createImageInput.click()"
                            >
                                <i class="fa-solid fa-upload me-1"></i>Chọn ảnh
                            </button>
                            <button 
                                v-if="createImagePreview"
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="removeCreateImage"
                            >
                                <i class="fa-solid fa-trash me-1"></i>Xóa
                            </button>
                        </div>
                    </div>
                    <select v-model="create.tinh_trang" class="form-control mt-2 mb-2" name="" id="">
                        <option value="1">Còn Hàng</option>
                        <option value="0">Hết Hàng</option>
                    </select>
                    <label for="">Mô tả</label>
                    <textarea v-model="create.mo_ta" class="form-control mt-2 mb-2" rows="3"
                        placeholder="Nhập mô tả danh mục..."></textarea>
                </div>
                <div class="card-footer">
                    <button @click="themMoi()" class="btn btn-danger w-100"><i class="fa-solid fa-plus fa-xs"></i> Thêm
                        Danh Mục</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-lg-md-12">
            <div class="card">
                <div class="card-header text-center mt-2">
                    <h4>Danh Sách Danh Mục</h4>
                </div>
                <div class="card-body">
                    <div class="input-group">
                        <input v-on:keyup.enter="timKiem()" v-model="search.noi_dung" type="text"
                            class="form-control search-control" placeholder="Type to search...">
                        <button @click="timKiem()" class="btn btn-success">Tìm kiếm</button>
                    </div>
                    <div class="table-wrapper mt-2">
                        <div class="table-container">
                            <table class="table table-bordered table-hover mb-0">
                                <thead class="table-primary text-center">
                                    <tr>
                                        <th style="width: 50px;">#</th>
                                        <th style="width: 100px;">Hình ảnh</th>
                                        <th style="width: 150px;">Tên Danh Mục</th>
                                        <th>Mô Tả</th>
                                        <th style="width: 120px;">Tình Trạng</th>
                                        <th style="width: 200px;">Action</th>
                                    </tr>
                                </thead>
                            </table>
                            <div class="table-body-scroll">
                                <table class="table table-bordered table-hover mb-0">
                                    <tbody>
                                        <template v-for="(value, index) in list" :key="value.id || index">
                                            <tr>
                                                <th class="text-center align-middle" style="width: 50px;">{{ index + 1 }}</th>
                                                <td class="text-center align-middle" style="width: 100px;">
                                                    <img 
                                                        :src="getImageUrl(value.hinh_anh)" 
                                                        :alt="value.ten_danh_muc"
                                                        class="table-image"
                                                        @error="handleImageError"
                                                    />
                                                </td>
                                                <td class="text-center align-middle" style="width: 150px;">{{ value.ten_danh_muc }}</td>
                                                <td class="align-middle wrap-text"
                                                    style="word-wrap: break-word; white-space: normal;">
                                                    {{ value.mo_ta }}
                                                </td>
                                                <td class="align-middle text-center" style="width: 120px;">
                                                    <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 1"
                                                        class="btn btn-success btn-sm">Còn Hàng</button>
                                                    <button v-on:click="doiTrangThai(value)" v-else
                                                        class="btn btn-warning btn-sm">Hết Hàng</button>
                                                </td>
                                                <td class="text-center align-middle" style="width: 200px; white-space: nowrap;">
                                                    <button v-on:click="Object.assign(edit, value); loadEditImage(value.hinh_anh)"
                                                        class="btn btn-sm btn-primary me-1" data-bs-toggle="modal"
                                                        data-bs-target="#update">
                                                        <i class="fa-solid fa-wrench fa-xs"></i> Cập nhập
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
                        <div v-if="list.length > itemsPerPage" class="table-info mt-2 text-center text-muted">
                            <small>
                                <i class="fa-solid fa-info-circle me-1"></i>
                                Hiển thị tối đa {{ itemsPerPage }} danh mục. Cuộn để xem thêm (Tổng: {{ list.length }} danh mục)
                            </small>
                        </div>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhập Danh Mục Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="">Tên danh mục</label>
                    <input v-model="edit.ten_danh_muc" type="text" class="form-control mt-2 mb-2"
                        placeholder="Nhập tên danh mục">
                    <label for="">Hình ảnh danh mục</label>
                    <div class="image-upload-section mt-2 mb-2">
                        <input 
                            ref="editImageInput"
                            type="file" 
                            accept="image/*"
                            class="d-none"
                            @change="handleEditImageUpload"
                        >
                        <div class="image-preview-box">
                            <img 
                                v-if="editImagePreview" 
                                :src="editImagePreview" 
                                alt="Preview"
                                class="preview-image"
                            >
                            <div v-else class="image-placeholder-box">
                                <i class="fa-solid fa-image text-muted"></i>
                                <p class="text-muted mb-0 mt-2">Chưa có hình ảnh</p>
                            </div>
                        </div>
                        <div class="d-flex gap-2 mt-2">
                            <button 
                                type="button"
                                class="btn btn-sm btn-primary"
                                @click="$refs.editImageInput.click()"
                            >
                                <i class="fa-solid fa-upload me-1"></i>Chọn ảnh
                            </button>
                            <button 
                                v-if="editImagePreview"
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="removeEditImage"
                            >
                                <i class="fa-solid fa-trash me-1"></i>Xóa
                            </button>
                        </div>
                    </div>
                    <select v-model="edit.tinh_trang" class="form-control mt-2 mb-2" name="" id="">
                        <option value="1">Còn Hàng</option>
                        <option value="0">Hết Hàng</option>
                    </select>
                    <label for="">Mô tả</label>
                    <textarea v-model="edit.mo_ta" class="form-control mt-2 mb-2" rows="3"
                        placeholder="Nhập mô tả danh mục..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button @click="capNhat()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        Nhập</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Xóa-->
    <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Danh Mục Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-dark"><i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </div>
                            <div class="ms-3">
                                Bạn chắc chắn muốn xóa danh mục
                                <b class="text-danger">{{ del.ten_danh_muc }}</b>
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
                'ten_danh_muc': "",
                'tinh_trang': 1,
                'mo_ta': "",
                'hinh_anh': null
            },
            edit: {
                'id': null,
                'ten_danh_muc': "",
                'tinh_trang': 1,
                'mo_ta': "",
                'hinh_anh': null
            },
            del: {
                'id': "",
            },
            search: {},
            list: [],
            itemsPerPage: 20,
            createImagePreview: null,
            createImageFile: null,
            editImagePreview: null,
            editImageFile: null,
            apiBaseUrl: 'http://127.0.0.1:8000/api'
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        doiTrangThai(value) {
            axios
                .post(`${this.apiBaseUrl}/admin/danh-muc/change-status`, value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },
        timKiem() {
            if (this.search.noi_dung == "" || !this.search.noi_dung) {
                this.loadData();
                return;
            }
            axios
                .post(`${this.apiBaseUrl}/admin/danh-muc/search`, this.search, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
                    this.list = res.data.data || [];
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
                .post(`${this.apiBaseUrl}/admin/danh-muc/delete`, this.del, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
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
        capNhat() {
            const formData = new FormData();
            formData.append('id', this.edit.id);
            formData.append('ten_danh_muc', this.edit.ten_danh_muc.trim());
            formData.append('mo_ta', this.edit.mo_ta || '');
            formData.append('tinh_trang', this.edit.tinh_trang);
            
            if (this.editImageFile) {
                formData.append('hinh_anh', this.editImageFile);
            } else if (this.edit.hinh_anh) {
                formData.append('hinh_anh', this.edit.hinh_anh);
            }

            axios
                .post(`${this.apiBaseUrl}/admin/danh-muc/update`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.edit = {
                            'id': null,
                            'ten_danh_muc': "",
                            'mo_ta': "",
                            'tinh_trang': 1,
                            'hinh_anh': null
                        };
                        this.editImagePreview = null;
                        this.editImageFile = null;
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
            const formData = new FormData();
            formData.append('ten_danh_muc', this.create.ten_danh_muc.trim());
            formData.append('mo_ta', this.create.mo_ta || '');
            formData.append('tinh_trang', this.create.tinh_trang);
            
            if (this.createImageFile) {
                formData.append('hinh_anh', this.createImageFile);
            }

            axios
                .post(`${this.apiBaseUrl}/admin/danh-muc/create`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    if ((res.data.status)) {
                        this.$toast.success(res.data.message);
                        this.loadData();
                        this.create = {
                            'ten_danh_muc': "",
                            'mo_ta': "",
                            'tinh_trang': 1,
                            'hinh_anh': null
                        };
                        this.createImagePreview = null;
                        this.createImageFile = null;
                        if (this.$refs.createImageInput) {
                            this.$refs.createImageInput.value = '';
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
                .get(`${this.apiBaseUrl}/admin/danh-muc/data`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token_nhan_vien')
                    }
                })
                .then((res) => {
                    this.list = res.data.data || [];
                })
        },
        handleCreateImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    this.$toast?.error('Hình ảnh không được vượt quá 2MB!');
                    return;
                }
                if (!file.type.startsWith('image/')) {
                    this.$toast?.error('File phải là hình ảnh!');
                    return;
                }
                this.createImageFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.createImagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        handleEditImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    this.$toast?.error('Hình ảnh không được vượt quá 2MB!');
                    return;
                }
                if (!file.type.startsWith('image/')) {
                    this.$toast?.error('File phải là hình ảnh!');
                    return;
                }
                this.editImageFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.editImagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        loadEditImage(hinhAnh) {
            if (hinhAnh) {
                this.editImagePreview = this.getImageUrl(hinhAnh);
                this.editImageFile = null;
            } else {
                this.editImagePreview = null;
                this.editImageFile = null;
            }
        },
        removeCreateImage() {
            this.createImagePreview = null;
            this.createImageFile = null;
            if (this.$refs.createImageInput) {
                this.$refs.createImageInput.value = '';
            }
        },
        removeEditImage() {
            this.editImagePreview = null;
            this.editImageFile = null;
            if (this.$refs.editImageInput) {
                this.$refs.editImageInput.value = '';
            }
        },
        getImageUrl(url) {
            if (!url || url === '') {
                return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZTllY2VmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
            }
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            if (url.startsWith('/storage')) {
                return `${this.apiBaseUrl.replace('/api', '')}${url}`;
            }
            return `${this.apiBaseUrl.replace('/api', '')}/storage/${url}`;
        },
        handleImageError(event) {
            event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZTllY2VmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
        }
    },
}
</script>
<style>
.image-upload-section {
    margin-bottom: 16px;
}

.image-preview-box {
    width: 100%;
    height: 150px;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    overflow: hidden;
    margin-bottom: 8px;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-placeholder-box {
    text-align: center;
    color: #adb5bd;
}

.image-placeholder-box i {
    font-size: 48px;
}

.gap-2 {
    gap: 8px;
}

.table-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #dee2e6;
}

/* Scrollable Table Styles */
.table-wrapper {
    position: relative;
}

.table-container {
    position: relative;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    overflow: hidden;
}

.table-container > table:first-child {
    margin-bottom: 0;
    border-bottom: none;
}

.table-container > table:first-child thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #0d6efd;
}

.table-container > table:first-child thead th {
    border-bottom: 2px solid #0a58ca;
}

.table-body-scroll {
    max-height: calc(20 * 60px); /* Khoảng 20 dòng x 60px mỗi dòng */
    overflow-y: auto;
    overflow-x: auto;
}

.table-body-scroll table {
    margin-bottom: 0;
    border-top: none;
}

.table-body-scroll tbody tr {
    height: auto;
}

/* Đảm bảo các cột thẳng hàng giữa thead và tbody */
.table-container > table:first-child thead th,
.table-body-scroll table tbody td,
.table-body-scroll table tbody th {
    padding: 12px 8px;
    vertical-align: middle;
}

/* Căn chỉnh độ rộng cột */
.table-container > table:first-child thead th:nth-child(1),
.table-body-scroll table tbody th:nth-child(1),
.table-body-scroll table tbody td:nth-child(1) {
    width: 50px;
    min-width: 50px;
    max-width: 50px;
}

.table-container > table:first-child thead th:nth-child(2),
.table-body-scroll table tbody td:nth-child(2) {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
}

.table-container > table:first-child thead th:nth-child(3),
.table-body-scroll table tbody td:nth-child(3) {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
}

.table-container > table:first-child thead th:nth-child(5),
.table-body-scroll table tbody td:nth-child(5) {
    width: 120px;
    min-width: 120px;
    max-width: 120px;
}

.table-container > table:first-child thead th:nth-child(6),
.table-body-scroll table tbody td:nth-child(6) {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
}

/* Action buttons */
.table-body-scroll table tbody td:last-child {
    white-space: nowrap;
}

.table-body-scroll table tbody td:last-child .btn {
    white-space: nowrap;
    display: inline-block;
}

.table-body-scroll::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.table-body-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.table-body-scroll::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.table-body-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.table-info {
    padding: 8px;
    background-color: #f8f9fa;
    border-radius: 4px;
}
</style>
