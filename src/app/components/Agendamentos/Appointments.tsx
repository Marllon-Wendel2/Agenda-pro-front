interface Appointments {
    id: string;
    hour: string;
    createdAt: string;
    user: string;
    service: string;
    client: string;
}

const dataMock: Appointments[] = [
  {
    id: "1",
    hour: "2025-08-21T09:00:00",
    createdAt: "2025-08-20T18:45:00",
    user: "Marllon",
    service: "Corte de cabelo",
    client: "João Silva",
  },
  {
    id: "2",
    hour: "2025-08-21T10:30:00",
    createdAt: "2025-08-20T19:00:00",
    user: "Marllon",
    service: "Barba",
    client: "Pedro Santos",
  },
  {
    id: "3",
    hour: "2025-08-21T14:00:00",
    createdAt: "2025-08-21T08:15:00",
    user: "Vannely",
    service: "Manicure",
    client: "Maria Souza",
  },
];

export default function Appointments (){
    return''
}