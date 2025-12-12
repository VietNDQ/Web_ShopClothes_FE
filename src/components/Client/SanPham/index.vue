<template>
  <div class="products-page">
    <div class="container-fluid py-4">
      <!-- Header Section -->
      <div class="page-header mb-4">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h2 class="page-title mb-2">
              <i class="fa-solid fa-box me-2 text-primary"></i>
              Thời Trang Mới Nhất
            </h2>
            <p class="page-subtitle mb-0 text-muted">
              Khám phá bộ sưu tập sản phẩm đa dạng và phong phú
            </p>
          </div>
          <div class="col-lg-4 text-end">
            <button 
              class="btn btn-outline-primary" 
              data-bs-toggle="modal"
              data-bs-target="#choseSize"
            >
              <i class="fa-solid fa-ruler me-2"></i>Hướng dẫn chọn size
            </button>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Main Products Grid -->
        <div class="col-lg-9">
          <!-- Filters Bar -->
          <div class="filters-bar mb-4">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="d-flex align-items-center gap-3">
                  <span class="text-muted">Sắp xếp:</span>
                  <select class="form-select form-select-sm" style="max-width: 200px;" v-model="sortBy" @change="applySort">
                    <option value="newest">Mới nhất</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6 text-end">
                <span class="text-muted">
                  Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, listSanPham.length) }} 
                  trong tổng số {{ listSanPham.length }} sản phẩm ({{ totalPages }} trang)
                </span>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="row g-1">
            <div 
              v-for="product in paginatedSanPham" 
              :key="product.id"
              class="col-6 col-md-4 col-lg-3"
            >
              <div class="product-card" @click="viewProductDetail(product)">
                <div class="product-image-wrapper">
                  <img 
                    :src="getImageUrl(product.hinh_anh)" 
                    :alt="product.ten_san_pham"
                    class="product-image"
                    @error="handleImageError($event)"
                  />
                  <div class="product-overlay">
                    <button class="btn btn-light btn-sm" @click.stop="viewProductDetail(product)">
                      <i class="fa-solid fa-eye me-1"></i>Xem chi tiết
                    </button>
                  </div>
                  <div class="product-badge" v-if="product.tinh_trang === 1">
                    <span class="badge bg-success">Mới</span>
                  </div>
                </div>
                <div class="product-info">
                  <div class="product-category">{{ product.ten_danh_muc }}</div>
                  <h6 class="product-name">{{ product.ten_san_pham }}</h6>
                  <div class="product-price-section">
                    <div v-if="product.gia_co_ban" class="price-main">
                      {{ formatPrice(product.gia_co_ban) }}
                    </div>
                    <div v-else class="price-contact text-muted">Liên hệ</div>
                  </div>
                  <div class="product-actions">
                    <button 
                      class="btn btn-primary btn-sm w-100" 
                      @click.stop="viewProductDetail(product)"
                    >
                      <i class="fa-solid fa-eye me-1"></i>Xem chi tiết
                    </button>
                    <button 
                      class="btn btn-outline-danger btn-sm w-100" 
                      @click.stop="quickAddToCart(product)"
                      :disabled="!product.tong_sl_ton || product.tong_sl_ton <= 0"
                    >
                      <i class="fa-solid fa-cart-plus me-1"></i>Thêm giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="paginatedSanPham.length === 0" class="text-center py-5">
            <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Không có sản phẩm nào</h5>
          </div>

          <!-- Pagination -->
          <div class="pagination-wrapper mt-5" v-if="totalPages > 1">
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button class="page-link" @click="prevPage" :disabled="currentPage === 1">
                    <i class="fa-solid fa-chevron-left"></i>
                  </button>
                </li>
                <li 
                  v-for="page in visiblePages" 
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <button class="page-link" @click="goToPage(page)">
                    {{ page }}
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">
                    <i class="fa-solid fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Sidebar - Hot Products -->
        <div class="col-lg-3">
          <div class="sidebar-card">
            <div class="sidebar-header">
              <h5 class="sidebar-title">
                <i class="fa-solid fa-fire text-danger me-2"></i>
                Sản Phẩm HOT
              </h5>
            </div>
            <div class="sidebar-content">
              <div 
                v-for="(product, index) in hotProducts" 
                :key="product.id"
                class="hot-product-item"
                @click="viewProductDetail(product)"
              >
                <div class="hot-product-image">
                  <img 
                    :src="getImageUrl(product.hinh_anh)" 
                    :alt="product.ten_san_pham"
                    @error="handleImageError($event)"
                  />
                  <span class="hot-badge">{{ index + 1 }}</span>
                </div>
                <div class="hot-product-info">
                  <h6 class="hot-product-name">{{ product.ten_san_pham }}</h6>
                  <div class="hot-product-price">
                    <span v-if="product.gia_co_ban" class="price">
                      {{ formatPrice(product.gia_co_ban) }}
                    </span>
                    <span v-else class="text-muted">Liên hệ</span>
                  </div>
                  <div class="hot-product-rating">
                    <i class="fa-solid fa-star text-warning" v-for="i in 5" :key="i"></i>
                    <span class="ms-1">({{ Math.floor(Math.random() * 100) + 10 }})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  name: "SanPham",
  data() {
    return {
      listSanPham: [],
      allSanPham: [], // Lưu tất cả sản phẩm
      paginatedSanPham: [],
      hotProducts: [],
      currentPage: 1,
      itemsPerPage: 8,
      totalPages: 1,
      sortBy: "newest",
      selectedCategoryId: null,
      searchQuery: null,
      apiBaseUrl: "http://127.0.0.1:8000/api",
    };
  },
  computed: {
    visiblePages() {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, this.currentPage + 2);

      if (this.totalPages <= maxVisiblePages) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (this.currentPage <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
        } else if (this.currentPage >= this.totalPages - 2) {
          for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
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
  },
  mounted() {
    // Đọc query parameter danh_muc và tim_kiem từ URL
    this.selectedCategoryId = this.$route.query.danh_muc ? parseInt(this.$route.query.danh_muc) : null;
    this.searchQuery = this.$route.query.tim_kiem || null;
    this.loadData();
  },
  watch: {
    '$route'(to, from) {
      // Khi vào trang sản phẩm (kể cả khi click lại), random lại sản phẩm
      if (to.path === '/san-pham') {
        // Chỉ random nếu không có search query
        if (!to.query.tim_kiem) {
          this.loadData();
        }
      }
    },
    '$route.query.danh_muc'(newVal) {
      this.selectedCategoryId = newVal ? parseInt(newVal) : null;
      // Nếu có search query, reload search results với category filter
      if (this.searchQuery) {
        this.loadSearchResults();
      } else {
        this.applyFilters();
      }
    },
    '$route.query.tim_kiem'(newVal) {
      this.searchQuery = newVal || null;
      // Reload data khi search query thay đổi
      this.loadData();
    }
  },
  methods: {
    async loadData() {
      try {
        // Nếu có từ khóa tìm kiếm, gọi API tìm kiếm
        if (this.searchQuery && this.searchQuery.trim().length > 0) {
          await this.loadSearchResults();
          return;
        }
        
        // Nếu không có tìm kiếm, load tất cả sản phẩm
        const res = await axios.get(`${this.apiBaseUrl}/home-page/san-pham/data-open`);
        
        let products = [];
        if (res.data && res.data.status && res.data.data) {
          products = Array.isArray(res.data.data) ? res.data.data : [];
        } else if (Array.isArray(res.data)) {
          products = res.data;
        }

        // Random sản phẩm mỗi lần load
        const shuffledProducts = this.shuffleArray(products);
        this.allSanPham = shuffledProducts; // Lưu tất cả sản phẩm đã random
        
        // Apply filters (category)
        this.applyFilters();
        
        // Set hot products (first 5 từ danh sách đã random)
        this.hotProducts = shuffledProducts.slice(0, 5);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        this.$toast?.error("Không thể tải danh sách sản phẩm");
      }
    },
    async loadSearchResults() {
      try {
        const res = await axios.get(`${this.apiBaseUrl}/search/products-paginated`, {
          params: {
            keyword: this.searchQuery,
            danh_muc: this.selectedCategoryId,
            page: this.currentPage,
            per_page: this.itemsPerPage
          }
        });
        
        if (res.data && res.data.status && res.data.data) {
          this.listSanPham = Array.isArray(res.data.data) ? res.data.data : [];
          this.allSanPham = this.listSanPham; // Lưu để có thể sort/filter tiếp
          
          // Cập nhật pagination từ API
          if (res.data.pagination) {
            this.totalPages = res.data.pagination.total_pages || 1;
            this.currentPage = res.data.pagination.current_page || 1;
          }
          
          // Apply sort
          this.applySort();
          
          // Set hot products (first 5 từ kết quả tìm kiếm)
          this.hotProducts = this.listSanPham.slice(0, 5);
        } else {
          this.listSanPham = [];
          this.allSanPham = [];
          this.totalPages = 1;
        }
      } catch (error) {
        console.error("Lỗi tìm kiếm sản phẩm:", error);
        this.$toast?.error("Không thể tìm kiếm sản phẩm");
        this.listSanPham = [];
        this.allSanPham = [];
      }
    },
    
    // Apply filters (chỉ filter theo category, search sẽ gọi API)
    applyFilters() {
      let filtered = [...this.allSanPham];
      
      // Filter theo danh mục
      if (this.selectedCategoryId) {
        const categoryId = parseInt(this.selectedCategoryId);
        filtered = filtered.filter((product) => {
          if (!product.id_danh_muc) return false;
          const productCategoryId = parseInt(product.id_danh_muc);
          return productCategoryId === categoryId;
        });
      }
      
      this.listSanPham = filtered;
      
      // Reset về trang đầu và apply sort
      this.currentPage = 1;
      this.applySort();
    },
    
    // Filter theo danh mục (giữ lại để tương thích)
    filterByCategory() {
      this.applyFilters();
    },

    applySort() {
      let sorted = [...this.listSanPham];
      
      switch (this.sortBy) {
        case "price-low":
          sorted.sort((a, b) => (a.gia_co_ban || 0) - (b.gia_co_ban || 0));
          break;
        case "price-high":
          sorted.sort((a, b) => (b.gia_co_ban || 0) - (a.gia_co_ban || 0));
          break;
        case "name":
          sorted.sort((a, b) => (a.ten_san_pham || "").localeCompare(b.ten_san_pham || ""));
          break;
        case "newest":
        default:
          // Giữ nguyên thứ tự (mới nhất)
          break;
      }
      
      this.listSanPham = sorted;
      // Đảm bảo update paginated products sau khi sort
      this.updatePaginatedProducts();
    },

    updatePaginatedProducts() {
      this.totalPages = Math.ceil(this.listSanPham.length / this.itemsPerPage);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedSanPham = this.listSanPham.slice(start, end);
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedProducts();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedProducts();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    goToPage(page) {
      this.currentPage = page;
      this.updatePaginatedProducts();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    viewProductDetail(product) {
      // Sử dụng slug nếu có, nếu không thì dùng id (tương thích ngược)
      const slug = product.slug_san_pham || product.id;
      this.$router.push(`/chi-tiet-san-pham/${slug}`);
    },

    async quickAddToCart(product) {
      const token = localStorage.getItem("token_khach_hang");
      if (!token) {
        this.$toast?.info("Vui lòng đăng nhập để thêm vào giỏ hàng");
        this.$router.push("/khach-hang/dang-nhap");
        return;
      }

      // Kiểm tra tồn kho
      if (!product.tong_sl_ton || product.tong_sl_ton <= 0) {
        this.$toast?.error("Sản phẩm đã hết hàng");
        return;
      }

      try {
        // Lấy thông tin chi tiết sản phẩm để kiểm tra biến thể
        const detailRes = await axios.get(
          `${this.apiBaseUrl}/home-page/san-pham/chi-tiet-san-pham/${product.id}`
        );

        if (!detailRes.data || !detailRes.data.status || !detailRes.data.data) {
          this.$toast?.error("Không thể tải thông tin sản phẩm");
          return;
        }

        const productDetail = detailRes.data.data;
        const hasMultipleSizes = productDetail.kich_thuoc_distinct && 
                                 Array.isArray(productDetail.kich_thuoc_distinct) && 
                                 productDetail.kich_thuoc_distinct.length > 1;
        const hasMultipleColors = productDetail.mau_sac_distinct && 
                                  Array.isArray(productDetail.mau_sac_distinct) && 
                                  productDetail.mau_sac_distinct.length > 1;

        // Nếu có nhiều biến thể, chuyển đến trang chi tiết để chọn
        if (hasMultipleSizes || hasMultipleColors) {
          this.$toast?.info("Vui lòng chọn size và màu sắc ở trang chi tiết");
          this.$router.push(`/chi-tiet-san-pham/${product.id}`);
          return;
        }

        // Nếu không có hoặc chỉ có 1 biến thể, thêm trực tiếp
        let kichThuoc = "";
        let mauSac = "";

        // Tự động chọn giá trị đầu tiên nếu có
        if (productDetail.kich_thuoc_distinct && 
            Array.isArray(productDetail.kich_thuoc_distinct) && 
            productDetail.kich_thuoc_distinct.length === 1) {
          kichThuoc = productDetail.kich_thuoc_distinct[0];
        } else {
          kichThuoc = "Không có";
        }

        if (productDetail.mau_sac_distinct && 
            Array.isArray(productDetail.mau_sac_distinct) && 
            productDetail.mau_sac_distinct.length === 1) {
          mauSac = productDetail.mau_sac_distinct[0];
        } else {
          mauSac = "Không có";
        }

        // Gửi request thêm vào giỏ hàng
        const payload = {
          id_san_pham: product.id,
          so_luong: 1,
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
          this.$toast?.success(response.data.message || "Đã thêm vào giỏ hàng thành công!");
          
          // Emit event để cập nhật giỏ hàng ở header
          emitter.emit("cap-nhat-gio-hang");
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
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='14'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
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
      // Tạo một placeholder SVG đơn giản khi hình ảnh lỗi
      const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='14'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
      event.target.src = placeholderSvg;
      // Ngăn không cho lặp lại lỗi
      event.target.onerror = null;
    },

    // Fisher-Yates shuffle algorithm để random mảng
    shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },
  },
};
</script>

<style scoped>
.products-page {
  min-height: 80vh;
  background: #f8f9fa;
}

/* Page Header */
.page-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.page-subtitle {
  font-size: 1rem;
  margin: 0;
}

/* Filters Bar */
.filters-bar {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Product Card */
.product-card {
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

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background: #f8f9fa;
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

.product-card:hover .product-image {
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

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.product-info {
  padding: 0.875rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  font-size: 0.75rem;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  min-height: 48px;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.stars {
  font-size: 0.875rem;
}

.rating-text {
  font-size: 0.75rem;
  color: #666;
}

.product-price-section {
  margin: 0 0 0.25rem 0;
  padding: 0;
}

.price-main {
  font-size: 1.25rem;
  font-weight: 700;
  color: #dc3545;
}

.price-contact {
  font-size: 1rem;
}

.product-actions {
  margin-top: 0;
}

.product-actions .btn {
  margin-bottom: 0.25rem;
}

.product-actions .btn:last-child {
  margin-bottom: 0;
}

/* Sidebar */
.sidebar-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: sticky;
  top: 20px;
}

.sidebar-header {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  padding: 1rem 1.5rem;
  color: white;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.sidebar-content {
  padding: 1rem;
}

.hot-product-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.hot-product-item:hover {
  background: #f8f9fa;
  border-color: #dc3545;
  transform: translateX(5px);
}

.hot-product-item:last-child {
  margin-bottom: 0;
}

.hot-product-image {
  position: relative;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.hot-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot-badge {
  position: absolute;
  top: -5px;
  left: -5px;
  background: #dc3545;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid white;
}

.hot-product-info {
  flex: 1;
  min-width: 0;
}

.hot-product-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-product-price {
  margin-bottom: 0.25rem;
}

.hot-product-price .price {
  font-size: 1rem;
  font-weight: 700;
  color: #dc3545;
}

.hot-product-rating {
  font-size: 0.75rem;
  color: #666;
}

.hot-product-rating i {
  font-size: 0.75rem;
}

/* Pagination */
.pagination-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.pagination {
  margin: 0;
}

.page-link {
  color: #667eea;
  border: 1px solid #dee2e6;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.page-link:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.page-item.active .page-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 992px) {
  .sidebar-card {
    position: static;
    margin-top: 2rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .filters-bar {
    padding: 1rem;
  }
  
  .filters-bar .row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filters-bar .text-end {
    text-align: left !important;
  }
}
</style>
