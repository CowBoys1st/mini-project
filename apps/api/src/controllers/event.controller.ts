import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany({
        include: {
          image: true,
        },
      });
      return res.status(200).send(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEventById(req: Request, res: Response) {
    const id: number = +req.params.id;
    try {
      const event = await prisma.event.findUnique({
        where: { id: id },
        include: {
          image: true,
        },
      });

      if (!event) throw 'event not found';

      return res.status(200).send({
        status: 'ok',
        event,
      });
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        msg: error,
      });
    }
  }

  async createEvents(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      date,
      time,
      location,
      availableSeats,
      ticketType,
      category,
      isFree,
      organizerId,
    } = req.body;

    console.log(req.body);
    try {
      if (!name || !description || price === undefined || !date || !time || !location || !availableSeats || !category) {
        throw "missing required field"
      }

      const userId = req.user?.userId

      const userExists = await prisma.user.findUnique({
        where: { id: userId },        
      });
      if (!userExists) {
        throw 'Event Organizer not found';
      }

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
          organizer: { connect: { id: userId } },
        },
      });

      return res.status(201).send({
        status: 'ok',
        newEvent,
      });
    } catch (error) {
      return res.status(500).send({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }

  async CreateImage(req: Request, res: Response) {
    try {
      if (!req.file) throw 'no file uploaded'; // dapat dari middleware upload.ts
      const link: string = `http://localhost:8000/public/events/${req.file?.filename}`;
      console.log(link);

      const { eventId } = req.body;

      const image = await prisma.image.create({
        data: {
          eventId: +eventId,
          url: link,
        },
      });

      res.status(200).send({
        status: 'ok',
        event: image,
      });
    } catch (err) {
      res.status(400).send({
        status: 'error',
        message: err instanceof Error ? err.message : 'unknown error',
      });
    }
  }

  async getEventByEoId(req:Request, res:Response) {
    try {
      const userId= req.user?.userId

      const events = await prisma.event.findMany({
        where:{
          organizerId:userId
        },
        include:{Ticket:true, reviews:true}
      })
      return res.status(200).send({events})

    } catch (err) {
      
    }
  }
}
