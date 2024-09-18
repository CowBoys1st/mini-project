'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface ImageUploadProps {
  eventId: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ eventId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('eventId', eventId.toString()); // Mengirim eventId
    try {
      const response = await axios.post('http://localhost:8000/events/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Upload successful!');
      setImageUrl(response.data.event.url); // URL dari backend
    } catch (error) {
      if (error instanceof Error) {
        setUploadStatus('Upload failed: ' + error.message);
      } else {
        setUploadStatus('Upload failed: Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" width="300" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
