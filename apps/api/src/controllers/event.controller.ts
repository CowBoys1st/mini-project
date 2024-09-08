import { Request, Response } from 'express';
import prisma from '@/prisma';


export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany();
      return res.status(200).send(events);
    } catch (error){
      return res.status(500).send({ message: 'Error fetching events', error })
    }

  }

  async createEvent(req:Request, res:Response) {
    try {
      const {name, description, price, date, time, location, availableSeats, ticketType, category, isFree, organizerId } = req.body //{attendees, promotions, reviews}
      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          price,
          date: new Date(date),
          time,
          location,
          availableSeats,
          ticketType,
          category,
          isFree,
          organizerId,
        },
      })
      return res.status(201).send(newEvent);
    } catch (error) {
      return res.status(500).send({ message: 'error creating event', error })
    }
  }

  async getEventById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const event = await prisma.event.findUnique({
        where: {
          id: Number(id),
        }
      })

      if (!event) {
        return res.status(404).json({ message: 'Event not found'});
      }

      return res.json(event);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching event', error})
    }
  }

}

console.log('event')
