import { VStack, Box, ScrollView } from "native-base";
import { Botao } from "../components/Button";
import { CardConsultas } from "../components/CardConsuta";
import { EntradaTexto } from "../components/EntradaTexto";
import { Titulo } from "../components/Titulo";
import { useState } from "react";
import { NavigationProps } from "../@types/navigation";
import { StackNavigationProp } from '@react-navigation/stack';
import { buscarEspecialistaPorEstado } from "../servicos/EspecialistaServico";

// Tipagem do StackNavigator
// type RootStackParamList = {
//   Explorar: undefined;
//   Agendamento: { especialistaId: string };
// };

// Navegação para o componente 'Explorar'
// type ExplorarNavigationProp = StackNavigationProp<RootStackParamList, 'Explorar'>;

// interface ExplorarProps {
//   navigation: ExplorarNavigationProp;
// }

interface Especialista {
  nome: string,
  imagem: string,
  especialidade: string,
  id: string;
}

export default function Explorar({ navigation }: NavigationProps<'Explorar'>) {
	const [estado, setEstado] = useState('');
	const [especialidade, setEspecialidade] = useState('');
	const [resultadoBusca, setResultadoBusca] = useState([]);

	async function buscar() {
		if (!estado || !especialidade) return null;
		const resultado = await buscarEspecialistaPorEstado(estado, especialidade);
		if (resultado) {
			setResultadoBusca(resultado);
			console.log(resultado);
		}
	}

  return(
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" p={5}>
        <Box w="100%" borderRadius="lg" p={3} mt={5} shadow="1" borderRightRadius="md">
          <EntradaTexto
						placeholder="Digite a especialidade"
						value={especialidade}
						onChangeText={setEspecialidade}
          />
          <EntradaTexto
						placeholder="Digite sua localização"
						value={estado}
						onChangeText={setEstado}
          />
          <Botao mt={3} mb={3} onPress={buscar}>
            Buscar
          </Botao>
        </Box>

        <Titulo color="blue.500" alignSelf="center">Resultado da Busca</Titulo>
        {resultadoBusca?.map((especialista: Especialista, index) => (
          <VStack flex={1} w="100%" alignItems="flex-start" bgColor="white" key={index}>
            <CardConsultas 
							especialidade={especialista.especialidade}
							foto={especialista.imagem}
							nome={especialista.nome}
							onPress={() => navigation.navigate('Agendamento', { especialistaId: especialista.id })}
						/>
          </VStack>
        ))}
      </VStack>
    </ScrollView>
  )
}