import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/front/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/front/Login.vue'),
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/front/Shop.vue'),
    meta: {
      breadcrumb: [{
        name: '商店',
      }],
    },
    children: [
      {
        path: 'product_show/:cat',
        name: 'ProductShow',
        component: () => import('../views/front/pages/ProductShow.vue'),
        meta: {
          breadcrumb: [{
            name: '商店',
            link: 'product_show',
          },
          {
            name: '商品列表',
          }],
        },
      },
      {
        path: 'product_detail/:id',
        name: 'ProductDetail',
        component: () => import('../views/front/pages/ProductDetail.vue'),
        meta: {
          breadcrumb: [{
            name: '商店',
            link: 'product_show',
          },
          {
            name: '商品列表',
            link: 'product_show',
          },
          {
            name: '商品詳細介紹',
          }],
        },
      },
    ],
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/front/Cart.vue'),
    children: [
      {
        path: 'cart_order',
        name: 'CartOrder',
        component: () => import('../views/front/pages/CartOrder.vue'),
      },
      {
        path: 'cart_checkout',
        name: 'CartCheckout',
        component: () => import('../views/front/pages/CartCheckout.vue'),
      },
      {
        path: 'cart_confirmation/:orderId',
        name: 'CartConfirmation',
        component: () => import('../views/front/pages/CartConfirmation.vue'),
      },
      {
        path: 'cart_final',
        name: 'CartFinal',
        component: () => import('../views/front/pages/CartFinal.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
