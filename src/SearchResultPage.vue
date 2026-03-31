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
      <div class="result-stats" v-if="searchTime">
        找到相关结果约 {{ resultCount }} 个，用时 {{ searchTime }} 秒
      </div>
      
      <el-loading v-loading="loading" :fullscreen="false" text="搜索中..."></el-loading>
      <div v-if="activeTab === 'knowledge'">

      </div>
      <div class="app-card" v-for="(app, index) in searchResults" :key="index" v-else>
        <div class="app-icon">
          <img :src="app.logoImage" :alt="app.showName" />
        </div>
        <div class="app-info">
          <div class="app-header">
            <h3 class="app-name">{{ app.showName }}</h3>
            <div class="app-score">{{ app.averageScore }}分</div>
          </div>
          <p class="app-desc">{{ app.recommend }}</p>
          <div class="app-footer">
            <span class="app-download-count">下载量: {{ app.downNum }}</span>
            <el-button type="primary" size="small" class="download-button">下载</el-button>
          </div>
        </div>
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
      searchResults: [],
      resultCount: 0,
      searchTime: 0,
      loading: false
    }
  },
  mounted() {
    // 从URL获取搜索参数
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      this.searchQuery = query;
      // 自动执行搜索
      this.knowledgeSearch()
      this.mallSearch();
    }
  },
  methods: {
    performSearch() {
      this.knowledgeSearch()
      this.mallSearch();
    },
    knowledgeSearch() {

    },
    mallSearch() {
      // if (this.searchQuery) {
      //   this.loading = true;
      //   const startTime = Date.now();
      //   const apiUrl = `http://25.219.129.212:19010/prod-api/msdp-appstore/web/application/list?secondClassify=&sort=0&pageSize=20&pageNum=1&showName=${encodeURIComponent(this.searchQuery)}`;
      //   fetch(apiUrl)
      //     .then(response => {
      //       if (!response.ok) {
      //         throw new Error(`HTTP error! status: ${response.status}`);
      //       }
      //       return response.json();
      //     })
      //     .then(data => {
      //       if (data.code === 200) {
      //         this.searchResults = data.data.records;
      //         this.resultCount = data.data.total;
      //       } else {
      //         throw new Error(`API error! code: ${data.code}, message: ${data.msg}`);
      //       }
      //     })
      //     .catch(error => {
      //       console.error('API调用失败:', error);
      //     })
      //     .finally(() => {
      //       const endTime = Date.now();
      //       this.searchTime = ((endTime - startTime) / 1000).toFixed(2);
      //       this.loading = false;
      //     });
      // }
      this.searchResults = [{
        appId: "1213",
        appUrl: null,
        averageScore: "3.9",
        classify: "应用",
        downNum: 128548,
        logoImage: "chrome-extension://gogfcdlbjigmaaccpkigmikceimdpgam/images/lr-soft..png",
        recommend: "谷歌浏览器是一款...",
        showName: "谷歌浏览器64位"
      },{
        appId: "1213",
        appUrl: null,
        averageScore: "3.9",
        classify: "应用",
        downNum: 128548,
        logoImage: "chrome-extension://gogfcdlbjigmaaccpkigmikceimdpgam/images/lr-soft..png",
        recommend: "谷歌浏览器是一款...",
        showName: "谷歌浏览器64位"
      },{
        appId: "1213",
        appUrl: null,
        averageScore: "3.9",
        classify: "应用",
        downNum: 128548,
        logoImage: "chrome-extension://gogfcdlbjigmaaccpkigmikceimdpgam/images/lr-soft..png",
        recommend: "谷歌浏览器是一款...",
        showName: "谷歌浏览器64位"
      },{
        appId: "1213",
        appUrl: null,
        averageScore: "3.9",
        classify: "应用",
        downNum: 128548,
        logoImage: "chrome-extension://gogfcdlbjigmaaccpkigmikceimdpgam/images/lr-soft..png",
        recommend: "谷歌浏览器是一款...",
        showName: "谷歌浏览器64位"
      }];
      this.resultCount = 1;
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

.app-card {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  gap: 20px;
}

.app-icon {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.app-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.app-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.app-name {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.app-score {
  font-size: 14px;
  color: #ff6700;
  font-weight: 500;
}

.app-desc {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-download-count {
  font-size: 12px;
  color: #999;
}

.download-button {
  font-size: 12px;
  padding: 4px 16px;
  border-radius: 12px;
}

</style>
