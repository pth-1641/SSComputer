function ProductDetails({ details, title }) {
  if (!details.features.length) {
    return (
      <p className='text-center my-10 font-medium'>
        Chưa có bài đánh giá cho {title}
      </p>
    );
  }

  return (
    <div className='my-10'>
      <h2 className='text-center font-semibold text-2xl'>
        Đánh giá chi tiết {title}
      </h2>
      <h3 className='font-medium my-2'>{details.shortDescription.title}</h3>
      <img
        className='mx-auto'
        src={details.shortDescription.thumbnail}
        alt={title}
      />
      {details.features.map((feat, idx) => (
        <div key={idx} className='mb-3 mt-1'>
          <h4 className='font-semibold text-lg'>{feat.title}</h4>
          {feat.thumbnail && (
            <img className='mx-auto my-2' src={feat.thumbnail} alt={title} />
          )}
          <p>{feat.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductDetails;
