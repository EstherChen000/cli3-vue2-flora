<template>
  <div>
    <div class="container flex-body">
      <div class="flex-content">
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="row border-bottom">
          <h2 class="text-center my-5 mx-auto text-dark">優惠券</h2>
        </div>
        <div class="row py-5">
          <!-- 冬季特賣已逾期 -->
          <div class="coupon overdue">
            <div class="coupon--up">
              <div class="coupon--up--title">冬季特賣</div>
              <div class="coupon--up--contain">10% <span>OFF</span></div>
              <div class="coupon--up--time">2021/01/01-2021/03/01</div>
            </div>
            <div class="coupon--down overdue"></div>
          </div>
          <div class="coupon">
            <div class="coupon--up">
              <div class="coupon--up--title">新會員特惠</div>
              <div class="coupon--up--contain">20% <span>OFF</span></div>
              <div class="coupon--up--time">2021/01/01-2030/12/31</div>
            </div>
            <div class="coupon--down">
              <a
                href="#"
                @click.prevent="doCopy('newmember')"
                class="coupon--down--code"
                data-clipboard-text="newmember"
                >newmember</a
              >
            </div>
          </div>
          <!-- 全館周年慶已逾期 -->
          <div class="coupon overdue">
            <div class="coupon--up">
              <div class="coupon--up--title">全館周年慶</div>
              <div class="coupon--up--contain">12% <span>OFF</span></div>
              <div class="coupon--up--time">2021/01/01-2021/07/31</div>
            </div>
            <div class="coupon--down overdue">
            </div>
          </div>
          <div class="coupon">
            <div class="coupon--up">
              <div class="coupon--up--title">振興特優價</div>
              <div class="coupon--up--contain">15% <span>OFF</span></div>
              <div class="coupon--up--time">2021/01/01-2021/10/31</div>
            </div>
            <div class="coupon--down">
              <a
                href="#"
                @click.prevent="doCopy('3jvpd9')"
                class="coupon--down--code"
                data-clipboard-text="3jvpd9"
                >3jvpd9</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex-footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    Navbar,
    Footer,
    Alert,
  },
  methods: {
    doCopy(text) {
      const vm = this;
      const cb = new Clipboard('.coupon--down--code');
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
};
</script>

<style lang="scss" scoped>
.coupon {
  width: auto;
  height: auto;
  margin: 1rem auto;
  background-color: #d5f5e3;
  border-radius: 2rem;
  text-align: center;
}
.coupon--up {
  border-bottom: #333 2px dashed;
  padding: 2rem;
}
.coupon--up--title {
  font-size: 2rem;
  line-height: 1;
}
.coupon--up--contain {
  font-size: 4rem;
  font-weight: 800;
  span {
    font-size: 1.5rem;
  }
}
.coupon--up--time {
  font-size: 1rem;
  text-align: end;
  line-height: 0.8;
  font-style: italic;
}
.coupon--down {
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0 0 2rem 2rem;
  position: relative;
}
.coupon--down::before {
  content: "";
  position: absolute;
  display: block;
  height: 3rem;
  width: 3rem;
  background-color: #fff;
  top: -1.5rem;
  left: -1.5rem;
  border-radius: 1.5rem;
}
.coupon--down::after {
  content: "";
  position: absolute;
  display: block;
  height: 3rem;
  width: 3rem;
  background-color: #fff;
  top: -1.5rem;
  right: -1.5rem;
  border-radius: 1.5rem;
}
.coupon--down:hover {
  background-color: #abebc6;
  transition: background-color 0.5s ease-in-out;
}
.coupon--down--code {
  font-size: 1.5rem;
  display: block;
  text-decoration: none;
  font-weight: 700;
}
.overdue {
  background-color: #aeb6bf;
}
.overdue:hover {
  background-color: #aeb6bf;
}
</style>
