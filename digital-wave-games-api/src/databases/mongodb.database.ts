import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export default function connectMongo() :void {
    mongoose.connect("mongodb://mongodb/digital_wave_games_mongo").then(() => {
        console.log("Conectado ao banco de dados digital_wave_games_mongo");
    }).catch((err) => {
        console.log("Ocorreu um erro ao conectar no MongoDB: " + err);
    });
}