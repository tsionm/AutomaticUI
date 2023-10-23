import jwtDecode from "jwt-decode";

export const getAuthority = (token) => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.authorities) {
        const userRole = decodedToken.authorities[0];
        console.log("User role: " + userRole);
        return userRole;
      } else {
        localStorage.removeItem("token");
        console.log("Invalid token");
        return "invalid user";
      }
    } else {
      console.error("Invalid token or missing authorities.");
    }
  } catch (error) {
    localStorage.removeItem("token");
    console.log("error about token");
  }
};

export const getName = (token) => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.sub) {
        const userName = decodedToken.sub;
        console.log("User userName: " + userName);
        return userName;
      } else {
        localStorage.removeItem("token");
        console.log("Invalid token");
        return "invalid user";
      }
    } else {
      console.error("Invalid token or missing userName.");
    }
  } catch (error) {
    localStorage.removeItem("token");
    console.log("error about token");
  }
};

export const getPhone = (token) => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.authorities) {
        const phone = decodedToken.authorities;
        console.log("User phone: " + phone);
        return phone;
      } else {
        localStorage.removeItem("token");
        console.log("Invalid token");
        return "invalid user";
      }
    } else {
      console.error("Invalid token or missing phone.");
    }
  } catch (error) {
    localStorage.removeItem("token");
    console.log("error about token");
  }
};