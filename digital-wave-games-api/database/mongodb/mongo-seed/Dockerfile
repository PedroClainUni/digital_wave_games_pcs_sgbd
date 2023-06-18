FROM mongo:latest

COPY init.json /init.json
CMD mongoimport --host mongodb --db digital_wave_games_mongo --collection produtos --type json --file /init.json --jsonArray