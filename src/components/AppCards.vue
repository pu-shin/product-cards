<template>
  <div class="product__cards cards-product">
    <div class="cards-product__body">
      <transition-group name="fade-cards" @before-leave="beforeLeave">
        <div
          class="cards-product__card card"
          v-for="(item, index) in products"
          :key="item.id"
        >
          <div class="card__body">
            <div class="card__image">
              <img
                :src="item.link"
                @error="checkLoadImg(index)"
                alt="Фото товара"
              />
            </div>
            <div class="card__content">
              <h2 class="card__header">{{ item.name }}</h2>
              <p class="card__text">{{ item.desc }}</p>
              <span class="card__price">{{ item.price + " руб." }}</span>
            </div>
            <span v-show="item.edited" class="card__edit-mark">ред.</span>
            <button
              class="card__edit card-buttons"
              @click="$emit('edit-card', item)"
            ></button>
            <button
              class="card__del card-buttons"
              @click="$emit('del-card', item.id)"
            ></button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/img/default-box.png";

export default {
  emits: ["edit-card", "del-card"],
  props: ["products"],
  data() {
    return {};
  },
  methods: {
    beforeLeave(el) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
    checkLoadImg(index) {
      this.products[index].link = defaultImage;
    },
  },
};
</script>


<style scoped lang="scss">
</style>
