import express, {Request, Response, NextFunction} from 'express';
import {v4 as uuidv4} from 'uuid'
import { PostInstance } from '../model/postModel';
import { UserInstance } from '../model/userModel';


export async function getAllPost(req: Request, res: Response, next: NextFunction) {
    
}
export async function createPost(req: Request, res: Response, next: NextFunction) {
    
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    
}

export async function getSinglePost(req: Request, res: Response, next: NextFunction) {
    
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    
}

export async function likePost (req: Request, res: Response, next: NextFunction) {
    res.json({
        msg: "like post logic"
    });

};

