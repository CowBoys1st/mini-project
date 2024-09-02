import { Request, Response } from 'express';
import prisma from '@/prisma';


export class EventController {
  async getEvents(req: Request, res: Response) {
    const events = await prisma.event.findMany();

    return res.status(200).send(events);
  }

  async createEvents(req:Request, res:Response) {
    const {name, description, price, date, time, location, availableSeats, ticketType, category, isFree, attendees, promotions, reviews} = req.body

    
  }

}

console.log('event')
