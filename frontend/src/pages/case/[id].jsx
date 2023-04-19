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

function CaseDetails() {
  const [computerCase, setComputerCase] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/cases/${id}`);
      setComputerCase(data);
      console.log(data);
    })();
  }, []);

  if (!computerCase) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={computerCase}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={computerCase.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={computerCase.details} title={computerCase.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails
          details={computerCase.details.review}
          title={computerCase.title}
        />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default CaseDetails;
