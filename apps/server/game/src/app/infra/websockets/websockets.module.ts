import { Module } from '@nestjs/common';
import { GameWebsocketsModule } from './game/game.module';

@Module({
  imports: [GameWebsocketsModule],
})
export class WebsocketsModule {}
