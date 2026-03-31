<template>
  <div id="search-result">
    <!-- 搜索栏 -->
    <div class="search-header">
      <div class="logo">
        <img src="./assets/lr-soft.png" alt="鲁软" />
      </div>
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="输入搜索内容"
          style="width: 748px;height: 45px;border-radius: 22px;border-right: none;"
          @keyup.enter="performSearch"
        >
          <el-button 
            slot="append" 
            @click="performSearch"
            style="background: linear-gradient(135deg, rgb(0, 197, 134) 0%, rgb(97, 224, 181) 100%);
                  color: #ffffff;font-size: 15px;font-weight: 500;border-radius: 10px;height: 40px;padding: 13px;">
            智能搜索
          </el-button>
        </el-input>
      </div>
    </div>

    <!-- 导航标签 -->
    <div class="nav-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="信创知识库" name="knowledge"></el-tab-pane>
        <el-tab-pane label="软件商城" name="softMall"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 搜索结果 -->
    <div class="search-results">
      <div class="result-stats">
        找到相关结果约 {{ resultCount }} 个，用时 {{ searchTime }} 秒
      </div>
      
      <div class="result-item" v-for="(result, index) in searchResults" :key="index">
        <h3 class="result-title">
          <a href="#" @click.prevent="navigateToUrl(result.url)">{{ result.title }}</a>
        </h3>
        <div class="result-url">{{ result.url }}</div>
        <div class="result-content">{{ result.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'knowledge',
      searchQuery: '',
      searchResults: [
        {
          title: '百度一下，你就知道',
          url: 'https://www.baidu.com',
          content: '全球最大的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。'
        },
        {
          title: '百度百科',
          url: 'https://baike.baidu.com',
          content: '百度百科是百度公司推出的一部内容开放、自由的网络百科全书，其测试版于2006年4月20日上线，正式版在2008年4月21日发布。'
        },
        {
          title: '百度地图',
          url: 'https://map.baidu.com',
          content: '百度地图是百度提供的一项网络地图服务，覆盖了国内近400个城市，主要功能包括：地图浏览、地点搜索、路线查询、公交换乘、驾车导航、实时路况等。'
        },
        {
          title: '百度贴吧',
          url: 'https://tieba.baidu.com',
          content: '百度贴吧是百度推出的互联网产品之一，主要应用于用户之间的交流和信息分享，是全球最大的中文社区。'
        },
        {
          title: '百度知道',
          url: 'https://zhidao.baidu.com',
          content: '百度知道是百度推出的互动式知识问答分享平台，于2005年6月21日发布上线，2012年3月31日发布百度知道台湾版。'
        }
      ],
      resultCount: 12300000,
      searchTime: 0.12
    }
  },
  mounted() {
    // 从URL获取搜索参数
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      this.searchQuery = query;
    }
  },
  methods: {
    performSearch() {
      if (this.searchQuery) {
        // 模拟搜索延迟
        setTimeout(() => {
          // 这里可以添加实际的搜索逻辑
          console.log('搜索内容:', this.searchQuery);
        }, 500);
      }
    },
    navigateToUrl(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style scoped>
#search-result {
  font-family: Arial, sans-serif;
}

.search-header {
  background-color: #ffffff;
  padding: 10px 20px 0;
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo img {
  width: 100px;
  height: 60px;
}

.search-bar {
  flex: 1;
  max-width: 600px;
}

:deep .el-input__inner {
  height: 45px;
  border: 1px solid rgb(0, 197, 134);
  border-right: 0;
}

:deep .el-input__inner.hover {
  border: 1px solid red;
}

:deep .el-input-group__append, .el-input-group__prepend {
  background-color: #ffffff;
  color: #ffffff;
  padding-right: 25px;
  border: 1px solid rgb(0, 197, 134);
  border-left: 0;
}
.nav-tabs {
  background-color: #ffffff;
  padding: 0 150px;
}

:deep .el-tabs__nav-wrap::after {
  height: 0;
}

.nav-tabs .el-tabs__nav {
  border-bottom: none;
}

.nav-tabs .el-tabs__active-bar {
  background-color: #00c853;
}

.nav-tabs .el-tabs__item {
  font-size: 14px;
  color: #333;
}

.nav-tabs .el-tabs__item.is-active {
  color: #00c853;
  font-weight: 500;
}

.search-results {
  max-width: 800px;
  margin-left: 130px;
  padding: 0 20px;
}

.result-stats {
  color: #666;
  font-size: 13px;
  margin-bottom: 20px;
}

.result-item {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.result-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: normal;
}

.result-title a {
  color: #1a0dab;
  text-decoration: none;
}

.result-title a:hover {
  text-decoration: underline;
}

.result-url {
  color: #006621;
  font-size: 14px;
  margin-bottom: 8px;
}

.result-content {
  color: #545454;
  font-size: 14px;
  line-height: 1.5;
}
</style>
