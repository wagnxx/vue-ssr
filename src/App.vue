<template>
  <div id="app" class="app-page">
    <Menu mode="horizontal" theme="light" active-name="1">
      <MenuItem name="1">
        <Icon type="ios-paper" />App page
      </MenuItem>
      <MenuItem name="2" to="/">home</MenuItem>
      <MenuItem name="3" to="/item/1">/item/1</MenuItem>
      <MenuItem name="4" to="/item/2">home</MenuItem>
      <MenuItem name="5" to="/class/list">book,websites</MenuItem>
    </Menu>

    <div class="app__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>
 
<style lang="less" scoped>
.app-page {
  /* background: yellowgreen; */
  font-size: 14px;
  /* color: #f00; */
 
  nav ul{
    display: flex;
    justify-content:space-around;

    a{
      text-decoration: none;
    }
  }
}
 
.mixin(paddingNone)                   {padding: 0;}
.mixin(listNone)                   {list-style: none;}
.mixin(@x) when (default()) {z: @x}

ul {
 .mixin(listNone)  ;
  .mixin(paddingNone)  
}
 


 
</style>
