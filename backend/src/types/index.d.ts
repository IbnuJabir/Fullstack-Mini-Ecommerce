export {};
declare namespace Express {
    export interface Request {
        userId?: string; // or number, depending on your userId type
        // You can add other custom properties here as well
    }
}

// declare global {
//   namespace Express {
//     interface Request {
//       userId?: string;
//     }
//   }
// }
