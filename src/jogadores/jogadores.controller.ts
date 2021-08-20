import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CriarJogadorDTO } from '../jogadores/dtos/criar-jogador.dto';

import { Jogador } from './interfaces/jogador.interface';

import { JogadoresService } from './jogadores.service';

import { JogadoresValidacaoParametroPipe } from './pipes/jogadores-validacao-parametro.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDTO: CriarJogadorDTO) {
    await this.jogadoresService.criarJogador(criarJogadorDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criarJogadorDTO: CriarJogadorDTO,
    @Param('_id', JogadoresValidacaoParametroPipe) _id: string,
  ) {
    await this.jogadoresService.atualizarJogador(_id, criarJogadorDTO);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[] | Jogador> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(@Param('_id') _id: string): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  @UsePipes(JogadoresValidacaoParametroPipe)
  async deletarJogador(@Param('_id') _id: string): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}
