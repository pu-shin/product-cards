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
          <form class="product__form form-control" action="" @submit.prevent>
            <label
              class="form-control__label form-control__label_required"
              for="name"
              >Наименование товара</label
            >
            <input
              class="form-control__item"
              type="text"
              id="name"
              placeholder="Введите наименование товара"
            />
            <label class="form-control__label" for="desc"
              >Описание товара</label
            >
            <textarea
              class="form-control__item form-control__textarea"
              type="text"
              id="desc"
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
            />
            <button class="form-control__button">Добавить товар</button>
          </form>
          <div class="product__cards cards-product">
            <div class="cards-product__card card" v-for="item in 6" :key="item">
              <div class="card__image">
                <img src="@/image/rectangle.jpg" alt="Фото товара" />
              </div>
              <div class="card__body">
                <h2 class="card__header">Наименование товара</h2>
                <p class="card__text">
                  Довольно-таки интересное описание товара в несколько строк.
                  Довольно-таки интересное описание товара в несколько строк
                </p>
                <span class="card__price">10 000 руб.</span>
                <button class="card__del"></button>
              </div>
            </div>
          </div>
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
