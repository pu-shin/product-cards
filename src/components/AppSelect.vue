<template>
  <div class="header__select select" v-click-out="removeSelect">
    <button type="button" class="select__toggle" @click="isActive = !isActive">
      {{ selectedTitle }}
    </button>
    <div class="select__dropdown" v-show="isActive">
      <ul class="select__options" @click="isActive = false">
        <li
          class="select__option"
          v-for="item in options"
          :key="item.value"
          @click="changeSelected(item)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["selected"],
  data() {
    return {
      selectedTitle: "По умолчанию",
      options: [
        { title: "По цене min", value: "min" },
        { title: "По цене max", value: "max" },
        { title: "По названию", value: "title" },
      ],
      isActive: false,
    };
  },
  methods: {
    changeSelected(item) {
      this.$emit("selected", item.value);
      this.selectedTitle = item.title;
    },
    removeSelect() {
      this.isActive = false;
    },
  },
};
</script>


<style scoped lang="scss">
</style>
