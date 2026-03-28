import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}


  async create(createPokemonDto: any) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(
          `El pokemon ya existe ${JSON.stringify(error.keyValue)}`
        );
      }

      console.log(error);
      throw new InternalServerErrorException('Error al crear el pokemon');
    }
  }


  async insertMany(pokemons: any[]) {
    try {
      return await this.pokemonModel.insertMany(pokemons);

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al insertar pokemons');
    }
  }

  
  async findAll() {
    return await this.pokemonModel.find();
  }

 
  async findOne(id: number) {
    const pokemon = await this.pokemonModel.findOne({ no: id });

    if (!pokemon) {
      throw new BadRequestException(`Pokemon con no ${id} no existe`);
    }

    return pokemon;
  }

  async update(id: number, updatePokemonDto: any) {

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      const pokemon = await this.pokemonModel.findOneAndUpdate(
        { no: id },
        updatePokemonDto,
        { new: true }
      );

      if (!pokemon) {
        throw new BadRequestException(`Pokemon con no ${id} no existe`);
      }

      return pokemon;

    } catch (error) {

      if (error.code === 11000) {
        throw new BadRequestException(
          `El pokemon ya existe ${JSON.stringify(error.keyValue)}`
        );
      }

      console.log(error);
      throw new InternalServerErrorException('Error al actualizar');
    }
  }

  async remove(id: number) {

    const result = await this.pokemonModel.deleteOne({ no: id });

    if (result.deletedCount === 0) {
      throw new BadRequestException(`Pokemon con no ${id} no existe`);
    }

    return { message: 'Pokemon eliminado' };
  }
}