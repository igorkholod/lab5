import { config } from '@vue/test-utils'
import axios from 'axios';

config.mocks['$api'] = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});
