<template>
    <div class="nav-container primary-menu">
        <div class="container">
            <div class="mobile-topbar-header">
                <div>
                    <h4 class="logo-text">Rukada</h4>
                </div>
                <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
                </div>
            </div>
            <nav class="navbar navbar-expand-xl w-100">
                <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">
                            <div class="parent-icon"><i class="fa-solid fa-house"></i>
                            </div>
                            <div class="menu-title mt-2">Home</div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/san-pham">
                            <div class="parent-icon"><i class="fa-brands fa-product-hunt"></i>
                            </div>
                            <div class="menu-title mt-2">Sản Phẩm</div>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="categories.length > 0">
                        <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                            data-bs-toggle="dropdown">
                            <div class="parent-icon"><i class="fa-solid fa-tags"></i>
                            </div>
                            <div class="menu-title mt-2">Danh Mục</div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end category-dropdown">
                            <li v-for="category in categories" :key="category.id">
                                <a 
                                    class="dropdown-item category-item" 
                                    href="javascript:;"
                                    @click="goToCategory(category.id)"
                                >
                                    <div class="d-flex align-items-center">
                                        <div class="category-image-mini me-2">
                                            <img 
                                                :src="getCategoryImageUrl(category.hinh_anh)" 
                                                :alt="category.ten_danh_muc"
                                                class="category-thumb"
                                                @error="handleCategoryImageError($event)"
                                            />
                                        </div>
                                        <span>{{ category.ten_danh_muc }}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MenuClient',
    data() {
        return {
            categories: [],
            apiBaseUrl: "http://127.0.0.1:8000/api",
        }
    },
    mounted() {
        this.loadCategories();
    },
    methods: {
        async loadCategories() {
            try {
                const res = await axios.get(`${this.apiBaseUrl}/home-page/danh-muc/data-open`);
                if (res.data && res.data.status && res.data.data) {
                    this.categories = Array.isArray(res.data.data) ? res.data.data : [];
                } else if (res.data && res.data.data) {
                    this.categories = Array.isArray(res.data.data) ? res.data.data : [];
                }
            } catch (err) {
                console.error("Lỗi loadCategories:", err);
            }
        },
        
        goToCategory(categoryId) {
            this.$router.push({
                path: '/san-pham',
                query: { danh_muc: categoryId }
            });
        },
        
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
        }
    }
}
</script>

<style scoped>
.category-dropdown {
    max-height: 500px;
    overflow-y: auto;
    min-width: 250px;
}

.category-item {
    padding: 10px 15px;
    transition: all 0.3s ease;
}

.category-item:hover {
    background-color: #f8f9fa;
    padding-left: 20px;
}

.category-image-mini {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
    background-color: #f0f0f0;
}

.category-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.category-item span {
    font-size: 14px;
    font-weight: 500;
    color: #333;
}

/* Custom scrollbar cho dropdown */
.category-dropdown::-webkit-scrollbar {
    width: 6px;
}

.category-dropdown::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.category-dropdown::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.category-dropdown::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
