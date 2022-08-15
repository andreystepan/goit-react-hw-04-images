import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import { PropTypes } from 'prop-types';
import {
  SearchHeader,
  SearchForm,
  BtnSearchForm,
  Input,
} from './Searchbar.styled';
import { useState } from 'react';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Введите имя запроса');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <BtnSearchForm type="submit">
          <BsSearch />
        </BtnSearchForm>
        <Input
          onChange={handleChange}
          value={query}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
