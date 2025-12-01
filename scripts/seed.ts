import sequelize from '../src/config/database.js';
import { Book, Author, Category, Publisher } from '../src/api/models/index.js';

async function seed() {
    try {
        console.log('Iniciando o seed do banco de dados...');

        // Sincroniza o banco (force: true recria as tabelas para garantir IDs corretos)
        await sequelize.sync({ force: true });

        // 1. Criar Autores
        console.log('Criando Autores...');
        const authorsData = [
            { name: 'J.K. Rowling', bio: 'Autora de Harry Potter', email: 'jk@email.com', phone: '11999990001' },
            { name: 'George R.R. Martin', bio: 'Autor de Game of Thrones', email: 'george@email.com', phone: '11999990002' },
            { name: 'Isaac Asimov', bio: 'Pai da ficção científica', email: 'isaac@email.com', phone: '11999990003' },
            { name: 'Agatha Christie', bio: 'Rainha do crime', email: 'agatha@email.com', phone: '11999990004' },
        ];
        const authors = await Author.bulkCreate(authorsData);

        // 2. Criar Editoras
        console.log('Criando Editoras...');
        const publishersData = [
            { name: 'Rocco', address: 'Rio de Janeiro, RJ', phone: '2199999999' },
            { name: 'Aleph', address: 'São Paulo, SP', phone: '1198888888' },
            { name: 'Suma', address: 'São Paulo, SP', phone: '1197777777' },
        ];
        const publishers = await Publisher.bulkCreate(publishersData);

        // 3. Criar Categorias
        console.log('Criando Categorias...');
        const categoriesData = [
            { name: 'Fantasia' },
            { name: 'Ficção Científica' },
            { name: 'Mistério' },
            { name: 'Terror' },
        ];
        const categories = await Category.bulkCreate(categoriesData);

        // 4. Criar Livros (10 livros)
        console.log('Criando Livros...');
        const booksData = [
            {
                title: 'Harry Potter e a Pedra Filosofal',
                price: 49.90,
                isbn: '9788532530783',
                synopsis: 'O primeiro livro da saga do bruxo mais famoso do mundo.' as unknown as Text,
                authorId: authors[0].id, // J.K. Rowling
                publisherId: publishers[0].id, // Rocco
                categoryId: categories[0].id, // Fantasia
            },
            {
                title: 'Harry Potter e a Câmara Secreta',
                price: 45.50,
                isbn: '9788532530790',
                synopsis: 'O segundo ano de Harry em Hogwarts.' as unknown as Text,
                authorId: authors[0].id,
                publisherId: publishers[0].id,
                categoryId: categories[0].id,
            },
            {
                title: 'A Guerra dos Tronos',
                price: 79.90,
                isbn: '9788556510785',
                synopsis: 'O inverno está chegando.' as unknown as Text,
                authorId: authors[1].id, // George R.R. Martin
                publisherId: publishers[2].id, // Suma
                categoryId: categories[0].id, // Fantasia
            },
            {
                title: 'A Fúria dos Reis',
                price: 85.00,
                isbn: '9788556510792',
                synopsis: 'A guerra pelos cinco reis.' as unknown as Text,
                authorId: authors[1].id,
                publisherId: publishers[2].id,
                categoryId: categories[0].id,
            },
            {
                title: 'Eu, Robô',
                price: 39.90,
                isbn: '9788576572008',
                synopsis: 'As três leis da robótica.' as unknown as Text,
                authorId: authors[2].id, // Isaac Asimov
                publisherId: publishers[1].id, // Aleph
                categoryId: categories[1].id, // Ficção Científica
            },
            {
                title: 'Fundação',
                price: 54.90,
                isbn: '9788576570035',
                synopsis: 'O início da maior saga de sci-fi.' as unknown as Text,
                authorId: authors[2].id,
                publisherId: publishers[1].id,
                categoryId: categories[1].id,
            },
            {
                title: 'O Assassinato no Expresso do Oriente',
                price: 34.90,
                isbn: '9788525434567',
                synopsis: 'Hercule Poirot investiga um crime no trem.' as unknown as Text,
                authorId: authors[3].id, // Agatha Christie
                publisherId: publishers[0].id, // Rocco (exemplo)
                categoryId: categories[2].id, // Mistério
            },
            {
                title: 'Morte no Nilo',
                price: 36.90,
                isbn: '9788525434568',
                synopsis: 'Um crime durante um cruzeiro no Egito.' as unknown as Text,
                authorId: authors[3].id,
                publisherId: publishers[0].id,
                categoryId: categories[2].id,
            },
            {
                title: 'O Fim da Eternidade',
                price: 42.00,
                isbn: '9788576570042',
                synopsis: 'Viagens no tempo e paradoxos.' as unknown as Text,
                authorId: authors[2].id, // Asimov
                publisherId: publishers[1].id, // Aleph
                categoryId: categories[1].id,
            },
            {
                title: 'Fogo e Sangue',
                price: 89.90,
                isbn: '9788556510800',
                synopsis: 'A história da casa Targaryen.' as unknown as Text,
                authorId: authors[1].id, // Martin
                publisherId: publishers[2].id, // Suma
                categoryId: categories[0].id,
            }
        ];

        await Book.bulkCreate(booksData);

        console.log('✅ Seed concluído com sucesso! 10 livros adicionados.');
    } catch (error) {
        console.error('❌ Erro ao rodar o seed:', error);
    } finally {
        await sequelize.close();
    }
}

seed();
