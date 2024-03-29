import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./product-style.css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

export default function ProductDetails() {
  const [value, setValue] = useState(1);
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleIncrement = () => {
    setValue(value + 1);
  };
  const handleDecrement = () => {
    setValue(value - 1);
  };

  return (
    <>
      <section className="product-details w-full h-auto ">
        <div className="details-main w-full px-5 sm:px-8 xl:px-16 py-4">
          <div className="details-grid grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-4 w-full">
            <div className="grid-slider">
              <Swiper
                className="mySwiper2"
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                slidesPerView={1}
                Autoplay
                loop={true}
                centeredSlides={true}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                  },
                  1024: {
                    slidesPerView: 1,
                  },
                }}
              >
                {details.images &&
                  details.images.map((image, index) => (
                    <SwiperSlide key={index} className="aspect-squar">
                      <img
                        src={image}
                        alt={image.title}
                        className="w-full h-full aspect-square"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
              {/* <Swiper
                onSwiper={setThumbsSwiper}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                spaceBetween={10}
                freeMode={true}
                className="mySwiper"
              >
                {details.images &&
                  details.images.map((image, index) => (
                    <SwiperSlide key={index} className="aspect-square">
                      <img
                        src={image}
                        alt={image.title}
                        defaultValue={image}
                        className="w-full h-full aspect-square"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper> */}
            </div>
            <div className="grid-content flex flex-col lg:items-start items-center gap-4">
              <h2 className="product-title text-[4rem]">{details.title}</h2>
              <h4 className="product-price lg:text-[1.8rem] text-[1.6rem]">
                $ {details.price}
              </h4>
              <div className="quantity-box flex flex-col lg:w-[9rem] ">
                <p className="quantity mb-2 text-[1.3rem]">Quantity</p>
                <div className="quantity-btn-box w-full flex items-center justify-center border">
                  <button
                    onClick={handleDecrement}
                    disabled={value === 1}
                    className="w-[3rem] h-8 "
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={value}
                    name=""
                    id=" "
                    className="w-[3rem] h-8 p-2 border-none focus:outline-none"
                  />
                  <button onClick={handleIncrement} className="w-[3rem] h-8 ">
                    +
                  </button>
                </div>
              </div>
              <div className="btn-box flex flex-col gap-4 w-[25rem]">
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Buy it now
                </button>
                <Link
                  to="/cart-page"
                  className="flex items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <button type="button">Add to cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
