import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { jogadorSchema } from './interfaces/schemas/jogador.schema';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Jogador',
        schema: jogadorSchema,
      },
    ]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}