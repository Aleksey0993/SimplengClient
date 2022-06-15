import $api from "@/http";

export default class ListeningService {
  static async getList(page, size, searchText) {
    return $api.get(
      "/listening",

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
    return $api.get(`/listening/${id}`);
  }

  static async create(data) {
    return $api.post(`/listening`, data, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
    });
  }
  static async update(title, published, fullAccess, id) {
    return $api.put(`/listening/${id}`, { title, published, fullAccess });
  }
  static async delete(id) {
    return $api.delete(`/listening/${id}`);
  }
  static async getAllTest(id) {
    return $api.get(`/listening/${id}/test/`);
  }
  static async createTest(newQuestion) {
    return $api.post(`/listening/${newQuestion.id}/test/`, {
      questions: newQuestion.questions,
      answer: newQuestion.answer,
    });
  }
  static async deleteTest(id) {
    return $api.delete(`/listening/test/${id}`);
  }
}
