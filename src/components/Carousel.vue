<template>
  <!--產品輪播(圖)-->
  <div class="carousel-wrap">
    <transition-group tag="div" name="carousel-slide" class="slide-div">
      <div v-for="(carousel, index) in carousels"
          :key="index" v-show="index === active"
          @mouseenter="stop" @mouseleave="start"
      >
        <a :href="carousel.href">
          <img :src="carousel.img" alt="cart logo">
        </a>
      </div>
    </transition-group>
    <!--產品輪播(左右按鈕)-->
    <a class="carousel-prev" href="#" @click="toPrev" @mouseover="stop">
      <i class="fas fa-chevron-circle-left fa-3x" ></i>
    </a>
    <a class="carousel-next" href="#" @click="toNext" @mouseover="stop">
      <i class="fas fa-chevron-circle-right fa-3x"></i>
    </a>
    <!--產品輪播(下方按鈕)-->
    <div class="carousel-buttons">
      <span v-for="(button, index) in total"
            :class="{'active': index === active}"
            :key="button"
            @mouseover="change(index)"
      >
      </span>
    </div>
  </div>
</template>

<script>

// 使用引入解決img動態找不到本地圖片路徑問題
import jpg1 from '../assets/longyan.jpg';
import jpg2 from '../assets/longyan2.jpg';
import jpg3 from '../assets/longyan3.jpg';

const carousels = [
  {img: jpg1, href: "#"},
  {img: jpg2, href: "#"},
  {img: jpg3, href: "#"},
];


export default {
  name: "Carousel",
  data: ()=> ({
    active: 0,
    auto: true,
    carousels: carousels,
    timer: null
  }),
  computed: {
    total(){
      return this.carousels.length;
    }
  },
  methods: {
    moveImage(type="next"){
      switch (type){
        case "next":
          if (this.active >= this.total-1){
            this.active = 0;
          }else {
            this.active += 1;
          }
          break;
        case "prev":
          if (this.active === 0){
            this.active = this.total-1;
          }else {
            this.active -= 1;
          }
          break;
      }
    },
    start(){
      this.auto = true;
    },
    stop(){
      this.auto = false;
    },
    autoNext(){
      this.moveImage('next');
    },
    toNext(){
      this.moveImage('next');
    },
    toPrev(){
      this.moveImage('prev');
    },
    change(index){
      this.active = index;
      this.stop();
    },
    autoplay() {
      setInterval(
          ()=>{
            if (this.auto){
              this.autoNext();
            }
          },3000
      );
    }
  },
  mounted() {
    this.autoplay();
  }
}
</script>


<style scoped>
/*** carousel ***/
.carousel-wrap {
  width: 100%;
  height: 450px;
  overflow: hidden;
}

.slide-div{
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-div div{
  position: absolute;
  width: 100%;
  height: 100%;
}

img{
  width: 680px;
  height: 500px;
}

.carousel-prev, .carousel-next {
  position: absolute;
  z-index: 10;
  top: 250px;
  transform: translateY(-50%);
  transition: opacity .3s;
  color: #b2b2b2;
  opacity: 0.6;
}

.carousel-prev:hover, .carousel-next:hover{
  color: gray;
  opacity: 1;
}

.carousel-next{
  right: 5%;
}
.carousel-prev{
  left: 5%;
}

.carousel-buttons {
  position: absolute;
  z-index: 10;
  top: 450px; /*需參照img的高度*/
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
}

.carousel-buttons span {
  display: inline-block;
  height: 6px;
  width: 30px;
  margin: 0 3px;
  background-color: #b2b2b2;
  cursor: pointer;
}

.carousel-buttons span:hover{
  background-color: blue;
  opacity: 1;
}
.carousel-buttons .active{
  background-color: blue;
  opacity: 0.6;
}

/*Css slide 過度*/
.carousel-slide-enter{
  transform: translateX(100%);
}

.carousel-slide-enter-to{
  transition: all 1s ease;
  transform: translateX(0);
}

.carousel-slide-leave{
  transform: translateX(0);
}

.carousel-slide-leave-active{
  transition: all 1s ease;
  transform: translateX(-100%);
}
</style>