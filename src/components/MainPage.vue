<template>
  <div>
    <Carousel />
    <div class="hello">
      <h1>{{ msg }}</h1>

      <div>
        <b-tabs content-class="mt-3" fill>
          <!--商品-->
          <Commodity />
          <!--購物車-->
          <ShoppingCart />
          <!--訂單查詢-->
          <OrderSearch />
          <!--關於我們-->
          <AboutMe />
        </b-tabs>
      </div>
    </div>
  </div>

</template>

<script>
import Carousel from "./Carousel.vue";
import Commodity from "./Commodity.vue";
import ShoppingCart from './ShoppingCart.vue';
import OrderSearch from './OrderSearch.vue';
import AboutMe from "./AboutMe.vue";

export default {
  name: 'MainPage',
  data: ()=>(
      {
        msg: "龍眼訂購專區",
      }
  ),
  components: {
    Carousel,
    Commodity,
    ShoppingCart,
    OrderSearch,
    AboutMe
  }
}
</script>

<style scoped>

</style>