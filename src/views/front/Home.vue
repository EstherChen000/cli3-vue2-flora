<template>
  <div>
    <div class="container bg-white flex-body">
      <div class="flex-content">
        <Alert></Alert>
        <!-- 導覽列 -->
        <Navbar></Navbar>

        <!-- 輪播 -->
        <div class="mb-5">
          <router-link to="/shop/product_show/all"
            ><Carousel></Carousel
          ></router-link>
        </div>

        <!-- 新上市 -->
        <div class="row bg-white p-0 mb-5 border border-primary">
          <div
            class="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center"
          >
            <div class="text-center">
              <h3 class="display-5 text-primary font-weight-bold">最新消息</h3>
              <p class="mb-0 font-text">新品上市！ 夏季商品新上架</p>
              <p class="font-text">歡迎前去挑選</p>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 bg-white p-0">
            <div class="content">
              <router-link to="/shop/product_show/all">
                <div class="content-overlay"></div>
                <img
                  class="content-image"
                  :src="newArrivalImg"
                  alt="新上品-新上市-當季花卉"
                />
                <div class="content-details text-light">
                  <button class="btn btn-primary">
                    來看更多<i class="fas fa-arrow-circle-right ml-1"></i>
                  </button>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 快速產品分類 -->
        <div class="row bg-white mb-5 justify-content-around">
          <h3
            class="display-4 text-center col-md-12 my-5"
            data-aos="fade-right"
          >
            －想要找什麼呢？
          </h3>
          <div
            class="col-md-3 col-sm-12 p-3 bg-white m-3 shadow content"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="1000"
          >
            <router-link to="/shop/product_show/table">
              <div class="content-overlay"></div>
              <img
                class="content-image"
                :src="tableImg"
                alt="桌花-居家風格-居家擺設-裝飾品"
              />
              <div class="mt-3 text-dark">
                <p class="display-5 font-weight-bold">桌花</p>
                <p class="font-text">挑選時下花卉，讓您自由的變換居家風格，創造舒適的氛圍。</p>
              </div>
              <div class="content-details text-light">
                <h3 class="content-title">居家布置</h3>
                <p class="content-text font-text">輕鬆妝點家中你喜愛的空間！</p>
              </div>
            </router-link>
          </div>
          <div
            class="col-md-3 col-sm-12 d-flex flex-column p-3 bg-white m-3 shadow content"
            data-aos="fade-up"
            data-aos-duration="2500"
            data-aos-delay="1000"
          >
            <router-link to="/shop/product_show/bouquet">
              <div class="content-overlay"></div>
              <img
                class="content-image"
                :src="bouquetImg"
                alt="花束-禮品-禮物-畢業禮物-約會"
              />
              <div class="mt-3 text-dark">
                <p class="display-5 font-weight-bold">花束</p>
                <p class="font-text">配合時節，輕鬆搭配各種場合，送出最符合心意的禮物。</p>
              </div>
              <div class="content-details text-light">
                <h3 class="content-title">送禮慶賀</h3>
                <p class="content-text font-text">為親朋好友獻上真摯的祝福！</p>
              </div>
            </router-link>
          </div>
          <div
            class="col-md-3 col-sm-12 d-flex flex-column p-3 bg-white m-3 shadow content"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-delay="1000"
          >
            <router-link to="/shop/product_show/wedding">
              <div class="content-overlay"></div>
              <img
                class="content-image"
                :src="weddingImg"
                alt="結婚-婚禮-捧花-新娘捧花"
              />
              <div class="mt-3 text-dark">
                <p class="display-5 font-weight-bold">捧花</p>
                <p class="font-text">無論在任何月份，都能挑選到一款適合您婚禮風格的捧花。</p>
              </div>
              <div class="content-details text-light">
                <h3 class="content-title">結婚捧花</h3>
                <p class="content-text font-text">傳承幸福的美麗！</p>
              </div>
            </router-link>
          </div>
        </div>

        <!-- 熱銷商品 -->
        <div
          class="row bg-white p-0 mb-5 border border-primary"
          data-aos="flip-left"
          data-aos-delay="5000"
          data-aos-duration="1000"
          data-aos-anchor="#hot-product"
        >
          <div
            class="col-md-6 col-sm-12 d-flex flex-column
            justify-content-md-center align-items-center"
          >
            <div class="text-right">
              <h3 class="display-5 text-primary font-weight-bold">熱賣商品</h3>
              <p class="font-text">歡迎挑選目前最多人氣的商品！</p>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 p-0">
            <div class="content">
              <router-link to="/shop/product_show/all">
                <div class="content-overlay"></div>
                <img
                  class="content-image"
                  :src="onSaleImg"
                  alt="人氣商品-熱門商品-熱賣商品"
                />
                <div class="content-details text-light">
                  <button class="btn btn-primary">
                    來看更多<i class="fas fa-arrow-circle-right ml-1"></i>
                  </button>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div id="hot-product" class="my-5"><SaleSwiper></SaleSwiper></div>

        <!-- 購物流程 -->
        <div class="row bg-white p-0 mb-5 justify-content-around">
          <h3
            class="display-4 text-center col-md-12 mt-5"
            data-aos="flip-up"
            data-aos-duration="2000"
            data-aos-delay="500"
          >
            ～心動不如馬上行動～
          </h3>
          <div
            class="bg-white flow border border-primary"
            data-aos="fade-down"
            data-aos-delay="1000"
          >
            <h5 class="display-5 py-3 font-weight-bold border-bottom">
              step 1
            </h5>
            <p class="font-text">選購商品加入購物車</p>
            <p class="font-weight-light font-text">
              產品不提供當日配送，請確認到貨日期在下訂單。
            </p>
          </div>
          <div
            class="bg-white flow border border-primary"
            data-aos="fade-down"
            data-aos-delay="1500"
          >
            <h5 class="display-5 py-3 font-weight-bold border-bottom">
              step 2
            </h5>
            <p class="font-text">確認商品並輸入優惠碼</p>
            <p class="font-weight-light font-text">
              當前適用優惠碼請前往<router-link to="/couponnews"
                >優惠資訊</router-link
              >確認。
            </p>
          </div>
          <div
            class="bg-white flow border border-primary"
            data-aos="fade-down"
            data-aos-delay="2000"
          >
            <h5 class="display-5 py-3 font-weight-bold border-bottom">
              step 3
            </h5>
            <p class="font-text">選擇付款方式及輸入配送地址</p>
          </div>
          <div
            class="bg-white flow border border-primary"
            data-aos="fade-down"
            data-aos-delay="2500"
          >
            <h5 class="display-5 py-3 font-weight-bold border-bottom">
              step 4
            </h5>
            <p class="font-text">完成購物，等待商品到貨</p>
          </div>
        </div>

        <!-- 關於我們 -->
        <div class="row py-5">
          <div class="col-md-6 col-sm-12 p-0">
            <img class="img-fluid" :src="aboutMeImg" alt="flora-花店-新竹" />
          </div>
          <div
            class="col-md-6 col-sm-12 p-0 bg-white d-flex align-items-center justify-content-center"
          >
            <div class="px-5">
              <h3 class="display-4 pt-5 font-weight-bold">關於我們</h3>
              <p class="font-weight-bold font-text">
                為您提供當季的鮮花組合<i class="float-right">－by Flora</i>
              </p>
              <p class="pb-5 font-text">
                服務時間 ：<br />
                平日 8：00 - 18：00<br />
                例假日 10：00 - 17：00<br />
                服務專線： 02-333-4444<br />
                地址： 新竹市東區經國路一段555號
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-footer">
        <!-- Footer -->
        <Footer></Footer>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="Notification"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              新會員權益提醒
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>
              結帳時輸入優惠代碼：<span class="copy text-danger">newmember</span>
            </p>
            <p class="font-weight-bold h2">
              商品全面再打<span class="text-danger">八折</span>
            </p>
            <small class="text-muted">優惠期限： 2021/01/01-2021/12/31</small>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              關閉視窗
            </button>
            <button
              type="button"
              class="btn btn-primary copy-btn"
              @click.prevent="doCopy('newmember')"
              data-clipboard-target=".copy"
            >
              複製優惠代碼
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Clipboard from 'clipboard';
import Navbar from './Navbar.vue';
import Carousel from './Carousel.vue';
import Footer from './Footer.vue';
import SaleSwiper from './Sale-swiper.vue';
import Alert from '@/components/AlertMessage.vue';

// 圖片匯入
import aboutMeImg from '@/assets/img/info.jpg';
import tableImg from '@/assets/img/qp_01.jpg';
import bouquetImg from '@/assets/img/qp_02.jpg';
import weddingImg from '@/assets/img/qp_03.jpg';
import newArrivalImg from '@/assets/img/na_01.jpg';
import onSaleImg from '@/assets/img/os_01.jpg';

export default {
  name: 'Home',
  components: {
    Navbar,
    Carousel,
    Footer,
    SaleSwiper,
    Alert,
  },
  data() {
    return {
      newArrivalImg,
      tableImg,
      bouquetImg,
      weddingImg,
      onSaleImg,
      aboutMeImg,
    };
  },
  methods: {
    doCopy(text) {
      const vm = this;
      const cb = new Clipboard('.copy-btn');
      cb.on('success', () => {
        cb.destroy(); // 釋放内存記憶體
        vm.$bus.$emit('message:push', `已複製優惠碼${text}`, 'success');
      });
      cb.on('error', () => {
        cb.destroy(); // 釋放内存記憶體
        vm.$bus.$emit('message:push', '複製失敗', 'warning');
      });
    },
  },
  mounted() {
    $('#Notification').modal('show');
  },
};
</script>

<style lang="scss" scoped>
.flow {
  width: 23%;
  padding: 1.5rem;
  margin: 5rem 0;
  text-align: center;
}
@media (max-width: 769px) {
  .flow {
    width: 48%;
    margin: 1rem;
  }
}
@media (max-width: 420px) {
  .flow {
    width: 90%;
  }
}
</style>
