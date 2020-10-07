<template>
  <b-tab title="訂單查詢">
    <p><strong>訂單查詢</strong></p>
    <div>
      <b-card bg-variant="light">

        <b-container fluid>
          <b-row class="my-1" v-for="search in searchs" :key="search.title">
            <b-col sm="3">
              <label :for="`type-${search.title}`">{{ search.title }} :</label>
            </b-col>
            <b-col sm="9">
              <b-form-input v-model="search.value" :id="`type-${search.title}`" :type="search.type"></b-form-input>
            </b-col>
          </b-row>
        </b-container>

        <b-button type="submit" variant="primary" @click="submitSearch">送出查詢</b-button>
        &nbsp;
        <b-button type="reset" variant="danger" @click="reloadPage">返回商城</b-button>
      </b-card>
    </div>
  </b-tab>
</template>

<script>
import axios from 'axios';

export default {
  name: "OrderSearch",
  data: () => ({
    searchs: [
      {title: "收件人", type: "text", value: ""},
      {title: "手機後三碼", type: "text", value: ""},
      {title: "訂單後三碼", type: "text", value: ""}
    ]
  }),

  methods: {
    reloadPage(){
      document.location.reload();
    },
    submitSearch(){
      const formData = {
        name: this.searchs[0].value,
        phone: this.searchs[1].value,
        id: this.searchs[2].value
      };
      console.table(formData);


      axios.post('http://chyt.com.tw:3010/orderSearch', formData).then(
        (res)=>{
          console.log(res);
          alert(res.data);
        }
      ).catch(
        (err)=>{
          console.log(err);
        }
      )
    }
  }
}
</script>
