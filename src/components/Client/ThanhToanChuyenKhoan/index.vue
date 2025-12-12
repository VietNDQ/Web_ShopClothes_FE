<template>
  <div class="payment-page">
    <div class="container py-5">
      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="payment-title">
          <i class="fa-solid fa-qrcode me-2"></i>
          Thanh Toán Qua QR Code
        </h1>
         </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="mt-3 text-muted">Đang tải thông tin đơn hàng...</p>
      </div>

      <!-- Payment Info -->
      <div v-else-if="orderInfo" class="row g-4 justify-content-center">
        <!-- QR Code Section -->
        <div class="col-lg-5 col-md-6">
          <div class="card shadow-lg qr-card">
            <div class="card-header bg-gradient-primary text-white text-center">
              <h5 class="mb-0">
                <i class="fa-solid fa-mobile-screen-button me-2"></i>
                Quét Mã QR Để Thanh Toán
              </h5>
            </div>
            <div class="card-body text-center">
              <!-- QR Code -->
              <div class="qr-code-wrapper mb-4">
                <div v-if="qrCodeDataUrl" class="qr-code-container">
                  <img :src="qrCodeDataUrl" alt="QR Code" class="qr-code-image" />
                  <div class="qr-code-overlay">
                    <div class="qr-code-logo">
                      <i class="fa-solid fa-qrcode fa-3x"></i>
                    </div>
                  </div>
                </div>
                <div v-else class="qr-code-loading">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tạo mã QR...</span>
                  </div>
                  <p class="mt-2 text-muted">Đang tạo mã QR...</p>
                </div>
              </div>

              <!-- Bank Info -->
              <div class="bank-info-card">
                <div class="bank-logo-large mb-3">
                  <i class="fa-solid fa-building-columns fa-4x text-primary"></i>
                </div>
                <h4 class="bank-name mb-2">VietTinBank</h4>
                <div class="bank-details">
                  <div class="bank-detail-item">
                    <label class="text-muted small">Chủ tài khoản:</label>
                    <div class="fw-bold fs-6">{{ bankAccount.chu_tai_khoan }}</div>
                  </div>
                  <div class="bank-detail-item">
                    <label class="text-muted small">Số tài khoản:</label>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                      <span class="fw-bold fs-5 text-primary">{{ bankAccount.so_tai_khoan }}</span>
                      <button 
                        class="btn btn-sm btn-outline-primary"
                        @click="copyToClipboard(bankAccount.so_tai_khoan, 'Số tài khoản')"
                        title="Sao chép số tài khoản"
                      >
                        <i class="fa-solid fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  <div class="bank-detail-item">
                    <label class="text-muted small">Số tiền:</label>
                    <div class="fw-bold fs-5 text-danger">{{ formatVND(orderInfo.tong_tien) }}</div>
                  </div>
                  <div class="bank-detail-item">
                    <label class="text-muted small">Nội dung:</label>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                      <span class="fw-bold text-primary bg-light p-1 rounded small">{{ transferContent }}</span>
                      <button 
                        class="btn btn-sm btn-outline-primary"
                        @click="copyToClipboard(transferContent, 'Nội dung chuyển khoản')"
                        title="Sao chép nội dung"
                      >
                        <i class="fa-solid fa-copy"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Instructions -->
              <div class="alert alert-info mt-3 py-2">
                <h6 class="alert-heading mb-2" style="font-size: 0.9rem;">
                  <i class="fa-solid fa-lightbulb me-2"></i>
                  Hướng dẫn:
                </h6>
                <ol class="mb-0 text-start ps-3 small" style="font-size: 0.85rem;">
                  <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                  <li>Chọn chức năng "Quét QR" hoặc "Chuyển khoản"</li>
                  <li>Quét mã QR trên màn hình</li>
                  <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="col-lg-5 col-md-6">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="fa-solid fa-receipt me-2"></i>
                Thông Tin Đơn Hàng
              </h5>
            </div>
            <div class="card-body">
              <div class="order-info-item mb-2">
                <label class="text-muted small">Mã đơn hàng:</label>
                <div class="fw-bold text-primary">{{ orderInfo.ma_don_hang }}</div>
              </div>
              <div class="order-info-item mb-2">
                <label class="text-muted small">Ngày đặt:</label>
                <div class="small">{{ formatDate(orderInfo.created_at) }}</div>
              </div>
              <div class="order-info-item mb-2">
                <label class="text-muted small">Địa chỉ giao hàng:</label>
                <div class="small">{{ orderInfo.dia_chi_giao_hang }}</div>
              </div>
              <hr>
              <div class="order-summary">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Tổng tiền gốc:</span>
                  <span v-if="orderInfo.tong_tien_goc" class="text-decoration-line-through text-muted">
                    {{ formatVND(orderInfo.tong_tien_goc) }}
                  </span>
                  <span v-else>{{ formatVND(orderInfo.tong_tien) }}</span>
                </div>
                <div v-if="orderInfo.tien_giam_gia > 0" class="d-flex justify-content-between mb-2">
                  <span class="text-success">
                    <i class="fa-solid fa-tag me-1"></i>Giảm giá:
                  </span>
                  <span class="text-success fw-bold">-{{ formatVND(orderInfo.tien_giam_gia) }}</span>
                </div>
                <div v-if="orderInfo.ma_voucher" class="d-flex justify-content-between mb-2">
                  <span class="text-muted small">Voucher:</span>
                  <span class="badge bg-success">{{ orderInfo.ma_voucher }}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold">Tổng thanh toán:</span>
                  <span class="fw-bold fs-6 text-danger">{{ formatVND(orderInfo.tong_tien) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="card shadow-sm mt-3">
            <div class="card-header bg-light">
              <h6 class="mb-0 small">
                <i class="fa-solid fa-box me-2"></i>
                Sản phẩm đã đặt
              </h6>
            </div>
            <div class="card-body">
              <div v-for="item in orderItems" :key="item.id" class="order-item mb-2 pb-2 border-bottom">
                <div class="d-flex">
                  <img 
                    :src="getImageUrl(item.image)" 
                    :alt="item.ten_san_pham"
                    class="item-image"
                    @error="handleImageError"
                  />
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">{{ item.ten_san_pham }}</h6>
                    <div class="text-muted small">
                      <span v-if="item.mau_sac">Màu: {{ item.mau_sac }}</span>
                      <span v-if="item.kich_thuoc"> | Kích thước: {{ item.kich_thuoc }}</span>
                    </div>
                    <div class="mt-1">
                      <span class="text-muted">Số lượng: {{ item.so_luong }}</span>
                      <span class="ms-2 fw-bold text-primary">{{ formatVND(item.don_gia * item.so_luong) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-grid gap-2 mt-3">
            <button class="btn btn-success" @click="confirmPayment">
              <i class="fa-solid fa-check-circle me-2"></i>
              Tôi đã thanh toán
            </button>
            <router-link to="/lich-su-mua-hang" class="btn btn-outline-secondary btn-sm">
              <i class="fa-solid fa-list me-2"></i>
              Xem lịch sử đơn hàng
            </router-link>
            <router-link to="/" class="btn btn-outline-primary btn-sm">
              <i class="fa-solid fa-home me-2"></i>
              Về trang chủ
            </router-link>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-5">
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle fa-3x mb-3"></i>
          <h5>Không tìm thấy thông tin đơn hàng</h5>
          <p class="mb-0">Vui lòng kiểm tra lại hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
        </div>
        <router-link to="/lich-su-mua-hang" class="btn btn-primary">
          <i class="fa-solid fa-arrow-left me-2"></i>
          Quay lại lịch sử mua hàng
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QRCode from 'qrcode';

export default {
  name: 'ThanhToanChuyenKhoan',
  data() {
    return {
      isLoading: true,
      orderInfo: null,
      orderItems: [],
      qrCodeDataUrl: null,
      bankAccount: {
        ten_ngan_hang: 'VietTinBank',
        so_tai_khoan: '0382062172',
        chu_tai_khoan: 'NGUYEN QUOC VIET'
      },
      apiBaseUrl: 'http://127.0.0.1:8000/api'
    };
  },
  computed: {
    transferContent() {
      if (!this.orderInfo) return '';
      return `THANHTOAN ${this.orderInfo.ma_don_hang}`;
    },
    qrCodeString() {
      if (!this.orderInfo) return '';
      // Tạo chuỗi QR code theo format VietQR
      // Format VietQR: số tài khoản|tên người nhận|số tiền|nội dung|ngân hàng
      const amount = Math.round(this.orderInfo.tong_tien);
      // Tạo QR code với format có thể được app ngân hàng nhận diện
      return `970415|${this.bankAccount.so_tai_khoan}|${this.bankAccount.chu_tai_khoan}|${amount}|${this.transferContent}`;
    }
  },
  mounted() {
    const orderId = this.$route.query.ma_don_hang;
    if (orderId) {
      this.loadOrderInfo(orderId);
    } else {
      this.isLoading = false;
    }
  },
  watch: {
    qrCodeString: {
      handler(newVal) {
        if (newVal) {
          this.generateQRCode();
        }
      },
      immediate: true
    }
  },
  methods: {
    async generateQRCode() {
      if (!this.qrCodeString) return;
      
      try {
        const qrCodeUrl = await QRCode.toDataURL(this.qrCodeString, {
          width: 400,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        this.qrCodeDataUrl = qrCodeUrl;
      } catch (error) {
        console.error('Lỗi tạo QR code:', error);
        this.$toast?.error('Không thể tạo mã QR code');
      }
    },
    async loadOrderInfo(maDonHang) {
      this.isLoading = true;
      try {
        const res = await axios.post(`${this.apiBaseUrl}/khach-hang/lich-su-mua-hang`, {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_khach_hang')
          }
        });

        if (res.data && res.data.status && res.data.data) {
          // Tìm đơn hàng theo mã đơn hàng
          const orders = res.data.data;
          const order = orders.find(o => o.ma_don_hang === maDonHang);
          
          if (order) {
            // Lấy thông tin địa chỉ từ đơn hàng đầu tiên
            const firstOrder = orders.find(o => o.ma_don_hang === maDonHang);
            this.orderInfo = {
              ma_don_hang: order.ma_don_hang,
              tong_tien: order.tong_tien,
              tong_tien_goc: order.tong_tien_goc,
              tien_giam_gia: order.tien_giam_gia,
              ma_voucher: order.ma_voucher,
              created_at: order.created_at,
              dia_chi_giao_hang: firstOrder ? this.getDeliveryAddress(firstOrder) : 'Chưa có thông tin'
            };

            // Lấy danh sách sản phẩm trong đơn hàng
            const orderItemsMap = {};
            orders.forEach(o => {
              if (o.ma_don_hang === maDonHang) {
                if (!orderItemsMap[o.id_san_pham]) {
                  orderItemsMap[o.id_san_pham] = {
                    id: o.id,
                    id_san_pham: o.id_san_pham,
                    ten_san_pham: o.ten_san_pham,
                    image: o.image,
                    mau_sac: o.mau_sac,
                    kich_thuoc: o.kich_thuoc,
                    so_luong: o.so_luong,
                    don_gia: o.don_gia
                  };
                }
              }
            });
            this.orderItems = Object.values(orderItemsMap);
          }
        }
      } catch (error) {
        console.error('Lỗi loadOrderInfo:', error);
        this.$toast?.error('Không thể tải thông tin đơn hàng');
      } finally {
        this.isLoading = false;
      }
    },
    getDeliveryAddress(order) {
      if (!order) return 'Chưa có thông tin';
      const parts = [];
      if (order.ten_nguoi_nhan) parts.push(`Người nhận: ${order.ten_nguoi_nhan}`);
      if (order.so_dien_thoai) parts.push(`SĐT: ${order.so_dien_thoai}`);
      return parts.length > 0 ? parts.join(' | ') : 'Chưa có thông tin';
    },
    copyToClipboard(text, label) {
      navigator.clipboard.writeText(text).then(() => {
        this.$toast?.success(`Đã sao chép ${label} vào clipboard`);
      }).catch(() => {
        // Fallback cho trình duyệt cũ
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.$toast?.success(`Đã sao chép ${label} vào clipboard`);
      });
    },
    confirmPayment() {
      if (confirm('Bạn đã thanh toán thành công? Đơn hàng sẽ được xử lý sau khi chúng tôi xác nhận.')) {
        this.$router.push('/lich-su-mua-hang');
      }
    },
    formatVND(number) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(number);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getImageUrl(url) {
      if (!url || url === '') {
        return 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Crect width=\'300\' height=\'300\' fill=\'%23e9ecef\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23999\' font-family=\'Arial\' font-size=\'14\'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E';
      }
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return `${this.apiBaseUrl.replace('/api', '')}/storage/${url}`;
    },
    handleImageError(event) {
      event.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Crect width=\'300\' height=\'300\' fill=\'%23e9ecef\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23999\' font-family=\'Arial\' font-size=\'14\'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E';
    }
  }
};
</script>

<style scoped>
.payment-page {
  min-height: 70vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 0;
}

.payment-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.payment-title + p {
  color: rgba(255, 255, 255, 0.9);
}

.card {
  border: none;
  border-radius: 16px;
  overflow: hidden;
}

.qr-card {
  background: white;
}

.card-header {
  border-radius: 0 !important;
  padding: 0.75rem 1rem;
}

.card-header h5 {
  font-size: 1rem;
  margin-bottom: 0;
}

.card-body {
  padding: 1rem;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.qr-code-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  min-height: 250px;
}

.qr-code-container {
  position: relative;
  display: inline-block;
}

.qr-code-image {
  width: 100%;
  max-width: 240px;
  height: auto;
  border: 4px solid white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.qr-code-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.qr-code-logo {
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.qr-code-logo i {
  font-size: 1.25rem !important;
}

.qr-code-loading {
  text-align: center;
  padding: 2rem;
}

.bank-info-card {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  margin-top: 0.5rem;
}

.bank-logo-large {
  text-align: center;
}

.bank-logo-large i {
  font-size: 2rem !important;
}

.bank-name {
  color: #667eea;
  font-weight: 700;
  text-align: center;
  font-size: 1.1rem;
}

.bank-details {
  margin-top: 0.75rem;
}

.bank-detail-item {
  margin-bottom: 0.75rem;
  text-align: center;
}

.bank-detail-item label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: #6c757d;
}

.order-info-item label {
  display: block;
  margin-bottom: 0.25rem;
}

.order-item {
  display: flex;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

@media (max-width: 768px) {
  .payment-page {
    padding: 0.75rem 0;
  }
  
  .payment-title {
    font-size: 1.25rem;
  }
  
  .qr-code-image {
    max-width: 200px;
  }
  
  .qr-code-wrapper {
    min-height: 240px;
    padding: 0.75rem;
  }
  
  .bank-logo-large i {
    font-size: 1.75rem !important;
  }
  
  .bank-name {
    font-size: 1rem;
  }
  
  .card-body {
    padding: 0.75rem;
  }
}
</style>
