<template>
  <div class="wrapper">
    <header class="header">
      <div class="header__container">
        <h1 class="header__text">Добавление товара</h1>
        <select class="header__select" v-model="selected">
          <option value="default" selected hidden>По умолчанию</option>
          <option value="max">По цене max</option>
          <option value="min">По цене min</option>
          <option value="title">По названию</option>
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
            <div
              class="form-control__row"
              :class="{ 'form-control__row_required': !valid.name }"
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
                @blur="checkValid('blur', 'name')"
                @focus="checkValid('focus', 'name')"
                placeholder="Введите наименование товара"
              />
            </div>
            <div class="form-control__row">
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
            </div>
            <div
              class="form-control__row"
              :class="{ 'form-control__row_required': !valid.link }"
            >
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
                @blur="checkValid('blur', 'link')"
                @focus="checkValid('focus', 'link')"
              />
            </div>
            <div
              class="form-control__row"
              :class="{ 'form-control__row_required': !valid.price }"
            >
              <label
                class="form-control__label form-control__label_required"
                for="price"
                >Цена товара</label
              >
              <input
                class="form-control__item"
                id="price"
                placeholder="Введите цену"
                v-model="price"
                @blur="checkValid('blur', 'price')"
                @focus="checkValid('focus', 'price')"
              />
            </div>
            <button
              class="form-control__button"
              :disabled="!checkValidForm"
              :class="{ 'form-control__button_valid': checkValidForm }"
            >
              Добавить товар
            </button>
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
                <span class="card__price">{{ item.price + " руб." }}</span>
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
import defaultImage from "@/assets/img/default-box.png";

export default {
  name: "App",
  data() {
    return {
      products: [],
      name: "",
      desc: "",
      link: "",
      price: "",
      selected: "default",
      valid: {
        name: true,
        link: true,
        price: true,
      },
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
      this.sortCards(this.selected);
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
    sortCards(selectedValue) {
      switch (selectedValue) {
        case "min":
          this.products.sort((a, b) => a.price - b.price);
          break;
        case "max":
          this.products.sort((a, b) => b.price - a.price);
          break;
        case "title":
          this.products.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    },
    checkValid(type, target) {
      if (type === "blur") {
        this.valid[target] = this[target] ? true : false;
      } else if (type === "focus") {
        this.valid[target] = true;
      }
    },
  },
  computed: {
    checkValidForm() {
      return this.name && this.link && this.price ? true : false;
    },
  },
  watch: {
    selected(value) {
      this.sortCards(value);
    },
    price(value) {
      const validSpace = value.replace(/\s/g, "");
      const validNumber = validSpace.replace(/[^0-9]/g, "");
      this.price = [...validNumber].reduceRight(
        (previousValue, currentValue, idx) => {
          const spaceOrNothing =
            (validNumber.length - idx) % 3 === 0 ? " " : "";
          return spaceOrNothing + currentValue + previousValue;
        },
        ""
      );
    },
  },
};
</script>

<style>
</style>


