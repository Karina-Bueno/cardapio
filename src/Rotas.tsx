import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Login from './Login';
import Cadastro from './Cadastro';
import Tabs from './Tabs';
import Agendamento from './Agendamento';

export default function Rotas() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name='Login'
					component={Login as React.FC} options={{ headerShown: false }} />
				<Tab.Screen
					name='Cadastro'
					component={Cadastro as React.FC} options={{ headerShown: false }} />
				<Tab.Screen
					name='Tabs'
					component={Tabs as React.FC} options={{ headerShown: false }} />
				<Tab.Screen 
					name="Agendamento"
					component={Agendamento as React.FC} options={{ headerShown: false }}
        />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

