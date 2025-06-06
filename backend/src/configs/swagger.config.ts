import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Clinic API Documentation",
    version: "1.0.0",
    description: "API documentation for Info Medical services in Town",
  },
  servers: [
    {
      url: "http//localhost:5000",
      description: "Local service",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Authentification endpoints",
    },
    {
      name: "Clinic",
      description: "Clinic endpoint",
    },
    {
      name: "Doctor",
      description: "Doctor endpoint",
    },
    {
      name: "Medical Service",
      description: "Medical Service endpoint",
    },
  ],
  paths: {
    "/auth/sign-up": {
      post: {
        tags: ["Auth"],
        summary: "Register new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                  name: { type: "string" },
                  surname: { type: "string" },
                },
                required: ["email", "password", "name"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        email: { type: "string" },
                        name: { type: "string" },
                        surname: { type: "string" },
                        role: { type: "string" },
                        isActive: { type: "boolean" },
                        _id: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" },
                      },
                    },
                    tokens: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      default: 400,
                    },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/sign-in": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string", format: "password" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User successfully logged in",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        email: { type: "string" },
                        name: { type: "string" },
                        surname: { type: "string" },
                        role: { type: "string" },
                        isActive: { type: "boolean" },
                        _id: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" },
                      },
                    },
                    tokens: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Invalid email or password",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      default: 401,
                    },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/clinics": {
      get: {
        tags: ["Clinics"],
        summary: "Get all clinics with pagination and filters",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "Name",
            in: "query",
            description: "Search by clinic name",
            schema: { type: "string" },
          },
          {
            name: "Name",
            in: "query",
            description: "Order by clinic name ",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "List of clinics with pagination",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      name: { type: "string" },
                      createdAt: { type: "string" },
                      updatedAt: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export { swaggerDocument, swaggerUI };
