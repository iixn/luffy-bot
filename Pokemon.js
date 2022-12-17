const { default: axios } = require("axios");
const { MessageMedia } = require('whatsapp-web.js');
module.exports = {

    getInfo: async function(pokemonCharacter, chat) {

        try {
            
            const result = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonCharacter}/`)
            const pokemon = result.data;
            const media = await MessageMedia.fromUrl(pokemon.sprites.front_default);

            let text = `*_╭══════════════════_*
*_➥Nombre: ${pokemon.name}_*
*_➥Experiencia base: ${pokemon.base_experience}_*
*_➥Tipo: ${pokemon.types[0].type.name}_*
*_➥Peso: ${pokemon.weight}_*
*_➥Id: #${pokemon.id.toString()}_*
*_╰══════════════════_*`

            chat.sendMessage(media, { caption: text });
            
        } catch (err) {
            
            console.log(err)
            chat.sendMessage(`*_Debes introducir un Pokémon válido!!_*\n\n*_Asegúrate de que esté bien escrito_*\n\n*_Ejemplo:_*\n\n*_!Pokemon Eevee❌_*\n*_!Pokemon eevee✅_*`)

        }

    }

}