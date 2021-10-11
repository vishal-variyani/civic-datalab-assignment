import axios from "axios";

export default class BudgetApiService {
  static getPosts(params) {
    return axios.get(`https://openbudgetsindia.org/api/3/action/package_search`, {params});
  }
}
