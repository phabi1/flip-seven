import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';

@Module({
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
