<template>
    <div class="card radius-10">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div>
                    <h3 class="mb-0">Quản Lý Đơn Hàng</h3>
                </div>
            </div>
            <div class="input-group w-100 mt-1">
                <input type="text" class="form-control search-control" placeholder="Type to search...">
                <button @click="timKiem()" class="btn btn-primary">Tìm kiếm</button>
            </div>
            <div class="table-responsive mt-2">
                <table class="table align-middle mb-0 table-hover">
                    <thead class="table-light">
                        <tr class="text-center">
                            <th style="width: 5%;">#</th>
                            <th>Khách Hàng</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Số Lượng</th>
                            <th>Tổng Tiền</th>
                            <th>Ghi Chú</th>
                            <th>Ngày Đặt</th>
                            <th>Thanh Toán</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(value, index) in list_don_hang" :key="index">
                            <tr>
                                <th class="align-middle text-center">{{ index + 1 }}</th>
                                <td class="align-middle">{{ value.ten_khach_hang }}</td>
                                <td class="align-middle">{{ value.ten_san_pham }}</td>
                                <td class="align-middle text-end">{{ value.so_luong }}</td>
                                <td class="align-middle text-end">{{ formatVND(value.thanh_tien) }}</td>
                                <td class="align-middle text-center">
                                    <i class="fa-solid fa-clipboard fa-xl text-danger"></i>
                                </td>
                                <td class="align-middle text-center">{{ value.ngay_dat }}</td>
                                <td class="align-middle text-center">
                                    <button class="btn btn-primary btn-sm">Đã Thanh Toán</button>
                                    <!-- <button class="btn btn-info btn-sm">Chưa Thanh Toán</button> -->
                                </td>
                                <td class="align-middle text-center">
                                    <button v-if="value.trang_thai === 0" class="btn btn-warning btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#actionModal" style="width: 80%;">Chờ xác
                                        nhận</button>
                                    <button v-else-if="value.trang_thai === 1" class="btn btn-info btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#actionModal" style="width: 80%;">Đã xác
                                        nhận</button>
                                    <button v-else-if="value.trang_thai === 2" class="btn btn-secondary btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#actionModal" style="width: 80%;">Đang
                                        giao hàng</button>
                                    <button v-else-if="value.trang_thai === 3" class="btn btn-success btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#actionModal" style="width: 80%;">Giao
                                        hàng thành công</button>
                                    <button v-else-if="value.trang_thai === 4" class="btn btn-danger btn-sm"
                                        data-bs-toggle="modal" data-bs-target="#actionModal" style="width: 80%;">Giao
                                        hàng thất bại</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!--Action Modal -->
    <div class="modal fade" id="actionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Trạng Thái Đơn Hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <select name="status" class="form-select">
                        <option value="0">Chờ xác nhận</option>
                        <option value="1">Đã xác nhận</option>
                        <option value="2">Đang giao hàng</option>
                        <option value="3">Giao hàng thành công</option>
                        <option value="4">Giao hàng thất bại</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list_don_hang: [
                {
                    ten_khach_hang: 'Nguyễn Quốc Việt',
                    ten_san_pham: 'Vivo',
                    so_luong: 2,
                    thanh_tien: 7000000,
                    ghi_chu: '',
                    ngay_dat: '09/11/2004',
                    trang_thai: 1
                },
                {
                    ten_khach_hang: 'Trần Thị Mai',
                    ten_san_pham: 'iPhone 13',
                    so_luong: 1,
                    thanh_tien: 20000000,
                    ghi_chu: 'Giao trong ngày',
                    ngay_dat: '12/05/2025',
                    trang_thai: 0
                },
                {
                    ten_khach_hang: 'Lê Văn Nam',
                    ten_san_pham: 'Samsung Galaxy S23',
                    so_luong: 3,
                    thanh_tien: 45000000,
                    ghi_chu: '',
                    ngay_dat: '05/03/2025',
                    trang_thai: 1
                },
                {
                    ten_khach_hang: 'Phạm Minh Châu',
                    ten_san_pham: 'OPPO Reno10',
                    so_luong: 2,
                    thanh_tien: 15000000,
                    ghi_chu: 'Khách đặt online',
                    ngay_dat: '28/04/2025',
                    trang_thai: 2
                },
                {
                    ten_khach_hang: 'Đỗ Hồng Quân',
                    ten_san_pham: 'Xiaomi Redmi Note 13',
                    so_luong: 1,
                    thanh_tien: 4500000,
                    ghi_chu: '',
                    ngay_dat: '10/05/2025',
                    trang_thai: 0
                }
            ]


        }
    },
    methods: {
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