// import { OpenAPIV3 } from "openapi-types";
// import swaggerUI from "swagger-ui-express";
//
// const swaggerDocument: OpenAPIV3.Document = {
//   openapi: "3.0.0",
//   info: {
//     title: "Clinic API Documentation",
//     version: "1.0.0",
//     description: "API documentation for Info Medical services in Town",
//   },
//   servers: [
//     {
//       url: "http//localhost:5000",
//       description: "Local service",
//     },
//   ],
//   tags: [
//     {
//       name: "Auth",
//       description: "Authentification endpoints",
//     },
//     {
//       name: "Clinic",
//       description: "Clinic endpoint",
//     },
//     {
//       name: "Doctor",
//       description: "Doctor endpoint",
//     },
//     {
//       name: "Medical Service",
//       description: "Medical Service endpoint",
//     },
//   ],
//   paths: {
//     "/auth/sign-up": {
//       post: {
//         tags: ["Auth"],
//         summary: "Register new user",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   email: { type: "string", format: "email" },
//                   password: { type: "string", format: "password" },
//                   name: { type: "string" },
//                   surname: { type: "string" },
//                 },
//                 required: ["email", "password", "name"],
//               },
//             },
//           },
//         },
//         responses: {
//           "201": {
//             description: "User successfully registered",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     user: {
//                       type: "object",
//                       properties: {
//                         email: { type: "string" },
//                         name: { type: "string" },
//                         surname: { type: "string" },
//                         role: { type: "string" },
//                         isActive: { type: "boolean" },
//                         _id: { type: "string" },
//                         createdAt: { type: "string" },
//                         updatedAt: { type: "string" },
//                       },
//                     },
//                     tokens: {
//                       type: "object",
//                       properties: {
//                         accessToken: { type: "string" },
//                         refreshToken: { type: "string" },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           "400": {
//             description: "Bad request",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     status: {
//                       type: "string",
//                       default: 400,
//                     },
//                     message: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/auth/sign-in": {
//       post: {
//         tags: ["Auth"],
//         summary: "Login user",
//         requestBody: {
//           required: true,
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   email: { type: "string", format: "email" },
//                   password: { type: "string", format: "password" },
//                 },
//                 required: ["email", "password"],
//               },
//             },
//           },
//         },
//         responses: {
//           "200": {
//             description: "User successfully logged in",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     user: {
//                       type: "object",
//                       properties: {
//                         email: { type: "string" },
//                         name: { type: "string" },
//                         surname: { type: "string" },
//                         role: { type: "string" },
//                         isActive: { type: "boolean" },
//                         _id: { type: "string" },
//                         createdAt: { type: "string" },
//                         updatedAt: { type: "string" },
//                       },
//                     },
//                     tokens: {
//                       type: "object",
//                       properties: {
//                         accessToken: { type: "string" },
//                         refreshToken: { type: "string" },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           "401": {
//             description: "Invalid email or password",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     status: {
//                       type: "string",
//                       default: 401,
//                     },
//                     message: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/auth/refresh": {
//       post: {
//         tags: ["Auth"],
//         summary: "Token update",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "userI",
//             in: "response",
//             description: "Get logged in user",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Token update",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     accessToken: { type: "string" },
//                     refreshToken: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/auth/me": {
//       get: {
//         tags: ["Auth"],
//         summary: "Get logged in user",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "userI",
//             in: "response",
//             description: "Get logged in user",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Successfully get logged in user",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     email: { type: "string" },
//                     name: { type: "string" },
//                     surname: { type: "string" },
//                     role: { type: "string" },
//                     isActive: { type: "boolean" },
//                     _id: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/activate/{token}": {
//       patch: {
//         tags: ["Auth"],
//         summary: "User activation",
//         parameters: [
//           {
//             name: "token",
//             in: "path",
//             description: "User activation",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Activated user",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     email: { type: "string" },
//                     name: { type: "string" },
//                     surname: { type: "string" },
//                     role: { type: "string" },
//                     isActive: { type: "boolean" },
//                     _id: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//           "400": {
//             description: "Invalid token",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     status: {
//                       type: "string",
//                       default: 400,
//                     },
//                     message: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/auth/recovery": {
//       post: {
//         tags: ["Auth"],
//         summary: "Sending activation letter",
//         requestBody: {
//           required: true,
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   email: { type: "string", format: "email" },
//                 },
//                 required: ["email"],
//               },
//             },
//           },
//         },
//         responses: {
//           "200": {
//             description: "Permission to recover password",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     details: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/auth/recovery/{token}": {
//       post: {
//         tags: ["Auth"],
//         summary: "Change password",
//         parameters: [
//           {
//             name: "token",
//             in: "path",
//             description: "Password activation",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Change password",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     email: { type: "string" },
//                     name: { type: "string" },
//                     surname: { type: "string" },
//                     role: { type: "string" },
//                     isActive: { type: "boolean" },
//                     _id: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//           "400": {
//             description: "Invalid token",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     status: {
//                       type: "string",
//                       default: 400,
//                     },
//                     message: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/clinics": {
//       get: {
//         tags: ["Clinic"],
//         summary: "Get all clinics with pagination and filters",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "name",
//             in: "query",
//             description: "Search by clinic name",
//             schema: { type: "string" },
//           },
//           {
//             name: "order",
//             in: "query",
//             description: "Order by clinic name",
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "List of clinics with pagination",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       _id: { type: "string" },
//                       name: { type: "string" },
//                       createdAt: { type: "string" },
//                       updatedAt: { type: "string" },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       post: {
//         tags: ["Clinic"],
//         summary: "Create new clinic",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         requestBody: {
//           required: true,
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string", format: "name" },
//                 },
//                 required: ["name"],
//               },
//             },
//           },
//         },
//         responses: {
//           "200": {
//             description: "A new clinic has been created",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/clinics/{clinicId}": {
//       patch: {
//         tags: ["Clinic"],
//         summary: "Update clinic by Id",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         requestBody: {
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string", format: "name" },
//                 },
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "clinicId",
//             in: "path",
//             description: "Update clinic by Id",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Successfully update user by id",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       delete: {
//         tags: ["Clinic"],
//         summary: "Delete clinic by Id",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         parameters: [
//           {
//             name: "clinicId",
//             in: "path",
//             description: "Delete clinic by Id",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {},
//       },
//       get: {
//         tags: ["Clinic"],
//         summary: "Get clinic by Id",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "clinicId",
//             in: "path",
//             description: "Get clinic by Id",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Successfully get clinic by id",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/doctors": {
//       get: {
//         tags: ["Doctor"],
//         summary: "Get all doctors with pagination and filters",
//         security: [{ bearerAuth: [] }],
//         requestBody: {
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   clinicId: { type: "string", format: "clinicID" },
//                 },
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "name",
//             in: "query",
//             description: "Search by doctor name",
//             schema: { type: "string" },
//           },
//           {
//             name: "surname",
//             in: "query",
//             description: "Search by doctor surname",
//             schema: { type: "string" },
//           },
//           {
//             name: "phoneNumber",
//             in: "query",
//             description: "Search by doctor phoneNumber",
//             schema: { type: "string" },
//           },
//           {
//             name: "email",
//             in: "query",
//             description: "Search by doctor email",
//             schema: { type: "string" },
//           },
//           {
//             name: "order",
//             in: "query",
//             description: "Order by doctor name/surname",
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "List of doctors with pagination",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       _id: { type: "string" },
//                       name: { type: "string" },
//                       surname: { type: "string" },
//                       phoneNumber: { type: "string" },
//                       email: { type: "string" },
//                       _clinicId: { type: "string" },
//                       createdAt: { type: "string" },
//                       updatedAt: { type: "string" },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/doctors/{isId}": {
//       post: {
//         tags: ["Doctor"],
//         summary: "Create new doctor",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         requestBody: {
//           required: true,
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string", format: "name" },
//                   surname: { type: "string", format: "surname" },
//                   phoneNumber: { type: "string", format: "phoneNumber" },
//                   email: { type: "string", format: "email" },
//                 },
//                 required: ["name", "surname", "phoneNumber", "email"],
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "isId : clinicId",
//             in: "path",
//             description: "Adding clinic data",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Created new doctor",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     surname: { type: "string" },
//                     phoneNumber: { type: "string" },
//                     email: { type: "string" },
//                     _clinicId: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       put: {
//         tags: ["Doctor"],
//         summary: "Update doctor",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         requestBody: {
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string", format: "name" },
//                   surname: { type: "string", format: "surname" },
//                   phoneNumber: { type: "string", format: "phoneNumber" },
//                   email: { type: "string", format: "email" },
//                 },
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "isId : doctorId",
//             in: "path",
//             description: "Update doctor id",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Updated doctor",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     surname: { type: "string" },
//                     phoneNumber: { type: "string" },
//                     email: { type: "string" },
//                     _clinicId: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       get: {
//         tags: ["Doctor"],
//         summary: "Get by id doctor",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         parameters: [
//           {
//             name: "isId : doctorId",
//             in: "path",
//             description: "Get by id doctor",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Get by id doctor",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     surname: { type: "string" },
//                     phoneNumber: { type: "string" },
//                     email: { type: "string" },
//                     _clinicId: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       delete: {
//         tags: ["Doctor"],
//         summary: "Delete doctor",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         parameters: [
//           {
//             name: "isId : doctorId",
//             in: "path",
//             description: "Deleted by id doctor",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {},
//       },
//     },
//     "/services": {
//       get: {
//         tags: ["Medical Service"],
//         summary: "Get all medical service",
//         security: [{ bearerAuth: [] }],
//         requestBody: {
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   doctorId: { type: "string", format: "doctorID" },
//                 },
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "name",
//             in: "query",
//             description: "Search by medical service name",
//             schema: { type: "string" },
//           },
//           {
//             name: "name",
//             in: "query",
//             description: "Order by medical service name",
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "List of medical services",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properties: {
//                       _id: { type: "string" },
//                       name: { type: "string" },
//                       _doctorId: { type: "string" },
//                       createdAt: { type: "string" },
//                       updatedAt: { type: "string" },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/services/{idId}": {
//       post: {
//         tags: ["Medical service"],
//         summary: "Create new medical service",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         requestBody: {
//           required: true,
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string", format: "name" },
//                   doctorId: { type: "string", format: "doctorId" },
//                 },
//                 required: ["name", "doctorId"],
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "idId : doctorId",
//             in: "path",
//             description: "Adding doctor data",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Created new medical service",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     _doctorId: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       put: {
//         tags: ["Medical service"],
//         summary: "Update medical service",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         requestBody: {
//           content: {
//             "application json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   name: { type: "string", format: "name" },
//                 },
//               },
//             },
//           },
//         },
//         parameters: [
//           {
//             name: "idId : serviceId",
//             in: "path",
//             description: "Update medical service id",
//             required: true,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Update medical service",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     _doctorId: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       get: {
//         tags: ["Medical Service"],
//         summary: "Get by id medical service",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         parameters: [
//           {
//             name: "idId : serviceId",
//             in: "query",
//             description: "Get by id medical service",
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           "200": {
//             description: "Medical services by id",
//             content: {
//               "application/json": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     _id: { type: "string" },
//                     name: { type: "string" },
//                     _doctorId: { type: "string" },
//                     createdAt: { type: "string" },
//                     updatedAt: { type: "string" },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       delete: {
//         tags: ["Medical Service"],
//         summary: "Delete by id medical service",
//         security: [{ bearerAuth: [] }, { roleUser: ["Admin"] }],
//         parameters: [
//           {
//             name: "idId : serviceId",
//             in: "query",
//             description: "Delete by id medical service",
//             schema: { type: "string" },
//           },
//         ],
//         responses: {},
//       },
//     },
//   },
//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//         bearerFormat: "JWT",
//       },
//     },
//   },
// };
//
// export { swaggerDocument, swaggerUI };
