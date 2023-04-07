import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

const items = [
  {
    title: 'Thông tin chung',
    links: [
      'Giới thiệu TNC Computer',
      'Tuyển dụng',
      'Tin tức',
      'Ý kiến khách hàng',
      'Liên hệ hợp tác',
    ],
  },
  {
    title: 'Chính sách chung',
    links: [
      'Quy định chung',
      'Chính sách vận chuyển',
      'Chính sách bảo hành',
      'Chính sách đổi, trả lại hàng',
      'Chính sách cho doanh nghiệp',
    ],
  },
  {
    title: 'Thông tin khuyến mãi',
    links: ['Sản phẩm bán chạy', 'Sản phẩm khuyến mãi', 'Hàng thanh lý'],
  },
];

function Footer() {
  return (
    <>
      <footer className='bg-zinc-800 text-white py-6'>
        <div className='grid grid-cols-4 gap-10 max-w-6xl mx-auto'>
          {items.map(({ links, title }) => (
            <div key={title}>
              <h5 className='text-lg font-semibold mb-3'>{title}</h5>
              <ul className='grid gap-1'>
                {links.map((link) => (
                  <li className='cursor-pointer' key={link}>
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h5 className='text-lg font-semibold mb-3'>Follow us!</h5>
            <ul className='flex text-2xl gap-8'>
              <li>
                <a
                  href='https://www.facebook.com/pth.1641'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BsFacebook />
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/pth-1641'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BsGithub />
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/pth_1641'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BsInstagram />
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/in/pth1641'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BsLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <h2 className='text-center py-1 text-sm text-white bg-black'>
        Powered by pth-1641 ❤
      </h2>
    </>
  );
}

export default Footer;
