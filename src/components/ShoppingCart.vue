<template>
  <b-tab title="購物車">
    <div>
      <b-card bg-variant="light">
        <b-form-group
            label-cols-lg="3"
            label="購物車"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
        >

          <b-form-group
              label-cols-sm="3"
              label="姓名:"
              label-align-sm="right"
              label-for="nested-street"
          >
            <b-form-input v-model="name" id="nested-street" required>

            </b-form-input>
          </b-form-group>

          <b-form-group
              label-cols-sm="3"
              label="手機:"
              label-align-sm="right"
              label-for="nested-street"
          >
            <b-form-input v-model="phone" id="nested-street" required>
            </b-form-input>
          </b-form-group>

          <b-form-group
              label-cols-sm="3"
              label="Email:"
              label-align-sm="right"
              label-for="nested-city"
          >
            <b-form-input v-model="email" id="nested-city" required>
            </b-form-input>
          </b-form-group>

          <!--縣市區域選擇器-->
          <CitySelect ref="cityChild"/>

          <b-form-group
              label-cols-sm="3"
              label="詳細地址:"
              label-align-sm="right"
              label-for="nested-state"
          >
            <b-form-input v-model="address" id="nested-state" required>
            </b-form-input>
          </b-form-group>

          <b-form-group
              v-for="commodity in commodities"
              :key="commodity.name"
              label-cols-sm="3"
              :label="`${commodity.name} 訂購數量:`"
              label-align-sm="right"
              label-for="nested-state"
          >
            <b-form-input class="text-center" v-model="commodity.count" id="nested-city" disabled>
            </b-form-input>

          </b-form-group>

          <b-form-group
              label-cols-sm="3"
              label="好友推薦碼:"
              label-align-sm="right"
              label-for="nested-state"
          >
            <b-form-input class="text-center" v-model="friendcode" id="nested-state" disabled>
            </b-form-input>
          </b-form-group>

          <b-form-group
              id="textarea"
              label-cols-sm="3"
              label="備註:"
              placeholder="Enter something..."
              label-align-sm="right"
              label-for="nested-country"
          >
            <b-form-textarea
                id="textarea-small"
                size="sm"
                placeholder="告訴我們還需要什麼~"
                v-model="annotation"
            >
            </b-form-textarea>
          </b-form-group>

        </b-form-group>

        <b-button type="submit" variant="primary" @click="submitOrder">提交訂單</b-button>
        &nbsp;
        <b-button type="reset" variant="danger" @click="reloadPage">重新選購</b-button>

      </b-card>
    </div>
  </b-tab>
</template>

<script>
import CitySelect from "./CitySelect.vue";
import OrderSearch from "./OrderSearch.vue";
import axios from "axios";
import Bus from './bus';

export default {
  name: 'ShoppingCart',
  components: {
    CitySelect,
    OrderSearch
  },
  data() {
    return{
      name : "",
      phone : "",
      email : "",
      areanumber : 255,
      address : "",
      friendcode: this.$route.params.friendId,
      annotation : "",
      commodities: []
    }
  },
  mounted() {
    // 透過Bus，傳入選購商品
    Bus.$on('val',
        (data)=>{
          console.log(data);
          this.commodities = data;
        }
    )
  },
  methods: {
    reloadPage(){
      document.location.reload();
    },
    submitOrder() {
      const formData = {
        name :  this.name,
        phone : this.phone,
        email : this.email,
        // 透過ref獲取子元件的town&area data
        town : this.$refs.cityChild.towns[this.$refs.cityChild.townIndex],
        area : this.$refs.cityChild.areas[this.$refs.cityChild.areaIndex],
        areanumber : this.$refs.cityChild.zip,
        address : this.address,
        commodities : this.commodities,
        friendcode: this.friendcode,
        annotation : this.annotation,
      }
      console.table(formData);

      // 回傳未填寫表單
      let emptyform = [];
      Object.values(formData).forEach(
          (value, index)=>{
            if (!value) {
              switch (Object.keys(formData)[index]){
                case "name":
                  emptyform.push(" 姓名");
                  break;
                case "phone":
                  emptyform.push(" 手機");
                  break;
                case "email":
                  emptyform.push(" Email");
                  break;
                case "address":
                  emptyform.push(" 詳細地址");
                  break;
                default:
                  break;
              }

            }
          }
      )

      // 資料不為空，即傳送表單
      if (emptyform.length > 0){
        alert(`${emptyform} 未填寫`);
      }else {
        console.log("表單皆填寫，送出表單");
        axios.post('http://localhost:81/orderAdd', formData).then(
            (res) =>{
              // console.log(res);
              alert(`下訂成功，您的訂單編號為: ${res.data}`);
            }
        ).catch(
            (err) => {
              console.log(err);
            }
        )
      }
    }
  }

}
</script>
