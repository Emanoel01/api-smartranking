import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  async criarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDTO;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`JOGADOR COM EMAIL ${email} já cadastrado`);
    }
    const jogadorCriado = new this.jogadorModel(criarJogadorDTO);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    criarJogadorDTO: CriarJogadorDTO,
  ): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new BadRequestException(`JOGADOR COM ID ${_id} NÃO ENCONTRADO`);
    }
    return await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: criarJogadorDTO })
      .exec();
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

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com _id ${_id} não encontrador`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id });

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com _id ${_id} não encontrador`);
    }

    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
