<template>
  <div>
    <div class="container flex-body">
      <div class="flex-content">
        <Navbar></Navbar>
        <div class="banner row border-bottom pt-5 pb-5">
          <h2 class="font-weight-bolder text-center w-100">FAQ</h2>
        </div>
        <div class="card my-5 text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: whichIs === '所有問題' }"
                  href="#"
                  @click.prevent="pickQ('所有問題')"
                  >所有問題</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: whichIs === '付款問題' }"
                  href="#"
                  @click.prevent="pickQ('付款問題')"
                  >付款問題</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: whichIs === '訂購問題' }"
                  href="#"
                  @click.prevent="pickQ('訂購問題')"
                  >訂購問題</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: whichIs === '配送問題' }"
                  href="#"
                  @click.prevent="pickQ('配送問題')"
                  >配送問題
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body p-0">
            <div class="accordion w-100 ml-auto" id="accordion">
              <div class="card" v-for="(item, index) in faqFilter" :key="index">
                <div class="card-header bg-white">
                  <button
                    class="btn collapsed p-0"
                    type="button"
                    @click="toggleCollapse(item, index)"
                    data-toggle="collapse" :data-target="item.id"
                  >
                    <ul class="list-unstyled mb-0">
                      <li>{{ "Q" + (index + 1) + ". " + item.question }}</li>
                    </ul>
                  </button>
                </div>
                <div :id="item.id" class="collapse" :key="index" data-parent="#accordion">
                  <div class="card-body bg-primary text-white">
                    <ul class="list-unstyled mb-0">
                      <li>{{ "A" + (index + 1) + ". " + item.answer }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-footer"><Footer></Footer></div>
    </div>
  </div>
</template>
<script>
import Navbar from './Navbar';
import Footer from './Footer';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      whichIs: '所有問題',
      items: [
        {
          category: '付款問題',
          question: '請問付款方式有哪些？',
          answer: '目前僅提供信用卡(VISA、Mastercard、JCB)支付。',
          id: 'collapseA',
        },
        {
          category: '付款問題',
          question: '請問能否貨到付款？',
          answer: '目前尚未開放貨到付款功能，須事先付款才能幫您安排出貨。',
          id: 'collapseB',
        },
        {
          category: '訂購問題',
          question: '請問是否有當日送花的服務？',
          answer: '因配送及製作皆耗時，不提供當日送花的服務。',
          id: 'collapseC',
        },
        {
          category: '配送問題',
          question: '請問有送到離島嗎？',
          answer: '目前不開放離島配送的服務。',
          id: 'collapseD',
        },
        {
          category: '配送問題',
          question: '你們的花都如何包裝的？',
          answer:
            '我們會盡量使用精美的箱子或盒子給您，並使用常見的緩衝包材，例如：氣泡袋、紙板、泡棉等等。',
          id: 'collapseE',
        },
        {
          category: '配送問題',
          question: '請問送貨時間是？ 有辦法指定時間嗎？',
          answer:
            '黑貓宅急便配送時間基本上分為13:00前、後。 最晚的配送時間為晚間18:00。 只可以指定時段，無法指定確切的送貨時間。',
          id: 'collapseF',
        },
      ],
    };
  },
  methods: {
    pickQ(Q) {
      const vm = this;
      vm.whichIs = Q;
    },
    toggleCollapse(item, index) {
      $(`#${item.id}`).collapse('toggle');
    },
  },
  computed: {
    faqFilter() {
      const vm = this;
      let pay = [];
      let order = [];
      let send = [];
      if (vm.whichIs === '付款問題') {
        pay = vm.items.filter((item) => item.category === '付款問題');
        return pay;
      } if (vm.whichIs === '訂購問題') {
        order = vm.items.filter((item) => item.category === '訂購問題');
        return order;
      } if (vm.whichIs === '配送問題') {
        send = vm.items.filter((item) => item.category === '配送問題');
        return send;
      } if (vm.whichIs === '所有問題') {
        return vm.items;
      }
    },
  },
};
</script>
