import axios from 'axios';
import { useState, useEffect } from 'preact/hooks';
import { useParams, useSearchParams } from 'react-router-dom';
import Products from '../components/Products';

function Search() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const queryStr = searchParams.get('q');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/search?q=${queryStr}`);
      setData(data);
    })();
  }, [queryStr]);

  return (
    <>
      <Products
        items={data.items}
        totalItems={data.totalItems}
        title={`Tìm kiếm: ${queryStr}`}
      />
    </>
  );
}

export default Search;
