<template>
  <div>
    <div class="bg-light w-100 col-lg-4 col-md-6 col-sm-12 m-auto shadow-lg border border-primary">
      <div class="p-sm-3 p-md-5">
        <ul class="nav nav-tabs nav-pills nav-fill" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="signin-tab"
              data-toggle="tab"
              href="#signin"
              role="tab"
              aria-controls="signin"
              aria-selected="true"
              >登入</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="signup-tab"
              data-toggle="tab"
              href="#signup"
              role="tab"
              aria-controls="signup"
              aria-selected="false"
              >註冊</a
            >
          </li>
        </ul>
        <div class="tab-content text-primary" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="signin"
            role="tabpanel"
            aria-labelledby="signin-tab"
          >
            <div class="sign-in-htm pt-3">
              <div class="form-group">
                <label for="user" class="label">帳戶</label>
                <input
                  id="user"
                  type="text"
                  v-model="user.username"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="pass" class="label">密碼</label>
                <input
                  id="pass"
                  type="password"
                  class="form-control"
                  data-type="password"
                  v-model="user.password"
                />
              </div>
              <div class="form-group form-check">
                <input id="check" type="checkbox" class="form-check-input" checked/>
                <label for="check"
                  >保持登入狀態
                </label>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  class="btn btn-primary btn-lg btn-block"
                  @click.prevent="signin"
                  value="登入"
                />
              </div>
              <hr>
              <div class="font-weight-light text-center">
                <label for="tab-1">&copy;Flora2021</label>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="signup"
            role="tabpanel"
            aria-labelledby="signup-tab"
          >
            <div class="sign-up-htm pt-3">
              <div class="form-group">
                <label for="user" class="label">帳戶</label>
                <input
                  id="user"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label for="pass" class="label">密碼</label>
                <input
                  id="pass"
                  type="password"
                  class="form-control"
                  data-type="password"
                />
              </div>
              <div class="form-group">
                <label for="pass" class="label">再次輸入密碼</label>
                <input
                  id="pass"
                  type="password"
                  class="form-control"
                  data-type="password"
                />
              </div>
              <div class="form-group">
                <label for="pass" class="label">電子信箱</label>
                <input
                  id="pass"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="form-group pt-md-3">
                <input type="submit" class="btn btn-primary btn-lg btn-block" value="註冊"/>
              </div>
              <hr>
              <div class="font-weight-light text-center">
                <label for="tab-1">&copy;Flora2021</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = 'https://vue-course-api.hexschool.io/admin/signin';
      const vm = this;
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token } = response.data.token;
          const { expired } = response.data.expired;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          vm.$router.push('/admin/products');
        }
      });
    },
  },
};
</script>
