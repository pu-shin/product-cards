<template>
  <div class="pop-up"><slot></slot></div>
</template>

<script>
export default {
  props: ["color"],
};
</script>


<style scoped lang="scss">
.pop-up {
  position: absolute;
  height: 36px;
  min-width: 200px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  background-color: v-bind(color);
  top: 72%;
  left: 2%;
  padding: 11px;
  text-align: center;
}
</style>
