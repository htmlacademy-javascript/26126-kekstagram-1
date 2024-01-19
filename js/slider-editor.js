import {uploadForm, imgPreview} from './element.js';
import {getEffectSelector} from './util.js';
import {Effects, sliderOptionsObjectChromeSepia, sliderOptionsObjectMarvinDefault, EFFECT_LEVEL_MAX, styleFilterByEffects} from './const.js';

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


const getUpdateSliderOptions = (effect, sliderElement) => {
  switch (effect) {
    case Effects.chrome: {
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectChromeSepia);
    }
    case Effects.sepia: {
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectChromeSepia);
    }
    case Effects.marvin: {
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectMarvinDefault);
    }
    case Effects.phobos: {
      return sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
    }
    case Effects.heat: {
      return sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
    }
    default:
      return sliderElement.noUiSlider.updateOptions(sliderOptionsObjectMarvinDefault);
  }
};

const resetFilter = () => {
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.classList.replace(selectorImg, 'effects__preview--none');
};


effectSlider.noUiSlider.on('update', () => {
  effectLevelInput.value = effectSlider.noUiSlider.get();
  effectRadioBtns.forEach((item)=> {
    if(item.checked){
      if(item.id !== 'effect-none') {
        sliderContainer.classList.remove('hidden');
      }
      switch (item.id){
        case Effects.chrome: {
          imgPreview.style.filter = styleFilterByEffects.chrome(effectLevelInput.value);
          break;
        }
        case Effects.sepia: {
          imgPreview.style.filter = styleFilterByEffects.sepia(effectLevelInput.value);
          break;
        }
        case Effects.marvin: {
          imgPreview.style.filter = styleFilterByEffects.marvin(effectLevelInput.value);
          break;
        }
        case Effects.phobos: {
          imgPreview.style.filter = styleFilterByEffects.phobos(effectLevelInput.value);
          break;
        }
        case Effects.heat: {
          imgPreview.style.filter = styleFilterByEffects.heat(effectLevelInput.value);
          break;
        }
        default: {
          resetFilter();
        }
      }
    }
  });
});

const onEffectRadioBtnClick = (evt) => {
  const currentRadioBtn = evt.target.closest('.effects__radio');
  if(currentRadioBtn){
    const effectBtnId = currentRadioBtn.id;
    imgPreview.classList.replace(selectorImg, getEffectSelector(effectBtnId));
    getUpdateSliderOptions(effectBtnId, effectSlider);
  }
};


export {onEffectRadioBtnClick, resetFilter};
