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
              label-cols-sm="3"
              label="訂購數量:"
              label-align-sm="right"
              label-for="nested-state"
          >
            <b-form-spinbutton v-model="count" id="demo-sb" min="1" max="100" required>
            </b-form-spinbutton>
          </b-form-group>

          <b-form-group
              label-cols-sm="3"
              label="好友推薦碼:"
              label-align-sm="right"
              label-for="nested-state"
          >
            <b-form-input v-model="friendcode" id="nested-state" required>
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
                placeholder="Tell us somethings"
                v-model="annotation"
            >
            </b-form-textarea>
          </b-form-group>

        </b-form-group>

        <b-button type="submit" variant="primary" @click="submitOrder">提交訂單</b-button>
        &nbsp;
        <b-button type="reset" variant="danger" href="/">返回商城</b-button>

      </b-card>
    </div>
  </b-tab>
</template>

<script>
import CitySelect from "./CitySelect.vue";
import OrderSearch from "./OrderSearch.vue";
import axios from "axios";

export default {
  name: 'ShoppingCart',
  components: {
    CitySelect,
    OrderSearch
  },
  props: {
    msg: String
  },
  data() {
    return{
      name : "",
      phone : "",
      email : "",
      areanumber : 255,
      address : "",
      count : 0,
      friendcode: "",
      annotation : ""
    }
  },
  methods: {
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
        count : this.count,
        friendcode: this.friendcode,
        annotation : this.annotation,
      }
      console.table(formData);

      axios.post('http://localhost:81/', formData).then(
          (res) =>{
              console.log(res);
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
</script>
