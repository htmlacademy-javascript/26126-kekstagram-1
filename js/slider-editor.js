import {uploadForm, imgPreview} from './element.js';
import {getEffectSelector} from './util.js';
import {Effects, EFFECT_LEVEL_MAX, styleFilterByEffects} from './const.js';

const effectLevelInput = uploadForm.querySelector('.effect-level__value');
effectLevelInput.value = EFFECT_LEVEL_MAX;
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const selectorImg = imgPreview.classList;

const effectRadioBtns = uploadForm.querySelectorAll('.effects__radio');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});


const getUpdateSliderOptions = (effect, sliderElement) =>
  sliderElement.noUiSlider.updateOptions(Effects[effect]);

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.classList.replace(selectorImg, 'effects__preview--none');
};


effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectRadioBtns.forEach((item)=> {
    if(item.checked){
      if(item.value !== 'none') {
        sliderContainer.classList.remove('hidden');
        imgPreview.style.filter = styleFilterByEffects[item.value](effectLevelInput.value);
      } else {
        resetFilter();
      }
    }
  });
});

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if(currentRadioBtn){
    const effectBtnValue = currentRadioBtn.value;
    imgPreview.classList.replace(selectorImg, getEffectSelector(effectBtnValue));
    getUpdateSliderOptions(effectBtnValue, effectSlider);
  }
};


export {onEffectRadioBtnClick, resetFilter};
