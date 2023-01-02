<template>
  <div class="wrapper">
    <header class="header">
      <div class="header__container">
        <div class="header__content">
          <h1 class="header__text">Добавление товара</h1>
          <app-search @search-card="searchProduct"></app-search>
          <app-select @selected="sortCards"></app-select>
        </div>
      </div>
    </header>
    <main class="mainpage">
      <div class="product">
        <div class="product__container">
          <app-form :validPrice="validPrice" @add-card="addCard"></app-form>
          <app-cards
            :products="products"
            @edit-card="editCard"
            @del-card="delCard"
          >
          </app-cards>
        </div>
      </div>
    </main>
  </div>
  <transition-group name="fade-popup">
    <app-popup v-if="popupAdd" color="#7bae73">Товар добавлен</app-popup>
    <app-popup v-if="popupDel" color="#FF8484">Товар удален</app-popup>
  </transition-group>
  <transition name="fade-modal">
    <app-modal
      v-if="modal"
      :item="currentItem"
      :validPrice="validPrice"
      @close="modal = false"
      @send-data="editDataCard"
    ></app-modal>
  </transition>
  <app-loader v-if="loading"></app-loader>
</template>


<script>
import { defaultArr } from "@/static";
import AppLoader from "@/components/AppLoader.vue";
import AppPopup from "@/components/AppPopup.vue";
import AppModal from "@/components/AppModal.vue";
import AppSearch from "@/components/AppSearch.vue";
import AppForm from "@/components/AppForm.vue";
import AppCards from "@/components/AppCards.vue";
import AppSelect from "@/components/AppSelect.vue";

export default {
  name: "App",
  data() {
    return {
      products: [],
      selected: "default",
      loading: false,
      popupAdd: false,
      popupDel: false,
      modal: false,
      currentItem: null,
    };
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    addCard(card) {
      this.products.push({
        ...card,
        priceToNumber: this.stringToNumber(card.price),
        id: Date.now(),
      });
      this.sortCards(this.selected);
      this.saveCards();
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
    loadProducts() {
      const isMobile = window.matchMedia("(max-width:  768px)").matches;

      if (isMobile) {
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
    editCard(item) {
      this.currentItem = item;
      this.modal = true;
    },
    editDataCard(data) {
      const idx = this.products.findIndex((item) => item.id === data.id);
      this.products[idx] = {
        ...data,
        priceToNumber: this.stringToNumber(data.price),
      };
      this.saveCards();
      this.sortCards(this.selected);
    },
    stringToNumber(value) {
      return parseInt(value.replace(/\s/g, ""));
    },
    validPrice(value) {
      const valueToNumber = value.replace(/[^0-9]/g, "");
      const spaceToValue = [...valueToNumber].reduceRight(
        (previousValue, currentValue, idx) => {
          const spaceOrNothing =
            (valueToNumber.length - idx) % 3 === 0 ? " " : "";
          return spaceOrNothing + currentValue + previousValue;
        },
        ""
      );
      return spaceToValue[0] === " " ? spaceToValue.slice(1) : spaceToValue;
    },
  },
  watch: {
    // Вариант №2
    //  products: {
    //    handler(value) {
    //      if (this.foundName) return;

    //      this.sortCards(this.selected);
    //      this.saveCards();
    //    },
    //    deep: true,
    //  },
    selected(value) {
      this.sortCards(value);
    },
  },
  components: {
    AppLoader,
    AppPopup,
    AppModal,
    AppSearch,
    AppForm,
    AppCards,
    AppSelect,
  },
};
</script>

<style>
</style>