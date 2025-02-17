import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Player } from '../../../../domain/game/models/player.model';
import { GameService } from '../../../../domain/game/services/game.service';
import { ConnectionManager } from '../services/connection-manager';
import { Game } from '../../../../domain/game/models/game.model';

@WebSocketGateway({ namespace: 'game', cors: true })
export class GameGateway {
  constructor(
    private readonly gameService: GameService,
    private readonly connectionManager: ConnectionManager
  ) {}

  @SubscribeMessage('createGame')
  async handleCreateGame(
    @ConnectedSocket() client: Socket
  ): Promise<WsResponse> {
    const game = new Game();
    await this.gameService.createGame(game);

    return {
      event: 'createGame',
      data: {
        id: game.getId(),
      },
    };
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() payload: { gameId: string; name: string },
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const game = await this.gameService.getGame(payload.gameId);
    if (!game) {
      return;
    }
    const player = new Player();
    player.setName(payload.name);
    game.addPlayer(player);

    this.gameService.saveGame(game.getId());

    this.connectionManager.addConnection(player.getId(), client);
    client.join(game.getId());

    client.emit('join', { playerId: player.getId() });
    client.to(game.getId()).emit('player-joined', player.serialize());
  }

  @SubscribeMessage('leave')
  async handleLeave(): Promise<void> {}

  @SubscribeMessage('game')
  async game(
    @MessageBody() payload: { gameId: string; playerId: string }
  ): Promise<WsResponse> {
    const game = await this.gameService.getGame(payload.gameId);
    if (!game) {
      return {
        event: 'game',
        data: { error: 'Game not found' },
      };
    }

    return {
      event: 'game',
      data: game.serialize(),
    };
  }
}
