# Tài liệu sử dụng API Đơn hàng - Frontend

## Tổng quan các API routes (api.php dòng 160-168)

### 1. POST `/khach-hang/them-don-hang`
**Mô tả:** Thêm sản phẩm vào giỏ hàng

**Vị trí sử dụng:**
- `src/components/Client/ChiTietSanPham/index.vue` - Method `addToCart()`
- `src/components/Client/SanPham/index.vue` - Method `quickAddToCart()`

**Ví dụ sử dụng:**
```javascript
axios.post('http://127.0.0.1:8000/api/khach-hang/them-don-hang', {
    id_san_pham: product.id,
    so_luong: quantity,
    kich_thuoc: size,
    mau_sac: color,
    ghi_chu: null
}, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang')
    }
})
```

---

### 2. POST `/khach-hang/get-data-don-hang`
**Mô tả:** Lấy danh sách đơn hàng trong giỏ hàng (trạng thái = 0)

**Vị trí sử dụng:**
- `src/components/Client/DonHang/index.vue` - Method `loadDonHang()`
- `src/layout/components/Client/TopClient.vue` - Method `loadDonHang()`

**Ví dụ sử dụng:**
```javascript
axios.post('http://127.0.0.1:8000/api/khach-hang/get-data-don-hang', {}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
    }
})
.then((res) => {
    if (res.data.status) {
        this.list_don_hang = res.data.data;
        this.tong_so_luong = res.data.tong_so_luong;
        this.thanh_tien = res.data.tong_tien;
    }
})
```

---

### 3. POST `/khach-hang/update-don-hang`
**Mô tả:** Cập nhật số lượng đơn hàng trong giỏ hàng

**Vị trí sử dụng:**
- `src/components/Client/DonHang/index.vue` - Method `updateQuantity()`

**Ví dụ sử dụng:**
```javascript
axios.post('http://127.0.0.1:8000/api/khach-hang/update-don-hang', {
    id_don_hang: item.id,
    so_luong: parseInt(newQuantity)
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
    }
})
```

---

### 4. POST `/khach-hang/delete-don-hang/{id}`
**Mô tả:** Xóa đơn hàng khỏi giỏ hàng

**Vị trí sử dụng:**
- `src/components/Client/DonHang/index.vue` - Method `xoaDonHang()`

**Ví dụ sử dụng:**
```javascript
axios.post(`http://127.0.0.1:8000/api/khach-hang/delete-don-hang/${id_don_hang}`, null, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang')
    }
})
```

---

### 5. POST `/khach-hang/xac-nhan-dat-hang`
**Mô tả:** Xác nhận đặt hàng (chuyển từ giỏ hàng sang đơn hàng)

**Vị trí sử dụng:**
- `src/components/Client/DonHang/index.vue` - Method `xacNhanDatHang()`

**Ví dụ sử dụng:**
```javascript
axios.post('http://127.0.0.1:8000/api/khach-hang/xac-nhan-dat-hang', {
    id_dia_chi_giao_hang: this.xac_nhan_dat_hang.id_dia_chi_giao_hang,
    phuong_thuc_thanh_toan: this.xac_nhan_dat_hang.phuong_thuc_thanh_toan,
    chi_tiet_don_hang: this.list_don_hang.map(item => ({
        id_san_pham: item.id_san_pham,
        so_luong: item.so_luong,
        don_gia: item.don_gia,
        mau_sac: item.mau_sac,
        kich_thuoc: item.kich_thuoc
    }))
}, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang')
    }
})
```

---

### 6. GET `/khach-hang/get-don-hang`
**Mô tả:** Lấy danh sách đơn hàng đã đặt (trạng thái > 0)

**Vị trí sử dụng:**
- Chưa được sử dụng trong frontend (có thể sử dụng trong component hiển thị đơn hàng đã đặt)

**Ví dụ sử dụng:**
```javascript
axios.get('http://127.0.0.1:8000/api/khach-hang/get-don-hang', {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
    }
})
.then((res) => {
    if (res.data.status) {
        this.list_don_hang = res.data.data;
    }
})
```

---

### 7. POST `/khach-hang/lich-su-mua-hang`
**Mô tả:** Lấy lịch sử mua hàng

**Vị trí sử dụng:**
- `src/components/Client/LichSuMuaHang/index.vue` - Method `loadLichSu()`

**Ví dụ sử dụng:**
```javascript
axios.post('http://127.0.0.1:8000/api/khach-hang/lich-su-mua-hang', {}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
    }
})
.then((response) => {
    if (response.data.status) {
        this.products = response.data.data;
    }
})
```

---

### 8. POST `/khach-hang/xac-nhan-nhan-hang`
**Mô tả:** Xác nhận đã nhận hàng hoặc chưa nhận được hàng

**Vị trí sử dụng:**
- `src/components/Client/LichSuMuaHang/index.vue` - Method `xacNhanNhanHang()`

**Ví dụ sử dụng:**
```javascript
axios.post('http://127.0.0.1:8000/api/khach-hang/xac-nhan-nhan-hang', {
    id: product.id,
    trang_thai: 4  // 4 = Đã nhận hàng, 5 = Chưa nhận được hàng
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('token_khach_hang')
    }
})
```

---

## Trạng thái đơn hàng (trang_thai)

- **0:** Giỏ hàng (chưa đặt)
- **1:** Chờ xác nhận
- **2:** Chờ lấy hàng
- **3:** Đang giao hàng (Chờ giao hàng)
- **4:** Đã nhận hàng
- **5:** Giao hàng thất bại / Đã hủy

---

## Lưu ý

1. Tất cả các API đều yêu cầu authentication token trong header
2. Token được lấy từ `localStorage.getItem('token_khach_hang')`
3. Base URL: `http://127.0.0.1:8000/api`
4. Sau khi thực hiện các thao tác thành công, nên reload lại dữ liệu để cập nhật UI

