import BasePage from "components/pages/BasePage";
import { View, Image, Dimensions } from "react-native";
import { Images } from "assets/images";


const SignUpPage = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <BasePage
            backgroundColor={'#000000'}
        >
            <Image 
                source={Images.logo}
                style={{ width: 200, height: 150 }} 
            />
        </BasePage>
    );

}

export default SignUpPage;