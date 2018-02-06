<template>
    <div class="pro-show-main">
        <ul>
            <li class="clearfix2" v-for="(item,i) in wares" :key="i">
                <a href="javascript:;">
                    <div class="fl img-box">
                        <img :src="item.mainImg" alt="">
                    </div>
                    <div class="fr txt-box">
                        <h3>{{item.wareName}}</h3>
                        <ul class="clearfix2 keycode">
                            <li class="fl" v-for="(key,i) in item.keyWords" :key="i">{{key}}</li>
                        </ul>
                        <p>登录后价格可见</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['wares']
}
</script>

<style lang="scss" scoped>
.pro-show-main{
    width: 900px;
    li{
        padding: 30px 0;
        border-bottom: 1px solid #ccc;
        a{
            &:hover{
                color: #000;
            }
        }
        .img-box{
            width: 240px;
            height: 135px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .txt-box{
            width: 640px;
            h3{
                font-size: 18px;
                font-weight: bold;
            }
            ul{
                margin: 10px 0;
                li{
                    border: 1px solid #00a0e9;
                    padding: 5px 10px;
                    color: #00a0e9;
                    margin-right: 10px;
                }
            }
            p{
                margin-top: 20px;
                font-size: 16px;
                color: #ff6701;
            }
        }
    }
    
}

</style>
