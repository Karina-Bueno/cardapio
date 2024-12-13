import { VStack, Text, Box, ScrollView, Image, Divider } from "native-base";
import { Botao } from '../components/Button'
import { Titulo } from "../components/Titulo";
import { EntradaTexto } from "../components/EntradaTexto";
import { depoimentos } from "../utils/mock";

import Logo from '@/src/assets/Logo.png'

export default function Principal() {
	return (
		<ScrollView flex={1} p={5}>
			<Image source={Logo} alt="Logo Voll" />
			<Titulo textAlign='left' color="blue.500" mt={6} mb={5}>
        Boas-vindas!
      </Titulo>
			<Box w="100%" borderRadius="lg" p={3} mt={5} shadow="1" borderRightRadius="md">
        <EntradaTexto
          placeholder="Digite a especialidade"
        />
        <EntradaTexto
          placeholder="Digite a localização"
				/>
				<Botao mt={3} mb={3} bg='blue.800'>
					Buscar
				</Botao>
			</Box>
			
			<Text alignSelf="center" fontSize='lg' fontWeight="bold" color="blue.800" mt={5}>
				Depoimentos
			</Text>
			<VStack space={3} divider={<Divider />} w="100%">
          {
            depoimentos.map(depoimento => (
              <Box key={depoimento.id} w="100%" borderRadius="lg" p={3}>
                <Text color="gray.300" fontSize="md" textAlign="justify">
                  {depoimento.text}
                </Text>
                <Text color="gray.500" fontSize="lg" fontWeight="bold" alignSelf="center" mt="2">{depoimento.titulo}</Text>
              </Box>
            ))
          }
        </VStack>
		</ScrollView>
	)
}