'use client';
import { IEvent } from '@/type/event';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
    .required('Available seats is requred')
    .min(1, 'At least 1 seat reqired'),
  ticketType: Yup.string().required('Ticket type is required'),
  category: Yup.string().required('Please select a category'),
});

const EventForm = () => {
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
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(
          key,
          typeof value === 'boolean' ? String(value) : String(value),
        );
      });

      images.forEach((image, index) => {
        formData.append(`$image_${index}`, image);
      });

      try {
        const response = await fetch('http://localhost:8000/api/events', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('failed to create event');
        } 

        const result = await response.json();
        router.push(`events/${result.id}`);
      } catch (error) {
        console.error(error);
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
      className="space-y-4 w1/3 flex flex-col justify-center"
    >
      <div>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        ) : null}
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.description && formik.errors.description ? (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        ) : null}
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          disabled={formik.values.isFree}
        />
        {formik.touched.price && formik.errors.price ? (
          <p className="text-red-500 text-sm">{formik.errors.price}</p>
        ) : null}
      </div>
      <div>
        <label>Date</label>
        <input
          type="text"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.date && formik.errors.date ? (
          <p className="text-red-500 text-sm">{formik.errors.date}</p>
        ) : null}
      </div>
      <div>
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.price && formik.errors.price ? (
          <p className="text-red-500 text-sm">{formik.errors.price}</p>
        ) : null}
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.location && formik.errors.location ? (
          <p className="text-red-500 text-sm">{formik.errors.location}</p>
        ) : null}
      </div>
      <div>
        <label>Available Seats</label>
        <input
          type="number"
          name="availableSeats"
          value={formik.values.availableSeats}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.availableSeats && formik.errors.availableSeats ? (
          <p className="text-red-500 text-sm">{formik.errors.availableSeats}</p>
        ) : null}
      </div>
      <div>
        <label>Ticket Type</label>
        <input
          type="text"
          name="ticketType"
          value={formik.values.ticketType}
          onChange={formik.handleChange}
          className="border rounded p-2 w-full"
          required
        />
        {formik.touched.ticketType && formik.errors.ticketType ? (
          <p className="text-red-500 text-sm">{formik.errors.ticketType}</p>
        ) : null}
      </div>
      <div>
        <label>Category</label>
        <select
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          required
        >
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
      <div className="flex items-center">
        <label className="mr-2">Is Free</label>
        <input
          type="checkbox"
          name="isFree"
          checked={formik.values.isFree}
          onChange={(e) => formik.setFieldValue('isFree', e.target.checked)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label>Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className="flex space-x-2 mt-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt="preview"
                width={100}
                height={100}
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => HandleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
