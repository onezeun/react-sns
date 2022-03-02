import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, Global } from './styles';


const ImagesZoom = ({ images, onClose }) => {
  // 현재 슬라이드가 몇인지 state로 저장
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            infinite={0}       // 몇번째부터 시작할지
            beforeChange={(slide) => setCurrentSlide(slide)} // 슬라이드 번호 저장
            infinite           // 무한반복 (3번째 → 0번째)
            arrows={false}     // 화살표 없애기
            slidesToShow={1}   // 하나씩만 보이고
            slidesToScroll={1} // 하나씩만 넘김
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          {/* 현재 몇 번째 슬라이드를 보고 있는지 */}
          <Indicator>
            <div>
              {currentSlide + 1}
              {' '}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
