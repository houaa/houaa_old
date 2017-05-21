<template>
<div id="container">
  <div id="username">
    用户名 1a2iuw81
  </div>
  <div id="form">
    <div id="name">
      <span id="title">姓名</span>
      <span><input type="text" v-model="name"></span>
    </div>
    <div id="sex">
      <span id="title">性别</span>
      <span><input type="text" v-model="sex"></span>
    </div>
    <div id="img">
      <span id="title">头像</span>
      <span><img :src="img" /></span>
    </div>
    <div id="schoolAndPart">
      <span id="title">学校与校区</span>
      <span><input type="text" v-model="school"><input type="text" v-model="part"></span>
    </div>
    <div id="major">
      <span id="title">主修专业</span>
      <span><input type="text" v-model="major"></span>
    </div>
    <div id="self">
      <span id="title">自我介绍</span>
      <span><input type="text" v-model="self"></span>
    </div>
    <div id="name">
      <span id="title">姓名</span>
      <span><input type="text"></span>
    </div>
    <div id="grade">
      <span id="title">学业水平</span>
      <span><input type="text" v-model="grade"></span>
    </div>
    <div id="on">
      <span id="title">是否显示在教师列表</span>
      <span>是</span>
    </div>
    <div id="tel">
      <span id="title">手机号</span>
      <span><input type="text" v-model="tel"></span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Self',
  data() {
    return {
      name: '未知',
      sex: '未知',
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABNtJREFUeNrsW71z0zAUt9z+AenWjXTrXYeGjS3J0mMjGbhjS/IXtBmY08wMSUamOiPHEDNxXIe4I1OSpSse6YRH2HgvvIBwJflLstXCu9M5TW1Z76ef3pcUx/kvcnn55rQG7epfB2H1mEFwU9wzg9YHEBbIiMcGAEuzDODyBRpeI2jD9683nmaWNeBSh9aI/Qvft8YG74wqAYAGeAmXEfdVAG2eFwhSuAWtSdc0zAqh+dBu4L1+2QDwLIjP0HZQOEAYWCB4rkHP4fU0g8JJYMyhefDO0DgAEhbYIh4ty1xLxM1w75SQt036yE6aIHMMIBYgfZcWG3U0mANgwzrtA3tZer+9vgtPzg5x/T6zFIBDaK9gjHcw1rV2BvDBkcBl2SZjYMKlThvAS9tSe8DLKE0EmwsAsrjdBwBCPwkEVqR38vPLB7AcBrKgjRXtmUBYUIBjszwVeQemq3cAYgKXC4sBCAmESIcRFNmFoeXGsS6KZJnut9CSQCaca4j5TUibz1mYqbdwQPQIfVskAADaxgEQpL89MpQNm1jAyn4zlyLz9YDKWMCqngoApE4ZXdk24whrCXtVAwBJSwQtgATmLfz5o0xGwHs/MY2U/p2SFqnfkb24KsFWYAXriBVUfEL0jQuWqgaG+ta6DJjmWdJaNaZExiQIQzfn7IiU98mweLpGRyzyDQJwup/jIZHyhSiflMnR+0wEU3U34+yjhe4IkoyhqSkig2oK3FbWJSAqi49N7dpwIGDUFpjo2804+3EfHSWteQx0KNgpKuNKAaBY/l5IqVC8Aw13k7YNPn+D1i/IgrBKADqC7zYS5VHRRcxwbb1HERBMeAQ3Jf07kjhdVnufKLqbFBjvh6oYINsTjCRBkiqpqZE9ySPr0gGgPbeGYl3eU9CwS9SaD7gJyvcVs79WgBIZnMmoFABIedWmwizn/4rGDTo9wY2bU/lA5f9pT07kt6dp9usSRGeavHZzKI/07aZYr6jogfOrVI7tgErnNknAMirvOQVOY2hIj3H2V5q680GP7n4G5VHxacUz1tLY1zam2I8VOGRWtytxeWVLU1M/u8Ndzo4BC8WN7SxHTgzSvyYJx/OIt1vGLnR8oSg2jG1QnkTnxuuMjwR7stm3YM3zs3+uqbsxf7bQVfjVwLFHRppCbKT9NG0usLFk9lsa6T/Icj7giWJQFyUp31AY6DyGzxdlg2EOn+vRiRDTyi81UR8N+VCWDs8lD9Vl1Rui0Rw3Lkz8hkCz8iG58kgGwFSRYo5kCpJ7RHeyLFDgkC2vlUaj11WF7nu313ffT84OcVf2uaS4cQz3vBM9DN9/hWc/w8ePcD2GtsHd3rzGDp7H9d7XlemR8so4hnEDWCrWvXLnJ7ZX6FOc7SclTVQu75CPr+tMc1W0lwGQdOhxqkpnuT3DTmwgocClNknhuqNfplnSbiZQYqUYWOIeIFWQr5zyT4iF5OczBXBMMpPLhAhRaVhKPiqH45jlrTSxDHTOjLZhIELyQl6RAg1LUAAt8kQx+KmTsshJS+MFgVoroDSCPtdVn0j7u0HVcZXMp0LIa+z2/PkiR4P6C7m+NzvFi/5CLBcAMZc1UgAREhs85wFJ5jNCXGWmJ4kbcNY8oun60QEgAKNF1G06f34gyYMREI0DS+qKf8lPAQYA3+0Q0DM/hM4AAAAASUVORK5CYII=',
      school: '浙江大学',
      part: '计算机科学',
      major: '未知',
      self: '未知',
      grade: '未知',
      on: true,
      tel: '未知'
    }
  }
}
</script>
<style scoped>
div#username {
  text-align: right;
  padding-right: 20px;
  color: #9f9f9f;
}
div#form {
  padding: 20px;
}
#form > div {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #dadada solid;
  padding: 10px 0;
}
#form > div >#title {
  font-size: 20px;
  font-weight: 300;
  flex-basis: 200px;
}
#schoolAndPart > span:nth-child(2) > input{
  display: inline-block;
  width: 50%;
}
#form > div > span > input {
  border: none;
  outline: none;
  text-align: right;
  font-size: 20px;
  font-weight: 300;
  color: #ababab;
}
</style>
