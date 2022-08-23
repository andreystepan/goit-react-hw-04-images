import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from 'API/API';
import { BtnLoadMore } from 'components/Button';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { useState } from 'react';
import { useEffect } from 'react';

const imgMapper = dataHits => {
  return dataHits.map(({ id, webformatURL, largeImageURL }) => {
    return { id, webformatURL, largeImageURL };
  });
};

export function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [largeImg, setLargeImg] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [query]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    API.fetchApi(query, page)
      .then(data => setImages(prevImg => [...prevImg, ...imgMapper(data.hits)]))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleClickImg = largeImg => {
    setLargeImg(largeImg);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setLargeImg(null);
  };

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer />
      <ImageGallery query={query} images={images} onClick={handleClickImg} />
      {loading && <Loader />}
      {images.length > 0 && <BtnLoadMore onClick={loadMore} />}
      {largeImg && (
        <Modal largeImg={largeImg} query={query} onClose={closeModal} />
      )}
    </div>
  );
}
