<template>
  <div>
    app
    <a href="#" :download="data">下载</a>
  </div>
</template>
 
<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return { data: {} };
  },
  mounted() {
    axios.get("download").then(response => {
      console.log(response.data);
      this.data = response.data.data;
      console.log(this.data);
    });
  }
};
</script>
 
<style scoped>
</style>