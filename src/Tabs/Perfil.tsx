import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base'
import { Titulo } from '../components/Titulo'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pegarDadosPaciente } from '../servicos/PacienteServico'
import { Paciente } from '../interfaces/Paciente'
import { Botao } from '../components/Button'

export default function Perfil({ navigation }: any){
	const [dadosPaciente, setDadosPaciente] = useState({} as Paciente);

  useEffect(() => {
		async function dadosPaciente() {
			const pacienteId = await AsyncStorage.getItem('pacienteId')

			if (!pacienteId) return

			try {
				const resultado = await pegarDadosPaciente
				(pacienteId)
				console.log(resultado)
				if (resultado) {
					setDadosPaciente(resultado)
				}
			} catch (error) {
				console.error(error);
			}
		}
    dadosPaciente()
  }, [])

  function deslogar() {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('pacienteId')
    navigation.navigate('Login')
  }

  return(
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="blue.500">Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: dadosPaciente?.imagem }} mt={5} />

        <Titulo color="blue.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>{dadosPaciente.nome || 'Nome não disponível'}</Titulo>
        <Text>{dadosPaciente.email || 'Email não disponível'}</Text>
        <Text>{dadosPaciente?.endereco?.estado || 'Estado não disponível'}</Text>

        <Divider mt={5} />

        <Titulo color="blue.500" mb={1}>Planos de saúde</Titulo>
				{
					dadosPaciente?.planosSaude && dadosPaciente.planosSaude.length > 0 ? (dadosPaciente.planosSaude.map((plano, index) => (
						<Text key={index}>{plano}</Text>
					))
					) : (
						<Text>Nenhum plano de saúde disponível</Text>
					)
				}

        <Botao onPress={deslogar}>
          Deslogar
        </Botao>
      </VStack>
    </ScrollView>
  )
}