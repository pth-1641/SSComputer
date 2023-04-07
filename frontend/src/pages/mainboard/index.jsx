import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'react-router-dom';
import Products from '../../components/Products';

function Mainboards() {
  const { search, key } = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const currentPage = parseInt(search.match(/\d+/)?.[0]);
      const { data } = await axios.get(
        `mainboards?page=${isNaN(currentPage) ? 1 : currentPage}`
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
        title='Mainboard'
      />
    </>
  );
}

export default Mainboards;
