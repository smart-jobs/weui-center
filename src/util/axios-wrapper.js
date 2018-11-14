/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import _ from 'lodash';
import Axios from 'axios';
import { parse, parseQuery } from 'urijs';
import { stringify } from 'qs';
import { Util, Error } from 'naf-core';
import { Indicator } from 'mint-ui';
import util from './user-util';

const { trimData, isNullOrUndefined } = Util;
const { ErrorCode } = Error;

let currentRequests = 0;

export default class AxiosWrapper {
  constructor({ baseUrl = '', unwrap = true } = {}) {
    this.baseUrl = baseUrl;
    this.unwrap = unwrap;
  }

  // 合并uri和query
  static merge(uri, query = {}) {
    const parsed = parse(uri);
    if (parsed.query) {
      query = { ...query, ...parseQuery(parsed.query) };
      uri = parsed.path;
    }
    query = stringify(trimData(query));
    if (query) {
      uri += `?${query}`;
    }
    return uri;
  }

  $get(uri, query = {}, options = {}) {
    return this.$request(uri, query, null, options);
  }

  $post(uri, query = {}, data = {}, options = {}) {
    return this.$request(uri, query, data, options);
  }

  async $request(uri, query = {}, data, options = {}) {
    const url = AxiosWrapper.merge(uri, query);
    currentRequests += 1;
    Indicator.open({
      spinnerType: 'fading-circle',
    });
    try {
      const axios = Axios.create({
        baseURL: this.baseUrl,
      });
      axios.defaults.headers.common.Authorization = util.token;
      let res = await axios.request({
        method: isNullOrUndefined(data) ? 'get' : 'post',
        url,
        data,
        responseType: 'json',
        ...options,
      });
      res = res.data;
      const { errcode, errmsg, details } = res;
      if (errcode) {
        console.warn(`[${uri}] fail: ${errcode}-${errmsg} ${details}`);
        return res;
      }
      // unwrap data
      if (this.unwrap) {
        res = _.omit(res, ['errcode', 'errmsg', 'details']);
        const keys = Object.keys(res);
        if (keys.length === 1 && keys.includes('data')) {
          res = res.data;
        }
      }
      return res;
    } catch (err) {
      let errmsg = '接口请求失败，请稍后重试';
      if (err.response) {
        const { status } = err.response;
        if (status === 401) errmsg = '用户认证失败，请重新登录';
        if (status === 403) errmsg = '当前用户不允许执行该操作';
      }
      console.error(`[AxiosWrapper] 接口请求失败: ${err.config && err.config.url} - ${err.message}`);
      return { errcode: ErrorCode.SERVICE_FAULT, errmsg, details: err.message };
    } finally {
      currentRequests -= 1;
      if (currentRequests <= 0) {
        currentRequests = 0;
        Indicator.close();
      }
    }
  }
}
