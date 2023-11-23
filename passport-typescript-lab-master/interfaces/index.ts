import { Strategy } from 'passport';


export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}
export {}
declare global {
    namespace Express {
        interface AuthInfo {  }
        export interface User {
            id: number;
            name: string, 
            email?: string, 
            password?: string
        }
        export interface Request {
            flash(type: string, message?: string): string | string[] | undefined;
          }
    }
}