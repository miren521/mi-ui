<template>
  <view class="m-index-bar-demo">
    <m-index-bar>
        <view v-for="(group, key) in contacts" :key="key">
          <m-index-anchor :index="key" />
          <view class="m-index-bar-demo__item" v-for="item in group" :key="item.name">
            <view class="m-index-bar-demo__avatar">{{ item.name.charAt(0) }}</view>
            <view class="m-index-bar-demo__info">
              <text class="m-index-bar-demo__name">{{ item.name }}</text>
              <text class="m-index-bar-demo__phone">{{ item.phone }}</text>
            </view>
          </view>
        </view>
      </m-index-bar>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const contacts = reactive({
  'A': [
    { name: '阿杰', phone: '13800138001' },
    { name: '阿玲', phone: '13800138002' },
    { name: '阿强', phone: '13800138003' },
    { name: '阿珍', phone: '13800138004' }
  ],
  'B': [
    { name: '宝马', phone: '13800138005' },
    { name: '贝贝', phone: '13800138006' },
    { name: '彬彬', phone: '13800138007' }
  ],
  'C': [
    { name: '陈晨', phone: '13800138008' },
    { name: '楚楚', phone: '13800138009' },
    { name: '翠翠', phone: '13800138010' },
    { name: '葱葱', phone: '13800138011' }
  ],
  'D': [
    { name: '大伟', phone: '13800138012' },
    { name: '丹丹', phone: '13800138013' },
    { name: '东东', phone: '13800138014' },
    { name: '豆豆', phone: '13800138015' },
    { name: '多多', phone: '13800138016' }
  ],
  'E': [
    { name: '二丫', phone: '13800138017' },
    { name: '阿飞', phone: '13800138018' }
  ],
  'F': [
    { name: '芳芳', phone: '13800138019' },
    { name: '菲菲', phone: '13800138020' },
    { name: '芳芳', phone: '13800138021' },
    { name: '福福', phone: '13800138022' }
  ],
  'G': [
    { name: '刚哥', phone: '13800138023' },
    { name: '格格', phone: '13800138024' },
    { name: '瓜瓜', phone: '13800138025' }
  ],
  'H': [
    { name: '海涛', phone: '13800138026' },
    { name: '红红', phone: '13800138027' },
    { name: '花花', phone: '13800138028' },
    { name: '欢欢', phone: '13800138029' },
    { name: '慧慧', phone: '13800138030' }
  ],
  'J': [
    { name: '佳佳', phone: '13800138031' },
    { name: '静静', phone: '13800138032' },
    { name: '晶晶', phone: '13800138033' },
    { name: '俊俊', phone: '13800138034' }
  ],
  'K': [
    { name: '凯凯', phone: '13800138035' },
    { name: '可可', phone: '13800138036' }
  ],
  'L': [
    { name: '乐乐', phone: '13800138037' },
    { name: '莉莉', phone: '13800138038' },
    { name: '亮亮', phone: '13800138039' },
    { name: '琳琳', phone: '13800138040' },
    { name: '露露', phone: '13800138041' }
  ],
  'M': [
    { name: '萌萌', phone: '13800138042' },
    { name: '美美', phone: '13800138043' },
    { name: '明明', phone: '13800138044' },
    { name: '苗苗', phone: '13800138045' },
    { name: '毛毛', phone: '13800138046' }
  ],
  'N': [
    { name: '娜娜', phone: '13800138047' },
    { name: '妮妮', phone: '13800138048' },
    { name: '宁宁', phone: '13800138049' }
  ],
  'P': [
    { name: '鹏鹏', phone: '13800138050' },
    { name: '平平', phone: '13800138051' },
    { name: '皮皮', phone: '13800138052' }
  ],
  'Q': [
    { name: '倩倩', phone: '13800138053' },
    { name: '强强', phone: '13800138054' },
    { name: '青青', phone: '13800138055' }
  ],
  'R': [
    { name: '冉冉', phone: '13800138056' },
    { name: '荣荣', phone: '13800138057' },
    { name: '瑞瑞', phone: '13800138058' }
  ],
  'S': [
    { name: '莎莎', phone: '13800138059' },
    { name: '珊珊', phone: '13800138060' },
    { name: '思思', phone: '13800138061' },
    { name: '素素', phone: '13800138062' },
    { name: '森森', phone: '13800138063' }
  ],
  'T': [
    { name: '婷婷', phone: '13800138064' },
    { name: '天天', phone: '13800138065' },
    { name: '彤彤', phone: '13800138066' }
  ],
  'W': [
    { name: '文文', phone: '13800138067' },
    { name: '微微', phone: '13800138068' },
    { name: '伟伟', phone: '13800138069' },
    { name: '旺旺', phone: '13800138070' }
  ],
  'X': [
    { name: '西西', phone: '13800138071' },
    { name: '晓晓', phone: '13800138072' },
    { name: '欣欣', phone: '13800138073' },
    { name: '秀秀', phone: '13800138074' }
  ],
  'Y': [
    { name: '洋洋', phone: '13800138075' },
    { name: '依依', phone: '13800138076' },
    { name: '圆圆', phone: '13800138077' },
    { name: '媛媛', phone: '13800138078' },
    { name: '悦悦', phone: '13800138079' }
  ],
  'Z': [
    { name: '真真', phone: '13800138080' },
    { name: '珍珍', phone: '13800138081' },
    { name: '智智', phone: '13800138082' },
    { name: '壮壮', phone: '13800138083' },
    { name: '子子', phone: '13800138084' }
  ]
})
</script>

<style lang="scss" scoped>
.m-index-bar-demo {
  height: 100vh;
  background-color: #f5f5f7;

  &__item {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    background: #fff;
    border-bottom: 1rpx solid #f0f0f0;

    &:active {
      background-color: #f8f9fa;
    }
  }

  &__avatar {
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    color: #fff;
    font-weight: 600;
    margin-right: 24rpx;
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 30rpx;
    color: #323233;
    font-weight: 500;
    margin-bottom: 8rpx;
  }

  &__phone {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
