import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redisClient';

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const email = req.body.email;
  console.log("Email--->", email);
  if (!email) {
    return next();
  }
  try {
    const cachedUser = await redisClient.get(email);
    if (cachedUser) {
      return res.status(200).json({
        code: 200,
        data: JSON.parse(cachedUser),
        message: 'User fetched from cache',
      });
    }
    next();
  } 

  catch (err) {
    console.error(err);
    next();
  }
};

export const cacheNoteMiddleware = async(req: Request, res: Response, next: NextFunction):Promise<Response | void>=>{

  const noteId = req.params.id;
  if(!noteId){
    return next();
  }

  try{
    const cacheNote = await redisClient.get(noteId);

    if(cacheNote){
      console.log(`Note ${noteId} fetched from Redis cache.`);
      return res.status(200).json({
        code: 200,
        data: JSON.parse(cacheNote),
        message: 'Note fetched from cache'
      });
    }
    console.log(`Note ${noteId} not found in Redis cache. Proceeding to fetch from DB.`);
    next();
  }
  catch(err){
    console.error('Error fetching from Redis:', err);
    next();
  }
}
