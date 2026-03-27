import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
   imports: [
    MongooseModule.forFeature([
      { name: Pokemon.name, schema: PokemonSchema }
    ])
  ],
  providers: [PokemonService],
  controllers: [PokemonController]
})
export class PokemonModule {}