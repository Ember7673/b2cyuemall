<template>
  <div class="pro-row w">
      <h3 class="pro-title">{{title}}:</h3>
      <ul class="pro-list">
          <li v-for="(item,i) in prolist" :key="i">
              <a href="javascript:;" :class="{active : (seletedIndex ? init :index) ==  i  }" @click="isActive(i,item)">{{item[ mapping && mapping.name] || 'name'}}</a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'productlist',
    props: ['title', 'prolist', 'mapping', 'seletedIndex'],
    data() {
        return{
            index: '',
            init: 0
        }
    },
    created() {
    },
    methods: {
        isActive(i,item) {
            this.index = i;
            this.$emit('item',[item,i])
        },
    }
}
</script>

<style lang="scss" scoped>
.pro-row{
    display: flex;
    .pro-title{
        width: 70px;
        line-height: 30px;
        font-size: 14px;
        font-weight: normal;
        margin: 0px;
    }
    .pro-list{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        font-size: 14px;
        margin: 0;
        li{
            margin-left: 10px;
            text-align: center;
            margin-bottom: 15px;
            a{
                display: block;
                padding: 6px 10px;
                border: 1px solid #ccc;
                &:hover, &:active {
                    color: #fff;
                    background-color: #00a0e9;
                    border: 1px solid #00a0e9;
                }
            }
            .active{
                color: #fff;
                background-color: #00a0e9;
                border: 1px solid #00a0e9;
            }
        }
        
    }   
}


</style>
