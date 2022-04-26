class ApiService {
  baseUrl = "http://localhost:3000";

  attractions = {
    get: async () => {
      try {
        const response = await fetch(`${this.baseUrl}/attractions`);
        return response.json();
      } catch (error) {
        throw new Error(`Something wrong ${error}`);
      }
    },
    post: (attractions) =>
      fetch(`${this.baseUrl}/attractions`, {
        method: "POST",
        body: JSON.stringify(attractions),
        headers: {
          "Content-Type": "application/json",
        },
      }),
  };

  auth = {
    addUser: (user) =>
      fetch(`${this.baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }),

    getUsers: async () => {
      try {
        const response = await fetch(`${this.baseUrl}/users`);
        return response.json();
      } catch (error) {
        throw new Error(`Something wrong ${error}`);
      }
    },
  };
}

export const api = new ApiService();
