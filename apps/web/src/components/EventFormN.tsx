'use client';
import { IEvent } from '@/type/event';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { availableParallelism } from 'os';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Event name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().when('isFree', {
    is: false,
    then: (schema) =>
      schema
        .required('Price is required for paid events')
        .min(0, 'Price cannot be negative'),
    otherwise: (schema) => schema.notRequired(),
  }),
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is Required'),
  location: Yup.string().required('Location is required'),
  availableSeats: Yup.number()
    .required('Available seats is required')
    .min(1, 'At least 1 seat required'),
  ticketType: Yup.string().required('Ticket type is required'),
  category: Yup.string().required('Please select a category'),
});

const EventFormN = () => {
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const formik = useFormik<IEvent>({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      date: '',
      time: '',
      location: '',
      availableSeats: 0,
      ticketType: '',
      category: '-Select category',
      isFree: true,
    },
    validationSchema,
    onSubmit: async (values) => {
        console.log("Form Values:", values)

        console.log("images: ", images)
      const token = localStorage.getItem('token');
      const combinedDateTime = new Date(`${values.date}T${values.time}:00`).toISOString();

      const eventData = {
        ...values,
        date: combinedDateTime,
        price: values.isFree ? 0 : values.price,
        availableSeats: Number(values.availableSeats),
      }

      console.log("FormData prepared: ", eventData)

      try {
        const response = await fetch('http://localhost:8000/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'aplication/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error('failed to create event');
        }

        const result = await response.json();
        console.log("Server Response:", result)

        router.push(`events/${result.id}`);
      } catch (error) {
        console.error("Error creating event:",error);
        alert('Error creating event');
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const HandleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto bg-white p-8 rounded-md shadow-lg"
    >
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Create Event</h1>

      <div>
        <label className="block text-gray-600">Event Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mt-1"
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-gray-600">Description</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mt-1 h-32"
          required
        />
        {formik.touched.description && formik.errors.description ? (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        ) : null}
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1"
            required
          />
          {formik.touched.date && formik.errors.date ? (
            <p className="text-red-500 text-sm">{formik.errors.date}</p>
          ) : null}
        </div>

        <div className="flex-1">
          <label className="block text-gray-600">Time</label>
          <input
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1"
            required
          />
          {formik.touched.time && formik.errors.time ? (
            <p className="text-red-500 text-sm">{formik.errors.time}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="block text-gray-600">Location</label>
        <input
          type="text"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mt-1"
          required
        />
        {formik.touched.location && formik.errors.location ? (
          <p className="text-red-500 text-sm">{formik.errors.location}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-gray-600">Available Seats</label>
        <input
          type="number"
          name="availableSeats"
          value={formik.values.availableSeats}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mt-1"
          required
        />
        {formik.touched.availableSeats && formik.errors.availableSeats ? (
          <p className="text-red-500 text-sm">{formik.errors.availableSeats}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-gray-600">Ticket Type</label>
        <input
          type="text"
          name="ticketType"
          value={formik.values.ticketType}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mt-1"
          required
        />
        {formik.touched.ticketType && formik.errors.ticketType ? (
          <p className="text-red-500 text-sm">{formik.errors.ticketType}</p>
        ) : null}
      </div>

      <div>
        <label className="block text-gray-600">Category</label>
        <select
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          className="border border-gray-300 rounded-md p-2 w-full mt-1"
          required
        >
          <option value="" disabled>
            -Select category-
          </option>
          <option value="MUSIC">Music</option>
          <option value="SPORTS">Sports</option>
          <option value="CONFERENCE">Conference</option>
          <option value="WORKSHOP">Workshop</option>
          <option value="FESTIVAL">Festival</option>
          <option value="THEATER">Theater</option>
          <option value="OTHER">Other</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <p className="text-red-500 text-sm">{formik.errors.category}</p>
        ) : null}
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-gray-600">Is Free</label>
        <input
          type="checkbox"
          name="isFree"
          checked={formik.values.isFree}
          onChange={(e) => formik.setFieldValue('isFree', e.target.checked)}
          className="w-6 h-6 border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-600">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-2"
        />
        <div className="flex space-x-2 mt-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt="preview"
                width={100}
                height={100}
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => HandleRemoveImage(index
                )}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {!formik.values.isFree && (
        <div>
          <label className="block text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-1"
            required
          />
          {formik.touched.price && formik.errors.price ? (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
          ) : null}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventFormN;
