import PrevSlideButtonStyles from './PrevSlideButton.module.css';

export default function PrevSlideButton({ direction, currentIndex, onClick }) {
  return (
    <button
      onClick={onClick}
      className={PrevSlideButtonStyles.btnPrev}
      style={{ display: currentIndex === 0 ? 'none' : '' }}
    >
      <img
        src='/images/left_arrow.png'
        alt='leftArrow'
        id={PrevSlideButtonStyles.leftArrow}
      />
    </button>
  );
}
