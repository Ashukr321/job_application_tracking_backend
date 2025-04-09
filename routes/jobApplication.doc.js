


const createApplication = {
  tags: ["Job Application"],
  description: "Create a new job application",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["company", "role", "status", "dateOfApplication"],
          properties: {
            company: {
              type: "string",
              description: "Company name",
              example: "Google"
            },
            role: {
              type: "string",
              description: "Job role or position",
              example: "Software Engineer"
            },
            status: {
              type: "string",
              description: "Application status",
              enum: ["Applied", "Interview", "Offer", "Rejected"],
              example: "Applied"
            },
            dateOfApplication: {
              type: "string",
              format: "date",
              description: "Date of job application",
              example: "2024-01-20"
            },
            link: {
              type: "string",
              description: "Job posting URL",
              example: "https://careers.google.com/jobs/123"
            }
          }
        }
      }
    }
  },
  responses: {
    "201": {
      description: "Job application created successfully",
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
                example: "Job application created successfully"
              },
              data: {
                type: "object",
                properties: {
                  company: { type: "string", example: "Google" },
                  role: { type: "string", example: "Software Engineer" },
                  status: { type: "string", example: "Applied" },
                  dateOfApplication: { type: "string", example: "2024-01-20" },
                  link: { type: "string", example: "https://careers.google.com/jobs/123" }
                }
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
                example: "Invalid input data"
              }
            }
          }
        }
      }
    }
  }
};

const getAllApplications = {
  tags: ["Job Application"],
  description: "Get all job applications",
  responses: {
    "200": {
      description: "List of all job applications",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    company: { type: "string", example: "Google" },
                    role: { type: "string", example: "Software Engineer" },
                    status: { type: "string", example: "Applied" },
                    dateOfApplication: { type: "string", example: "2024-01-20" },
                    link: { type: "string", example: "https://careers.google.com/jobs/123" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

const updateApplication = {
  tags: ["Job Application"],
  description: "Update a job application by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Job application ID",
      schema: {
        type: "string"
      }
    }
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            company: {
              type: "string",
              example: "Google"
            },
            role: {
              type: "string",
              example: "Senior Software Engineer"
            },
            status: {
              type: "string",
              enum: ["Applied", "Interview", "Offer", "Rejected"],
              example: "Interview"
            },
            dateOfApplication: {
              type: "string",
              format: "date",
              example: "2024-01-20"
            },
            link: {
              type: "string",
              example: "https://careers.google.com/jobs/123"
            }
          }
        }
      }
    }
  },
  responses: {
    "200": {
      description: "Job application updated successfully",
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
                example: "Job application updated successfully"
              },
              data: {
                type: "object",
                properties: {
                  company: { type: "string", example: "Google" },
                  role: { type: "string", example: "Senior Software Engineer" },
                  status: { type: "string", example: "Interview" },
                  dateOfApplication: { type: "string", example: "2024-01-20" },
                  link: { type: "string", example: "https://careers.google.com/jobs/123" }
                }
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Job application not found",
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
                example: "Job application not found"
              }
            }
          }
        }
      }
    }
  }
};

const deleteApplication = {
  tags: ["Job Application"],
  description: "Delete a job application by ID",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      description: "Job application ID",
      schema: {
        type: "string"
      }
    }
  ],
  responses: {
    "200": {
      description: "Job application deleted successfully",
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
                example: "Job application deleted successfully"
              }
            }
          }
        }
      }
    },
    "404": {
      description: "Job application not found",
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
                example: "Job application not found"
              }
            }
          }
        }
      }
    }
  }
};

const jobDocApplication = {
  '/job/application': {
    post: createApplication
  },
  '/job/applications': {
    get: getAllApplications
  },
  '/job/application/{id}': {
    put: updateApplication,
    delete: deleteApplication
  }
};

export default jobDocApplication;