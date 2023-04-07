import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import Products from '../../components/Products';
import { useLocation } from 'react-router-dom';

function Psus() {
  const { search, key } = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const currentPage = parseInt(search.match(/\d+/)?.[0]);
      const { data } = await axios.get(
        `psus?page=${isNaN(currentPage) ? 1 : currentPage}`
      );
      setData(data);
    })();
  }, [key]);

  return (
    <>
      <Products
        items={data.items}
        totalItems={data.totalItems}
        totalPages={data.totalPages}
        title='Nguồn máy tính'
      />
    </>
  );
}

export default Psus;
