<template>
  <div class="content-header__search search">
    <input
      class="search__input"
      type="text"
      placeholder="Поиск товара"
      v-model.trim="foundName"
      @keyup.enter="$emit('search-card', foundName)"
    />
    <button
      class="search__button"
      type="button"
      @click="$emit('search-card', foundName)"
    ></button>
  </div>
</template>

<script>
export default {
  emits: ["search-card"],
  data() {
    return {
      foundName: "",
    };
  },
};
</script>

<style scoped lang="scss">
</style>