import BasePage from "components/pages/BasePage";
import { Image } from "react-native";
import { Images } from "assets/images";


const SignUpPage = () => {

    return (
        <BasePage>
            <Image 
                className="w-1/2 h-1/12"
                source={Images.logo}
            />
        </BasePage>
    );

}

export default SignUpPage;