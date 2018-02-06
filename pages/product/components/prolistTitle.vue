<template>
  <div class="prolist-row w">
      <h3 class="prolist-title">您已选择:</h3>
      <ul class="prolist-list">
          <li v-for="(item,i) in prolistTitle" :key="i" v-show="item && item.value" @click="remove(item,prolistTitle)">
              <div class="prolist-list-name clearfix2">
                    <p class="fl">{{item.key}}</p>
                    <a class="fr" href="javascript:;">{{item.value}} X</a>
              </div>    
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return{
        }
    },
    methods: {
        remove(item, prolistTitle){
            // console.log(item)
            item.value = ''
            this.$emit('removeTitle',  item)
        }
        
    },
    props: ['prolistTitle']
};
</script>

<style lang="scss" scoped>
.prolist-row{
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    margin-top: 20px;
    .prolist-title{
        width: 70px;
        line-height: 30px;
        font-size: 14px;
        font-weight: normal;
    }
    .prolist-list{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        font-size: 14px;
        li{
            margin-left: 10px;
            margin-bottom: 10px;
            text-align: center;
            .prolist-list-name{
              p{
                padding: 6px 10px;
                color: #fff;
                border: 1px solid #00a0e9;
                background-color: #00a0e9;
                }
                a{
                    padding: 6px 10px;
                    color: #00a0e9;
                    border: 1px solid #00a0e9;
                    }
                }
            } 

        }
            
 }

        

</style>
