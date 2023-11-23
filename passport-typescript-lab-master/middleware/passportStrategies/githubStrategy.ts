import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request, Response, NextFunction } from "express";
import 'dotenv/config'
import { getUserById } from "../../controllers/userController";
import { userModel } from "../../models/userModel";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.clientID!,
        clientSecret: process.env.clientSecret!,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
        scope: ['user:email'],
        //authorizationURL: "https://github.com/login/oauth/authorize?response_type=code",
        //authorizationURL: "https://github.com/login/oauth/authorize?",
        // authorizationURL: "https://github.com/login/oauth/authorize?scope=user:email&client_id=84056a6321ed1da4957b",
        //authorizationURL: "https://github.com/login/oauth/authorize?client_id=84056a6321ed1da4957b&redirect_uri=http://localhost:8000/auth/github/callback&scope=user:email",
    },
    
    /* FIX ME 😭 */
    async function(req: Request, accessToken: string, refreshToken: string, profile: any, done: (err: Object | null, user: false | Express.User | null | undefined) => void) {
        const user = userModel.findOrCreateUser(profile)
        return done(null, user)
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};


export default passportGitHubStrategy;

