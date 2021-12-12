<template>
  <div class="text-content">
    <input type="checkbox" id="exp" />
    <div class="text">
      <label class="btn" for="exp"></label>
      <span>
        但听得蹄声如雷，十余乘马疾风般卷上山来。马上乘客一色都是玄色薄毡大氅，
        里面玄色布衣，但见人似虎，马如龙，人既矫捷，马亦雄骏，每一匹马都是高头
        长腿，通体黑毛，奔到近处，群雄眼前一亮，金光闪闪，却见每匹马的蹄铁竟然
        是黄金打就。来者一共是一十九骑，人数虽不甚多，气势之壮，却似有如千军万
        马一般，前面一十八骑奔到近处，拉马向两旁一分，最后一骑从中驰出
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "ellipsis",
})
</script>

<style scoped>
.text-content {
  display: flex;
  background: #ccc;
}
.text {
  width: 475px;
  border: aqua solid 1px;
  color: #333;
  font-size: 14px;
  text-align: left;
  /* 和 -webkit-line-clamp 结合使用，将对象作为弹性伸缩盒子模型显示  */
  display: -webkit-box;
  /* 用来限制在一个块元素显示的文本的行数, 2 表示最多显示 2 行。 为了实现该效果，它需要组合其他的WebKit属性 */
  -webkit-line-clamp: 3;
  overflow: hidden;
  /* 和 -webkit-line-clamp 结合使用 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
#exp {
  /* visibility: hidden; */
}
#exp:checked + .text {
  -webkit-line-clamp: 999; /*设置一个足够大的行数就可以了*/
}
.text::before {
  content: "";
  float: right;
  height: 100%;
  margin-bottom: -20px;
}
.btn {
  color: dodgerblue;
  cursor: pointer;
  float: right;
  margin-right: 8px;
  clear: both;
}
.btn::after {
  content: "展开";
}
#exp:checked + .text .btn::after {
  content: "收起";
}
</style>
