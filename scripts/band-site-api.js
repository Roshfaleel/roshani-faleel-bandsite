//constructor
class BandsiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
  }

  //post-comment method

  async postComment(comment) {
    try {
      const response = await axios.post(`${this.baseUrl}/comments`, comment, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error posting comment : ", error);
      throw error;
    }
  }

  //get-comment method

  async getComments() {
    try {
      const response = await axios.get(`${this.baseUrl}/comments`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      const comments = response.data;
      return comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      console.error("Error fetching comments : ", error);
      throw error;
    }
  }

  //get-shows method

  async getShows() {
    try {
      const response = await axios.get(`${this.baseUrl}/showdates`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching shows : ", error);
      throw error;
    }
  }
}

//using bandsite API class

const apiKey = "8a658617-935c-48e4-9ff3-129aeac3fbe0";
const api = new BandsiteApi(apiKey);
