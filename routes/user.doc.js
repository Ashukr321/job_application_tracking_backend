//  register user
const registerUser = {
  tags: ["User"],
  description: "Create a new user account with email and password",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "User's full name",
              example: "John Doe",
              minLength: 2
            },
            email: {
              type: "string",
              description: "User's email address",
              example: "john@gmail.com",
              format: "email"
            },
            password: {
              type: "string",
              description: "User's password (min 8 characters, must contain numbers and letters)",
              example: "Ashu@321",
              minLength: 8
            },
            
          }
        }
      }
    }
  },
  responses: {
    "201": {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "User created successfully"
              },
              token: {
                type: "string",
                description: "JWT token for authentication",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              }
            }
          }
        }
      }
    },
    "400": {
      description: "Bad Request - Invalid input data",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false
              },
              message: {
                type: "string",
                example: "Invalid email format"
              }
            }
          }
        }
      }
    },
    "409": {
      description: "Conflict - Email already exists",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false
              },
              message: {
                type: "string",
                example: "Email already registered"
              }
            }
          }
        }
      }
    }
  }
};

const loginUser = {
  tags: ["User"],
  description: "Authenticate user and get JWT token",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              description: "User's email address",
              example: "john@gmail.com",
              format: "email"
            },
            password: {
              type: "string",
              description: "User's password",
              example: "Ashu@321"
            }
          }
        }
      }
    }
  },
  responses: {
    "200": {
      description: "Login successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "Login successful"
              },
              token: {
                type: "string",
                description: "JWT token for authentication",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              }
            }
          }
        }
      }
    },
    "401": {
      description: "Unauthorized - Invalid credentials",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false
              },
              message: {
                type: "string",
                example: "Invalid email or password"
              }
            }
          }
        }
      }
    }
  }
};

const logoutUser = {
  tags: ["User"],
  description: "Logout user and invalidate JWT token",
  security: [{ bearerAuth: [] }],
  responses: {
    "200": {
      description: "Logout successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "Logged out successfully"
              }
            }
          }
        }
      }
    },
    "401": {
      description: "Unauthorized - Invalid or missing token",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false
              },
              message: {
                type: "string",
                example: "Please login first"
              }
            }
          }
        }
      }
    }
  }
};

const userDocsRoutes = {
  '/user/register': {
    post: registerUser
  },
  '/user/login': {
    post: loginUser
  },
  '/user/logout': {
    get: logoutUser
  }
};

export default userDocsRoutes;