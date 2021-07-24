import React from 'react';
import axios from 'axios';
import { environment } from '../environments/environment';

export function Auth() {
  axios.interceptors.request.use(function (config) {
    config.baseURL = environment.apiBaseUrl;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  return (<> </>)
}
