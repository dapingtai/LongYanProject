<template>
  <div id="app">
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
import Carousel from "./components/Carousel";
import Commodity from "@/components/Commodity";
import ShoppingCart from './components/ShoppingCart';
import OrderSearch from './components/OrderSearch';
import AboutMe from "./components/AboutMe";

export default {
  name: 'App',
  data: ()=>({
    msg: "龍眼訂購專區",
  }),
  components: {
    Carousel,
    Commodity,
    ShoppingCart,
    OrderSearch,
    AboutMe
  }
}
</script>

<style>
#app {
  font-family: 微軟正黑體,新細明體,Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

</style>
