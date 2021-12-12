const axios = require('axios')

class Api {
  constructor(serverMap, apiMap, axiosConfig = {}) {
    this.httpClient = axios.create(axiosConfig)
    this._serverMap_ = serverMap
    this._apiMap_ = apiMap

    this._format_()
    this._combine_()
  }

  get _base_ () {
    let base = ''

    for(const key of Object.keys(this._serverMap_)) {
      if (!base) {
        base = key
      }

      if (this._serverMap_[key].default) {
        base = key
      }
    }

    if (!base) {
      console.error('api: 找不到服务器')
    }

    return base
  }

  _format_() {
    for (const key of Object.keys(this._apiMap_)) {
      const item = this._apiMap_[key];

      if (!item.server) {
        item.server = this._base_;
      }
      // 把服务地址集合到每个api接口上
      this._apiMap_[key] = Object.assign(
        {},
        this._serverMap_[item.server],
        item
      )
    }
  }

  // 两个拦截
  useReq(fulfilled, rejected) {
    this.httpClient.interceptors.request.use(fulfilled, rejected)
  }

  useReq(fulfilled, rejected) {
    this.httpClient.interceptors.response.use(fulfilled, rejected)
  }

  _restful_(url, rest) {
    const regex = /\:[^/]*/g;

    return url.replace(regex, (p) => {
      const key = p.slice(1);
      if (rest[key]) {
        return rest[key];
      }
      return p;
    });
  }

  _comboo_(bf, af) {
    // 如过配置里面有rest
    if (af.rest) {
      af.url = this._restful_(bf.url, af.rest); // 正则替换配置的:id
    }

    return Object.assign({}, bf, af)
  }

  _namespace_(obj, keys, cb) {
    const key = keys[0]

    if (keys.length === 1) {
      obj[key] = obj[key] || cb // 初始化为右边
    } else {
      obj[key] = obj[key] || {}
      this._namespace_(obj[key], keys.slice(1), cb)
    }
  }

  _combine_() {
    for(const key of Object.keys(this._apiMap_)) {
      // 替换第一个\/ 好解析出命名空间
      const keys = key.replace(/^\//, '').split('/')
      this._namespace_(this, keys, (config) => {
        let result = this._apiMap_[key]
        if (config) {
          result = this._comboo_(this._apiMap_[key], config)
        }
        return this.httpClient.request(result)
      })
    }
  }
}

// export default Apis;
let serverMap = {
  baseServer: {
    default: true,
    baseURL: "https://base.apis.com"
  },
  authServer: {
    baseURL: "https://auth.apis.com"
  },
  orderServer: {
    baseURL: "http://localhost:4320"
  }
};

let apiMap = {
  getBaseInfo: {
    method: "get",
    url: "/info"
  },
  "user/postOrder": {
    server: "orderServer",
    method: "post",
    url: "/order/:id"
  }
};

Apis.useReq(
  function(config) {
    config.headers.Authorization = "Bearer";
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

let apis = new Apis(serverMap, apiMap);

// window.apis = apis;

apis.getBaseInfo();

apis.user.postOrder({
  rest: {
    id: 1234
  }
});