<template>
  <div class="homepage">
    <div class="homepage__search">
      <input class="homepage__input" v-model.trim="keyword" placeholder="Search products" />
    </div>
    <LoadingSpinner class="homepage__loading-spinner" v-if="searchLoading" />
    <div class="homepage__product" v-if="products.length > 0">
      <div v-for="(product, key) in products" :key="key" class="homepage__product-item">
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
import { ref, onMounted, onUnmounted, watch, watchEffect } from 'vue'
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
const isLoadMore = ref<boolean>(false)
const LIMIT = 20

const router = useRouter()
const route = useRoute()

onMounted(() => {
  reloadProducts()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(keyword, (value) => {
  if (value.trim() === '') {
    router.push(route.path)
  } else {
    router.push({ query: { q: value } })
    pageNumber.value = 1
  }
  handleSearch();
})

watchEffect(() => {
  const query = route.query.q
  if (query !== undefined) {
    keyword.value = query as string
  }
})
const loadProducts = async (loadMore?: boolean) => {
  try {
    loading.value = true
    let query = route.query

    if (loadMore) {
      pageNumber.value = pageNumber.value + 1
      isLoadMore.value = true
    }

    if (pageNumber.value) {
      let params = {
        page: pageNumber.value,
        limit: LIMIT
      }

      query = Object.assign({}, query, params)
    }

    const response = await fetchProducts(query)
    const data: IProducts[] = response?.products
    products.value = [...products.value, ...data]
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    isLoadMore.value = false
    loading.value = false
  }
}

const handleSearch = _.debounce(async (loadMore?: boolean) => {
  try {
    searchLoading.value = true
    isSearching.value = true
    let query = route.query

    if (loadMore) {
      pageNumber.value = pageNumber.value + 1
      isLoadMore.value = true
    }

    if (pageNumber.value) {
      let params = {
        q: keyword.value,
        page: pageNumber.value,
        limit: LIMIT
      }

      query = Object.assign({}, query, params)
    }
    const response = await searchProducts(query)
    const data: IProducts[] = response.products
    products.value = [...data]
  } catch (error) {
    console.error('Error searching products:', error)
  } finally {
    isLoadMore.value = false
    searchLoading.value = false
  }
}, 500)

const handleScroll = async () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    isSearching.value ? await handleSearch(true) : await loadProducts(true)
  }
}

const reloadProducts = async () => {
  pageNumber.value = 1
  await loadProducts(false)
}
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
