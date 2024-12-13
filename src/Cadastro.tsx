import { Image, Text, Box, Link, Checkbox, ScrollView, useToast } from 'native-base';
import Logo from '@/src/assets/Logo.png'
import { EntradaTexto } from './components/EntradaTexto';
import { Titulo } from './components/Titulo';
import { useState } from 'react';
import { Botao } from './components/Button'
import { secoes } from './utils/CadastroEntradaTexto';
import { cadastrarPaciente } from './servicos/PacienteServico';
import { NavigationProps } from './@types/navigation';

export default function Cadastro({ navigation } : NavigationProps<'Cadastro'>) {
	const [numSecao, setNumSecao] = useState(0);
	const [dados, setDados] = useState({} as any);
	const [planos, setPlanos] = useState([] as number[]);
	const toast = useToast();

	function avancarSecao() {
		if (numSecao < secoes.length - 1) {
			setNumSecao(numSecao+1)
		}
		else {
			console.log(dados);
			console.log(planos);
			cadastrar()
		}
	}

	function voltarSecao() {
		if (numSecao > 0) {
			setNumSecao(numSecao-1)
		}
	}

	function atualizarDados(id: string, valor: string) {
		setDados({...dados, [id]: valor})//copia tudo que está salvo em dados e depois armazena em [id]: valor
	}

	async function cadastrar() {
		const resultado = await cadastrarPaciente({
			cpf: dados.cpf,
			nome: dados.nome,
			email: dados.email,
			endereco: {
				cep: dados.cep,
				rua: dados.rua,
				numero: dados.numero,
				estado: dados.estado,
				complemento: dados.complemento
			},
			senha: dados.senha,
			telefone: dados.telefone,
			possuiPlanoSaude: planos.length > 0,
			planosSaude: planos, 
			imagem: dados.imagem
		})

		if (resultado) {
			toast.show({
				title: 'Cadastro realizado com sucesso',
				description: 'Você já pode fazer login',
				backgroundColor: 'green.500',
			})
			navigation.navigate('Login');
		}
		else {
      toast.show({
        title: 'Erro ao cadastrar',
        description: 'Verifique os dados e tente novamente',
        backgroundColor: 'red.500',
      })
    }
	}

  return (
		<ScrollView flex={1} p={5}>
			<Image source={Logo} alt='Logo Voll' alignSelf='center' />
			
			<Titulo>
				{secoes[numSecao].titulo}
			</Titulo>
			<Box>
				{
					secoes[numSecao]?.entradaTexto?.map(entrada => {
						return entrada.label && (<EntradaTexto
							label={entrada.label}
							placeholder={entrada.placeholder}
							key={entrada.id}
							secureTextEntry={entrada.secureTextEntry}
							value={dados[entrada.name]}
							onChangeText={(text) => atualizarDados(entrada.name, text)}
						/>)
					})
				}
			</Box>
			{numSecao === 2 && (
				<Box>
					{numSecao == 2 && <Text color="blue.800" fontWeight="bold" fontSize="md" mt="2" mb={2}>
						Selecione o plano:
					</Text>}

					{
						secoes[numSecao]?.checkbox?.map(checkbox => {
							return (
								<Checkbox
									key={checkbox.id}
									value={checkbox.value}
									onChange={() => {
										setPlanos((planosAnteriores) => {
											if (planosAnteriores.includes(checkbox.id)) {
												return planosAnteriores.filter((id) => id !== checkbox.id)
											}
											return [...planosAnteriores, checkbox.id]
										})
									}}
									isChecked={planos.includes(checkbox.id)}//retorna se o id atual(checkbox) está salvo dentro de planos
								>
									{checkbox.value}
								</Checkbox>
							)
						})
					}
				</Box> 
			)}
			{numSecao > 0 && <Botao onPress={() => voltarSecao()}
				w='100%'
				bg='gray.400'
				mt={10}
				borderRadius='lg'
			>
				Voltar
			</Botao>}
			<Botao onPress={() => avancarSecao()}
				w='100%'
				bg='blue.800'
				mt={4}
				borderRadius='lg'
				mb={20}
			>
				{numSecao == 2? 'Finalizar' : 'Avancar'}
			</Botao>
		</ScrollView>
  );
}

