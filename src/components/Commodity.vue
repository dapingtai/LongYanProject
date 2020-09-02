<template>
  <b-tab title="商品" active>
    <p>商品</p>
    <div id="commodity-wrapper" v-for="(item, index) in items" :key="`${index}${item.name}`">
      <b-card
          :title= "item.name"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="commodity-card text-left"
      >
        <b-card-text>
          {{item.annotation}}
        </b-card-text>

        <b-form-spinbutton v-model="item.count" :id="`item-${item.name}`" min="1" max="100" required>
        </b-form-spinbutton>
        <hr>

        <span class="text-left">
          價錢: {{item.count * item.prices}}
        </span>

        <b-button type="reset" variant="danger"
                  class="item-cancel" @click="cancelCart(item.name)">
          取消
        </b-button>
      </b-card>
    </div>
    <hr>
    <div>
      <b-button type="submit" variant="primary" @click="submitOrder">加入購物車</b-button>
    </div>
  </b-tab>
</template>

<script>
import Bus from './bus';

export default {
  name: "Commodity",
  data: ()=> ({
    items:[
      {name:"龍眼乾", img:"", prices: 500, annotation:"正宗龍眼乾", count:0},
      {name:"芒果乾", img:"", prices: 100, annotation:"茫茫芒果乾", count:0}
    ]
  }),
  methods:{
    cancelCart(itemName){
      this.items.forEach(
          (item)=>{
            if (item.name === itemName){
              item.count = 0;
            }
          }
      )
    },
    // 透過Bus，將商品傳出至購物車
    submitOrder(){
      Bus.$emit('val', this.items);
      alert("您的商品已選入購物車，請至購物車查看");
    }
  }
}
</script>

<style scoped>
#commodity-wrapper {
  display: inline-block;
  margin-right: 1%;
}

.item-submit, .item-cancel{
  float: right;
  margin-right: 1%;
}
</style>