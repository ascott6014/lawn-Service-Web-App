import 'express-session';

declare module 'express-session' {
  export interface Session {
    clearSession(): Promise<void>; // DO NOT MODIFY THIS!

    // NOTES: Add your app's custom session properties here:
    // example
    authenticatedUser: {
      userId: string;
      email: string;
      isContractor: boolean;
    };
    isLoggedIn: boolean;
    logInAttempts: number;
    logInTimeout: Date;
  }
}
