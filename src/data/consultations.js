export const consultationsData = {
  Agendada: [
    {
      id: 1,
      petName: 'Rex',
      service: 'Consulta de Rotina',
      time: '10:00',
      imageSource: require('../assets/cat1.png'),
      status: 'Agendada',
      data: '10:00 | 25/10/2024',
      sintomas: 'Falta de apetite',
      localizacao: 'Clínica Vet Principal',
      implementos: ['Colar Elizabetano']
    },
    {
      id: 2,
      petName: 'Mia',
      service: 'Vacinação',
      time: '11:30',
      imageSource: require('../assets/dog1.png'),
      status: 'Agendada',
      data: '11:30 | 25/10/2024',
      sintomas: 'N/A',
      localizacao: 'Clínica Vet Principal',
      implementos: []
    }
  ],
  Andamento: [
    {
      id: 3,
      petName: 'Leo',
      service: 'Curativo',
      time: '14:00',
      imageSource: require('../assets/cat1.png'),
      status: 'Andamento',
      data: '14:00 | 24/10/2024',
      sintomas: 'Ferida na pata',
      localizacao: 'Clínica Vet Principal',
      implementos: ['Gaze', 'Antisséptico']
    }
  ],
  Concluídas: [
    {
      id: 4,
      petName: 'Thor',
      service: 'Pós-operatório',
      time: '09:00',
      imageSource: require('../assets/dog2.png'),
      status: 'Concluída',
      data: '09:00 | 20/10/2024',
      sintomas: 'Recuperação de cirurgia',
      localizacao: 'Clínica Vet Principal',
      implementos: []
    },
    {
      id: 5,
      petName: 'Luna',
      service: 'Exames de Sangue',
      time: '15:00',
      imageSource: require('../assets/cat1.png'),
      status: 'Concluída',
      data: '15:00 | 18/10/2024',
      sintomas: 'Check-up anual',
      localizacao: 'Clínica Vet Principal',
      implementos: []
    }
  ]
};