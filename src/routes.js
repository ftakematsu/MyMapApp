import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';

const Routes = createAppContainer(createStackNavigator({
  SignIn: { 
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
  Main: {
    screen: Main,
  },
}));


export default Routes;
