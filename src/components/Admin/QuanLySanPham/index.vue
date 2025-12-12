  <template>
    <div class="container-fluid py-4">
      <!-- Header Section -->
      <div class="page-header mb-4">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h2 class="page-title mb-2">
              <i class="fa-solid fa-box me-2"></i>
              Quản lý sản phẩm
            </h2>
           
          </div>
          <div class="col-lg-4 text-end">
            <button class="btn btn-primary btn-lg shadow-sm" @click="openModal">
              <i class="fa-solid fa-plus me-2"></i>Thêm sản phẩm mới
            </button>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="card search-card mb-4 shadow-sm">
        <div class="card-body p-3">
          <div class="input-group input-group-lg">
            <span class="input-group-text bg-white border-end-0">
              <i class="fa-solid fa-magnifying-glass text-muted"></i>
            </span>
            <input 
              v-model="keyword" 
              @input="searchProduct" 
              type="text" 
              class="form-control border-start-0 ps-0"
              placeholder="Tìm kiếm theo tên sản phẩm, danh mục..."
            />
            <button 
              v-if="keyword" 
              class="btn btn-outline-secondary border-start-0" 
              @click="keyword = ''; searchProduct()"
              type="button"
            >
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="card shadow-sm">
        <div class="card-body text-center py-5">
          <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p class="text-muted mb-0">Đang tải danh sách sản phẩm...</p>
        </div>
      </div>

      <!-- Bảng danh sách sản phẩm -->
      <div v-else class="card shadow-sm border-0">
        <div class="card-header bg-white border-bottom py-3">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0 fw-bold">
              <i class="fa-solid fa-list me-2 text-primary"></i>
              Danh sách sản phẩm
            </h5>
            <span class="badge bg-primary">{{ listSanPham.length }} sản phẩm</span>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0 align-middle product-table">
              <thead class="table-header">
                <tr class="text-center"
                >
                  <th style="width: 50px;" class="text-center">#</th>
                  <th style="width: 100px;" class="text-center">Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th style="width: 150px;" class="text-center">Danh mục</th>
                  <th style="width: 100px;" class="text-center">Xem chi tiết</th>
                  <th style="width: 100px;" class="text-center">Số lượng</th>
                  <th style="width: 100px;" class="text-center">Biến thể</th>
                  <th style="width: 130px;" class="text-center">Trạng thái</th>
                  <th style="width: 150px;" class="text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(sp, i) in (keyword ? filteredList : listSanPham)" :key="sp.id" class="product-row">
                  <td class="text-center fw-bold text-muted">{{ i + 1 }}</td>
                  <td class="text-center">
                    <div class="product-image-wrapper">
                      <img 
                        :src="getImageUrl(sp.hinh_anh)" 
                        class="product-image rounded shadow-sm" 
                        @click="viewProductDetail(sp)"
                        :alt="sp.ten_san_pham"
                        @error="handleImageError($event)"
                      />
                    </div>
                  </td>
                  <td>
                    <div class="fw-bold text-primary product-name">{{ sp.ten_san_pham }}</div>
                    <small class="text-muted product-description" v-if="sp.mo_ta">
                      {{ truncateText(sp.mo_ta, 50) }}
                    </small>
                  </td>
                  <td class="text-center">
                    <span class="badge category-badge px-3 py-2">
                      {{ sp.ten_danh_muc || 'N/A' }}
                    </span>
                  </td>
                  <td class="text-center">
                    <button 
                      class="btn btn-info btn-sm action-btn" 
                      @click="viewProductDetail(sp)" 
                      title="Xem chi tiết sản phẩm"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <span class="badge quantity-badge px-3 py-2">
                      {{ sp.tong_so_luong || 0 }}
                    </span>
                  </td>
                  <td class="text-center">
                    <span class="badge variant-badge px-3 py-2">
                      {{ sp.so_bien_the || 0 }}
                    </span>
                  </td>
                  <td class="text-center">
                    <button 
                      class="btn btn-sm status-toggle-btn"
                      :class="sp.tinh_trang === 1 ? 'btn-success' : 'btn-secondary'"
                      @click="changeStatus(sp.id, sp.tinh_trang)"
                      :title="sp.tinh_trang === 1 ? 'Click để ẩn sản phẩm' : 'Click để hiển thị sản phẩm'"
                    >
                      <i :class="sp.tinh_trang === 1 ? 'fa-solid fa-eye me-1' : 'fa-solid fa-eye-slash me-1'"></i>
                      {{ sp.tinh_trang === 1 ? 'Hiển thị' : 'Ẩn' }}
                    </button>
                  </td>
                  <td>
                    <div class="d-flex gap-1 justify-content-center align-items-center action-buttons-wrapper">
                      <button 
                        class="btn btn-warning btn-sm action-btn" 
                        @click="editProduct(sp)" 
                        title="Cập nhật sản phẩm"
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button 
                        class="btn btn-danger btn-sm action-btn" 
                        @click="deleteProduct(sp.id)" 
                        title="Xóa sản phẩm"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredList.length === 0 && !isLoading">
                  <td colspan="9" class="text-center py-5 empty-state">
                    <div class="empty-state-content">
                      <i class="fa-solid fa-box-open fa-3x mb-3 text-muted"></i>
                      <div v-if="keyword" class="empty-state-text">
                        <h5 class="text-muted mb-2">Không tìm thấy sản phẩm</h5>
                        <p class="text-muted">Không có sản phẩm nào phù hợp với từ khóa "<strong>{{ keyword }}</strong>"</p>
                        <button class="btn btn-outline-primary mt-3" @click="keyword = ''; searchProduct()">
                          <i class="fa-solid fa-rotate-left me-2"></i>Xóa bộ lọc
                        </button>
                      </div>
                      <div v-else class="empty-state-text">
                        <h5 class="text-muted mb-2">Chưa có sản phẩm nào</h5>
                        <p class="text-muted mb-3">
                          Sản phẩm bạn thêm sẽ được hiển thị trên trang chủ và cửa hàng trực tuyến
                        </p>
                        <button class="btn btn-primary" @click="openModal">
                          <i class="fa-solid fa-plus me-2"></i>Thêm sản phẩm đầu tiên
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- MODAL ĐĂNG SẢN PHẨM -->
      <div class="modal fade" id="modalSanPham" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">
                <i :class="editingProductId ? 'fa-solid fa-edit me-2' : 'fa-solid fa-plus-circle me-2'"></i>
                {{ editingProductId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới' }}
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
              <!-- Thông báo -->
              <div class="alert alert-info d-flex align-items-center mb-3" role="alert">
                <i class="fa-solid fa-lightbulb me-2"></i>
                <div>
                  <strong>Lưu ý:</strong> Sản phẩm bạn thêm sẽ được hiển thị trên trang chủ và cửa hàng trực tuyến khi trạng thái là "Hiển thị"
                </div>
              </div>

              <!-- Form đăng sản phẩm -->
              <div class="row">
                <div class="col-lg-6 mb-3">
                  <label class="form-label fw-bold">
                    Tên sản phẩm <span class="text-danger">*</span>
                  </label>
                  <input 
                    v-model="tenSP" 
                    type="text" 
                    class="form-control" 
                    placeholder="Nhập tên sản phẩm..."
                    required
                  />
                </div>
                <div class="col-lg-6 mb-3">
                  <label class="form-label fw-bold">
                    Slug sản phẩm <span class="text-muted">(Tùy chọn)</span>
                  </label>
                  <input 
                    v-model="slugSP" 
                    type="text" 
                    class="form-control" 
                    placeholder="Để trống sẽ tự động tạo từ tên sản phẩm"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 mb-3">
                  <label class="form-label fw-bold">
                    Danh mục <span class="text-danger">*</span>
                  </label>
                  <select v-model="danhMuc" class="form-select" required>
                    <option value="">-- Chọn danh mục --</option>
                    <option v-for="dm in list_danh_muc" :key="dm.id" :value="dm.id">
                      {{ dm.ten_danh_muc }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Mô tả sản phẩm</label>
                <textarea 
                  v-model="moTa" 
                  class="form-control" 
                  rows="4"
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                ></textarea>
              </div>

              <!-- Hình ảnh -->
              <div class="mb-3">
                <label class="form-label fw-bold">Hình ảnh sản phẩm (URL)</label>
                <div class="d-flex flex-wrap gap-2 mb-2">
                  <div
                    v-for="(img, index) in previews"
                    :key="`preview-${index}-${img.url ? img.url.substring(0, 30) : Date.now()}`"
                    class="position-relative"
                    style="width: 100px; height: 100px"
                  >
                    <img 
                      :src="img.url || img.preview" 
                      class="w-100 h-100 rounded" 
                      style="object-fit: cover;" 
                      @error="handleImageError"
                      :alt="`Preview ${index + 1}`"
                    />
                    <button 
                      @click.stop="removeImage(index)" 
                      type="button"
                      class="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle p-0"
                      style="width: 20px; height: 20px; transform: translate(40%, -40%); z-index: 10;"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="imageUrlInput"
                  placeholder="Nhập URL hình ảnh (có thể nhiều URL, ngăn cách bởi dấu phẩy hoặc dấu cách). Nhấn Enter để thêm"
                  @keyup.enter="addImageUrl"
                  @blur="addImageUrl"
                />
              </div>

              <!-- Biến thể -->
              <div class="border-top pt-3 mt-3">
                <h6 class="text-success fw-bold mb-3">
                  <i class="fa-solid fa-list me-2"></i>Biến thể sản phẩm
                </h6>
                <div v-if="variants.length === 0" class="alert alert-warning">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  Vui lòng thêm ít nhất một biến thể sản phẩm (size, màu sắc, số lượng, giá)
                </div>
                <div v-for="(variant, index) in variants" :key="index" class="variant-box mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-primary">Biến thể {{ index + 1 }}</span>
                    <button class="btn btn-danger btn-sm" @click="removeVariant(index)">
                      <i class="fa-solid fa-trash me-1"></i>Xóa
                    </button>
                  </div>
                  <div class="row g-3">
                    <div class="col-md-3">
                      <label class="form-label">Size</label>
                      <input 
                        v-model="variant.size" 
                        type="text" 
                        class="form-control" 
                        placeholder="VD: S, M, L..."
                      />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Màu sắc</label>
                      <input 
                        v-model="variant.mau_sac" 
                        type="text" 
                        class="form-control" 
                        placeholder="VD: Đỏ, Xanh..."
                      />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Số lượng</label>
                      <input 
                        v-model.number="variant.so_luong" 
                        type="number" 
                        class="form-control" 
                        min="0"
                        placeholder="0"
                      />
                    </div>
                    <div class="col-md-3">
                      <label class="form-label">Giá (VNĐ)</label>
                      <input 
                        v-model.number="variant.gia" 
                        type="number" 
                        class="form-control" 
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <button class="btn btn-outline-primary w-100" @click="addVariant">
                  <i class="fa-solid fa-plus me-2"></i>Thêm biến thể
                </button>
              </div>

            </div>

            <div class="modal-footer bg-light">
              <button class="btn btn-secondary" data-bs-dismiss="modal">
                <i class="fa-solid fa-times me-2"></i>Đóng
              </button>
              <button 
                class="btn btn-primary" 
                @click="submitForm"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <i v-else class="fa-solid fa-check me-2"></i>
                {{ isSubmitting ? 'Đang xử lý...' : (editingProductId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL XEM CHI TIẾT SẢN PHẨM -->
      <div class="modal fade" id="modalChiTietSanPham" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header bg-info text-white">
              <h5 class="modal-title">
                <i class="fa-solid fa-info-circle me-2"></i>Chi tiết sản phẩm
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4" v-if="selectedProduct">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <h6 class="fw-bold mb-2">Hình ảnh</h6>
                  <div class="d-flex flex-wrap gap-2">
                    <img 
                      v-for="(img, idx) in selectedProduct.danh_sach_hinh_anh || [selectedProduct.hinh_anh]" 
                      :key="idx"
                      :src="getImageUrl(img)" 
                      class="rounded shadow-sm"
                      style="width: 100px; height: 100px; object-fit: cover;"
                      :alt="selectedProduct.ten_san_pham"
                      @error="handleImageError($event)"
                    />
                  </div>
                </div>
                <div class="col-md-8">
                  <h5 class="text-primary mb-3">{{ selectedProduct.ten_san_pham }}</h5>
                  <div class="mb-2">
                    <strong>Danh mục:</strong> 
                    <span class="badge bg-info ms-2">{{ selectedProduct.ten_danh_muc }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>Giá:</strong>
                    <span class="text-success fw-bold ms-2">
                      <span v-if="selectedProduct.gia_thap_nhat && selectedProduct.gia_cao_nhat">
                        {{ formatPrice(selectedProduct.gia_thap_nhat) }}
                        <span v-if="selectedProduct.gia_thap_nhat !== selectedProduct.gia_cao_nhat">
                          - {{ formatPrice(selectedProduct.gia_cao_nhat) }}
                        </span>
                      </span>
                      <span v-else-if="selectedProduct.gia_co_ban">
                        {{ formatPrice(selectedProduct.gia_co_ban) }}
                      </span>
                      <span v-else class="text-muted">Chưa có giá</span>
                    </span>
                  </div>
                  <div class="mb-2">
                    <strong>Tổng số lượng:</strong>
                    <span class="badge bg-secondary ms-2">{{ selectedProduct.tong_so_luong || 0 }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>Số biến thể:</strong>
                    <span class="badge bg-warning text-dark ms-2">{{ selectedProduct.so_bien_the || 0 }}</span>
                  </div>
                  <div class="mb-2">
                    <strong>Trạng thái:</strong>
                    <span class="badge bg-success ms-2" v-if="selectedProduct.tinh_trang === 1">Hiển thị</span>
                    <span class="badge bg-secondary ms-2" v-else>Tắt</span>
                  </div>
                  <div class="mb-2" v-if="selectedProduct.mo_ta">
                    <strong>Mô tả:</strong>
                    <p class="mt-2">{{ selectedProduct.mo_ta }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Danh sách biến thể -->
              <div class="border-top pt-3 mt-3" v-if="selectedProduct.bien_the && selectedProduct.bien_the.length > 0">
                <h6 class="fw-bold mb-3">Danh sách biến thể</h6>
                <div class="table-responsive">
                  <table class="table table-sm table-bordered">
                    <thead class="table-light">
                      <tr>
                        <th>Size</th>
                        <th>Màu sắc</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(bt, idx) in selectedProduct.bien_the" :key="idx">
                        <td>{{ bt.size || 'N/A' }}</td>
                        <td>{{ bt.mau_sac || 'N/A' }}</td>
                        <td>{{ bt.so_luong || 0 }}</td>
                        <td class="text-success fw-bold">{{ formatPrice(bt.gia || 0) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL XÁC NHẬN XÓA SẢN PHẨM -->
      <div class="modal fade" id="modalXoaSanPham" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title">
                <i class="fa-solid fa-triangle-exclamation me-2"></i>Xác nhận xóa sản phẩm
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0">
                  <i class="fa-solid fa-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="mb-2">Bạn có chắc chắn muốn xóa sản phẩm này?</h6>
                  <p class="mb-0 text-muted" v-if="productToDeleteName">
                    <strong>{{ productToDeleteName }}</strong>
                  </p>
                  <p class="text-danger mt-2 mb-0">
                    <i class="fa-solid fa-info-circle me-1"></i>
                    Hành động này không thể hoàn tác! Tất cả hình ảnh và biến thể của sản phẩm cũng sẽ bị xóa.
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                <i class="fa-solid fa-times me-2"></i>Hủy
              </button>
              <button 
                type="button" 
                class="btn btn-danger" 
                @click="confirmDeleteProduct"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <i v-else class="fa-solid fa-trash me-2"></i>
                {{ isSubmitting ? 'Đang xóa...' : 'Xóa sản phẩm' }}
              </button>
            </div>
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
        // table / search
        listSanPham: [],
        filteredList: [],
        keyword: "",
        isLoading: false,
        isSubmitting: false,

        // modal form
        tenSP: "",
        moTa: "",
        danhMuc: "",
        list_danh_muc: [],
        // image URLs
        previews: [],
        imageUrlInput: "",
        // variants
        variants: [],

        // selected product for detail view
        selectedProduct: null,
        
        // editing product ID (null khi thêm mới, có giá trị khi cập nhật)
        editingProductId: null,
        
        // product to delete (ID)
        productToDelete: null,
        productToDeleteName: "",

        // auth token for admin requests
        token: localStorage.getItem("token_nhan_vien") || "",
        
        // API base URL
        apiBaseUrl: "http://127.0.0.1:8000/api",
      };
    },

    mounted() {
      this.loadDanhMuc();
      this.loadSanPham();
      this.setupModalEvents();
    },

    methods: {
      // Setup modal events để reset form khi đóng modal
      setupModalEvents() {
        const modalEl = document.getElementById("modalSanPham");
        if (modalEl) {
          modalEl.addEventListener("hidden.bs.modal", () => {
            this.resetForm();
          });
        }
      },

      // Reset form về trạng thái ban đầu
      resetForm() {
        this.tenSP = "";
        this.slugSP = "";
        this.moTa = "";
        this.danhMuc = "";
        this.previews = [];
        this.variants = [];
        this.imageUrlInput = "";
        this.isSubmitting = false;
        this.editingProductId = null;
      },
      
      // Thêm URL hình ảnh (hỗ trợ nhiều URL ngăn cách bởi dấu phẩy hoặc dấu cách)
      addImageUrl() {
        const input = this.imageUrlInput.trim();
        if (!input) {
          // Không hiển thị warning khi blur với input rỗng
          return;
        }
        
        // Tách các URL bằng dấu phẩy hoặc dấu cách
        // Hỗ trợ cả dấu phẩy và dấu cách, có thể kết hợp
        // Tách bằng dấu phẩy trước, sau đó tách các phần bằng dấu cách
        let urls = [];
        
        // Bước 1: Tách bằng dấu phẩy
        const partsByComma = input.split(/[,，]+/);
        
        // Bước 2: Với mỗi phần, tách thêm bằng dấu cách
        partsByComma.forEach(part => {
          const partsBySpace = part.trim().split(/\s+/);
          partsBySpace.forEach(url => {
            const trimmedUrl = url.trim();
            if (trimmedUrl.length > 0) {
              urls.push(trimmedUrl);
            }
          });
        });
        
        
        
        if (urls.length === 0) {
          this.$toast?.warning("Không tìm thấy URL hợp lệ");
          return;
        }
        
        let addedCount = 0;
        let skippedCount = 0;
        const existingUrls = this.previews.map(p => p.url || p.preview);
        
        urls.forEach(url => {
          // Validate URL
          try {
            new URL(url);
          } catch (e) {
            skippedCount++;
            return;
          }
          
          // Kiểm tra trùng lặp
          if (existingUrls.includes(url)) {
            skippedCount++;
            return;
          }
          
          // Thêm vào previews
          this.previews = [...this.previews, {
            url: url,
            preview: url,
            isExisting: false
          }];
          existingUrls.push(url);
          addedCount++;
        });
        
        // Clear input
        this.imageUrlInput = "";
        
        // Thông báo kết quả
        if (addedCount > 0) {
          if (skippedCount > 0) {
            this.$toast?.success(`Đã thêm ${addedCount} hình ảnh. Bỏ qua ${skippedCount} URL không hợp lệ hoặc trùng lặp.`);
          } else {
            this.$toast?.success(`Đã thêm ${addedCount} hình ảnh`);
          }
        } else {
          this.$toast?.error("Không có URL hợp lệ nào được thêm. Vui lòng kiểm tra lại URL.");
        }
      },

      // UI - Mở modal đăng sản phẩm
      openModal() {
        this.resetForm();
        const modalEl = document.getElementById("modalSanPham");
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      },

      // Load danh sách sản phẩm
      async loadSanPham() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        try {
          const res = await axios.get(`${this.apiBaseUrl}/admin/san-pham/data`, {
            headers: { Authorization: "Bearer " + this.token },
          });
          
          console.log("Response từ API:", res.data);
          
          // Xử lý response - kiểm tra nhiều trường hợp
          if (res.data) {
            // Trường hợp 1: Có status và data
            if (res.data.status && res.data.data) {
              this.listSanPham = Array.isArray(res.data.data) ? res.data.data : [];
              this.filteredList = [...this.listSanPham];
              console.log("Đã load được", this.listSanPham.length, "sản phẩm");
            }
            // Trường hợp 2: Không có status nhưng có data trực tiếp
            else if (res.data.data && Array.isArray(res.data.data)) {
              this.listSanPham = res.data.data;
              this.filteredList = [...this.listSanPham];
              console.log("Đã load được", this.listSanPham.length, "sản phẩm (không có status)");
            }
            // Trường hợp 3: Data là array trực tiếp
            else if (Array.isArray(res.data)) {
              this.listSanPham = res.data;
              this.filteredList = [...this.listSanPham];
              console.log("Đã load được", this.listSanPham.length, "sản phẩm (array trực tiếp)");
            }
            // Trường hợp 4: Không có dữ liệu
            else {
              console.warn("API trả về nhưng không có dữ liệu sản phẩm:", res.data);
              this.listSanPham = [];
              this.filteredList = [];
              if (this.listSanPham.length === 0) {
                this.$toast?.info("Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!");
              }
            }
          } else {
            console.warn("Response không có dữ liệu");
            this.listSanPham = [];
            this.filteredList = [];
          }
        } catch (err) {
          console.error("Lỗi loadSanPham:", err);
          console.error("Chi tiết lỗi:", err.response?.data);
          const errorMsg = err.response?.data?.message || err.message || "Không thể tải danh sách sản phẩm";
          this.$toast?.error(errorMsg);
          this.listSanPham = [];
          this.filteredList = [];
        } finally {
          this.isLoading = false;
        }
      },

      // Tìm kiếm sản phẩm (có thể dùng API search hoặc filter local)
      async searchProduct() {
        const key = (this.keyword || "").trim();
        
        if (!key) {
          this.filteredList = [...this.listSanPham];
          return;
        }

        // Nếu muốn dùng API search, uncomment phần này và comment phần filter local
        // try {
        //   const res = await axios.post(`${this.apiBaseUrl}/admin/san-pham/search`, 
        //     { noi_dung: key },
        //     { headers: { Authorization: "Bearer " + this.token } }
        //   );
        //   if (res.data.status && res.data.data) {
        //     this.filteredList = res.data.data;
        //   }
        // } catch (err) {
        //   console.error("Lỗi searchProduct:", err);
        //   this.$toast?.error("Lỗi khi tìm kiếm");
        // }

        // Filter local (nhanh hơn cho dữ liệu nhỏ)
        const keyLower = key.toLowerCase();
        this.filteredList = this.listSanPham.filter((sp) => {
          const tenSP = String(sp.ten_san_pham || "").toLowerCase();
          const tenDM = String(sp.ten_danh_muc || "").toLowerCase();
          const moTa = String(sp.mo_ta || "").toLowerCase();
          return tenSP.includes(keyLower) || tenDM.includes(keyLower) || moTa.includes(keyLower);
        });
      },

      // Mở modal xác nhận xóa sản phẩm
      deleteProduct(id) {
        // Tìm sản phẩm để lấy tên
        const product = this.listSanPham.find(sp => sp.id === id);
        this.productToDelete = id;
        this.productToDeleteName = product ? product.ten_san_pham : "";
        
        // Mở modal
        const modalEl = document.getElementById("modalXoaSanPham");
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      },

      // Xác nhận và thực hiện xóa sản phẩm
      async confirmDeleteProduct() {
        if (!this.productToDelete) {
          return;
        }

        this.isSubmitting = true;

        try {
          const res = await axios.post(
            `${this.apiBaseUrl}/admin/san-pham/delete`,
            { id: this.productToDelete },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          );

          if (res.data.status) {
            this.$toast?.success(res.data.message || "Đã xóa sản phẩm thành công!");
            
            // Đóng modal
            const modalEl = document.getElementById("modalXoaSanPham");
            if (modalEl) {
              const modal = bootstrap.Modal.getInstance(modalEl);
              if (modal) {
                modal.hide();
              }
            }
            
            // Reset data
            this.productToDelete = null;
            this.productToDeleteName = "";
            
            // Reload danh sách sản phẩm
            await this.loadSanPham();
          } else {
            this.$toast?.error(res.data.message || "Không thể xóa sản phẩm");
          }
        } catch (err) {
          console.error("Lỗi confirmDeleteProduct:", err);
          const errorMsg = err.response?.data?.message || "Không thể xóa sản phẩm";
          this.$toast?.error(errorMsg);
        } finally {
          this.isSubmitting = false;
        }
      },

      // Thay đổi trạng thái sản phẩm (toggle ẩn/hiện) - không reload trang
      async changeStatus(id, currentStatus) {
        const newStatus = currentStatus === 1 ? 0 : 1;
        const statusText = newStatus === 1 ? "hiển thị" : "ẩn";

        // Tìm sản phẩm trong list để cập nhật UI ngay lập tức (optimistic update)
        const productIndex = this.listSanPham.findIndex(sp => sp.id === id);
        const filteredIndex = this.filteredList.findIndex(sp => sp.id === id);
        
        // Cập nhật UI ngay lập tức cho cả listSanPham và filteredList
        if (productIndex !== -1) {
          this.listSanPham[productIndex].tinh_trang = newStatus;
        }
        if (filteredIndex !== -1) {
          this.filteredList[filteredIndex].tinh_trang = newStatus;
        }

        try {
          const res = await axios.post(
            `${this.apiBaseUrl}/admin/san-pham/change-status`,
            { id: id, tinh_trang: newStatus },
            {
              headers: { Authorization: "Bearer " + this.token },
            }
          );

          if (res.data.status) {
            this.$toast?.success(res.data.message || `Đã ${statusText} sản phẩm thành công!`);
            // Không reload trang, chỉ cập nhật UI đã làm ở trên
          } else {
            // Nếu lỗi, revert lại trạng thái cũ
            if (productIndex !== -1) {
              this.listSanPham[productIndex].tinh_trang = currentStatus;
            }
            if (filteredIndex !== -1) {
              this.filteredList[filteredIndex].tinh_trang = currentStatus;
            }
            this.$toast?.error(res.data.message || "Không thể thay đổi trạng thái");
          }
        } catch (err) {
          console.error("Lỗi changeStatus:", err);
          // Nếu lỗi, revert lại trạng thái cũ
          if (productIndex !== -1) {
            this.listSanPham[productIndex].tinh_trang = currentStatus;
          }
          if (filteredIndex !== -1) {
            this.filteredList[filteredIndex].tinh_trang = currentStatus;
          }
          const errorMsg = err.response?.data?.message || "Không thể thay đổi trạng thái";
          this.$toast?.error(errorMsg);
        }
      },

      // Cập nhật sản phẩm (mở modal chỉnh sửa)
      editProduct(product) {
        // Load thông tin sản phẩm vào form
        this.tenSP = product.ten_san_pham || "";
        this.slugSP = product.slug_san_pham || "";
        this.moTa = product.mo_ta || "";
        this.danhMuc = product.id_danh_muc || "";
        
        // Load hình ảnh hiện có
        this.previews = [];
        if (product.danh_sach_hinh_anh && Array.isArray(product.danh_sach_hinh_anh)) {
          product.danh_sach_hinh_anh.forEach(img => {
            this.previews.push({
              url: img,
              preview: img,
              isExisting: true
            });
          });
        } else if (product.hinh_anh) {
          this.previews.push({
            url: product.hinh_anh,
            preview: product.hinh_anh,
            isExisting: true
          });
        }
        
        // Load biến thể
        this.variants = [];
        if (product.bien_the && Array.isArray(product.bien_the)) {
          product.bien_the.forEach(bt => {
            this.variants.push({
              size: bt.size || "",
              mau_sac: bt.mau_sac || "",
              so_luong: bt.so_luong || 0,
              gia: bt.gia || 0,
              id: bt.id || null
            });
          });
        }
        
        // Lưu ID sản phẩm để update
        this.editingProductId = product.id;
        
        // Mở modal
        const modalEl = document.getElementById("modalSanPham");
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      },

      // Xem chi tiết sản phẩm
      viewProductDetail(product) {
        this.selectedProduct = product;
        const modalEl = document.getElementById("modalChiTietSanPham");
        if (modalEl) {
          const modal = new bootstrap.Modal(modalEl);
          modal.show();
        }
      },

      // Format giá tiền
      formatPrice(price) {
        if (!price && price !== 0) return "0 ₫";
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
      },

      // Rút gọn text
      truncateText(text, maxLength) {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
      },

      // Xử lý URL hình ảnh từ backend
      getImageUrl(url) {
        if (!url || url === "") {
          // Trả về một data URI placeholder đơn giản (hình vuông màu xám)
          return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
        }
        
        // Nếu đã là URL đầy đủ (http/https)
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }
        
        // Nếu là đường dẫn relative từ storage
        if (url.startsWith("/storage")) {
          return `${this.apiBaseUrl.replace("/api", "")}${url}`;
        }
        
        // Trường hợp khác, thử thêm base URL
        if (!url.startsWith("/")) {
          return `${this.apiBaseUrl.replace("/api", "")}/storage/${url}`;
        }
        
        return `${this.apiBaseUrl.replace("/api", "")}${url}`;
      },
      
      // Xử lý lỗi hình ảnh
      handleImageError(event) {
        // Kiểm tra xem đã set placeholder chưa để tránh lặp vô hạn
        if (event.target.src && event.target.src.startsWith('data:image/svg+xml')) {
          return; // Đã là placeholder rồi, không làm gì nữa
        }
        
        // Tạo một placeholder SVG đơn giản khi hình ảnh lỗi
        const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
        event.target.src = placeholderSvg;
        // Ngăn không cho lặp lại lỗi
        event.target.onerror = null;
      },

      // Image input helpers
      triggerFileInput() {
        
        
        // Thử nhiều cách để trigger file input
        // Cách 1: Sử dụng ref trực tiếp
        const refInput = this.$refs.fileInput;
        if (refInput) {
          const input = Array.isArray(refInput) ? refInput[0] : refInput;
          if (input && typeof input.click === 'function') {
            input.click();
            return;
          }
        }
        
        // Cách 2: Sử dụng getElementById
        const fileInput = document.getElementById('fileInputProduct');
        if (fileInput) {
          fileInput.click();
          return;
        }
        
        // Cách 3: Tìm input trong component
        const inputs = document.querySelectorAll('input[type="file"]');
        
        if (inputs.length > 0) {
          // Tìm input có id hoặc ref phù hợp
          for (let input of inputs) {
            if (input.id === 'fileInputProduct' || input.getAttribute('ref') === 'fileInput') {
              input.click();
              return;
            }
          }
          // Nếu không tìm thấy, click input đầu tiên
          inputs[0].click();
          return;
        }
        
        console.error("Could not find file input!");
        this.$toast?.error("Không thể mở file picker. Vui lòng thử lại.");
      },

      handleFileUpload(event) {
        
        
        if (!event || !event.target) {
          console.error("Invalid event object");
          return;
        }
        
        const files = Array.from(event.target.files || []);
        
        
        if (files.length === 0) {
          console.warn("No files selected");
          this.$toast?.warning("Không có file nào được chọn");
          return;
        }
        
        const maxFiles = 10;
        const maxSize = 2 * 1024 * 1024; // 2MB

        
        if (this.previews.length + files.length > maxFiles) {
          this.$toast?.error(`Chỉ được upload tối đa ${maxFiles} hình ảnh`);
          event.target.value = "";
          return;
        }

        let processedCount = 0;
        let errorCount = 0;
        
        files.forEach((file, index) => {
          
          
          // Kiểm tra kích thước file
          if (file.size > maxSize) {
            console.warn(`File too large: ${file.name}`);
            this.$toast?.error(`Hình ảnh "${file.name}" vượt quá 2MB`);
            errorCount++;
            return;
          }

          // Kiểm tra định dạng
          if (!file.type.startsWith("image/")) {
            console.warn(`Not an image: ${file.name}`);
            this.$toast?.error(`File "${file.name}" không phải là hình ảnh`);
            errorCount++;
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            const previewData = { 
              file, 
              preview: e.target.result,
              isExisting: false 
            };
            
            // Sử dụng spread operator để trigger reactivity
            this.previews = [...this.previews, previewData];
            
            processedCount++;
            
            // Force Vue reactivity update
            this.$nextTick(() => {
              this.$forceUpdate();
            });
          };
          reader.onerror = (error) => {
            console.error(`Error reading file: ${file.name}`, error);
            this.$toast?.error(`Lỗi khi đọc file "${file.name}"`);
            errorCount++;
          };
          reader.readAsDataURL(file);
        });

        // Reset input để có thể chọn lại cùng file
        event.target.value = "";
        
        
        if (processedCount > 0) {
          this.$toast?.success(`Đã thêm ${processedCount} hình ảnh`);
        }
      },
      
      // Format size: chuyển chữ thường thành chữ in hoa
      formatSize(size) {
        if (!size || typeof size !== 'string') return size;
        // Tách các size bằng dấu phẩy, trim và chuyển thành chữ in hoa
        return size.split(',').map(s => s.trim().toUpperCase()).join(', ');
      },
      
      // Format màu sắc: viết hoa chữ cái đầu sau dấu phẩy hoặc dấu cách
      formatColor(color) {
        if (!color || typeof color !== 'string') return color;
        // Tách các màu bằng dấu phẩy
        return color.split(',').map(c => {
          // Trim và viết hoa chữ cái đầu của mỗi từ
          return c.trim().split(/\s+/).map(word => {
            if (word.length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }).join(' ');
        }).join(', ');
      },

      removeImage(index) {
        // Nếu đang edit và có ít nhất 1 hình ảnh, không cho xóa hết
        if (this.editingProductId && this.previews.length === 1) {
          this.$toast?.warning("Sản phẩm phải có ít nhất một hình ảnh");
          return;
        }
        this.previews = this.previews.filter((_, i) => i !== index);
      },

      // Variants management
      addVariant() {
        this.variants.push({ size: "", mau_sac: "", so_luong: 1, gia: 0 });
      },

      removeVariant(index) {
        if (this.variants.length <= 1) {
          this.$toast?.error("Phải có ít nhất một biến thể sản phẩm");
          return;
        }
        this.variants.splice(index, 1);
      },

      // Validate variant
      validateVariant(variant, index) {
        if (!variant.size && !variant.mau_sac) {
          return `Biến thể ${index + 1}: Phải có ít nhất size hoặc màu sắc`;
        }
        if (!variant.so_luong || variant.so_luong < 0) {
          return `Biến thể ${index + 1}: Số lượng không hợp lệ`;
        }
        if (!variant.gia || variant.gia < 0) {
          return `Biến thể ${index + 1}: Giá không hợp lệ`;
        }
        return null;
      },

      // Load danh mục
      async loadDanhMuc() {
        try {
          const res = await axios.get(`${this.apiBaseUrl}/admin/danh-muc/data-open`, {
            headers: { Authorization: "Bearer " + this.token },
          });
          
          console.log("Response danh mục:", res.data);
          
          // API trả về { data: [...] } không có status
          if (res.data && res.data.data) {
            this.list_danh_muc = Array.isArray(res.data.data) ? res.data.data : [];
            console.log("Đã load được", this.list_danh_muc.length, "danh mục");
          } 
          // Trường hợp data là array trực tiếp
          else if (Array.isArray(res.data)) {
            this.list_danh_muc = res.data;
            console.log("Đã load được", this.list_danh_muc.length, "danh mục (array trực tiếp)");
          }
          else {
            console.warn("Không có dữ liệu danh mục:", res.data);
            this.list_danh_muc = [];
          }
        } catch (err) {
          console.error("Lỗi loadDanhMuc:", err);
          console.error("Chi tiết lỗi:", err.response?.data);
          const errorMsg = err.response?.data?.message || err.message || "Không thể tải danh mục";
          this.$toast?.error(errorMsg);
          this.list_danh_muc = [];
        }
      },

      // Submit form (tạo sản phẩm mới)
      async submitForm() {
        // Validation
        if (!this.tenSP || !this.tenSP.trim()) {
          this.$toast?.error("Vui lòng nhập tên sản phẩm");
          return;
        }

        if (!this.danhMuc) {
          this.$toast?.error("Vui lòng chọn danh mục");
          return;
        }

        if (!this.variants || this.variants.length === 0) {
          this.$toast?.error("Vui lòng thêm ít nhất một biến thể sản phẩm");
          return;
        }

        // Validate từng biến thể
        for (let i = 0; i < this.variants.length; i++) {
          const error = this.validateVariant(this.variants[i], i);
          if (error) {
            this.$toast?.error(error);
            return;
          }
        }

        if (this.isSubmitting) return;
        this.isSubmitting = true;

        try {
          // Format variants: size thành chữ in hoa, màu sắc viết hoa chữ cái đầu
          const formattedVariants = this.variants.map(variant => ({
            ...variant,
            size: variant.size ? this.formatSize(variant.size) : variant.size,
            mau_sac: variant.mau_sac ? this.formatColor(variant.mau_sac) : variant.mau_sac
          }));
          
          const formData = new FormData();
          formData.append("ten_san_pham", this.tenSP.trim());
          if (this.slugSP && this.slugSP.trim()) {
            formData.append("slug_san_pham", this.slugSP.trim());
          }
          formData.append("mo_ta", (this.moTa || "").trim());
          formData.append("id_danh_muc", this.danhMuc);
          formData.append("tinh_trang", 1);
          formData.append("bien_the", JSON.stringify(formattedVariants));

          // Lấy tất cả URLs hình ảnh
          const imageUrls = this.previews
            .filter(p => p.url || p.preview)
            .map(p => p.url || p.preview);
          
          console.log("Image URLs to send:", imageUrls.length);
          
          if (imageUrls.length === 0 && !this.editingProductId) {
            this.$toast?.error("Vui lòng thêm ít nhất một hình ảnh sản phẩm");
            this.isSubmitting = false;
            return;
          }
          
          // Gửi danh sách URLs
          formData.append("hinh_anh_urls", JSON.stringify(imageUrls));
          
          // Nếu đang cập nhật, thêm ID
          if (this.editingProductId) {
            formData.append("id", this.editingProductId);
          }

          const url = this.editingProductId 
            ? `${this.apiBaseUrl}/admin/san-pham/update`
            : `${this.apiBaseUrl}/admin/dang-san-pham/create`;

          const res = await axios.post(
            url,
            formData,
            {
              headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (res.data.status) {
            this.$toast?.success(res.data.message || (this.editingProductId ? "Cập nhật sản phẩm thành công!" : "Đăng sản phẩm thành công!"));
            
            // Reset form và đóng modal
            this.resetForm();
            const modalEl = document.getElementById("modalSanPham");
            if (modalEl) {
              const modal = bootstrap.Modal.getInstance(modalEl);
              modal && modal.hide();
            }
            
            // Reload danh sách
            await this.loadSanPham();
          } else {
            this.$toast?.error(res.data.message || (this.editingProductId ? "Có lỗi khi cập nhật sản phẩm" : "Có lỗi khi đăng sản phẩm"));
          }
        } catch (err) {
          console.error("Lỗi submitForm:", err);
          const errorMsg = err.response?.data?.message || "Có lỗi khi đăng sản phẩm";
          this.$toast?.error(errorMsg);
        } finally {
          this.isSubmitting = false;
        }
      },
    },
  };
  </script>

  <style scoped>
  /* Page Header */
  .page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .page-title {
    color: #ffffff;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
  }
  .page-title i {
    color: #ffd700;
  }
  .page-subtitle {
    color: #f0f0f0;
    font-size: 0.95rem;
    margin: 0;
  }
  .page-subtitle i {
    color: #ffd700;
  }

  /* Search Card */
  .search-card {
    border-radius: 12px;
    border: 1px solid #e9ecef;
  }
  .search-card .input-group-text {
    border-radius: 8px 0 0 8px;
  }
  .search-card .form-control {
    border-radius: 0 8px 8px 0;
  }
  .search-card .form-control:focus {
    box-shadow: none;
    border-color: #667eea;
  }

  /* Product Table */
  .product-table {
    font-size: 0.95rem;
  }
  .table-header {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  .table-header th {
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #495057;
    padding: 1rem 0.75rem;
    border-bottom: 2px solid #dee2e6;
  }
  .product-row {
    transition: all 0.2s ease;
    border-bottom: 1px solid #f0f0f0;
  }
  .product-row:hover {
    background-color: #f8f9fa;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  .product-image-wrapper {
    display: inline-block;
    position: relative;
  }
  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #e9ecef;
  }
  .product-image:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
  .product-name {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  .product-description {
    font-size: 0.85rem;
    display: block;
    line-height: 1.4;
  }
  .price-range, .price-single {
    font-size: 0.95rem;
  }

  /* Status Toggle Button */
  .status-toggle-btn {
    min-width: 100px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .status-toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  .status-toggle-btn.btn-success {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  }
  .status-toggle-btn.btn-secondary {
    background: linear-gradient(135deg, #868e96 0%, #495057 100%);
  }

  /* Action Buttons */
  .action-buttons-wrapper {
    flex-wrap: nowrap !important;
    white-space: nowrap;
  }
  .action-btn {
    transition: all 0.2s ease;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 36px;
    padding: 0.375rem 0.5rem;
    flex-shrink: 0;
  }
  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  .action-btn.btn-info {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  .action-btn.btn-warning {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }
  .action-btn.btn-danger {
    background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
    color: white;
  }

  /* Empty State */
  .empty-state {
    background: #f8f9fa;
  }
  .empty-state-content {
    padding: 3rem 1rem;
  }
  .empty-state-text h5 {
    font-weight: 600;
  }

  /* Badge Styles */
  .badge {
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
  }
  
  /* Category Badge - Màu xanh dương */
  .category-badge {
    background: linear-gradient(135deg, #0dcaf0 0%, #0d6efd 100%);
    color: white;
    font-weight: 600;
    border: none;
    box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
  }
  
  /* Quantity Badge - Màu xanh lá */
  .quantity-badge {
    background: linear-gradient(135deg, #20c997 0%, #198754 100%);
    color: white;
    font-weight: 600;
    border: none;
    box-shadow: 0 2px 4px rgba(25, 135, 84, 0.3);
  }
  
  /* Variant Badge - Màu cam/vàng */
  .variant-badge {
    background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
    color: #212529;
    font-weight: 600;
    border: none;
    box-shadow: 0 2px 4px rgba(255, 193, 7, 0.3);
  }

  /* Image Upload Box */
  .add-image-box {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #ffc107;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  .add-image-box:hover {
    background-color: #fffbf0;
    border-color: #ff9800;
    transform: scale(1.05);
  }

  /* Variant Box */
  .variant-box {
    border: 1px solid #dee2e6;
    padding: 15px;
    border-radius: 8px;
    background: #f8f9fa;
    transition: all 0.3s ease;
  }
  .variant-box:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-color: #0d6efd;
  }

  /* Card Styles */
  .card {
    border-radius: 12px;
    overflow: hidden;
  }
  .card-header {
    border-radius: 12px 12px 0 0 !important;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .page-header {
      padding: 1.5rem;
    }
    .page-title {
      font-size: 1.5rem;
    }
    .product-image {
      width: 60px;
      height: 60px;
    }
  }
  </style>

