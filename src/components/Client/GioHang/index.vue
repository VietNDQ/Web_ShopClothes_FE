<template>
    <div class="row">
        <div class="col-lg-6">
            <div class="mb-3">
                <label class="form-label">Thêm địa chỉ mới...</label>
                <select class="form-select">
                    <option selected>Địa chỉ đã lưu trữ</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Họ và tên</label>
                <input type="text" class="form-control" placeholder="Nhập họ và tên" />
            </div>
            <div class="mb-3">
                <label class="form-label">Số điện thoại</label>
                <input type="text" class="form-control" placeholder="Nhập số điện thoại" />
            </div>
            <div class="mb-3">
                <label class="form-label">Số nhà, tên đường</label>
                <input type="text" class="form-control" placeholder="Nhập số nhà, tên đường" />
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="mb-3">
                        <label class="form-label">Tỉnh / Thành</label>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Quận / Huyện</label>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Phường / Xã</label>
                    </div>
                </div>
                <div class="row">
                    <label for="">Ghi chú</label>
                    <textarea name="" class="form-control" rows="3" id=""></textarea>
                </div>
                <div class="row mt-4">
                    <h5 class="mb-3">Hình thức thanh toán</h5>

                    <div class="list-group">
                        <label class="list-group-item d-flex align-items-center">
                            <input class="form-check-input me-2" type="radio" name="paymentMethod" checked />
                            <i class="fa-solid fa-van-shuttle fa-2x me-2"></i>
                            <div>
                                <strong class="text-center">COD</strong><br />
                                <small>Thanh toán khi nhận hàng</small>
                            </div>
                        </label>
                        <label class="list-group-item d-flex align-items-center">
                            <input class="form-check-input me-2" type="radio" name="paymentMethod" />
                            <i class="fa-solid fa-money-bill fa-2x me-2"></i>
                            <div>
                                <strong>Chuyển Khoản</strong><br />
                                <small>Chỉ áp dụng khi mua hàng tại shop</small>
                            </div>
                        </label>
                    </div>

                    <!-- Nút Thanh Toán -->
                    <button class="btn btn-danger btn-lg w-100 mt-3">
                        THANH TOÁN 2,862K (COD)
                    </button>
                </div>
            </div>
            <div class="col-lg-6"></div>
        </div>
        <div class="col-lg-6">
            <div class="card-header">
                <div class="row">
                    <div class="d-flex justify-content-between">
                        
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSVWW5Y_OJKazsA8maRsuebRTjIi_gGlX6wg&s"
                            class="rounded-2" style="width: 17%" alt="" />
                        <div class="mt-3">
                            <h5>Ten San phẩm</h5>
                            <p>Size</p>
                        </div>
                        <div class="mt-4">
                            <h5 class="text-danger">2,862K</h5>
                        </div>
                        <div class="text-end">
                            <div class="d-flex justify-content-center btn-increment mt-3 text-center">
                                <button type="button" class="btn"><i class="fa-solid fa-minus"></i></button>
                                <input type="number" min="1" value="1" class="form-control" style="width: 50px" />
                                <button type="button" class="btn"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {};
</script>
