function HeaderTitle({ title }) {
  return (
    <div className='w-full h-4 bg-gray-200 mt-20 mb-10 relative'>
      <span className='bg-white px-16 -skew-x-12 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white select-none'>
        {title}
      </span>
      <span className='text-2xl px-16 font-bold absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 uppercase'>
        {title}
      </span>
    </div>
  );
}

export default HeaderTitle;
