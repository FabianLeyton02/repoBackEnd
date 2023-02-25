fetch("http://localhost:3000/api/jwt/localStorage", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("coderhouse")}`,
  },
});
