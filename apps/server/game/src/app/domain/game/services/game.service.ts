import { Injectable, Logger } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { Game } from '../models/game.model';

@Injectable()
export class GameService {
  private readonly logger: Logger = new Logger(GameService.name);

  private games: Map<string, Game> = new Map();

  async getGame(gameId: string): Promise<Game> {
    if (this.games.has(gameId)) {
      return this.games.get(gameId) as Game;
    }
    const game = await this.loadFromStorage(gameId);
    this.games.set(gameId, game);
    return game;
  }

  async createGame(game: Game): Promise<void> {
    game.setId(this.generateUuid());
    this.games.set(game.getId(), game);
    await this.storeToStorage(game);
  }

  private generateUuid(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private async loadFromStorage(gameId: string): Promise<Game> {
    try {
      const game = new Game();
      const content = await readFile(`data/games/${gameId}.json`, 'utf-8');
      game.unserialize(JSON.parse(content));
      return game;
    } catch (error) {
      this.logger.error(error);
    }
    return new Game();
  }

  private async storeToStorage(game: Game): Promise<void> {
    try {
      await this.prepareDirectory('data/games');
      await writeFile(
        `data/games/${game.getId()}.json`,
        JSON.stringify(game.serialize())
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async prepareDirectory(directory: string): Promise<void> {
    try {
      await mkdir(directory, { recursive: true });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
