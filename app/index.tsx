import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { TEMAS } from '@/src/styles/temas';
import Rotas from '@/src/Rotas';

export default function Index() {
	return (
		<NativeBaseProvider theme={TEMAS}>
			<StatusBar backgroundColor={TEMAS.colors.blue[800]} />
			<Rotas />
		</NativeBaseProvider>
  );
}

