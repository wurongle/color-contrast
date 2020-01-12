import Color from "color";

const DEFAULT_BACKGROUND_COLOR = "#232323";

// https://www.w3.org/TR/AERT/#color-contrast
const getPerceivedBrightness = (r, g, b) => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const AdjustTextContrast = (
  textColorStr,
  bgColorStr,
  limitRelativeBrightness=80
) => {
  const textColor = Color(textColorStr);
  const textRgb = textColor.rgb().array();
  const textAlpha = textColor.alpha();
  const bgColor = Color(bgColorStr || DEFAULT_BACKGROUND_COLOR);
  const bgRgb = bgColor.rgb().array();
  const textPBrightness = getPerceivedBrightness(...textRgb);
  const bgPBrightness = getPerceivedBrightness(...bgRgb);
  // const relativeBrightness = Math.abs(textPBrightness - bgPBrightness);
  const limitBrightness = limitRelativeBrightness + bgPBrightness;

  console.log(textPBrightness, bgPBrightness);

  if (textPBrightness < limitBrightness) {
    const relativeBrightnessRatio =
      (limitBrightness * 1000) /
      (textRgb[0] * 299 + textRgb[1] * 587 + textRgb[2] * 114);

    let newTextR = Math.min(255, textRgb[0] * relativeBrightnessRatio);
    let newTextG = Math.min(255, textRgb[1] * relativeBrightnessRatio);
    let newTextB = Math.min(255, textRgb[2] * relativeBrightnessRatio);

    if (newTextG == 0) {
      newTextG = (limitBrightness * 1000 - newTextR * 299 - newTextB * 114) / 587;
    } else if (newTextR == 0) {
      newTextR = (limitBrightness * 1000 - newTextG * 587 - newTextB * 114) / 299;
    } else if (newTextB == 0) {
      newTextB = (limitBrightness * 1000 - newTextR * 299 - newTextG * 587) / 114;
    } else if (newTextR == 255 || newTextB == 255) {
      newTextG = (limitBrightness * 1000 - newTextR * 299 - newTextB * 114) / 587;
    } else if (newTextG == 255) {
      newTextB = (limitBrightness * 1000 - newTextR * 299 - newTextG * 587) / 114;
    }

    return Color.rgb(newTextR, newTextG, newTextB).alpha(textAlpha).rgb();
  }else{
    return;
  }
};

// test
const textColorStr = "rgb(0,0,204)";
console.log(AdjustTextContrast(textColorStr).toString());

export { AdjustTextContrast };
