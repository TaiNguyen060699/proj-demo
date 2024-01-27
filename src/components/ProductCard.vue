<template>
  <div class="product-card">
    <img :src="product.thumbnail" alt="Product Thumbnail" class="product-card__image" />
    <div class="product-card__details">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__price-section">
        <span class="product-card__original-price">{{ formattedOriginalPrice }}</span>
        <span class="product-card__discounted-price">{{ formattedDiscountedPrice }}</span>
      </div>
      <div class="product-card__rating">Rating: {{ product.rating }}/5</div>
      <div class="product-card__stock">Stock: {{ product.stock }} units</div>
      <div class="product-card__brand">Brand: {{ product.brand }}</div>
      <div class="product-card__category">Category: {{ product.category }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps(['product'])

const formattedOriginalPrice = computed(() => `$${props.product.price.toFixed(2)}`)

const formattedDiscountedPrice = computed(() => {
  const discountedPrice =
    props.product.price - (props.product.price * props.product.discountPercentage) / 100
  return `$${discountedPrice.toFixed(2)}`
})
</script>

<style lang="scss" scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    transform: translateY(-5px);
  }

  &__image {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ddd;
  }

  &__details {
    padding: 15px;

    &__title {
      font-size: 1.2em;
      margin-bottom: 10px;
    }

    &__description {
      color: #666;
      margin-bottom: 10px;
    }

    &__price-section {
      margin-bottom: 10px;

      &__original-price {
        text-decoration: line-through;
        color: #888;
        margin-right: 10px;
      }

      &__discounted-price {
        color: #e44d26;
        font-weight: bold;
      }
    }

    &__rating,
    &__stock,
    &__brand,
    &__category {
      margin-bottom: 5px;
      font-size: 0.9em;
      color: #555;
    }
  }
}
</style>
