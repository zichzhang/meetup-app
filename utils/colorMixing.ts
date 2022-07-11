import { ColorValue } from "react-native";

const rgbaToArray = (rgba: string) => {
    const arr = rgba.substring(5).split(')')[0].split(',');
    if (arr.indexOf('/') > -1) arr.splice(3, 1);
    return arr.map((x) => parseFloat(x));
  };
  
  const colorMixing = (color: string | undefined, base: ColorValue) => {
    let mix1, mix2;
    
    const baseColor = base;
    mix1 = rgbaToArray(baseColor.toString()); // try valueOf
    if (color) {
        mix2 = rgbaToArray(color);
    }
    const mix = [];

    if (mix1 && mix2) {
        mix[3] = 1 - (1 - mix2[3]) * (1 - mix1[3]); // alpha
        mix[0] = Math.round(
        (mix2[0] * mix2[3]) / mix[3] + (mix1[0] * mix1[3] * (1 - mix2[3])) / mix[3]
        ); // red
        mix[1] = Math.round(
        (mix2[1] * mix2[3]) / mix[3] + (mix1[1] * mix1[3] * (1 - mix2[3])) / mix[3]
        ); // green
        mix[2] = Math.round(
        (mix2[2] * mix2[3]) / mix[3] + (mix1[2] * mix1[3] * (1 - mix2[3])) / mix[3]
        ); // blue
        return `rgba(${mix.join(',')})`;
    }
  };
  
  export default colorMixing;