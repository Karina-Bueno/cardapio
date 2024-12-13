import { ScrollView, Divider } from "native-base"
import { CardConsultas } from "../components/CardConsuta"
import { Titulo } from "../components/Titulo"
import { Botao } from "../components/Button"
import { Key, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { pegarConsultasPaciente } from "../servicos/PacienteServico"

interface Especialista {
	id: string;
	nome: string;
	imagem: string;
	especialidade: string
}

interface Consulta {
	map: any
	id: string;
	data: string;
	especialista: Especialista
}

export default function Consultas() {
	const [consultasProximas, setConsultasProximas] = useState<Consulta[]>([])
  const [consultasPassadas, setConsultasPassadas]= useState<Consulta[]>([])

	useEffect(() => {
		async function pegarConsultas() {
			const pacienteId = await AsyncStorage.getItem('pacienteId')
	
			if (!pacienteId) return 
			
			const todasConsultas: Consulta[] = await
				pegarConsultasPaciente(pacienteId)
			
			const agora = new Date();
	
			const proximas = todasConsultas.filter((consulta) => new Date(consulta.data) > agora);
	
			const passadas = todasConsultas.filter((consulta) => new Date(consulta.data) <= agora);
	
			setConsultasProximas(proximas);
			setConsultasPassadas(passadas);
		}
		pegarConsultas()
	}, [])

	return (
		<ScrollView p={5}>
			<Titulo color='blue.500' mb={5}>Minhas Consultas</Titulo>
			<Botao mt={5} mb={5}>Agendar nova consulta</Botao>

			<Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas Cosultas</Titulo>
			{consultasProximas?.map((consultas) => (
				<CardConsultas
					key={consultas?.id}
					nome={consultas?.especialista?.nome}
					especialidade={consultas?.especialista?.especialidade}
					foto={consultas?.especialista.imagem}
					data={consultas?.data}
					foiAgendado
				/>
			))}

			<Divider mt={5} />
			
			<Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Cosultas Passadas</Titulo>
			{consultasPassadas?.map((consultas) => (
				<CardConsultas
					key={consultas?.id}
					nome={consultas?.especialista?.nome}
					especialidade={consultas?.especialista?.especialidade}
					foto={consultas?.especialista.imagem}
					data={consultas?.data}
					foiAtendido
				/>
			))}
			
		</ScrollView>
	)
}