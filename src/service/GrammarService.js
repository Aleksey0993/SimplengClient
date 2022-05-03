import $api from "@/http";

export default class GrammarService {
  static async getList(page, size, searchText) {
    return $api.get(
      "/grammar",

      {
        params: {
          page: page,
          size: size,
          title: searchText,
        },
      }
    );
  }
  static async getOne(id) {
    return $api.get(`/grammar/${id}`);
  }

  static async create(title, description, published) {
    return $api.post(`/grammar`, { title, description, published });
  }
  static async update(title, description, published, id) {
    return $api.put(`/grammar/${id}`, { title, description, published });
  }
  static async uploadImage(data) {
    return $api.post(`/grammar/upload`, data);
  }
  static async deleteImage(fileName) {
    return $api.post(`/grammar/imageDelete`, { fileName });
  }
}
