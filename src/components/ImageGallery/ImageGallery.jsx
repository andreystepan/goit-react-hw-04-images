import { ImageGalleryItem } from 'components/ImageGalleryItem';

import API from '../../API/API';
import { BtnLoadMore } from 'components/Button';
import { Modal } from '../Modal';
import { Gallery } from './ImageGallery.styled';
import { useState } from 'react';
import { useEffect } from 'react';

const imgMapper = dataHits => {
  return dataHits.map(({ id, webformatURL, largeImageURL }) => {
    return { id, webformatURL, largeImageURL };
  });
};

export function ImageGallery({ query }) {
  const [largeImg, setLargeImg] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    setImages([]);
    setLoading(true);
  }, [query]);

  useEffect(() => {
    if (query === '') {
      return;
    }

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

  return (
    <>
      {images.length > 0 && (
        <Gallery>
          {images.map(({ webformatURL, largeImageURL, id }) => (
            <ImageGalleryItem
              onClick={handleClickImg}
              query={query}
              key={id}
              smallImg={webformatURL}
              largeImg={largeImageURL}
            />
          ))}
        </Gallery>
      )}

      {images.length > 0 && <BtnLoadMore onClick={loadMore} />}
      {largeImg && (
        <Modal largeImg={largeImg} query={query} onClose={closeModal} />
      )}
    </>
  );
}
