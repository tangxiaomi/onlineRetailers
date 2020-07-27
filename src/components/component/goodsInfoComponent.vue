<template>
  <div class="goods-info">
        <div class="goods-image">
          <!-- 使用vans里的懒加载 -->
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice'],
  filters: {
    moneyFilter(money) {
    return toMoney(money)
    }
   },
  data() {
    return {
     
    };
  }
};
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>