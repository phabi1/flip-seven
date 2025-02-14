import { forwardRef, Module } from '@nestjs/common';
import { GameModule } from '../../../domain/game/game.module';
import { GameGateway } from './gateways/game.gateway';
import { ConnectionManager } from './services/connection-manager';

@Module({
  imports: [forwardRef(() => GameModule)],
  providers: [GameGateway, ConnectionManager],
})
export class GameWebsocketsModule {}
