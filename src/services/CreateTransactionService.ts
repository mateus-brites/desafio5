import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new Error('you do not have enougth money :(');
    }
    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
