import NextSlideButtonStyles from './NextSlideButton.module.css';

export default function NextSlideButton({
  currentIndex,
  dataLength,
  slidePx,
  direction,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={NextSlideButtonStyles.btnNext}
      style={{ display: currentIndex === dataLength.length ? 'none' : '' }}
    >
      <img
        src='/images/left_arrow.png'
        alt='rightArrow'
        id={NextSlideButtonStyles.rightArrow}
      />
    </button>
  );
}
