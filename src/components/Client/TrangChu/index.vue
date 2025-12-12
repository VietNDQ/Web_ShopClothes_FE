<template>
  <div class="homepage">
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class=" px-0">
          <div class="row align-items-center g-0">
            <div class="col-lg-6">
              <div class="hero-text-wrapper">
                <h1 class="hero-title">Thời Trang Hiện Đại</h1>
                <p class="hero-subtitle">Khám phá bộ sưu tập mới nhất với phong cách độc đáo và chất lượng cao</p>
                <div class="hero-buttons">
                  <button class="btn btn-primary btn-lg me-3" @click="scrollToProducts">
                    <i class="fa-solid fa-shopping-bag me-2"></i>Mua ngay
                  </button>
                  <button class="btn btn-outline-light btn-lg" @click="scrollToProducts">
                    <i class="fa-solid fa-eye me-2"></i>Xem sản phẩm
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" alt="Fashion" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="categories-section mt-2">
      <div class="categories-container">
        <h2 class="categories-title">DANH MỤC</h2>
        <div class="categories-wrapper" v-if="categories.length > 0">
          <button 
            class="categories-nav-btn categories-nav-btn-left" 
            @click="previousCategoriesPage"
            v-if="currentCategoryPage > 0"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          
          <div class="categories-grid">
            <div 
              v-for="category in displayedCategories" 
              :key="category.id"
              class="category-item"
              @click="filterByCategory(category.id)"
            >
              <div class="category-icon-wrapper">
                <img 
                  :src="getCategoryImageUrl(category.hinh_anh)" 
                  :alt="category.ten_danh_muc"
                  class="category-icon-image"
                  @error="handleCategoryImageError($event)"
                />
              </div>
              <span class="category-label">{{ category.ten_danh_muc }}</span>
            </div>
          </div>
          
          <button 
            class="categories-nav-btn categories-nav-btn-right" 
            @click="nextCategoriesPage"
            v-if="hasNextCategoryPage"
          >
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div v-else class="categories-loading">
          <p>Đang tải danh mục...</p>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products-section" class="products-section py-5 bg-light">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="section-title mb-0">
            <i class="fa-solid fa-box me-2 text-primary"></i>
            Sản phẩm nổi bật
          </h2>
          <div class="search-box">
            <input 
              v-model="searchKeyword" 
              @input="searchProducts"
              type="text" 
              class="form-control" 
              placeholder="Tìm kiếm sản phẩm..."
            />
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p class="mt-3 text-muted">Đang tải sản phẩm...</p>
        </div>

        <!-- Products Grid -->
        <div v-else-if="displayedProducts.length > 0" class="row g-1">
          <div 
            v-for="product in displayedProducts" 
            :key="product.id"
            class="col-6 col-md-4 col-lg-2"
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
                  <button class="btn btn-light btn-sm">
                    <i class="fa-solid fa-eye me-1"></i>Xem chi tiết
                  </button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">{{ product.ten_danh_muc }}</div>
                <h5 class="product-name">{{ product.ten_san_pham }}</h5>
                <div class="product-price">
                  <span class="price">{{ formatPrice(product.gia_co_ban || 0) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-5">
          <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">Không tìm thấy sản phẩm</h5>
          <p class="text-muted">Vui lòng thử lại với từ khóa khác</p>
        </div>

        <!-- Load More Button -->
        <div v-if="displayedProducts.length < filteredProducts.length" class="text-center mt-5">
          <button class="btn btn-outline-primary btn-lg" @click="loadMore">
            <i class="fa-solid fa-arrow-down me-2"></i>Xem thêm sản phẩm
          </button>
        </div>
      </div>
    </section>

    <!-- Best Selling Products Section -->
    <section class="best-selling-section py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="section-title mb-0">
            <i class="fa-solid fa-fire me-2 text-danger"></i>
            Sản phẩm bán chạy nhất
          </h2>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingBestSelling" class="text-center py-5">
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p class="mt-3 text-muted">Đang tải sản phẩm bán chạy...</p>
        </div>

        <!-- Best Selling Products Grid -->
        <div v-else-if="bestSellingProducts.length > 0" class="row g-1">
          <div 
            v-for="product in bestSellingProducts" 
            :key="product.id"
            class="col-6 col-md-4 col-lg-2"
          >
            <div class="product-card best-selling-card" @click="viewProductDetail(product)">
              <div class="product-badge">
                <i class="fa-solid fa-fire"></i>
                <span>Bán chạy</span>
              </div>
              <div class="product-image-wrapper">
                <img 
                  :src="getImageUrl(product.hinh_anh)" 
                  :alt="product.ten_san_pham"
                  class="product-image"
                  @error="handleImageError($event)"
                />
                <div class="product-overlay">
                  <button class="btn btn-light btn-sm">
                    <i class="fa-solid fa-eye me-1"></i>Xem chi tiết
                  </button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">{{ product.ten_danh_muc }}</div>
                <h5 class="product-name">{{ product.ten_san_pham }}</h5>
                <div class="product-sales-info">
                  <small class="text-muted">
                    <i class="fa-solid fa-chart-line me-1"></i>
                    Đã bán: {{ product.tong_so_luong_ban || 0 }}
                  </small>
                </div>
                <div class="product-price">
                  <span class="price">{{ formatPrice(product.gia_co_ban || 0) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-5">
          <i class="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">Chưa có sản phẩm bán chạy</h5>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card text-center">
              <div class="feature-icon">
                <i class="fa-solid fa-truck-fast"></i>
              </div>
              <h5>Miễn phí vận chuyển</h5>
              <p class="text-muted">Cho đơn hàng trên 500.000₫</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center">
              <div class="feature-icon">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <h5>Bảo hành chính hãng</h5>
              <p class="text-muted">Cam kết chất lượng sản phẩm</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center">
              <div class="feature-icon">
                <i class="fa-solid fa-headset"></i>
              </div>
              <h5>Hỗ trợ 24/7</h5>
              <p class="text-muted">Luôn sẵn sàng phục vụ bạn</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TrangChu",
  data() {
    return {
      products: [],
      categories: [],
      displayedProducts: [],
      filteredProducts: [],
      bestSellingProducts: [],
      searchKeyword: "",
      isLoading: false,
      isLoadingBestSelling: false,
      itemsPerPage: 12,
      currentPage: 1,
      apiBaseUrl: "http://127.0.0.1:8000/api",
      currentCategoryPage: 0,
      categoriesPerPage: 10,
    };
  },
  mounted() {
    this.loadCategories();
    this.loadProducts();
    this.loadBestSellingProducts();
  },
  watch: {
    '$route'(to, from) {
      // Khi vào trang chủ (kể cả khi click lại trang chủ), random lại sản phẩm
      if (to.path === '/' || to.path === '/trang-chu') {
        this.loadProducts();
        this.loadBestSellingProducts();
      }
    }
  },
  computed: {
    displayedCategories() {
      const start = this.currentCategoryPage * this.categoriesPerPage;
      const end = start + this.categoriesPerPage;
      return this.categories.slice(start, end);
    },
    hasNextCategoryPage() {
      const totalPages = Math.ceil(this.categories.length / this.categoriesPerPage);
      return this.currentCategoryPage < totalPages - 1;
    },
  },
  methods: {
    // Load danh mục - optimized with caching
    async loadCategories() {
      // Check cache first
      const cacheKey = 'categories_cache';
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          const cacheTime = cachedData.timestamp || 0;
          const now = Date.now();
          // Cache valid for 5 minutes
          if (now - cacheTime < 5 * 60 * 1000) {
            this.categories = cachedData.data || [];
            this.currentCategoryPage = 0;
            return;
          }
        } catch (e) {
          // Invalid cache, continue to fetch
        }
      }

      try {
        const res = await axios.get(`${this.apiBaseUrl}/home-page/danh-muc/data-open`);
        if (res.data && res.data.status && res.data.data) {
          this.categories = Array.isArray(res.data.data) ? res.data.data : [];
        } else if (res.data && res.data.data) {
          this.categories = Array.isArray(res.data.data) ? res.data.data : [];
        }
        // Cache the result
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data: this.categories,
          timestamp: Date.now()
        }));
        // Reset về trang đầu khi load lại danh mục
        this.currentCategoryPage = 0;
      } catch (err) {
        console.error("Lỗi loadCategories:", err);
      }
    },
    
    // Xử lý hình ảnh danh mục
    getCategoryImageUrl(url) {
      if (!url) {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
      }
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return `http://127.0.0.1:8000/storage/${url}`;
    },
    
    handleCategoryImageError(event) {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
    },

    // Hàm shuffle mảng (Fisher-Yates algorithm)
    shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },

    // Load sản phẩm - optimized with caching and random order
    async loadProducts() {
      this.isLoading = true;
      
      // Check cache first
      const cacheKey = 'products_cache';
      const cached = sessionStorage.getItem(cacheKey);
      let productsData = [];
      
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          const cacheTime = cachedData.timestamp || 0;
          const now = Date.now();
          // Cache valid for 2 minutes
          if (now - cacheTime < 2 * 60 * 1000) {
            productsData = cachedData.data || [];
          } else {
            // Cache expired, fetch new data
            productsData = await this.fetchProductsFromAPI();
            // Update cache
            sessionStorage.setItem(cacheKey, JSON.stringify({
              data: productsData,
              timestamp: Date.now()
            }));
          }
        } catch (e) {
          // Invalid cache, fetch new data
          productsData = await this.fetchProductsFromAPI();
          sessionStorage.setItem(cacheKey, JSON.stringify({
            data: productsData,
            timestamp: Date.now()
          }));
        }
      } else {
        // No cache, fetch new data
        productsData = await this.fetchProductsFromAPI();
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data: productsData,
          timestamp: Date.now()
        }));
      }

      // Randomize products order mỗi lần load
      this.products = this.shuffleArray(productsData);
      this.filteredProducts = [...this.products];
      this.updateDisplayedProducts();
      this.isLoading = false;
    },

    // Fetch products from API
    async fetchProductsFromAPI() {
      try {
        const res = await axios.get(`${this.apiBaseUrl}/home-page/san-pham/data-open`);
        
        if (res.data && res.data.status && res.data.data) {
          return Array.isArray(res.data.data) ? res.data.data : [];
        } else if (Array.isArray(res.data)) {
          return res.data;
        }
        return [];
      } catch (err) {
        console.error("Lỗi fetchProductsFromAPI:", err);
        this.$toast?.error("Không thể tải sản phẩm");
        return [];
      }
    },

    // Tìm kiếm sản phẩm
    searchProducts() {
      const keyword = (this.searchKeyword || "").trim().toLowerCase();
      
      if (!keyword) {
        // Khi không có keyword, giữ nguyên thứ tự random đã có
        this.filteredProducts = [...this.products];
      } else {
        // Filter sản phẩm theo keyword
        const filtered = this.products.filter((product) => {
          const tenSP = String(product.ten_san_pham || "").toLowerCase();
          const tenDM = String(product.ten_danh_muc || "").toLowerCase();
          const moTa = String(product.mo_ta || "").toLowerCase();
          return tenSP.includes(keyword) || tenDM.includes(keyword) || moTa.includes(keyword);
        });
        // Giữ nguyên thứ tự random của filtered results
        this.filteredProducts = filtered;
      }
      
      this.currentPage = 1;
      this.updateDisplayedProducts();
    },

    // Lọc theo danh mục - chuyển sang trang sản phẩm
    filterByCategory(categoryId) {
      this.$router.push({
        path: '/san-pham',
        query: { danh_muc: categoryId }
      });
    },

    // Cập nhật danh sách sản phẩm hiển thị
    updateDisplayedProducts() {
      const endIndex = this.currentPage * this.itemsPerPage;
      this.displayedProducts = this.filteredProducts.slice(0, endIndex);
    },

    // Load thêm sản phẩm
    loadMore() {
      this.currentPage++;
      this.updateDisplayedProducts();
    },

    // Xem chi tiết sản phẩm
    viewProductDetail(product) {
      // Sử dụng slug nếu có, nếu không thì dùng id (tương thích ngược)
      const slug = product.slug_san_pham || product.id;
      this.$router.push(`/chi-tiet-san-pham/${slug}`);
    },

    // Scroll to products section
    scrollToProducts() {
      const element = document.getElementById("products-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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

    // Xử lý URL hình ảnh
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
      // Kiểm tra xem đã set placeholder chưa để tránh lặp vô hạn
      if (event.target.src && event.target.src.startsWith('data:image/svg+xml')) {
        return; // Đã là placeholder rồi, không làm gì nữa
      }
      
      // Tạo một placeholder SVG đơn giản khi hình ảnh lỗi
      const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-family='Arial' font-size='14'%3EKhông có hình ảnh%3C/text%3E%3C/svg%3E";
      event.target.src = placeholderSvg;
      // Ngăn không cho lặp lại lỗi
      event.target.onerror = null;
    },

    // Chuyển sang trang danh mục trước
    previousCategoriesPage() {
      if (this.currentCategoryPage > 0) {
        this.currentCategoryPage--;
      }
    },

    // Chuyển sang trang danh mục tiếp theo
    nextCategoriesPage() {
      const totalPages = Math.ceil(this.categories.length / this.categoriesPerPage);
      if (this.currentCategoryPage < totalPages - 1) {
        this.currentCategoryPage++;
      }
    },

    // Load sản phẩm bán chạy nhất
    async loadBestSellingProducts() {
      this.isLoadingBestSelling = true;
      try {
        const res = await axios.get(`${this.apiBaseUrl}/home-page/san-pham/ban-chay`, {
          params: {
            limit: 6
          }
        });
        
        if (res.data && res.data.status && res.data.data) {
          this.bestSellingProducts = Array.isArray(res.data.data) ? res.data.data : [];
        } else {
          this.bestSellingProducts = [];
        }
      } catch (err) {
        console.error("Lỗi loadBestSellingProducts:", err);
        this.bestSellingProducts = [];
      } finally {
        this.isLoadingBestSelling = false;
      }
    },
  },
};
</script>

<style scoped>
/* Homepage wrapper */
.homepage {
  margin: 0;
  padding: 0;
  width: 100%;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  margin: -120px 0 0 0; /* Bù lại margin-top của page-wrapper */
  position: relative;
  overflow: hidden;
  width: 100vw; /* Full viewport width */
  left: 50%; /* Đưa về giữa */
  right: 50%; /* Đưa về giữa */
  margin-left: -50vw; /* Căn về bên trái */
  margin-right: -50vw; /* Căn về bên phải */
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-text-wrapper {
  padding: 80px 60px;
}

.hero-image {
  height: 100vh;
  min-height: 100vh;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  box-shadow: none;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}

.hero-buttons {
  margin-top: 2rem;
}

/* Categories Section */
.categories-section {
  background: #2c2c2c;
  padding: 40px 0;
  margin: 0;
}

.categories-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.categories-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 30px;
  text-align: left;
  letter-spacing: 1px;
}

.categories-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 20px;
  flex: 1;
  min-width: 0;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  min-width: 100px;
}

.category-item:hover {
  transform: translateY(-3px);
}

.category-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.category-item:hover .category-icon-wrapper {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.category-icon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.category-label {
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
  max-width: 100px;
  word-wrap: break-word;
}

.categories-nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  font-size: 18px;
}

.categories-nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.categories-nav-btn:active {
  transform: scale(0.95);
}

.categories-nav-btn-left {
  order: -1;
}

.categories-nav-btn-right {
  order: 1;
}

.categories-loading {
  text-align: center;
  padding: 40px 0;
  color: #ffffff;
}

/* Responsive for categories */
@media (max-width: 1400px) {
  .categories-grid {
    grid-template-columns: repeat(10, 1fr);
  }
}

@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 992px) {
  .categories-grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .category-icon-wrapper {
    width: 70px;
    height: 70px;
  }
  
  .category-label {
    font-size: 12px;
  }
  
  .categories-nav-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }
  
  .category-icon-wrapper {
    width: 60px;
    height: 60px;
  }
  
  .category-label {
    font-size: 11px;
    max-width: 80px;
  }
  
  .categories-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .categories-nav-btn {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  
  .category-icon-wrapper {
    width: 55px;
    height: 55px;
  }
  
  .category-label {
    font-size: 10px;
    max-width: 70px;
  }
  
  .categories-nav-btn {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
}

/* Products Section */
.products-section {
  min-height: 500px;
}

.search-box {
  max-width: 300px;
}

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

.product-info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  font-size: 0.75rem;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.product-price {
  margin-top: auto;
}

.price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #198754;
}

/* Best Selling Section */
.best-selling-section {
  background: #f8f9fa;
}

.best-selling-card {
  position: relative;
  overflow: hidden;
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  pointer-events: none;
}

.product-badge i {
  font-size: 0.7rem;
}

.product-sales-info {
  margin: 8px 0;
  font-size: 0.85rem;
}

/* Features Section */
.features-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.feature-card {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.feature-card h5 {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
  
  .hero-text-wrapper {
    padding: 60px 30px;
  }
  
  .hero-image {
    min-height: 100vh;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .search-box {
    max-width: 100%;
    margin-top: 1rem;
  }
}
</style>
