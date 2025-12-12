<template>
  <div class="product-detail-page">
    <div class="container py-4">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4"> <ol class="breadcrumb"> <li class="breadcrumb-item"> <router-link to="/">Trang chủ</router-link> </li> <li class="breadcrumb-item"> <a href="#" @click.prevent="filterByCategory">{{ chi_tiet_san_pham.ten_danh_muc }}</a> </li> <li class="breadcrumb-item active" aria-current="page">{{ chi_tiet_san_pham.ten_san_pham }}</li> </ol> </nav>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="text-muted">Đang tải thông tin sản phẩm...</p>
      </div>

      <!-- Product Detail -->
      <div v-else-if="chi_tiet_san_pham.id" class="product-detail-wrapper">
        <div class="row g-3">
          <!-- Images Section -->
          <div class="col-lg-4">
            <div class="product-images-card">
              <!-- Main Image - Full Card -->
              <div class="main-image-wrapper">
                <div class="main-image-container">
                  <img 
                    :src="getImageUrl(currentImage)" 
                    :alt="chi_tiet_san_pham.ten_san_pham"
                    class="main-image"
                    @error="handleImageError($event)"
                  />
                </div>
              </div>
              
              <!-- Thumbnail Images - Below main image -->
              <div class="thumbnail-gallery-wrapper" v-if="chi_tiet_san_pham.hinh_anh && chi_tiet_san_pham.hinh_anh.length > 1">
                <div class="thumbnail-gallery">
                  <div 
                    v-for="(img, index) in chi_tiet_san_pham.hinh_anh" 
                    :key="index"
                    class="thumbnail-item"
                    :class="{ active: currentImage === img }"
                    @click="currentImage = img"
                  >
                    <img :src="getImageUrl(img)" :alt="`Hình ${index + 1}`" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Info Section -->
          <div class="col-lg-8">
            <div class="product-info-card shopee-style">

              <!-- Product Title -->
              <h1 class="product-title-shopee">{{ chi_tiet_san_pham.ten_san_pham }}</h1>

              <!-- Rating -->
              <div class="product-rating-shopee mb-3">
                <div class="stars-shopee">
                  <i class="fa-solid fa-star text-warning" v-for="i in 5" :key="i"></i>
                </div>
                <span class="rating-text-shopee ms-2">1k Đánh Giá</span>
              </div>

              <!-- Price Section Shopee Style -->
              <div class="product-price-section-shopee mb-3">
                <div v-if="chi_tiet_san_pham.gia_thap_nhat && chi_tiet_san_pham.gia_cao_nhat">
                  <div class="price-current-shopee">
                    {{ formatPrice(chi_tiet_san_pham.gia_thap_nhat) }}
                    <span v-if="chi_tiet_san_pham.gia_thap_nhat !== chi_tiet_san_pham.gia_cao_nhat" class="price-range-shopee">
                      - {{ formatPrice(chi_tiet_san_pham.gia_cao_nhat) }}
                    </span>
                  </div>
                  <div class="price-original-shopee" v-if="chi_tiet_san_pham.gia_co_ban && chi_tiet_san_pham.gia_co_ban > chi_tiet_san_pham.gia_thap_nhat">
                    {{ formatPrice(chi_tiet_san_pham.gia_co_ban) }}
                  </div>
                  <span class="discount-badge-shopee" v-if="chi_tiet_san_pham.gia_co_ban && chi_tiet_san_pham.gia_co_ban > chi_tiet_san_pham.gia_thap_nhat">
                    -{{ Math.round(((chi_tiet_san_pham.gia_co_ban - chi_tiet_san_pham.gia_thap_nhat) / chi_tiet_san_pham.gia_co_ban) * 100) }}%
                  </span>
                </div>
                <div v-else-if="chi_tiet_san_pham.gia_co_ban">
                  <div class="price-current-shopee">{{ formatPrice(chi_tiet_san_pham.gia_co_ban) }}</div>
                </div>
                <div v-else>
                  <div class="price-current-shopee">Liên hệ để biết giá</div>
                </div>
              </div>

              <!-- Variants Selection Shopee Style -->
              <div class="variants-section-shopee">
                <div class="variant-title-shopee mb-2">Phân Loại</div>
                
                <!-- Size Selection -->
                <div class="variant-group-shopee mb-3" v-if="splitSizes && splitSizes.length > 0">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class="variant-label-shopee">Kích thước:</div>
                    <button 
                      class="btn btn-outline-primary btn-sm" 
                      data-bs-toggle="modal"
                      data-bs-target="#choseSize"
                      type="button"
                    >
                      <i class="fa-solid fa-ruler me-1"></i>Hướng dẫn chọn size
                    </button>
                  </div>
                  <div class="variant-buttons-shopee">
                    <button 
                      type="button" 
                      class="variant-btn-shopee"
                      :class="{ 'variant-btn-active': selectedSize === size }"
                      v-for="(size, index) in splitSizes" 
                      :key="index"
                      @click="selectedSize = size"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <!-- Color Selection -->
                <div class="variant-group-shopee mb-3" v-if="splitColors && splitColors.length > 0">
                  <div class="variant-buttons-shopee">
                    <button 
                      type="button" 
                      class="variant-btn-shopee"
                      :class="{ 'variant-btn-active': selectedColor === color }"
                      v-for="(color, index) in splitColors" 
                      :key="index"
                      @click="selectedColor = color"
                    >
                      {{ color.trim() }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Quantity Selection Shopee Style -->
              <div class="quantity-section-shopee mb-4">
                <div class="quantity-title-shopee mb-2">Số Lượng</div>
                <div class="quantity-control-shopee">
                  <button 
                    class="quantity-btn-shopee" 
                    @click="decreaseQuantity"
                    :disabled="quantity <= 1"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <input 
                    type="number" 
                    class="quantity-input-shopee" 
                    v-model.number="quantity"
                    min="1"
                    :max="chi_tiet_san_pham.tong_sl_ton || 999"
                  />
                  <button 
                    class="quantity-btn-shopee" 
                    @click="increaseQuantity"
                    :disabled="quantity >= (chi_tiet_san_pham.tong_sl_ton || 999)"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Action Buttons Shopee Style -->
              <div class="action-buttons-shopee">
                <button 
                  class="btn-add-cart-shopee"
                  @click="addToCart"
                  :disabled="!chi_tiet_san_pham.id || isLoading || (!chi_tiet_san_pham.tong_sl_ton || chi_tiet_san_pham.tong_sl_ton <= 0)"
                >
                  <i class="fa-solid fa-cart-shopping me-2"></i>
                  Thêm Vào Giỏ Hàng
                </button>
                <button 
                  class="btn-buy-now-shopee"
                  @click="buyNow"
                  :disabled="!chi_tiet_san_pham.id || isLoading || (!chi_tiet_san_pham.tong_sl_ton || chi_tiet_san_pham.tong_sl_ton <= 0)"
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="product-description-section mt-4">
          <div class="card">
            <div class="card-header bg-white">
              <ul class="nav nav-tabs card-header-tabs" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#description" type="button">
                    <i class="fa-solid fa-file-lines me-2"></i>Mô tả sản phẩm
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#specs" type="button">
                    <i class="fa-solid fa-list-check me-2"></i>Thông số kỹ thuật
                  </button>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane fade show active" id="description" role="tabpanel">
                  <div v-if="chi_tiet_san_pham.mo_ta" class="description-content">
                    <p>{{ chi_tiet_san_pham.mo_ta }}</p>
                  </div>
                  <div v-else class="text-muted">
                    <p>Chưa có mô tả cho sản phẩm này.</p>
                  </div>
                </div>
                <div class="tab-pane fade" id="specs" role="tabpanel">
                  <div class="specs-content">
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td class="fw-bold" style="width: 200px;">Danh mục</td>
                          <td>{{ chi_tiet_san_pham.ten_danh_muc }}</td>
                        </tr>
                        <tr>
                          <td class="fw-bold">Tình trạng</td>
                          <td>
                            <span class="badge bg-success" v-if="chi_tiet_san_pham.tong_sl_ton > 0">Còn hàng</span>
                            <span class="badge bg-danger" v-else>Hết hàng</span>
                          </td>
                        </tr>
                        <tr v-if="chi_tiet_san_pham.kich_thuoc_distinct && chi_tiet_san_pham.kich_thuoc_distinct.length > 0">
                          <td class="fw-bold">Kích thước có sẵn</td>
                          <td>{{ chi_tiet_san_pham.kich_thuoc_distinct.join(", ") }}</td>
                        </tr>
                        <tr v-if="chi_tiet_san_pham.mau_sac_distinct && chi_tiet_san_pham.mau_sac_distinct.length > 0">
                          <td class="fw-bold">Màu sắc có sẵn</td>
                          <td>{{ chi_tiet_san_pham.mau_sac_distinct.join(", ") }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-5">
        <div class="error-state">
          <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <h5 class="text-muted mb-3">Không tìm thấy sản phẩm</h5>
          <router-link to="/" class="btn btn-primary">
            <i class="fa-solid fa-arrow-left me-2"></i>Về trang chủ
          </router-link>
        </div>
      </div>

      <!-- Similar Products Section -->
      <div v-if="!isLoading && chi_tiet_san_pham.id && similarProducts.length > 0" class="similar-products-section mt-5">
        <div class="section-header mb-4">
          <h3 class="section-title">
            <i class="fa-solid fa-thumbs-up me-2 text-primary"></i>
            Sản phẩm tương tự
          </h3>
          <p class="section-subtitle text-muted">Các sản phẩm cùng danh mục bạn có thể quan tâm</p>
        </div>
        
        <div class="row g-1">
          <div 
            v-for="product in paginatedSimilarProducts" 
            :key="product.id"
            class="col-6 col-md-4 col-lg-2"
          >
            <div class="similar-product-card" @click="viewProductDetail(product)">
              <div class="product-image-wrapper">
                <img 
                  :src="getImageUrl(product.hinh_anh)" 
                  :alt="product.ten_san_pham"
                  class="product-image"
                  @error="handleImageError($event)"
                />
                <div class="product-overlay">
                  <button class="btn btn-light btn-sm">
                    <i class="fa-solid fa-eye me-1"></i>Xem ngay
                  </button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category-small">{{ product.ten_danh_muc }}</div>
                <h6 class="product-name">{{ product.ten_san_pham }}</h6>
                <div class="product-price-small">
                  <span v-if="product.gia_thap_nhat && product.gia_cao_nhat">
                    {{ formatPrice(product.gia_thap_nhat) }}
                    <span v-if="product.gia_thap_nhat !== product.gia_cao_nhat">
                      - {{ formatPrice(product.gia_cao_nhat) }}
                    </span>
                  </span>
                  <span v-else-if="product.gia_co_ban">
                    {{ formatPrice(product.gia_co_ban) }}
                  </span>
                  <span v-else class="text-muted">Liên hệ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination for Similar Products -->
        <div class="pagination-wrapper mt-4" v-if="totalSimilarPages > 1">
          <nav aria-label="Similar products pagination">
            <ul class="pagination justify-content-center mb-0">
              <li class="page-item" :class="{ disabled: similarProductsPage === 1 }">
                <button class="page-link" @click="prevSimilarPage" :disabled="similarProductsPage === 1">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
              </li>
              <li 
                v-for="page in visibleSimilarPages" 
                :key="page"
                class="page-item"
                :class="{ active: page === similarProductsPage }"
              >
                <button class="page-link" @click="goToSimilarPage(page)">
                  {{ page }}
                </button>
              </li>
              <li class="page-item" :class="{ disabled: similarProductsPage === totalSimilarPages }">
                <button class="page-link" @click="nextSimilarPage" :disabled="similarProductsPage === totalSimilarPages">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal Hướng dẫn chọn size -->
    <div class="modal fade" id="choseSize" tabindex="-1" aria-labelledby="choseSizeLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="choseSizeLabel">
              <i class="fa-solid fa-ruler me-2"></i>
              Hướng dẫn chọn size
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="mb-3">
              Nếu bạn băn khoăn không biết chọn size nào cho phù hợp với cân nặng và chiều cao của mình, 
              đừng lo lắng! Hãy xem bảng hướng dẫn chọn size bên dưới mà 
              <span class="text-danger fw-bold">Shop</span> tư vấn riêng dành cho bạn.
            </p>
            <div class="text-center mb-3">
              <img
                src="https://4menshop.com/images/2025/02/20250225_942b24227803333462ad0a836de59c55_1740467669.png"
                class="img-fluid rounded mb-3"
                alt="Hướng dẫn chọn size - 1"
              />
              <img
                src="https://4menshop.com/images/2025/02/20250225_ce158bd0367fb835c4126585331a7c66_1740467669.png"
                class="img-fluid rounded mb-3"
                alt="Hướng dẫn chọn size - 2"
              />
              <img
                src="https://4menshop.com/images/2016/12/20161226_ac1f530b18a20a327758473fa4930fc7_1482759836.jpg"
                class="img-fluid rounded"
                alt="Hướng dẫn chọn size - 3"
              />
            </div>
            <div class="alert alert-info mt-3">
              <p class="mb-0">
                <strong>Lưu ý:</strong> Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa trên kinh nghiệm nhiều năm 
                của Shop theo khảo sát nhu cầu sở thích của khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có những trường hợp 
                ngoại lệ phụ thuộc theo vóc dáng, sở thích của từng người. Ví dụ có người thích mặc ôm, có người thích mặc rộng...
              </p>
              <p class="mb-0 mt-2">
                Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải đáp? Hãy liên hệ ngay với Bộ phận 
                Chăm sóc khách hàng của Shop qua Hotline <strong class="text-danger">(09)99 90 999</strong> để được hỗ trợ thêm.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emitter from "@/eventBus";

export default {
  name: "ChiTietSanPham",
  data() {
    return {
      chi_tiet_san_pham: {
        id: null,
        ten_san_pham: "",
        mo_ta: "",
        gia_co_ban: 0,
        gia_thap_nhat: 0,
        gia_cao_nhat: 0,
        ten_danh_muc: "",
        id_danh_muc: null,
        tong_sl_ton: 0,
        hinh_anh: [],
        kich_thuoc_distinct: [],
        mau_sac_distinct: [],
        bien_the: [],
      },
      similarProducts: [],
      similarProductsPage: 1,
      similarProductsPerPage: 6,
      currentImage: "",
      selectedSize: "",
      selectedColor: "",
      quantity: 1,
      isLoading: false,
      apiBaseUrl: "http://127.0.0.1:8000/api",
    };
  },
  computed: {
    // Tách các kích thước có dấu phẩy thành các size riêng biệt
    splitSizes() {
      if (!this.chi_tiet_san_pham.kich_thuoc_distinct || 
          !Array.isArray(this.chi_tiet_san_pham.kich_thuoc_distinct) || 
          this.chi_tiet_san_pham.kich_thuoc_distinct.length === 0) {
        return [];
      }
      
      const allSizes = [];
      this.chi_tiet_san_pham.kich_thuoc_distinct.forEach(sizeString => {
        if (sizeString && typeof sizeString === 'string') {
          // Tách các size được phân cách bởi dấu phẩy
          const sizes = sizeString.split(',').map(s => s.trim()).filter(s => s.length > 0);
          allSizes.push(...sizes);
        }
      });
      
      // Loại bỏ các size trùng lặp và giữ nguyên thứ tự
      const uniqueSizes = [];
      allSizes.forEach(size => {
        if (!uniqueSizes.includes(size)) {
          uniqueSizes.push(size);
        }
      });
      
      return uniqueSizes;
    },
    
    // Tách các màu sắc có dấu phẩy thành các màu riêng biệt
    splitColors() {
      if (!this.chi_tiet_san_pham.mau_sac_distinct || 
          !Array.isArray(this.chi_tiet_san_pham.mau_sac_distinct) || 
          this.chi_tiet_san_pham.mau_sac_distinct.length === 0) {
        return [];
      }
      
      const allColors = [];
      this.chi_tiet_san_pham.mau_sac_distinct.forEach(colorString => {
        if (colorString && typeof colorString === 'string') {
          // Tách các màu được phân cách bởi dấu phẩy
          const colors = colorString.split(',').map(c => c.trim()).filter(c => c.length > 0);
          allColors.push(...colors);
        }
      });
      
      // Loại bỏ các màu trùng lặp và giữ nguyên thứ tự
      const uniqueColors = [];
      allColors.forEach(color => {
        if (!uniqueColors.includes(color)) {
          uniqueColors.push(color);
        }
      });
      
      return uniqueColors;
    },
    
    paginatedSimilarProducts() {
      const start = (this.similarProductsPage - 1) * this.similarProductsPerPage;
      const end = start + this.similarProductsPerPage;
      return this.similarProducts.slice(start, end);
    },
    totalSimilarPages() {
      return Math.ceil(this.similarProducts.length / this.similarProductsPerPage);
    },
    visibleSimilarPages() {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, this.similarProductsPage - 2);
      let endPage = Math.min(this.totalSimilarPages, this.similarProductsPage + 2);

      if (this.totalSimilarPages <= maxVisiblePages) {
        for (let i = 1; i <= this.totalSimilarPages; i++) {
          pages.push(i);
        }
      } else {
        if (this.similarProductsPage <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
        } else if (this.similarProductsPage >= this.totalSimilarPages - 2) {
          for (let i = this.totalSimilarPages - 4; i <= this.totalSimilarPages; i++) {
            pages.push(i);
          }
        } else {
          for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
          }
        }
      }
      return pages;
    },
    canAddToCart() {
      // Kiểm tra sản phẩm đã load chưa
      if (!this.chi_tiet_san_pham || !this.chi_tiet_san_pham.id) {
        return false;
      }

      // Kiểm tra tồn kho
      const tongSlTon = this.chi_tiet_san_pham.tong_sl_ton;
      if (!tongSlTon || tongSlTon <= 0) {
        return false;
      }

      // Kiểm tra size: chỉ yêu cầu chọn khi có nhiều hơn 1 lựa chọn
      const kichThuocList = this.chi_tiet_san_pham.kich_thuoc_distinct;
      const hasSizes = kichThuocList && 
                       Array.isArray(kichThuocList) && 
                       kichThuocList.length > 0;
      const hasMultipleSizes = hasSizes && kichThuocList.length > 1;
      
      // Chỉ yêu cầu chọn khi có nhiều hơn 1 size
      if (hasMultipleSizes && !this.selectedSize) {
        return false;
      }

      // Kiểm tra color: chỉ yêu cầu chọn khi có nhiều hơn 1 lựa chọn
      const hasMultipleColors = this.splitColors && this.splitColors.length > 1;
      
      // Chỉ yêu cầu chọn khi có nhiều hơn 1 màu
      if (hasMultipleColors && !this.selectedColor) {
        return false;
      }

      // Tất cả điều kiện đều thỏa mãn
      return true;
    },
  },
  mounted() {
    this.scrollToTop();
    this.loadChiTietSanPham();
  },
  watch: {
    "$route.params.slug"() {
      this.scrollToTop();
      this.loadChiTietSanPham();
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async loadChiTietSanPham() {
      const productSlug = this.$route.params.slug;
      if (!productSlug) return;

      this.isLoading = true;
      // Reset selections khi load sản phẩm mới
      this.selectedSize = "";
      this.selectedColor = "";
      this.quantity = 1;
      
      try {
        const res = await axios.get(
          `${this.apiBaseUrl}/home-page/san-pham/chi-tiet-san-pham/${productSlug}`
        );

        if (res.data && res.data.status && res.data.data) {
          this.chi_tiet_san_pham = res.data.data;
          
          // Nếu URL hiện tại là ID (số) và sản phẩm có slug, redirect sang slug
          if (/^\d+$/.test(productSlug) && this.chi_tiet_san_pham.slug_san_pham) {
            this.$router.replace(`/chi-tiet-san-pham/${this.chi_tiet_san_pham.slug_san_pham}`);
            return;
          }
          
          // Set current image
          if (this.chi_tiet_san_pham.hinh_anh && this.chi_tiet_san_pham.hinh_anh.length > 0) {
            this.currentImage = this.chi_tiet_san_pham.hinh_anh[0];
          }

          // Tự động chọn size và màu đầu tiên nếu chỉ có 1 lựa chọn (sau khi tách)
          // Sử dụng $nextTick để đảm bảo computed property đã được tính toán
          this.$nextTick(() => {
            if (this.splitSizes && this.splitSizes.length === 1) {
              this.selectedSize = this.splitSizes[0];
            }
            if (this.splitColors && this.splitColors.length === 1) {
              this.selectedColor = this.splitColors[0];
            }
          });

          // Load similar products
          if (this.chi_tiet_san_pham.id_danh_muc) {
            this.loadSimilarProducts();
          }
        } else {
          this.$toast?.error("Không tìm thấy sản phẩm");
          this.$router.push("/");
        }
      } catch (err) {
        console.error("Lỗi loadChiTietSanPham:", err);
        this.$toast?.error("Không thể tải thông tin sản phẩm");
        this.$router.push("/");
      } finally {
        this.isLoading = false;
      }
    },

    async loadSimilarProducts() {
      try {
        const res = await axios.get(
          `${this.apiBaseUrl}/home-page/san-pham/cung-danh-muc`,
          {
            params: {
              id_danh_muc: this.chi_tiet_san_pham.id_danh_muc,
              id_san_pham: this.chi_tiet_san_pham.id,
            },
          }
        );

        if (res.data && res.data.status && res.data.data) {
          this.similarProducts = Array.isArray(res.data.data) ? res.data.data : [];
        }
      } catch (err) {
        console.error("Lỗi loadSimilarProducts:", err);
      }
    },

    increaseQuantity() {
      const max = this.chi_tiet_san_pham.tong_sl_ton || 999;
      if (this.quantity < max) {
        this.quantity++;
      }
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    async addToCart() {
      if (!this.canAddToCart) {
        // Kiểm tra chi tiết để hiển thị thông báo phù hợp
        if (!this.chi_tiet_san_pham || !this.chi_tiet_san_pham.id) {
          this.$toast?.error("Sản phẩm chưa được tải");
          return;
        }
        if (!this.chi_tiet_san_pham.tong_sl_ton || this.chi_tiet_san_pham.tong_sl_ton <= 0) {
          this.$toast?.error("Sản phẩm đã hết hàng");
          return;
        }
        const hasMultipleSizes = this.splitSizes && this.splitSizes.length > 1;
        if (hasMultipleSizes && !this.selectedSize) {
          this.$toast?.error("Vui lòng chọn kích thước");
          return;
        }
        const hasMultipleColors = this.splitColors && this.splitColors.length > 1;
        if (hasMultipleColors && !this.selectedColor) {
          this.$toast?.error("Vui lòng chọn màu sắc");
          return;
        }
        this.$toast?.error("Không thể thêm vào giỏ hàng");
        return;
      }

      const token = localStorage.getItem("token_khach_hang");
      if (!token) {
        this.$toast?.info("Vui lòng đăng nhập để thêm vào giỏ hàng");
        this.$router.push("/khach-hang/dang-nhap");
        return;
      }

      // Validate size và color chỉ khi có nhiều hơn 1 lựa chọn
      const hasMultipleSizes = this.chi_tiet_san_pham.kich_thuoc_distinct && 
                                Array.isArray(this.chi_tiet_san_pham.kich_thuoc_distinct) && 
                                this.chi_tiet_san_pham.kich_thuoc_distinct.length > 1;
      
      if (hasMultipleSizes && !this.selectedSize) {
        this.$toast?.error("Vui lòng chọn kích thước");
        return;
      }

      const hasMultipleColors = this.splitColors && this.splitColors.length > 1;
      
      if (hasMultipleColors && !this.selectedColor) {
        this.$toast?.error("Vui lòng chọn màu sắc");
        return;
      }

      // Validate số lượng
      if (this.quantity <= 0) {
        this.$toast?.error("Số lượng phải lớn hơn 0");
        return;
      }

      const maxQuantity = this.chi_tiet_san_pham.tong_sl_ton || 999;
      if (this.quantity > maxQuantity) {
        this.$toast?.error(`Số lượng vượt quá tồn kho (${maxQuantity})`);
        return;
      }

      // Chuẩn bị dữ liệu gửi lên server
      // Nếu không có biến thể, gửi giá trị mặc định
      let kichThuoc = this.selectedSize || "";
      let mauSac = this.selectedColor || "";
      
      // Nếu sản phẩm không có biến thể size, gửi giá trị mặc định
      if (!this.chi_tiet_san_pham.kich_thuoc_distinct || 
          !Array.isArray(this.chi_tiet_san_pham.kich_thuoc_distinct) || 
          this.chi_tiet_san_pham.kich_thuoc_distinct.length === 0) {
        kichThuoc = "Không có";
      }
      
      // Nếu sản phẩm không có biến thể màu, gửi giá trị mặc định
        if (!this.splitColors || this.splitColors.length === 0) {
          mauSac = "Không có";
        }

      const payload = {
        id_san_pham: this.chi_tiet_san_pham.id,
        so_luong: this.quantity,
        kich_thuoc: kichThuoc,
        mau_sac: mauSac,
        ghi_chu: null, // Có thể thêm ghi chú nếu cần
      };

      try {
        const response = await axios.post(
          `${this.apiBaseUrl}/khach-hang/them-don-hang`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status) {
          this.$toast?.success(response.data.message || "Đã thêm vào giỏ hàng thành công!");
          
          // Emit event để cập nhật giỏ hàng ở header
          emitter.emit("cap-nhat-gio-hang");
          
          // Reset quantity về 1 sau khi thêm thành công
          this.quantity = 1;
        } else {
          this.$toast?.error(response.data?.message || "Không thể thêm vào giỏ hàng");
        }
      } catch (error) {
        console.error("Lỗi khi thêm vào giỏ hàng:", error);
        
        // Xử lý lỗi validation
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          Object.values(errors).forEach((errorList) => {
            if (Array.isArray(errorList)) {
              errorList.forEach((err) => this.$toast?.error(err));
            }
          });
        } else {
          const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại!";
          this.$toast?.error(errorMessage);
        }
      }
    },

    async buyNow() {
      if (!this.canAddToCart) {
        // Kiểm tra chi tiết để hiển thị thông báo phù hợp
        if (!this.chi_tiet_san_pham || !this.chi_tiet_san_pham.id) {
          this.$toast?.error("Sản phẩm chưa được tải");
          return;
        }
        if (!this.chi_tiet_san_pham.tong_sl_ton || this.chi_tiet_san_pham.tong_sl_ton <= 0) {
          this.$toast?.error("Sản phẩm đã hết hàng");
          return;
        }
        const hasMultipleSizes = this.splitSizes && this.splitSizes.length > 1;
        if (hasMultipleSizes && !this.selectedSize) {
          this.$toast?.error("Vui lòng chọn kích thước");
          return;
        }
        const hasMultipleColors = this.splitColors && this.splitColors.length > 1;
        if (hasMultipleColors && !this.selectedColor) {
          this.$toast?.error("Vui lòng chọn màu sắc");
          return;
        }
        this.$toast?.error("Không thể mua hàng");
        return;
      }

      const token = localStorage.getItem("token_khach_hang");
      if (!token) {
        this.$toast?.info("Vui lòng đăng nhập để mua hàng");
        this.$router.push("/khach-hang/dang-nhap");
        return;
      }

      // Validate size và color chỉ khi có nhiều hơn 1 lựa chọn
      const hasMultipleSizes = this.chi_tiet_san_pham.kich_thuoc_distinct && 
                                Array.isArray(this.chi_tiet_san_pham.kich_thuoc_distinct) && 
                                this.chi_tiet_san_pham.kich_thuoc_distinct.length > 1;
      
      if (hasMultipleSizes && !this.selectedSize) {
        this.$toast?.error("Vui lòng chọn kích thước");
        return;
      }

      const hasMultipleColors = this.splitColors && this.splitColors.length > 1;
      
      if (hasMultipleColors && !this.selectedColor) {
        this.$toast?.error("Vui lòng chọn màu sắc");
        return;
      }

      // Validate số lượng
      if (this.quantity <= 0) {
        this.$toast?.error("Số lượng phải lớn hơn 0");
        return;
      }

      const maxQuantity = this.chi_tiet_san_pham.tong_sl_ton || 999;
      if (this.quantity > maxQuantity) {
        this.$toast?.error(`Số lượng vượt quá tồn kho (${maxQuantity})`);
        return;
      }

      // Mua ngay: Thêm vào giỏ hàng và chuyển đến trang thanh toán
      try {
        // Chuẩn bị dữ liệu giống như addToCart
        let kichThuoc = this.selectedSize || "";
        let mauSac = this.selectedColor || "";
        
        if (!this.chi_tiet_san_pham.kich_thuoc_distinct || 
            !Array.isArray(this.chi_tiet_san_pham.kich_thuoc_distinct) || 
            this.chi_tiet_san_pham.kich_thuoc_distinct.length === 0) {
          kichThuoc = "Không có";
        }
        
        if (!this.splitColors || this.splitColors.length === 0) {
          mauSac = "Không có";
        }

        const payload = {
          id_san_pham: this.chi_tiet_san_pham.id,
          so_luong: this.quantity,
          kich_thuoc: kichThuoc,
          mau_sac: mauSac,
          ghi_chu: null,
        };

        const response = await axios.post(
          `${this.apiBaseUrl}/khach-hang/them-don-hang`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status) {
          // Cập nhật giỏ hàng
          emitter.emit("cap-nhat-gio-hang");
          
          // Chuyển đến trang giỏ hàng để thanh toán
          this.$router.push("/don-hang");
        } else {
          this.$toast?.error(response.data?.message || "Không thể thêm vào giỏ hàng");
        }
      } catch (error) {
        console.error("Lỗi khi mua ngay:", error);
        
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          Object.values(errors).forEach((errorList) => {
            if (Array.isArray(errorList)) {
              errorList.forEach((err) => this.$toast?.error(err));
            }
          });
        } else {
          const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!";
          this.$toast?.error(errorMessage);
        }
      }
    },

    viewProductDetail(product) {
      // Sử dụng slug nếu có, nếu không thì dùng id (tương thích ngược)
      const slug = product.slug_san_pham || product.id;
      this.$router.push(`/chi-tiet-san-pham/${slug}`);
    },

    filterByCategory() {
      if (this.chi_tiet_san_pham.id_danh_muc) {
        this.$router.push({
          path: "/",
          query: { category: this.chi_tiet_san_pham.id_danh_muc },
        });
      }
    },

    formatPrice(price) {
      if (!price && price !== 0) return "0 ₫";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },

    getImageUrl(url) {
      if (!url || url === "") {
        // Trả về một data URI placeholder đơn giản (hình vuông màu xám)
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect width='600' height='600' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='18'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
      }
      
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      
      if (url.startsWith("/storage")) {
        return `${this.apiBaseUrl.replace("/api", "")}${url}`;
      }
      
      return `${this.apiBaseUrl.replace("/api", "")}/storage/${url}`;
    },

    handleImageError(event) {
      // Kiểm tra xem đã set placeholder chưa để tránh lặp vô hạn
      if (event.target.src && event.target.src.startsWith('data:image/svg+xml')) {
        return; // Đã là placeholder rồi, không làm gì nữa
      }
      
      // Tạo một placeholder SVG đơn giản khi hình ảnh lỗi
      const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='16'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
      event.target.src = placeholderSvg;
      // Ngăn không cho lặp lại lỗi
      event.target.onerror = null;
    },
    
    prevSimilarPage() {
      if (this.similarProductsPage > 1) {
        this.similarProductsPage--;
        this.scrollToSimilarProducts();
      }
    },
    
    nextSimilarPage() {
      if (this.similarProductsPage < this.totalSimilarPages) {
        this.similarProductsPage++;
        this.scrollToSimilarProducts();
      }
    },
    
    goToSimilarPage(page) {
      this.similarProductsPage = page;
      this.scrollToSimilarProducts();
    },
    
    scrollToSimilarProducts() {
      // Scroll đến phần sản phẩm tương tự
      const element = document.querySelector('.similar-products-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
  },
};
</script>

<style scoped>
.product-detail-page {
  min-height: 80vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
}


/* Product Images Card */
.product-images-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  height: fit-content;
}

.main-image-wrapper {
  margin-bottom: 1rem;
}

.main-image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  aspect-ratio: 1;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
}

.main-image-container:hover .main-image {
  transform: scale(1.05);
}

.thumbnail-gallery-wrapper {
  margin-top: 1rem;
}

.thumbnail-gallery {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
}

.thumbnail-item {
  width: 70px;
  height: 70px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.thumbnail-item:hover {
  border-color: #0d6efd;
  transform: translateY(-2px);
}

.thumbnail-item.active {
  border-color: #0d6efd;
  border-width: 2px;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Info Card */
.product-info-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Shopee Style */
.product-info-card.shopee-style {
  background: #fff;
  padding: 1.5rem;
  position: relative;
}

.product-title-shopee {
  font-size: 1.25rem;
  font-weight: 500;
  color: #212121;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.product-rating-shopee {
  display: flex;
  align-items: center;
}

.stars-shopee {
  font-size: 0.875rem;
}

.rating-text-shopee {
  font-size: 0.875rem;
  color: #767676;
  margin-left: 0.5rem;
}

/* Price Section Shopee */
.product-price-section-shopee {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.price-current-shopee {
  font-size: 1.875rem;
  font-weight: 500;
  color: #ee4d2d;
  line-height: 1.2;
}

.price-range-shopee {
  font-size: 1.25rem;
}

.price-original-shopee {
  font-size: 1rem;
  color: #929292;
  text-decoration: line-through;
  margin-left: 0.5rem;
}

.discount-badge-shopee {
  background: #ee4d2d;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 2px;
  margin-left: 0.5rem;
}

/* Variants Shopee Style */
.variants-section-shopee {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.variant-title-shopee {
  font-size: 0.875rem;
  font-weight: 500;
  color: #212121;
}

.variant-label-shopee {
  font-size: 0.875rem;
  font-weight: 500;
  color: #212121;
}

.variant-group-shopee {
  margin-bottom: 1rem;
}

.variant-buttons-shopee {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.variant-btn-shopee {
  min-width: 80px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: #212121;
  background: white;
  border: 1px solid #d5d5d5;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.variant-btn-shopee:hover {
  border-color: #ee4d2d;
  color: #ee4d2d;
}

.variant-btn-shopee.variant-btn-active {
  border-color: #ee4d2d;
  color: #ee4d2d;
  background: #fff5f1;
}

/* Quantity Shopee Style */
.quantity-section-shopee {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

.quantity-title-shopee {
  font-size: 0.875rem;
  font-weight: 500;
  color: #212121;
}

.quantity-control-shopee {
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid #d5d5d5;
  border-radius: 2px;
}

.quantity-btn-shopee {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: none;
  cursor: pointer;
  color: #212121;
  font-size: 0.875rem;
}

.quantity-btn-shopee:hover:not(:disabled) {
  background: #f5f5f5;
}

.quantity-btn-shopee:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input-shopee {
  width: 50px;
  height: 32px;
  text-align: center;
  border: none;
  border-left: 1px solid #d5d5d5;
  border-right: 1px solid #d5d5d5;
  font-size: 0.875rem;
  color: #212121;
}

.quantity-input-shopee:focus {
  outline: none;
}

/* Action Buttons Shopee Style */
.action-buttons-shopee {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn-add-cart-shopee {
  flex: 1;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ee4d2d;
  background: rgba(255, 87, 34, 0.1);
  border: 1px solid #ee4d2d;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-add-cart-shopee:hover:not(:disabled) {
  background: rgba(255, 87, 34, 0.15);
}

.btn-add-cart-shopee:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-buy-now-shopee {
  flex: 1;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background: #ee4d2d;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-buy-now-shopee:hover:not(:disabled) {
  background: #f05d40;
}

.btn-buy-now-shopee:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Description Section */
.product-description-section {
  margin-top: 2rem;
}

.card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: 2px solid #e9ecef;
  padding: 0;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.nav-tabs {
  border-bottom: none;
  margin-bottom: -2px;
}

.nav-tabs .nav-link {
  border: none;
  border-bottom: 3px solid transparent;
  color: #666;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s;
  margin-bottom: -2px;
}

.nav-tabs .nav-link:hover {
  border-bottom-color: #667eea;
  color: #667eea;
}

.nav-tabs .nav-link.active {
  border-bottom-color: #667eea;
  color: #667eea;
  background: transparent;
  position: relative;
  z-index: 1;
}

.description-content,
.specs-content {
  padding: 1rem 0;
}

.description-content p {
  line-height: 1.8;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.specs-content .table {
  margin: 0;
  font-size: 0.9rem;
}

.specs-content .table td {
  padding: 0.75rem;
  vertical-align: middle;
}

/* Similar Products Section */
.similar-products-section {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 2px solid #e9ecef;
}

.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 0.9rem;
}

.similar-product-card {
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.similar-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  padding-top: 100%; /* 1:1 Aspect Ratio */
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.similar-product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.similar-product-card:hover .product-overlay {
  opacity: 1;
}

.product-info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-category-small {
  font-size: 0.7rem;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}

.product-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.product-price-small {
  margin-top: auto;
  font-size: 0.9rem;
  font-weight: 700;
  color: #dc3545;
}

/* Responsive */
@media (max-width: 992px) {
  .product-images-card {
    position: static;
    margin-bottom: 2rem;
  }
  
  .product-info-card {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .product-title-shopee {
    font-size: 1.125rem;
  }
  
  .price-current-shopee {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
