// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    next()
  })
}
