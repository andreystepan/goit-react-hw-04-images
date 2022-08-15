import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { useState } from 'react';

export function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <div>
      {loading && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer />
      <ImageGallery query={query} />
    </div>
  );
}
