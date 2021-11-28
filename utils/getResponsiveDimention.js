import { Dimensions } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const responsiveRatio = viewportWidth / 1440;
const getResponsiveDimention = (value) => {
    return responsiveRatio * value;
};

export default getResponsiveDimention;