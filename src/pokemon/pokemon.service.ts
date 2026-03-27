import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: any) { 
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try{
    const pokemon = await this.pokemonModel.create(createPokemonDto);
    
    return pokemon;
    
}catch (error) {
    if(error.code==11000) {
        throw new BadRequestException(`el pokemon existe en la db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
throw new InternalServerErrorException();
  }
}

  findAll() {
    return 'this action returns all pokemon';
  }
  async insertMany(pokemons: any[]) {
  return this.pokemonModel.insertMany(pokemons);
}
update(id: number, updatePokemonDto: any) {
  return `update pokemon ${id}`;
}

remove(id: number) {
  return `remove pokemon ${id}`;
}

findOne(id: number) {
  return `pokemon ${id}`;
}
}