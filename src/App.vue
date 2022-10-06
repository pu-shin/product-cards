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
      <div class="content">
        <div class="content__container">
          <div class="content__form">
            <form action="" class="form-control">
              <label class="form-control__label" for="name"
                >Наименование товара</label
              >
              <input
                class="form-control__input"
                type="text"
                id="name"
                required
                placeholder="Введите наименование товара"
              />
              <label class="form-control__label" for="desc"
                >Описание товара</label
              >
              <input
                class="form-control__input"
                type="text"
                id="desc"
                placeholder="Введите описание товара"
              />
              <label class="form-control__label" for="link"
                >Ссылка на изображение товара</label
              >
              <input
                class="form-control__input"
                type="text"
                id="link"
                required
                placeholder="Введите ссылку"
              />
              <label class="form-control__label" for="price">Цена товара</label>
              <input
                class="form-control__input"
                type="text"
                id="price"
                required
                placeholder="Введите цену"
              />
              <button class="button">Добавить товар</button>
            </form>
          </div>
          <div class="content__cards"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>
