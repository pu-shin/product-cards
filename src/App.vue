<template>
  <div class="wrapper">
    <header class="header">
      <div class="header__container">
        <div class="header__content content-header">
          <h1 class="content-header__text">Добавление товара</h1>
          <div class="content-header__search search">
            <input
              class="search__input"
              type="text"
              placeholder="Поиск товара"
              @keyup.enter="searchProduct(foundName)"
              v-model.trim="foundName"
            />
            <button
              class="search__button"
              type="button"
              @click="searchProduct(foundName)"
            ></button>
          </div>
          <select class="content-header__select" v-model="selected">
            <option value="default" selected hidden>По умолчанию</option>
            <option value="max">По цене max</option>
            <option value="min">По цене min</option>
            <option value="title">По названию</option>
          </select>
        </div>
      </div>
    </header>
    <main class="mainpage">
      <div class="product">
        <div class="product__container">
          <form class="product__form form" @submit.prevent="addCard">
            <div class="form__body form-control">
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
                  maxlength="29"
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
                  maxlength="136"
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
                  maxlength="23"
                  placeholder="Введите цену"
                  v-model="price"
                  @blur="checkValid('blur', 'price')"
                  @focus="checkValid('focus', 'price')"
                />
              </div>
              <button
                class="form-control__button"
                type="submit"
                :disabled="!checkValidForm"
                :class="{ 'form-control__button_valid': checkValidForm }"
              >
                Добавить товар
              </button>
            </div>
          </form>
          <div class="product__cards cards-product">
            <div class="cards-product__body">
              <div
                class="cards-product__card card"
                v-for="(item, index) in products"
                :key="index"
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
                    <button
                      class="card__del"
                      @click="delCard(item.id)"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <transition-group name="slide-fade">
    <app-popup v-if="popupAdd" color="#7bae73">Товар добавлен</app-popup>
    <app-popup v-if="popupDel" color="#FF8484">Товар удален</app-popup>
  </transition-group>
  <app-loader v-if="loading"></app-loader>
</template>


<script>
import { defaultArr } from "@/static";
import defaultImage from "@/assets/img/default-box.png";
import AppLoader from "@/components/AppLoader.vue";
import AppPopup from "@/components/AppPopup.vue";

export default {
  name: "App",
  data() {
    return {
      products: [],
      foundName: "",
      name: "",
      desc: "",
      link: "",
      price: "",
      selected: "default",
      loading: false,
      popupAdd: false,
      popupDel: false,
      valid: {
        name: true,
        link: true,
        price: true,
      },
    };
  },
  mounted() {
    this.loadProducts();
  },
  components: {
    AppLoader,
    AppPopup,
  },
  methods: {
    addCard() {
      this.products.push({
        name: this.name,
        desc: this.desc,
        link: this.link,
        price: this.price,
        priceToNumber: this.stringToNumber,
        id: Date.now(),
      });
      this.name = "";
      this.sortCards(this.selected);
      this.saveCards();
      this.clearInputs();
      this.addPopup();
    },
    delCard(id) {
      const idx = this.products.findIndex((item) => item.id === id);
      this.products.splice(idx, 1);
      this.saveCards();
      this.delPopup();
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
          this.products.sort((a, b) => a.priceToNumber - b.priceToNumber);
          break;
        case "max":
          this.products.sort((a, b) => b.priceToNumber - a.priceToNumber);
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
    clearInputs() {
      this.name = "";
      this.desc = "";
      this.link = "";
      this.price = "";
    },
    loadProducts() {
      if (window.innerWidth < 768) {
        this.renderCards();
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.renderCards();
        this.loading = false;
      }, 1500);
    },
    searchProduct(foundName) {
      if (foundName === "") {
        this.renderCards();
      }
      this.products = this.products.filter((item) =>
        item.name.toLowerCase().startsWith(foundName.toLowerCase())
      );
    },
    addPopup() {
      if (window.innerWidth < 768) return;
      this.popupAdd = true;
      setTimeout(() => {
        this.popupAdd = false;
      }, 1500);
    },
    delPopup() {
      if (window.innerWidth < 768) return;
      this.popupDel = true;
      setTimeout(() => {
        this.popupDel = false;
      }, 1500);
    },
  },
  computed: {
    checkValidForm() {
      return this.name && this.link && this.price ? true : false;
    },
    stringToNumber() {
      return parseInt(this.price.replace(/\s/g, ""));
    },
  },
  watch: {
    selected(value) {
      this.sortCards(value);
    },
    price(value) {
      const valueToNumber = value.replace(/[^0-9]/g, "");
      const spaceToValue = [...valueToNumber].reduceRight(
        (previousValue, currentValue, idx) => {
          const spaceOrNothing =
            (valueToNumber.length - idx) % 3 === 0 ? " " : "";
          return spaceOrNothing + currentValue + previousValue;
        },
        ""
      );
      this.price =
        spaceToValue[0] === " " ? spaceToValue.slice(1) : spaceToValue;
    },
  },
};
</script>

<style>
</style>
