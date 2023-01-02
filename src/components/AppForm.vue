<template>
  <form class="product__form form" @submit.prevent="sendCard">
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
        <label class="form-control__label" for="desc">Описание товара</label>
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
</template>

<script>
export default {
  props: ["validPrice"],
  emits: ["add-card"],
  data() {
    return {
      name: "",
      desc: "",
      link: "",
      price: "",
      valid: {
        name: true,
        link: true,
        price: true,
      },
    };
  },
  methods: {
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
    sendCard() {
      this.$emit("add-card", {
        name: this.name,
        desc: this.desc,
        link: this.link,
        price: this.price,
      });
      this.clearInputs();
    },
  },
  computed: {
    checkValidForm() {
      return this.name && this.link && this.price ? true : false;
    },
  },
  watch: {
    price(value) {
      this.price = this.validPrice(value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>