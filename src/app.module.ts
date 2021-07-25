import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'smartranking',
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      auth: {
        user: 'root',
        password: '123456',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
