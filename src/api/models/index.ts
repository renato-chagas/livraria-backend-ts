import Book from './book.js';
import Author from './author.js';
import Category from './category.js';
import Publisher from './publisher.js';
import User from './user/User.js';

Author.hasMany(Book, { foreignKey: 'authorId', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

Publisher.hasMany(Book, { foreignKey: 'publisherId', as: 'books' });
Book.belongsTo(Publisher, { foreignKey: 'publisherId', as: 'publisher' });

Category.hasMany(Book, { foreignKey: 'categoryId', as: 'books' });
Book.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export { Book, Author, Category, Publisher, User };
