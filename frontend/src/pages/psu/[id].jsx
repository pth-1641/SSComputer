import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductBasic from '../../components/ProductBasic';
import ProductDetails from '../../components/ProductDetails';
import ProductReviews from '../../components/ProductReviews';
import ProductSpecs from '../../components/ProductSpecs';
import ProductsSlider from '../../components/ProductsSlider';

function PsuDetails() {
  const [psu, setPsu] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/psus/${id}`);
      setPsu(data);
    })();
  }, []);

  if (!psu) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={psu}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={psu.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={psu.details} title={psu.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={psu.details.review} title={psu.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default PsuDetails;
