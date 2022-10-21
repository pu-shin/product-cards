<template>
  <div class="modal">
    <div class="modal__body">
      <span class="modal__close" @click="$emit('close')">&#10006;</span>
      <form
        class="modal__content content-modal form-control"
        @submit.prevent="sendData"
      >
        <div class="content-modal__row form-control__row">
          <label class="content-modal__label form-control__label" for="link"
            >Изменить изображение</label
          >
          <input
            class="content-modal__item form-control__item"
            type="text"
            id="link"
            placeholder="Ведите ссылку"
            v-model="editLink"
          />
        </div>
        <div class="content-modal__row form-control__row">
          <label class="content-modal__label form-control__label" for="name"
            >Изменить наименование</label
          >
          <input
            class="content-modal__item form-control__item"
            type="text"
            id="name"
            placeholder="Ведите наименование товара"
            v-model="editName"
          />
        </div>
        <div class="form-control__row">
          <label class="content-modal__label form-control__label" for="desc"
            >Изменить описание товара</label
          >
          <textarea
            class="
              content-modal__item
              form-control__item form-control__textarea
            "
            type="text"
            id="desc"
            maxlength="136"
            placeholder="Введите описание товара"
            v-model="editDesc"
          />
        </div>
        <div class="form-control__row">
          <label class="content-modal__label form-control__label" for="price"
            >Изменить цену</label
          >
          <input
            class="content-modal__item form-control__item"
            id="price"
            maxlength="23"
            placeholder="Введите цену"
            v-model="editPrice"
          />
        </div>
        <button
          class="content-modal__button form-control__button"
          type="submit"
          :disabled="!checkValidForm"
          :class="{ 'form-control__button_valid': checkValidForm }"
        >
          Применить изменения
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close", "send-data"],
  props: ["item", "validPrice", "checkValidForm"],
  data() {
    return {
      editName: this.item.name,
      editDesc: this.item.desc,
      editLink: this.item.link,
      editPrice: this.item.price,
    };
  },
  methods: {
    sendData() {
      this.$emit("send-data", {
        name: this.editName,
        price: this.editPrice,
        link: this.editLink,
        desc: this.editDesc,
        id: this.item.id,
      });
      this.$emit("close");
    },
  },
  computed: {
    checkValidForm() {
      return this.editName && this.editLink && this.editPrice ? true : false;
    },
  },
  watch: {
    editPrice(value) {
      this.editPrice = this.validPrice(value);
    },
  },
};
</script>


<style scoped lang="scss">
</style>