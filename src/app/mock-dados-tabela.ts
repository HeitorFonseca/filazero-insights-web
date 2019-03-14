export interface Generics{
    nome: string;
    agendados: number;
    concluidos: number;
    cancelados: number;
    naoconcluidos: number;
    atendentes?: Generics[];
}

export const SERVICOS: Generics[] = [
    {
        nome: 'Atendimentos diversos',
        agendados: 485,
        concluidos: 477,
        cancelados: 5,
        naoconcluidos: 3,
        atendentes: [
            {
                nome: 'Guichê 1',
                agendados: 310,
                concluidos: 307,
                cancelados: 2,
                naoconcluidos: 1
            },
            {
                nome: 'Guichê 2',
                agendados: 175,
                concluidos: 170,
                cancelados: 3,
                naoconcluidos: 2
            }
        ]
    },
    {
        nome: 'Cliente com agendamento',
        agendados: 43,
        concluidos: 32,
        cancelados: 11,
        naoconcluidos: 1,
        atendentes: [
            {
                nome: 'Recepção',
                agendados: 22,
                concluidos: 18,
                cancelados: 4,
                naoconcluidos: 1
            },
            {
                nome: 'Guichê 2',
                agendados: 21,
                concluidos: 12,
                cancelados: 7,
                naoconcluidos: 0
            }
        ]
    }
];

