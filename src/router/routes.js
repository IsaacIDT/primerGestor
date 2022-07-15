const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/:id", component: () => import("pages/DetalleUsuarioPage.vue") },
      { path: "/products", component: () => import("pages/ProductsPage.vue") },
      {
        path: "/products/:id",
        component: () => import("pages/DetalleProductoPage.vue"),
      },
      {
        path: "/provedores/",
        component: () => import("pages/ProvedoresPage.vue"),
      },
      {
        path: "/provedores/:id",
        component: () => import("pages/DetalleProvPage.vue"),
      },
      {
        path: "/marcas/",
        component: () => import("pages/MarcaPage.vue"),
      },
      {
        path: "/marcas/:id",
        component: () => import("pages/DetalleMarcaPage.vue"),
      },
      {
        path: "/perfiles/",
        component: () => import("pages/PerfilPage.vue"),
      },
      {
        path: "/perfiles/:id",
        component: ()  => import("pages/DetallePerfilPage.vue")
      },
      {
        path: "/categorias/",
        component: () => import("pages/CategoriaPage.vue")
      },
      {
        path: "/categorias/:id",
        component: () => import("pages/DetalleCategoriaPage.vue")
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
