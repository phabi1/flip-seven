import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './domain/game/game.module';
import { WebsocketsModule } from './infra/websockets/websockets.module';

@Module({
  imports: [GameModule, WebsocketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
