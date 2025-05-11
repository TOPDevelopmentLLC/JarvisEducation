import BasePage from "components/pages/BasePage";
import { View, Image, Dimensions } from "react-native";


const SignUpPage = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <BasePage
            backgroundColor={'#000000'}
        >
            <Image 
                source={require('../assets/images/NegativeJarvisEdLogo.png')}
                style={{ width: 200, height: 150 }} 
            />
        </BasePage>
    );

}

export default SignUpPage;