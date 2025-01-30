import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchCategories } from "../../features/category/categorySlice";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

const Categories = ({handleCategory}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [slidesPerView, setSlidesPerView] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      // Adjust slidesPerView based on screen width
      if (window.innerWidth >= 1200) {
        setSlidesPerView(8);
      } else if (window.innerWidth >= 992) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(2);
      }
    };

    // Call handleResize initially and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);



  
  return (
    <StyledSwiper
      modules={[Pagination]}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
    >
      {categories &&
        categories.map((category, index) => (
          <SwiperSlide key={index} onClick={() => handleCategory(category._id)}>
            <div className="categories">
              <span>{category.name}</span>
            </div>
          </SwiperSlide>
        ))}
    </StyledSwiper>
  );
};

const StyledSwiper = styled(Swiper)`
  padding: 2rem;
  background-color: transparent;
  margin-top: 1rem;
  .categories {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 10rem;
    height: 6rem;
    background: #fff;
    border: 7px solid var(--blueCard);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-radius: 20px;
    cursor: pointer;

    .swiper-pagination-bullet-active {
      background: var(--orange);
    }

    .swiper-slide {
      cursor: pointer;
    }
  }
`;

export default Categories;
