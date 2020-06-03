import Knex from "knex";

export async function seed (knex: Knex) {
    const items = [
        { title:  'Lâmpadas', image: 'lampada.svg'},
        { title:  'Pilhas e Baterias', image: 'baterias.svg'},
        { title:  'Papéis e papelão', image: 'papeis-papelao.svg'},
        { title:  'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        { title:  'Resíduos Orgânicos', image: 'organico.svg'},
        { title:  'Óleo de Cozinha', image: 'oleo.svg'},
    ];

    await knex('items').insert(items);
}