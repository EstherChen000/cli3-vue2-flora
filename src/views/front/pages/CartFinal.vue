<template>
  <div>
    <div class="container d-flex h-100 justify-content-center align-items-center">
      <div class="col-md-6">
        <div
          class="card m-auto text-center"
        >
          <img :src="finalImg" class="card-img-top" alt="購物完成">
          <div class="card-body">
            <h5 class="card-title font-weight-bold">付款完成</h5>
            <p class="card-text font-weight-bold font-text">
              感謝您的選購，歡迎再度光臨！
            </p>
            <p class="card-text font-text">
              付款成功後，我們會盡快出貨給您
              <br />
              如有任何疑問，請來電至 02-12345678 ，客服專員竭誠為您服務。
            </p>
            <router-link class="btn btn-primary" to="/shop/product_show/all"
              >繼續購物</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import finalImg from '@/assets/img/final.jpg';

export default {
  data() {
    return {
      finalImg,
    };
  },
};
</script>
