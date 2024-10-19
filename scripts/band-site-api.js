//constructor
class BandsiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
  }

  //post-comment method

  async postComment(comment) {
    try {
      const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
      const response = await axios.post(url, comment, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.date;
    } catch (error) {
      console.error(
        "Error posting comment : ",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  //get-comment method

  async getComments() {
    try {
      const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
      const response = await axios.get(url);
      const comments = response.data;

      return comments.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error fetching comments : ", error);
      throw error;
    }
  }

  //get-shows method

  async getShows() {
    try {
      const url = `${this.baseUrl}/showdates?api_key=${this.apiKey}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching shows : ", error);
      throw error;
    }
  }
}
