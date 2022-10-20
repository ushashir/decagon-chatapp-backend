
// declare global {
//     namespace Express {
//       interface Global {
//         onlineUsers?:Record<Record<string|unknown>>
//       }
//     }
//   }

declare global {
    
    var onlineUsers: Record<Record<string|unknown>>;
}