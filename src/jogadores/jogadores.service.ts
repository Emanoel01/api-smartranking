import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(
    criarJogadorDTO: CriarJogadorDTO,
  ): Promise<Jogador> {
    const { email } = criarJogadorDTO;
    // const jogadorEncontrado = await this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      return await this.atualizar(criarJogadorDTO);
    }
    this.criar(criarJogadorDTO);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    // return await this.jogadores;
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrador`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    // const jogadorEncontrado = await this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    // if (!jogadorEncontrado) {
    //   throw new NotFoundException(`Jogador com email ${email} não encontrador`);
    // }

    // this.jogadores = this.jogadores.filter(
    //   (jogador) => jogador.email !== email,
    // );
    return await this.jogadorModel.deleteOne({ email }).exec();
  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(criarJogadorDTO);
    return await jogadorCriado.save();

    /*
    const { nome, telefoneCelular, email } = criarJogadorDTO;

    const jogador: Jogador = {
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };

    this.logger.log(`criaJogadorDTO: ${JSON.stringify(jogador)}`);

    this.jogadores.push(jogador);
    */
  }

  private async atualizar(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
    // const { nome } = criarJogadorDto;
    // jogadorEncontrado.nome = nome;

    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }
}
