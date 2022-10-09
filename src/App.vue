<template>
  <div class="wrapper">
    <header class="header">
      <div class="header__container">
        <h1 class="header__text">Добавление товара</h1>
        <select class="header__select" name="" id="">
          <option value="">По умолчанию</option>
          <option value="">По дате</option>
          <option value="">По рейтингу</option>
        </select>
      </div>
    </header>
    <main class="mainpage">
      <div class="product">
        <div class="product__container">
          <form
            class="product__form form-control"
            action=""
            @submit.prevent="addCard"
          >
            <label
              class="form-control__label form-control__label_required"
              for="name"
              >Наименование товара</label
            >
            <input
              class="form-control__item"
              type="text"
              id="name"
              v-model.trim="name"
              placeholder="Введите наименование товара"
            />
            <label class="form-control__label" for="desc"
              >Описание товара</label
            >
            <textarea
              class="form-control__item form-control__textarea"
              type="text"
              id="desc"
              v-model.trim="desc"
              placeholder="Введите описание товара"
            />
            <label
              class="form-control__label form-control__label_required"
              for="link"
              >Ссылка на изображение товара</label
            >
            <input
              class="form-control__item"
              type="text"
              id="link"
              placeholder="Введите ссылку"
              v-model.trim="link"
            />
            <label
              class="form-control__label form-control__label_required"
              for="price"
              >Цена товара</label
            >
            <input
              class="form-control__item"
              type="text"
              id="price"
              placeholder="Введите цену"
              v-model.trim="price"
            />
            <button class="form-control__button">Добавить товар</button>
          </form>
          <div class="product__cards cards-product">
            <div
              class="cards-product__card card"
              v-for="(item, index) in products"
              :key="index"
            >
              <div class="card__image">
                <img
                  :src="item.link"
                  @error="checkLoadImg(index)"
                  alt="Фото товара"
                />
              </div>
              <div class="card__body">
                <h2 class="card__header">{{ item.name }}</h2>
                <p class="card__text">{{ item.desc }}</p>
                <span class="card__price">{{ item.price }}</span>
                <button class="card__del" @click="delCard(item.id)"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defaultArr } from "@/static";
import defaultImage from "@/assets/img/box.jpg";

export default {
  name: "App",
  data() {
    return {
      products: [],
      name: "",
      desc: "",
      link: "",
      price: "",
    };
  },
  mounted() {
    this.renderCards();
  },
  methods: {
    addCard() {
      this.products.push({
        name: this.name,
        desc: this.desc,
        link: this.link,
        price: this.price,
        id: Date.now(),
      });
      this.saveCards();
    },
    delCard(id) {
      let idx = this.products.findIndex((item) => item.id === id);
      this.products.splice(idx, 1);
      this.saveCards();
    },
    renderCards() {
      this.products =
        JSON.parse(localStorage.getItem("products")) || defaultArr;
    },
    saveCards() {
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    checkLoadImg(idx) {
      this.products[idx].link = defaultImage;
    },
  },
  computed: {},
};
</script>

<style>
</style>
