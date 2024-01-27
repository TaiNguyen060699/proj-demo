<template>
  <div class="homepage">
    <div class="homepage__search">
      <input class="homepage__input" v-model.trim="keyword" placeholder="Search products" />
    </div>
    <LoadingSpinner class="homepage__loading-spinner" v-if="searchLoading" />
    <div class="homepage__product" v-if="products.length > 0">
      <div v-for="product in products" :key="product.id" class="homepage__product-item">
        <ProductCard :product="product" />
      </div>
      <LoadingProgress style="width: 100%" v-if="loading" />
    </div>
    <div v-else>No products found.</div>
    <BackToTop />
  </div>
</template>

<script lang="ts" setup>
import * as _ from 'lodash'
import { ref, onMounted, onUnmounted, watch, watchEffect  } from 'vue'
import type { IProducts } from '@/types'
import { useRouter, useRoute } from 'vue-router'
import { fetchProducts, searchProducts } from '@/repositories/api'

import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import LoadingProgress from '@/components/LoadingProgress.vue'
import BackToTop from '@/components/BackToTop.vue'

const products = ref<IProducts[]>([])
const keyword = ref<string>('')
const pageNumber = ref<number>(1)
const loading = ref<boolean>(false)
const searchLoading = ref<boolean>(false)
const isSearching = ref<boolean>(false)

const router = useRouter()
const route = useRoute()

onMounted(() => {
  checkInitialQuery();
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(keyword, (value) => {
  if (value.trim() === '') {
    router.push(route.path)
    loadProducts();
  } else {
    router.push({ query: {q: value }})
    handleSearch();
  }
})

watchEffect(() => {
  const query = route.query.q;
  if (query !== undefined) {
    keyword.value = query as string;
  }
});
const loadProducts = async () => {
  try {
    loading.value = true
    const pageFromRoute = Number(route?.query?.page) || 1
    const response = isSearching.value
      ? await searchProducts(keyword.value, pageFromRoute)
      : await fetchProducts(pageFromRoute, 20)
    const data: IProducts[] = response?.products
    products.value = [...products.value, ...data]
    pageNumber.value += 1
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = _.debounce(async () => {
  try {
    searchLoading.value = true
    pageNumber.value = 1
    isSearching.value = true;
    const searchData: IProducts = await searchProducts(keyword.value, pageNumber.value)
    products.value = searchData.products
  } catch (error) {
    console.error('Error searching products:', error)
  } finally {
    searchLoading.value = false
  }
}, 500)

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadProducts()
  }
}

const checkInitialQuery = () => {
  const query = route.query.q;
  if (query) {
    keyword.value = query as string;
    loadProducts();
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  &__search {
    margin-bottom: 20px;
    position: relative;
  }

  &__input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
    }
  }

  &__product {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__product-item {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
      flex-grow: 1;
    }
  }

  &__loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
  }
}
</style>
