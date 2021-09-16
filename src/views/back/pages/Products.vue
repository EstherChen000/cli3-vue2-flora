<template>
  <div>
    <div class="main">
      <div class="form-row justify-content-star mb-3">
        <div class="form-group col-md-6 col-sm-12 d-flex mr-auto">
          <label for="products" class="col-md-4 col-sm-6 m-auto text-right"
            >請選擇顯示產品</label
          >
          <select
            name="products"
            class="form-control col-md-8 col-sm-6"
            id="products"
            v-model="selected"
          >
            <option value="all" selected>所有商品</option>
            <option value="table">桌花</option>
            <option value="bouquet">花束</option>
            <option value="wedding">捧花</option>
          </select>
        </div>
        <button
          class="btn btn-primary float-right my-auto mx-0"
          @click="openModal('new')"
        >
          建立新的產品
        </button>
      </div>
      <div class="table-responsive-md">
        <table class="table mx-5 table-hover">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in productFilter" :key="item.id">
              <td scope="row">{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">
                {{ item.origin_price | currency }}
              </td>
              <td class="text-right">
                {{ item.price | currency }}
              </td>
              <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="openModal('del', item)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        :pages="pagination"
        @emit="getProducts"
        class="d-flex justify-content-center"
      ></Pagination>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="text"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr/>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: 'edit',
      isLoading: false,
      status: {
        fileUploading: false,
      },
      selected: 'all',
    };
  },
  methods: {
    getProducts(page = 1) {
      // ES6參數預設值
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      const vm = this;
      vm.isNew = isNew;
      if (vm.isNew === 'new') {
        vm.tempProduct = {};
        $('#productModal').modal('show');
      } else if (vm.isNew === 'edit') {
        vm.tempProduct = { ...item };
        $('#productModal').modal('show');
      } else if (vm.isNew === 'del') {
        vm.tempProduct = { ...item };
        $('#delProductModal').modal('show');
      }
    },
    updateProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (vm.isNew === 'edit') {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
        } else {
          $('#productModal').modal('hide');
          vm.getProducts();
        }
      });
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        } else {
          $('#delProductModal').modal('hide');
          vm.getProducts();
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      // 模擬傳統表單送出
      const formData = new FormData();
      // 將欄位新增進formData
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true; // 更改上傳的圖示
      vm.$http
        .post(url, formData, {
          headers: {
            // 將格式改成formData格式
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl; //沒有雙向綁定
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        });
    },
  },
  computed: {
    productFilter() {
      const vm = this;
      if (vm.selected === 'all') {
        return vm.products;
      } if (vm.selected === 'table') {
        return vm.products.filter((item) => item.category === '桌花');
      } if (vm.selected === 'bouquet') {
        return vm.products.filter((item) => item.category === '花束');
      } if (vm.selected === 'wedding') {
        return vm.products.filter((item) => item.category === '捧花');
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 5rem;
  padding: 0 5rem;
  width: 100%;
}
@media (max-width: 769px) {
  .main {
    padding: 0;
  }
}
</style>
