<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Danh Sách Khách Hàng</h5>
                </div>
                <div class="card-body">
                    <div class="input-group mt-3 w-100">
                        <input type="text"
                            class="form-control search-control border border-1 border-secondary"
                            placeholder="Search..." />
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px"><i
                                class="bx bx-search"></i></span>
                        <button  class="btn btn-outline-secondary" type="button">
                            Tìm Kiếm
                        </button>
                    </div>
                    <table class="table table-bordered mb-0">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Họ Và Tên</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Ngày Sinh</th>
                                <th>Trạng Thái</th>
                                <th>Kích Hoạt</th>
                                <th>Số Dư</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Nguyễn Quốc Việt</td>
                                <td>nguyenquocviet@gmail.com</td>
                                <td>0897876871</td>
                                <td>09/11/2004</td>
                                <td>
                                    <button class="btn btn-success">Hoạt Động</button>
                                    <button class="btn btn-warning">Tạm Dừng</button>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>