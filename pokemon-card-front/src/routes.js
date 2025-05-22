import { createStackNavigator } from '@react-navigation/stack';

import { Login } from './pages/login/loginPage'
import { Home } from './pages/home'
import { Scanner } from './pages/user/scanner'

const Stack = createStackNavigator();

export function Routes(){
    return(        
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Scanner"
                component={Scanner}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>    
    )
}